import { useState, useEffect } from "react";
import Form from "./components/Form";
import Card from "./components/Card";
import FavCard from "./components/FavCard";
import styled from "styled-components";

export default function App() {
  const [data, setData] = useState("");
  const [formData, setFormData] = useState("");
  const [favorite, setFavorite] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState({
    "01. symbol": "",
    "05. price": "",
    "10. change percent": "",
  });

  useEffect(() => {
    getFavoriteStocks();
  }, []);

  const getStock = async (symbol) => {
    try {
      const response = await fetch(
        `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.KEY}`
      );
      const data = await response.json();
      const stock = await data["Global Quote"];
      setSubmittedData(stock);
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const getFavoriteStocks = async () => {
    try {
      const response = await fetch(`http://localhost:1337/api/favorites`);
      const data = await response.json();
      setFavorite(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/favorites/${id}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addFavorite = async (post) => {
    try {
      const response = await fetch(`http://localhost:1337/api/favorites/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      setFavorite(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      setIsSubmitted(false);
      setIsLoading(true);
      getStock(formData);
      setFormData("");
    } catch (error) {
      console.error(error);
    }
  };

  const handleFavorite = () => {
    const post = {
      data: {
        symbol: submittedData["01. symbol"],
        price: submittedData["05. price"],
        percent: submittedData["10. change percent"],
      },
    };
    try {
      addFavorite(post).then(() => getFavoriteStocks());
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = (event) => {
    try {
      deleteFavorite(event.target.id).then(() => getFavoriteStocks());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container>
        <div>
          <h2>search for a stock</h2>
          <Form
            data={formData}
            setData={setFormData}
            handleSubmit={handleSubmit}
          />
        </div>

        {isLoading && <h1>LOADING...</h1>}

        {isSubmitted && (
          <Card stock={submittedData} handleFavorite={handleFavorite} />
        )}
      </Container>

      {favorite.data && (
        <>
          <FavCard stocks={favorite} handleDelete={handleDelete} />
        </>
      )}
    </>
  );
}

const Container = styled.div`
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
