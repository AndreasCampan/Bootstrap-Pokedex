// An IIFE containing an api database of pokemon and the ability to display them in the webpage while showing detail using a modal.
let pokemonRepo = (function(){
  let pokemonList = [];
  //Database
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  
  //Capitalizd the name of each pokemon
  function cap (name) {
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

  // Function that will display pokemon details in a modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let page = document.querySelector('.pokedex-window');

      //A function to create the modal and it's content
      function container (){
        let creatediv = document.createElement('div');
        creatediv.classList.add('modal-foreground');

        let createbutton = document.createElement('button');
        createbutton.classList.add('close');
        createbutton.innerHTML = 'X';
        createbutton.addEventListener('click', hide);

        let createimg = document.createElement('img');
        createimg.classList.add('pokemon-img');
        createimg.src = pokemon.imageUrl;
        createimg.alt = "Image of " + pokemon.name

        let createname = document.createElement('h1');
        createname.innerHTML = cap(pokemon.name);

        let createheight = document.createElement('h2');
        createheight.innerHTML = "Height: " + pokemon.height*10 + "cm";

        let createweight = document.createElement('h2');
        createweight.innerHTML = "Weight: " + pokemon.weight + "lbs";

        let createability = document.createElement('h2');
        createability.innerHTML = "Ability: " + pokemon.abilities;
        
        let createtype = document.createElement('h2');
        createtype.innerHTML = "Type: " + pokemon.types;

        //Appends all the created elements to the pokedex window
        creatediv.appendChild(createbutton);
        creatediv.appendChild(createimg);
        creatediv.appendChild(createname);
        creatediv.appendChild(createheight);
        creatediv.appendChild(createweight);
        creatediv.appendChild(createability);
        creatediv.appendChild(createtype);
        page.prepend(creatediv);

        //enables the 
        creatediv.classList.add('visible');
      }

      function hide(){
        let x = page.querySelector('div');
        x.classList.remove('visible');
      }
      
      window.addEventListener('keydown', (event) => {
        let y = page.querySelector('div');
        if (event.key === 'Escape' && y.classList.contains('visible')) {
          hide();
        }
      })
      container();
    });
  }

  //function to show a loading page while retrieving data.
  function showLoading(){
    let pokemonList = document.querySelector('.pokedex-window');
    let newDiv = document.createElement('div');
    newDiv.innerText = 'Loading List!';
    newDiv.classList.add('msg-board');
    pokemonList.prepend(newDiv); 
  }

  //function to hide loading page after retrieving data.
  function hideLoading(){
    let pokemonList = document.querySelector('.pokedex-window');
    let node = pokemonList.firstElementChild;
    //setTimeout is to mimic delay in retrieving data
    setTimeout(function () {
      node.parentElement.removeChild(node);
    }, 400)
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
    //event listener for a click to run the showDetails function
    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  };

  //A function for mimicing a powering down button of the app
  function powerDown() {
    let powerButton = document.querySelector('.header-powerbttn');
    powerButton.addEventListener('click', function(){
      if (window.confirm('Are you sure you want to power down?')) {
        document.body.style.display = "none";     
      }
    })
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
      })
  }
  
  //Load the details from the database
  function loadDetails(item) {
    showLoading();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      //The specific details requested
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
      item.weight = details.weight;
      item.abilities = [];
      details.abilities.forEach(function (itemAbility){
        item.abilities.push(" " + cap(itemAbility.ability.name));
      })
      item.types = [];
      details.types.forEach(function(itemType){
        item.types.push(" " + cap(itemType.type.name));
      })
    }).then (function (){
      hideLoading();
    }).catch(function (e) {
      console.error(e);
    });
  }

  //Allows access to the IIFE from outside the function
  return {
    addf: add,
    getAllf: getAll,
    addListItemf: addListItem,
    loadListf: loadList,
    powerDownf:powerDown
  };
})();

pokemonRepo.loadListf().then(function() {
  pokemonRepo.getAllf().forEach(function(pokemon){
    pokemonRepo.addListItemf(pokemon);
  });
});

//Runs the powerdown function to shut down the page if clicked
pokemonRepo.powerDownf();