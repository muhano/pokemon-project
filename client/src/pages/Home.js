import { Container, Button } from "react-bootstrap";
import { GET_POKEMONS } from "../queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PageContext } from "../App";

function Home() {
  const { page, incrementPage, decrementPage } = useContext(PageContext);
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 9, offset: page },
    notifyOnNetworkStatusChange: true,
  });

  const handleNext = () => {
    incrementPage();
  };

  const handleBack = () => {
    decrementPage();
  };

  if (loading) {
    return <h3>Loading....</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <Container>
      <h1>This is home page</h1>
      {data.pokemons.results.map((pokemon) => (
        <div key={pokemon.id}>
          <Link to={`/pokemon/${pokemon.name}`} state={pokemon.image}>
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
