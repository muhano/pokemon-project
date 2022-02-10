import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function PokemonCard({ pokemon }) {
  return (
    <Card className="h-100" style={{ maxWidth: "20rem" }}>
      <Link to={`/pokemon/${pokemon.name}`}>
        <Card.Img
          style={{ width: "100%", height: "15vw", objectFit: "contain" }}
          variant="top"
          src={pokemon.image}
        />
      </Link>

      <Card.Body>
        <Card.Title>{pokemon.name}</Card.Title>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
