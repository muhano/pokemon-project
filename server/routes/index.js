const router = require("express").Router();
const pokemonController = require('../controllers/pokemonControllers')

router.get("/", (req, res) => {
    res.send("Pokemon server")
})

//catch pokemon
router.post("/pokemons", pokemonController.catchPokemon)

module.exports = router