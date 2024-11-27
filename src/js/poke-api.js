const pokeApi = {}

function convertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.id = pokeDetail.id
    pokemon.name = pokeDetail.name;
    
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;

    pokemon.image = pokeDetail.sprites.other["official-artwork"].front_default;

    pokemon.species = pokeDetail.species.name;
    pokemon.height = pokeDetail.height / 10;
    pokemon.weight = pokeDetail.weight / 10;
    
    pokemon.abilities = pokeDetail.abilities.map((ability) => ability.ability.name);

    pokemon.stats = {
        hp: pokeDetail.stats[0].base_stat,
        attack: pokeDetail.stats[1].base_stat,
        defense: pokeDetail.stats[2].base_stat,
        specialAttack: pokeDetail.stats[3].base_stat,
        specialDefense: pokeDetail.stats[4].base_stat,
        speed: pokeDetail.stats[5].base_stat,
        total: pokeDetail.stats.reduce((sum, stat) => sum + stat.base_stat, 0),
    };
    

    return pokemon;
}

pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 9) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}


