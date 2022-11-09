import styled from 'styled-components';

export default function Form({data, setData, handleSubmit}) {

  const handleChange = (e) => {
    const value = e.target.value.toUpperCase()
    setData(value)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" placeholder="stock symbol" value={data} onChange={handleChange} maxLength={5} required/>
      <Input type="submit" />
    </form>
  )
}

const Input = styled.input`
  padding: 0.5rem;
  margin: 0.5rem;
`