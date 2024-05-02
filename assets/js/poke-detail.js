const pokeDetails = {}

function convertStats(statsDetail) {
    const detail = new Detail()
    detail.name = statsDetail.stat.name
    detail.value = statsDetail.base_stat

    return detail
}

function getDetail(nameTarget) {
    const url = `https://pokeapi.co/api/v2/pokemon/${nameTarget}`
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter os dados')
            }
            return response.json();
        })
        .then(pokemonData => {
            const stats = pokemonData.stats;
            console.log(stats);
            stats.forEach(stat => {
                let statName = stat.stat.name;
                let statValue = stat.base_stat;
                console.log(`${statName}: ${statValue}`)
            });
        })
        .catch(error => {
            console.error('Erro:', error.message);
        });
}