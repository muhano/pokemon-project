/** @jsxImportSource @emotion/react */
import { Container, Button, Col, Row } from "react-bootstrap";
import { GET_POKEMONS } from "../queries";
import { useQuery } from "@apollo/client";
// import { Link } from "react-router-dom";
import { useContext } from "react";
import { PageContext } from "../App";
import { css } from "@emotion/react";
import PokemonCard from "../components/PokemonCard";

function Home() {
  const { page, incrementPage, decrementPage } = useContext(PageContext);
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 10, offset: page },
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
      <Row>
        {data.pokemons.results.map((pokemon) => (
          <Col
            key={pokemon.id}
            xs={6}
            css={css`
              margin-top: 1rem;
            `}
          >
            <PokemonCard pokemon={pokemon} />
            {/* <Link to={`/pokemon/${pokemon.name}`} state={pokemon.image}>
            <img src={pokemon.image} alt="pokemon"></img>
          </Link>
          <h4>{pokemon.name}</h4> */}
          </Col>
        ))}
      </Row>

      <div css={css`
            margin-top: 1rem;
            margin-bottom: 1rem;
          `}>
        {data.pokemons.previous ? (
          <Button onClick={handleBack} variant="primary">
            Back
          </Button>
        ) : (
          <Button onClick={handleBack} variant="primary" disabled>
            Back
          </Button>
        )}
        <Button
          css={css`
            margin-left: 0.2rem;
          `}
          onClick={handleNext}
          variant="primary"
        >
          Next
        </Button>
      </div>
    </Container>
  );
}

export default Home;
