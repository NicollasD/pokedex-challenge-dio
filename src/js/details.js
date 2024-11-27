const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

if (pokemonId) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(response => response.json())
        .then((pokeDetail) => {
            const pokemon = convertPokeApiDetailToPokemon(pokeDetail);
            const speciesUrl = pokeDetail.species.url;
            return fetch(speciesUrl)
                .then(response => response.json())
                .then((speciesData) => {
                    return { pokeDetail, speciesData };
                });
        })
        .then(({ pokeDetail, speciesData }) => {
            const pokemon = convertPokeApiDetailToPokemon(pokeDetail);

            // Adiciona o "categoria" da espécie
            pokemon.category = speciesData.genera.find((genus) => genus.language.name === "en").genus;

            console.log(pokemon);


            const detailsContainer = document.getElementById('pokemon-details-container');

            detailsContainer.innerHTML = `
                <main class="details__page__container ${pokemon.type}">
        <img id="details-logo" src="../src/img/pokeball-logo.png" alt="background-logo">
        <header class="header">
            <a href="../index.html">
                <img id="arrow" src="../src/img/arrow-back.png" alt="back button" class="back__arrow">
            </a>
        </header>
        <section class="pokemon__data">
            <div class="data__content">
                <span class="pokemon__name">${pokemon.name}</span>
                <ul class="pokemon__details">
                ${pokemon.types.map((type) => `<li class="pokemon__type">${type}</li>`).join('')}
                </ul>
            </div>
            <span class="pokemon__number">#${String(pokemon.id).padStart(3, '0')}</span>
            <img src="${pokemon.image}"
                alt="${pokemon.name}" class="pokemon__img">
            <section class="pokemon__stats">
                <h2 class="stats__title">About</h2>
                <section class="stats__about">
                    <ul class="attributes__list">
                        <li class="item__attribute">Species</li>
                        <li class="item__attribute">Height</li>
                        <li class="item__attribute">Weight</li>
                        <li class="item__attribute">Abilities</li>
                    </ul>
                    <ul class="attributes__list__values">
                        <li class="attribute__value">${pokemon.category}</li>
                        <li class="attribute__value">${pokemon.height} m</li>
                        <li class="attribute__value">${pokemon.weight} kg</li>
                        <li class="attribute__value">${pokemon.abilities.join(', ')}</li>
                    </ul>
                </section>
                <h2 class="stats__title">Base Stats</h2>
                <section class="stats__base">
                    <ul class="attributes__list">
                        <li class="item__attribute">HP</li>
                        <li class="item__attribute">Attack</li>
                        <li class="item__attribute">Defense</li>
                        <li class="item__attribute">Sp. Attack</li>
                        <li class="item__attribute">Sp. Defense</li>
                        <li class="item__attribute">Speed</li>
                        <li class="item__attribute">Total</li>
                    </ul>
                    <ul class="attributes__list__values">
                        <li class="attribute__value">${pokemon.stats.hp}</li>
                        <li class="attribute__value">${pokemon.stats.attack}</li>
                        <li class="attribute__value">${pokemon.stats.defense}</li>
                        <li class="attribute__value">${pokemon.stats.specialAttack}</li>
                        <li class="attribute__value">${pokemon.stats.specialDefense}</li>
                        <li class="attribute__value">${pokemon.stats.speed}</li>
                        <li class="attribute__value">${pokemon.stats.total}</li>
                    </ul>
                    <ul class="base__stats__bar">
                        <li class="progress__bar-container">
                            <div class="progress__bar">
                                <div class="progress" style="width: calc(${pokemon.stats.hp} / 255 * 100%);">
                                </div>
                            </div>
                        </li>
                        <li class="progress__bar-container">
                            <div class="progress__bar">
                                <div class="progress" style="width: calc(${pokemon.stats.attack} / 255 * 100%);">
                                </div>
                            </div>

                        </li>
                        <li class="progress__bar-container">
                            <div class="progress__bar">
                                <div class="progress" style="width: calc(${pokemon.stats.defense} / 255 * 100%);">
                                </div>
                            </div>
                        </li>
                        <li class="progress__bar-container">
                            <div class="progress__bar">
                                <div class="progress" style="width: calc(${pokemon.stats.specialAttack} / 255 * 100%);"></div>
                            </div>
                        </li>
                        <li class="progress__bar-container">
                            <div class="progress__bar">
                                <div class="progress" style="width: calc(${pokemon.stats.specialDefense} / 255 * 100%);"></div>
                            </div>
                        </li>
                        <li class="progress__bar-container">
                            <div class="progress__bar">
                                <div class="progress" style="width: calc(${pokemon.stats.speed} / 255 * 100%);">
                                </div>
                            </div>
                        </li>
                    </ul>
                </section>
            </section>
        </section>

    </main>
            `;
        })
};
