const listPokemonDetails = document.getElementById('details');
const pokeDetails = {}

document.addEventListener('DOMContentLoaded', () => {
    function getParams(namePokemon) {
        const urlParamns = new URLSearchParams(window.location.search);
        return urlParamns.get(namePokemon);
    }
    const valueParam = getParams('pokemon');
    document.title = `Detalhes - ${valueParam}`

    pokeDetails.getDetails(valueParam).then((details = []) => {
        const newHtml = details.map(convertPokeApiDetailToDetail).join('')
        listPokemonDetails.innerHTML += newHtml
    })
});

function convertPokeApiDetailToDetail(pokeDetail) {
    const detail = new Detail()
    
    const details = detail.stats.map((stat) => stat)
    const [detalhe] = details

    return detail
    
}

function convertDetailToLi(details) {
    return `
        <li>
            <ol>
                ${details.stats.map((stat) => `<li>${stat}</li>`).join('')}
            </ol>
        </li>
    `
}

// function loadPokeMonDetails() {
//     pokeDetails.getDetails(valueParam).then((details = []) => {
//         const newHtml = details.map(convertDetailToLi).join('')
//         listPokemonDetails.innerHTML += newHtml
//     })
// };

pokeDetails.getDetails = async (namePokemon) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${namePokemon}`
    return await fetch(url)
        .then((response) => response.json())
}