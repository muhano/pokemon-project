/** @jsxImportSource @emotion/react */
import { Container, Button, Col, Row } from "react-bootstrap";
import { GET_POKEMONS } from "../queries";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { PageContext } from "../App";
import { css } from "@emotion/react";
import PokemonCard from "../components/PokemonCard";
import axios from "axios";

function Home() {
  const { page, incrementPage, decrementPage } = useContext(PageContext);
  const { loading, error, data } = useQuery(GET_POKEMONS, {
    variables: { limit: 10, offset: page },
    notifyOnNetworkStatusChange: true,
  });
  const [myPokemonCount, setMyPokemonCount] = useState("loading...");
  // const [myPokemonLoading, setMyPokemonLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://pokemon-project1-server-geri.herokuapp.com/pokemons");
        // console.log(response);
        if (response.status === 200) {
          setMyPokemonCount(response.data.length);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleNext = () => {
    incrementPage();
  };

  const handleBack = () => {
    decrementPage();
  };

  // if (loading) {
  //   return <h3>Loading....</h3>;
  // }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <Container>
      <h1>Pokedex</h1>
      <h5>
        Owned Total : {myPokemonCount} |{" "}
        <Link to={`/mypokemon`}>My Pokemon List Page</Link>
      </h5>
      {loading ? (
        <h3>Loading....</h3>
      ) : (
        <div>
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
              </Col>
            ))}
          </Row>

          <div
            css={css`
              margin-top: 1rem;
              margin-bottom: 1rem;
            `}
          >
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
        </div>
      )}
    </Container>
  );
}

export default Home;
