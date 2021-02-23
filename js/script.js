// This is the pokemon database of all the pokemon wither their respective attributes. Each 
let pokemonRepo = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=50';
  let cap = function (name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Funtion to add pokemon to the pokedex - contains a datatype check
  function add(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null) {
        pokemonList.push(pokemon);
      } else {
        console.log('you need an object');
      }
  }

  // Function for the retrival of the pokedex data
  function getAll() {
    return pokemonList;
  }

  // Function that will log the pokemon name to console when called
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  function showLoading(){
    let pokemonList = document.querySelector('.pokedex-window');
    let newDiv = document.createElement('div');
    newDiv.innerText = 'Loading List!';
    newDiv.classList.add('msg-board');
    pokemonList.prepend(newDiv); 
  }

  function hideLoading(){
    let pokemonList = document.querySelector('.pokedex-window');
    let node = pokemonList.firstElementChild;
    setTimeout(function () {
      node.parentElement.removeChild(node);
    }, 1000)
  }


  /* Function to display pokemon from database on webpage. Contains a forEach method which creates a button with the name of each element iterated over */
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = cap(pokemon.name);
    button.classList.add('pokemon-list-style');
    listItem.appendChild(button);
    pokemonList.appendChild(listItem); 
    //event listener for on click to run the showDetails function
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  };

  //A function for mimicing a powering down button
  function powerDown() {
    let powerButton = document.querySelector('.header-powerbttn');
    powerButton.addEventListener('click', function(){
      if (window.confirm('Are you sure you want to power down?')) {
        document.body.style.display = "none";     
      }
    })
  }

  function loadList() {
    showLoading();
    return fetch(apiUrl).then(function (response) {
      return response.json();
      }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
      }).then (function (){
        hideLoading();
      }).catch(function (e) {
        hideLoading();
        console.error(e);
      })
  }
  
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).then (function (){
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Allows access to the IIFE
  return {
    addf: add,
    getAllf: getAll,
    addListItemf: addListItem,
    loadListf: loadList,
    powerDownf:powerDown
  };
  })();

pokemonRepo.loadListf().then(function() {
  // Now the data is loaded!
  pokemonRepo.getAllf().forEach(function(pokemon){
    pokemonRepo.addListItemf(pokemon);
  });
});

pokemonRepo.powerDownf();