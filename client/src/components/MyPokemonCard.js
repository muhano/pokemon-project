import { Card, Button } from "react-bootstrap";

function MyPokemonCard({ pokemon }) {

    const handleRemove = () => {
        pokemon.removePokemon(pokemon.pokemon.id)
    }
    // console.log(pokemon.removePokemon);

  return (
    <Card className="h-100" style={{ maxWidth: "20rem" }}>
      
        <Card.Img
          style={{ width: "100%", height: "15vw", objectFit: "contain" }}
          variant="top"
          src={pokemon.pokemon.image}
        />
      

      <Card.Body>
        <Card.Title>{pokemon.pokemon.name}</Card.Title>
        <Card.Text>Name: {pokemon.pokemon.nickname}</Card.Text>
        <Button onClick={handleRemove} variant="danger">Remove</Button>
      </Card.Body>
    </Card>
  );
}

export default MyPokemonCard;