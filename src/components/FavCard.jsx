import styled from 'styled-components';

export default function FavCard({ stocks, handleDelete }) {

  return (
    <Container>
    { stocks.data?.map(item => {
      return (
      <Favorites key={item.id}>
        <Item>{item.attributes.symbol}</Item>
        <Item>{item.attributes.price}</Item>
        <Item>{item.attributes.percent}</Item>
        <Button id={item.id} onClick={handleDelete}>delete from favorite stocks</Button>
      </Favorites>
      )
    })}
    </Container>
  )

}

const Container = styled.div` 
  display: flex;
  flex-wrap: wrap;
`

const Favorites = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 250px;
  width: 250px;
  border: 1px solid black;
  border-radius: 5px;
  font-size: medium;
  margin: 1rem;
`

const Item = styled.p`
  
`
const Button = styled.button`
  background-color: #fad2d2;
  border: none;
  border-radius: 5px;
  height: 30px;
`