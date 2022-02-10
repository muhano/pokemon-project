const router = require("express").Router();
const pokemonController = require('../controllers/pokemonControllers')

router.get("/", (req, res) => {
    res.send("Pokemon server")
})

//catch pokemon
router.post("/pokemons", pokemonController.catchPokemon)
router.get("/pokemons", pokemonController.getPokemonList)
router.delete("/pokemons/:id", pokemonController.removePokemon)

module.exports = router