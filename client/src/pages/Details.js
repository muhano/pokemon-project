import { useParams, useLocation } from "react-router-dom";
import { GET_POKEMON_DETAILS } from "../queries";
import { useQuery } from "@apollo/client";
import { Container } from "react-bootstrap";

function Details() {
  let params = useParams();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { name: params.name },
  });
  const location = useLocation()
  const image = location.state

  
  if (loading) {
    return <h3>Loading....</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

//   console.log(data.pokemon);

  return (
    <Container>
      <h1>This is details page with name {params.name}</h1>
      <img src={image} alt="pokemon"></img>
      <p>Type</p>
      <ul>
          {data.pokemon.types.map(type=> (
              <li key={type.type.name}>{type.type.name}</li>
          ))}
      </ul>
      <p>Moves</p>
      <ul>
          {data.pokemon.moves.map(move => (
              <li key={move.move.name}>{move.move.name}</li>
          ))}
      </ul>

    </Container>
  );
}

export default Details;
