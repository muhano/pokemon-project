/** @jsxImportSource @emotion/react */
import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Col, Row } from "react-bootstrap";
import { css } from "@emotion/react";
import MyPokemonCard from "../components/MyPokemonCard";
import { Link } from "react-router-dom";

function MyPokemon() {
  const [myPokemonList, setMyPokemonList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("https://pokemon-project1-server-geri.herokuapp.com/pokemons");
        // console.log(response);
        if (response.status === 200) {
          setMyPokemonList(response.data);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const removePokemon = async (id) => {
      try {
        const response = await axios.delete(`https://pokemon-project1-server-geri.herokuapp.com/pokemons/${id}`);
        if (response.status === 200) {
            const newList = myPokemonList.filter(pokemon => pokemon.id !== id)
            setMyPokemonList(newList)
        }
      } catch (err) {
          console.log(err);
      }
  }

  if (loading) {
    return (
      <Container>
        <h3
          css={css`
            margin-top: 1rem;
          `}
        >
          Loading....
        </h3>
      </Container>
    );
  }

  return (
    <Container>
      <h3>My Pokemon List | <Link className="mx-auto" to={`/`}>Go back</Link></h3>
      <Row>
        {myPokemonList.map((pokemon) => (
          <Col
            key={pokemon.id}
            xs={6}
            css={css`
              margin-top: 1rem;
            `}
          >
            <MyPokemonCard pokemon={{pokemon, removePokemon}} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MyPokemon;
