import { Container, Button } from "react-bootstrap";
import { GET_POKEMONS } from "../queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

let offsetValue = 0;
function Home() {
  const { loading, error, data, refetch } = useQuery(GET_POKEMONS, {
    variables: { limit: 9, offset: 0 },
    notifyOnNetworkStatusChange: true,
  });

  const handleNext = () => {
    offsetValue += 9;
    refetch({ limit: 9, offset: offsetValue });
  };

  const handleBack = () => {
    offsetValue -= 9;
    refetch({ limit: 9, offset: offsetValue });
  };

  if (loading) {
    return <h3>Loading....</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  console.log(loading, data.pokemons);

  return (
    <Container>
      <h1>This is home page</h1>
      {data.pokemons.results.map((pokemon) => (
        <div key={pokemon.id}>
          <Link to={`/pokemon/${pokemon.name}`}>
            <img src={pokemon.image} alt="pokemon"></img>
          </Link>
          <h4>{pokemon.name}</h4>
        </div>
      ))}
      {data.pokemons.previous ? (
        <Button onClick={handleBack} variant="primary">
          Back
        </Button>
      ) : (
        <Button onClick={handleBack} variant="primary" disabled>
          Back
        </Button>
      )}
      <Button onClick={handleNext} variant="primary">
        Next
      </Button>
    </Container>
  );
}

export default Home;
