import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useState, useEffect } from "react";

function PokemonCard({ pokemon }) {
  // const [pokemonTypes, setPokemonTypes] = useState("")

  // useEffect(() => {
  //     const types = pokemon.types.map((type) => {
  //         return type.type.name;
  //       });
  //       setPokemonTypes(types.join(", "));
  // },[])

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
      {/* <Card.Footer>
      <Card.Title>{pokemon.name}</Card.Title>
      </Card.Footer> */}
    </Card>
  );
}

export default PokemonCard;
