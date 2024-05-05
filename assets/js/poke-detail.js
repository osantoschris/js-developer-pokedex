const listPokemonDetails = document.getElementById('details');
const pokeDetails = {}

function getParams(namePokemon) {
    const urlParamns = new URLSearchParams(window.location.search);
    return urlParamns.get(namePokemon);
}

const pokeName = getParams('pokemon');

pokeDetails.getDetail = (pokeName) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`
    
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`)
            }
            return response.json();
        })
        .then((pokemonData) => {
            const detalhesPokemon = {
                name: pokemonData.name,
                height: pokemonData.height,
                weight: pokemonData.weight,
                abilities: pokemonData.abilities.map((ability) => ability.ability.name),
            }
            return detalhesPokemon;
        })
}

function convert(detalhe) {
    const detalhes = new Detalhes()
    detalhes.name = detalhe.name
    detalhes.altura = detalhe.height
    detalhes.peso = detalhe.weight

    return detalhes
}

function convertDetailToLi(details) {
    return `
        <li>
            <ol>
                ${details.stats.map((stat) => `<li>${stat}</li>`).join('')}
            </ol>
        </li>
    `
};

function loadDetail(pokeName) {
    pokeDetails.getDetail(pokeName).then((detalhes = []) => {
        const newHtml = detalhes.map(convertDetailToLi).join('')
        listPokemonDetails.innerHTML += newHtml
    })
};