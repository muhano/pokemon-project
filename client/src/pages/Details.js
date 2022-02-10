import { useParams, useLocation } from "react-router-dom";
import { GET_POKEMON_DETAILS } from "../queries";
import { useQuery } from "@apollo/client";
import { Container, Card, ListGroup, ListGroupItem } from "react-bootstrap";

function Details() {
  let params = useParams();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { name: params.name },
  });
  const location = useLocation();
  const image = location.state;

  if (loading) {
    return <h3>Loading....</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <Container className="mt-3">
      {/* <h1>This is details page with name {params.name}</h1> */}
      <Card className="mx-auto" style={{ maxWidth: "25rem" }}>
        <Card.Img
          style={{ width: "100%", height: "15vw", objectFit: "contain" }}
          variant="top"
          src={data.pokemon.sprites.front_default}
        />

        <Card.Body>
          <Card.Title>{data.pokemon.name}</Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <ListGroupItem>
            Type
            {/* <Card.Text>Type</Card.Text> */}
            <ul>
              {data.pokemon.types.map((type) => (
                <li key={type.type.name}>{type.type.name}</li>
              ))}
            </ul>
          </ListGroupItem>

          <ListGroupItem>
            Moves
            <ul>
              {data.pokemon.moves.map((move) => (
                <li key={move.move.name}>{move.move.name}</li>
              ))}
            </ul>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Container>
  );
}

export default Details;
