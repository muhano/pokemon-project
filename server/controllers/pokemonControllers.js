const {Pokemon} = require('../models/index.js')

const catchPokemon = async (req, res, next) => {
    try {
        const {name, nickname, image} = req.body
        // console.log(name, nickname, image, '<-----------');

        const newPokemon = await Pokemon.create({name, nickname, image})
        res.status(201).json(newPokemon);
    } catch (err) {
        next(err)
    }
}

const getPokemonList = async (req, res, next) => {
    try {
        const pokemonList = await Pokemon.findAll()
        res.status(200).json(pokemonList);
    } catch (err) {
        next(err)
    }
}

const removePokemon = async (req, res, next) => {
    try {
        const pokemonId = req.params.id;

        const removedPokemon = await Pokemon.destroy({
            where: { id: pokemonId },
          });
        res.status(200).json(removedPokemon);
    } catch (err) {
        next(err)
    }
}

module.exports = {catchPokemon, getPokemonList, removePokemon}