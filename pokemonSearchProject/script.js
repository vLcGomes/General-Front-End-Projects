const searchInput = document.getElementById('search-input')
const searchBtn = document.getElementById('search-button')
const pokemonName = document.getElementById('pokemon-name')
const pokemonId = document.getElementById('pokemon-id')
const pokemonWeight = document.getElementById('weight')
const pokemonHeight = document.getElementById('height')
const pokemonImg = document.getElementById('pokemon')
const types = document.getElementById('types')
const statsHP = document.getElementById('hp')
const statsAttack = document.getElementById('attack')
const statsDefense = document.getElementById('defense')
const statsSpecialAttack = document.getElementById('special-attack')
const statsSpecialDefense = document.getElementById('special-defense')
const statsSpeed = document.getElementById('speed')

function clearAll() {
  pokemonName.innerText = ''
  pokemonId.innerText = ''
  pokemonWeight.innerText = ''
  pokemonHeight.innerText = ''
  pokemonImg.innerHTML = ''
  statsHP.innerText = ''
  statsAttack.innerText = ''
  statsDefense.innerText = ''
  statsSpecialAttack.innerText = ''
  statsSpecialDefense.innerText = ''
  statsSpeed.innerText = ''
  types.innerHTML = ''
}

searchBtn.addEventListener('click', () => {
  clearAll()
  fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput.value.toLowerCase()}`)
    .then(data => data.status === 404 ? alert('Pokémon not found') : data.json())
    .then(pokemon => {
      pokemonName.innerText = pokemon.name
      pokemonId.innerText = `#${pokemon.id}`
      pokemonWeight.innerText = `Weight: ${pokemon.weight}`
      pokemonHeight.innerText = `Height: ${pokemon.height}`
      pokemonImg.innerHTML = `<img id='sprite' src='${pokemon.sprites.front_default}' alt='pokemon image'>`
      statsHP.innerText = pokemon.stats[0].base_stat
      statsAttack.innerText = pokemon.stats[1].base_stat
      statsDefense.innerText = pokemon.stats[2].base_stat
      statsSpecialAttack.innerText = pokemon.stats[3].base_stat 
      statsSpecialDefense.innerText = pokemon.stats[4].base_stat
      statsSpeed.innerText = pokemon.stats[5].base_stat
      pokemon.types.forEach(type => types.innerHTML += ` <span class='${type.type.name}'>${type.type.name.toUpperCase()}</span>`)

    })
})