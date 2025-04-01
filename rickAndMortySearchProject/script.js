$(function() {

  clearAll()
  $('#search').on('click', () => {
    
    const characterID = $('#input-character').val()
    clearAll()
    if (characterID != ''){
      fetch(`https://rickandmortyapi.com/api/character/${characterID}`)
      .then(data => data.json()).then(personagem => {
        characterDataUpdate(personagem);
        AllEpisodesByCharacter(personagem);
      })  
    } else {
      alert('ID para Personagem Inválido')
      clearAll()
    }
  })
})

function calculateGrid(ep) {
  if(ep.length == 1) {
    const rowOnScreen = $('<div>').addClass('row')
    rowOnScreen.append($('<div>').addClass('col h-75 py-1 m-1').text(`${ep[0]}`))
    $('#ep-grid').append(rowOnScreen)
  }
  else if (ep.length <= 9) {
    const row = ep
    insertEPOnGrid(row)
  } 
  else if(9 < ep.length > 18 && ep.length % 2 == 0) {
    const row1 = ep.slice(ep.length / 2)
    const row2 = ep.slice(ep.length / 2)
    insertEPOnGrid(row1, row2)
  } 
  else if(9 < ep.length > 18 && ep.length % 2 != 0) {
    const row1 = ep.slice(0, ep.length / 2 + 0.5) 
    const row2 = ep.slice(ep.length / 2 - 0.5)
    insertEPOnGrid(row1, row2)
  }
  else {
    ep = ep.slice(0, 18)
    const row1 = ep.slice(0, ep.length / 2) 
    const row2 = ep.slice(ep.length / 2)
    insertEPOnGrid(row1, row2)
  }
}

function AllEpisodesByCharacter(personagem) {
  const episodios = personagem.episode
  const epMax18 = []
  episodios.forEach((ep) => {
    epMax18.push(ep.substring(40))
  })
  return calculateGrid(epMax18)
}

function insertEPOnGrid(row1, row2 = []) {
  const rowOnScreen = $('<div>').addClass('row')
  for(let i = 0; i < row1.length; i++) {
    rowOnScreen.append($('<div>').addClass('col h-75 py-2 m-1').text(`${row1[i]}`))
  }
  $('#ep-grid').append(rowOnScreen)
  if (row1.length == 9) { 
    const rowOnScreen2 = $('<div>').addClass('row')
    for(let i = 0; i < row2.length; i++) {
      rowOnScreen2.append($('<div>').addClass('col h-75 py-2 m-1').text(`${row2[i]}`))
    }
    $('#ep-grid').append(rowOnScreen2)
  }
}

function characterDataUpdate(personagem) {
        takeImage(personagem)
        takeOrigin(personagem)
        takeName(personagem)
        takeID(personagem)
        takeSpecie(personagem)
        takeStatus(personagem)
        displayEpTitle()
      }

function clearAll() {
  $('#ep-title').css('display', 'none')
  $('#name').css('display', 'none')
  $('#character-id').css('display', 'none')
  $('#status').css('display', 'none')
  $('#specie').css('display', 'none')
  $('#origin').css('display', 'none')
  $('#personagem-img').attr('src', '').css('display', 'none')
  $('#ep-grid').empty()
}

function max18(ep) {
  const ep18 = []
  for(let i = 0; i < 19; i++) {
    ep18.push(ep[i])
  }
  ep18.push('etc...')
  console.log(ep18)
  return ep18
}

function takeImage(personagem) {
  const imagePath = personagem.image 
  $('#personagem-img').attr('src', imagePath).css('display', 'block')
}

function takeOrigin(personagem) {
  const origin = personagem.origin.name
  $('#origin').text(`${origin}`).css('display', 'block')
}

function takeName(personagem) {
  const name = personagem.name
  $('#name').text(`${name}`).css('display', 'block')
}

function takeID(personagem) {
  const id = personagem.id
  $('#character-id').text(`#${id}`).css('display', 'block')
}

function takeSpecie(personagem) {
  const specie = personagem.species
  $('#specie').text(`${specie}`).css('display', 'block')
}

function takeStatus(personagem) {
  const status = personagem.status
  $('#status').text(`${status}`).css('display', 'block')
}

function displayEpTitle() {
  $('#ep-title').css('display', 'block')
}