// An IIFE containing an api database of pokemon and the ability to display them in the webpage while showing detail using a modal.
let pokemonRepo = (function(){
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  let searchInput = document.getElementById('search');
  
  //Capitalizd the name of each pokemon
  function cap (name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Funtion to add pokemon to the#pokedex - contains a datatype check
  function add(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null) {
        pokemonList.push(pokemon);
      } else {
        console.log('you need an object');
      }
  }

  // Function for the retrival of the#pokedex data
  function getAll() {
    return pokemonList;
  }

  //function to show a loading page while retrieving data.
  function showLoading(){
    let pokemonList = document.querySelector('.pokemon-list');
    let newDiv = document.createElement('div');
    newDiv.innerText = 'Loading List!';
    newDiv.classList.add('msg-board');
    pokemonList.prepend(newDiv); 
  }

  //function to hide loading page after retrieving data.
  function hideLoading(){
    let pokemonList = document.querySelector('.pokemon-list');
    let node = pokemonList.firstElementChild;
    //setTimeout is to mimic delay in retrieving data
    setTimeout(function () {
      node.parentElement.removeChild(node);
    }, 100);
  }

  function addListItem(pokemon) {
    loadDetails(pokemon).then(function () {
      let pokemonList = document.querySelector('.pokemon-list');
      let card = document.createElement('li');
      let cardbody = document.createElement('div');
      let button = document.createElement('button');
      let name = document.createElement('h5');
      let img = document.createElement('img');

      card.classList.add('card', 'customcard', 'text-center');
      cardbody.classList.add('card-body');
      name.classList.add('card-title');
      button.classList.add('btn', 'btn-primary');
      button.setAttribute("data-toggle","modal");
      button.setAttribute("data-target","#exampleModalCenter");
      img.classList.add('display-img');
      img.src = pokemon.imageURLfront;

      name.innerText = cap(pokemon.name);
      button.innerText = "See Details";

      cardbody.appendChild(name);
      cardbody.appendChild(button);
      card.appendChild(img);
      card.appendChild(cardbody);
    
      pokemonList.appendChild(card); 
      //event listener for a click to run the showDetails function
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    });
  }
  // Function that will display pokemon details in a modal
  function showDetails(pokemon) {
    let modalContainer = $("#container2");
      //A function to create the modal and it's content
      function container (){
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        // Clear all existing modal content
        modalTitle.empty();
        modalBody.empty();

        let imageFront = $('<img class="modal-img" style="width:120px">');
        imageFront.attr("src", pokemon.imageURLspecial);
        let nameElement = $("<h1>" + cap(pokemon.name) +  "</h1>");
        let heightElement = $("<p>" + "<strong>" + "Height: " + "</strong>" + pokemon.height + "</p>");
        let weightElement = $("<p>" + "<strong>" + "Weight: " + "</strong>" + pokemon.weight + "</p>");
        let typesElement = $("<p>" + "<strong>" + "Types: " + "</strong>" + pokemon.types + "</p>");
        let abilitiesElement = $("<p>" + "<strong>" + "Abilities: " + "</strong>" + pokemon.abilities + "</p>");

        modalTitle.append(nameElement);
        modalBody.append(imageFront);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);
        modalContainer.addClass("is-visible");
      }
      container();
  }

  //A functon to load each pokemon name and url
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
      });
  }
  
  //Load the details from the database
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //The specific details requested
      item.imageURLfront = details.sprites.versions["generation-v"]["black-white"].front_default;
      item.imageURLspecial = details.sprites.versions["generation-v"]["black-white"].animated.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.abilities = [];
      details.abilities.forEach(function (itemAbility){
      item.abilities.push(" " + cap(itemAbility.ability.name));
      });
      item.types = [];
      details.types.forEach(function(itemType){
        item.types.push(" " + cap(itemType.type.name));
      });
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Runs the search function when an search input is detected
  searchInput.addEventListener('keyup', (e) => {
    search();
  });

  //Search function
  function search(){
    let searchvalue = searchInput.value;
    let li = document.querySelectorAll('.card');
    let filSearchValue = searchvalue.toLowerCase();; 

    for (i = 0; i < li.length; i++){
      pokemonName = li[i].querySelector('.card-title').innerText.toLowerCase();
      if (pokemonName.indexOf(filSearchValue) > -1) {
        li[i].style.display = "";
      }else{
        li[i].style.display = "none";
      }
    }
  }

  //Allows access to the IIFE from outside the function
  return {
    addf: add,
    getAllf: getAll,
    addListItemf: addListItem,
    loadListf: loadList,
    showDetailsf: showDetails
  };
})();

pokemonRepo.loadListf().then(function() {
  pokemonRepo.getAllf().forEach(function(pokemon){
    pokemonRepo.addListItemf(pokemon);
  });
}).catch(function (e) {
  console.error(e);
});

