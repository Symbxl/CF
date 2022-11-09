import styled from 'styled-components'

export default function Card({ stock, handleFavorite }) {

  return (
    <Container>
      <p>{stock["01. symbol"]}</p>
      <p>{stock["05. price"]}</p>
      <p>{stock["10. change percent"]}</p>
      <Button onClick={handleFavorite}>Add to favorites</Button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  width: 250px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: medium;
`

const Button = styled.button`
  background-color: lightgreen;
  border: none;
  border-radius: 5px;
  height: 20px;
`