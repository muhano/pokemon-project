/** @jsxImportSource @emotion/react */
import { useParams } from "react-router-dom";
import { GET_POKEMON_DETAILS } from "../queries";
import { useQuery } from "@apollo/client";
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
} from "react-bootstrap";
import { useState } from "react";
import { css } from "@emotion/react";
import axios from "axios";
import { Link } from "react-router-dom";

function Details() {
  let params = useParams();
  const { loading, error, data } = useQuery(GET_POKEMON_DETAILS, {
    variables: { name: params.name },
  });
  const [catchSuccess, setCatchSuccess] = useState("");
  const [nickname, setNickname] = useState("");
  const [submitError, setSubmitError] = useState();

  const handleCatch = () => {
    const success = Math.random() < 0.5;
    if (success) setCatchSuccess("success");
    else if (!success) setCatchSuccess("failed");
  };

  const handleInput = (e) => {
    setNickname(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError();
    try {
      const response = await axios.post("http://localhost:3000/pokemons", {
        name: data.pokemon.name,
        nickname: nickname,
        image: data.pokemon.sprites.front_default,
      });
      console.log(response);
      if (response.status === 201) {
        setSubmitError();
        setCatchSuccess("added");
      }
    } catch (err) {
      console.log(err);
      setSubmitError(err);
    }
  };

  if (loading) {
    return <h3>Loading....</h3>;
  }

  if (error) {
    return <h3>{error}</h3>;
  }

  return (
    <Container className="mt-3">
      <Link className="mx-auto" to={`/`}><h4>Go back</h4></Link>
      
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
            <Button onClick={handleCatch} variant="primary">
              Catch Pokemon
            </Button>
            {catchSuccess === "success" && (
              <Card.Text
                css={css`
                  margin-top: 1rem;
                  color: red;
                `}
              >
                Success!!
              </Card.Text>
            )}
            {catchSuccess === "failed" && (
              <Card.Text
                css={css`
                  margin-top: 1rem;
                  color: red;
                `}
              >
                Failed...
              </Card.Text>
            )}

            {catchSuccess === "added" && (
              <Card.Text
                css={css`
                  margin-top: 1rem;
                  color: red;
                `}
              >
                Congrats! pokemon added!
              </Card.Text>
            )}

            {catchSuccess === "success" && (
              <Form onSubmit={handleSubmit}>
                <Form.Group
                  css={css`
                    margin-top: 1rem;
                  `}
                >
                  <Form.Control
                    type="text"
                    placeholder="insert nickname"
                    value={nickname}
                    onChange={handleInput}
                    required
                  ></Form.Control>
                </Form.Group>
                <Button
                  css={css`
                    margin-top: 0.2rem;
                  `}
                  variant="success"
                  type="submit"
                >
                  Enter Nickname
                </Button>
              </Form>
            )}

            {submitError && (
              <Card.Text
                css={css`
                  margin-top: 0.5rem;
                `}
              >
                Nickname already taken...
              </Card.Text>
            )}
          </ListGroupItem>
          <ListGroupItem>
            Type
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
