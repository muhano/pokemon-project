const request = require("supertest");
const app = require("../app");
const { Pokemon } = require("../models/index.js");

beforeAll(async () => {
  const pokemonSeed = [
    {
      name: "bulbasaur",
      nickname: "bulby",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      name: "wartortle",
      nickname: "turtle",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    },
    {
      name: "charmander",
      nickname: "dino",
      image:
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
  ];

  await Pokemon.bulkCreate(pokemonSeed);
});

afterAll((done) => {
  Pokemon.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,
  })
    .then(() => {
      done();
    })
    .catch(() => {
      done(err);
    });
});

describe("GET /pokemons", () => {
  test("[success - 200] - success get Pokemons should be return an array with status code 200", (done) => {
    request(app)
      .get("/pokemons")
      .then((response) => {
        const result = response.body;
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
        expect(response.body[0]).toHaveProperty("id", 1);
        expect(response.body[0]).toHaveProperty("name", "bulbasaur");
        expect(response.body[0]).toHaveProperty("nickname", "bulby");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Delete /pokemons", () => {
  test("[success - 200] - success delete Pokemons should be return an number with status code 200", (done) => {
    request(app)
      .delete("/pokemons/1")
      .then((response) => {
        const result = response.body;
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Number));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});

describe("Post /pokemons", () => {
  test("[success - 201] - success add Pokemon should be return an object with status code 201", (done) => {
    request(app)
      .post("/pokemons")
      .send({
        name: "bulbasaur",
        nickname: "bulby2",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      })
      .then((response) => {
        const result = response.body;
        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty("id", 4);
        expect(response.body).toHaveProperty("name", "bulbasaur");
        expect(response.body).toHaveProperty("nickname", "bulby2");
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  test("[failed - 400] - add Pokemon with already used names should be return an object with status code 400", (done) => {
    request(app)
      .post("/pokemons")
      .send({
        name: "bulbasaur",
        nickname: "bulby2",
        image:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
      })
      .then((response) => {
        const result = response.body;
        expect(response.status).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body).toHaveProperty("message", 'Nickname already taken');
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
});
