const pokemonsList = document.getElementById('pokemonsList');
const loadMoreButton = document.getElementById('loadMoreButton');
const limit = 9;
let offset = 0;
const maxPokemons = 1025;

function loadMorePokemons(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map((pokemon) => `
        <li class="pokemon__card ${pokemon.type}" data-id="${pokemon.id}">
            <div class="card__content">
                <span class="pokemon__number">#${String(pokemon.id).padStart(3, '0')}</span>
                <span class="pokemon__name">${pokemon.name}</span>
                <ul class="pokemon__details">
                    ${pokemon.types.map((type) => `<li class="pokemon__type">${type}</li>`).join('')}
                </ul>
            </div>
            <img src="./src/img/pokeball-logo.png" alt="logo-pokeball" class="pokeball-logo">
            <img src="${pokemon.image}" alt="${pokemon.name}" class="pokemon__img">
        </li>
    `).join('');

        pokemonsList.innerHTML += newHtml;
    });
}

loadMorePokemons(offset, limit);

loadMoreButton.addEventListener('click', () => {
    offset += limit;
    const qtPokemonsNextPage = offset + limit;

    if (qtPokemonsNextPage >= maxPokemons) {
        const newLimit = maxPokemons - offset;
        loadMorePokemons(offset, newLimit);
        loadMoreButton.parentElement.removeChild(loadMoreButton);
    } else {
        loadMorePokemons(offset, limit);
    }
});

pokemonsList.addEventListener('click', (event) => {
    const card = event.target.closest('.pokemon__card');
    if (!card) return; // Clicou fora de um card

    const pokemonId = card.getAttribute('data-id');
    if (pokemonId) {
        // Redirecionar para a página detalhada
        window.location.href = `./pages/details.html?id=${pokemonId}`;
    }
});



