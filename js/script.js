// An IIFE containing the pokedex API and functions
const pokemonRepo = (function () {
  const pokemonNameList = [];
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  const searchInput = document.getElementById('search');
  const pokemonList = document.querySelector('.pokemon-list');

  // Capitalizd the name of each pokemon
  function cap(name) {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  // Funtion to add pokemon to the#pokedex - contains a datatype check
  function add(pokemon) {
    if (typeof pokemon === 'object') {
      pokemonNameList.push(pokemon);
    }
  }

  // Function for the retrival of the#pokedex data
  function getAll() {
    return pokemonNameList;
  }

  // function to show a loading page while retrieving data.
  function showLoading() {
    const newDiv = document.createElement('div');
    newDiv.innerText = 'Loading List!';
    newDiv.classList.add('msg-board');
    pokemonList.prepend(newDiv);
  }

  // function to hide loading page after retrieving data.
  function hideLoading() {
    const node = pokemonList.firstElementChild;
    // setTimeout is to mimic delay in retrieving data
    setTimeout(() => {
      node.parentElement.removeChild(node);
    }, 100);
  }

  // Load the details from the database
  function loadDetails(item) {
    const url = item.detailsUrl;
    return fetch(url)
      .then((response) => response.json())
      .then((details) => {
        // The specific details requested
        item.imageURLfront = details.sprites.versions['generation-v']['black-white'].front_default;
        item.imageURLspecial = details.sprites.versions['generation-v']['black-white'].animated.front_default;
        item.height = details.height;
        item.types = details.types;
        item.weight = details.weight;
        item.abilities = [];
        details.abilities.forEach((itemAbility) => {
          item.abilities.push(` ${cap(itemAbility.ability.name)}`);
        });
        item.types = [];
        details.types.forEach((itemType) => {
          item.types.push(` ${cap(itemType.type.name)}`);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // Function that will display pokemon details in a modal
  function showDetails(pokemon) {
    const modalContainer = $('#container2');
    // A function to create the modal and it's content
    function container() {
      const modalBody = $('.modal-body');
      const modalTitle = $('.modal-title');
      // Clear all existing modal content
      modalTitle.empty();
      modalBody.empty();

      const imageFront = $('<img class="modal-img" style="width:120px">');
      imageFront.attr('src', pokemon.imageURLspecial);
      const nameElement = $(`<h1>${cap(pokemon.name)}</h1>`);
      const heightElement = $(
        `${'<p><strong>Height: </strong>'}${pokemon.height}</p>`,
      );
      const weightElement = $(
        `${'<p><strong>Weight: </strong>'}${pokemon.weight}</p>`,
      );
      const typesElement = $(
        `${'<p><strong>Types: </strong>'}${pokemon.types}</p>`,
      );
      const abilitiesElement = $(
        `${'<p><strong>Abilities: </strong>'}${pokemon.abilities}</p>`,
      );

      modalTitle.append(nameElement);
      modalBody.append(imageFront);
      modalBody.append(heightElement);
      modalBody.append(weightElement);
      modalBody.append(typesElement);
      modalBody.append(abilitiesElement);
      modalContainer.addClass('is-visible');
    }
    container();
  }

  function addListItem(pokemon) {
    loadDetails(pokemon)
      .then(() => {
        const card = document.createElement('li');
        const cardbody = document.createElement('div');
        const button = document.createElement('button');
        const name = document.createElement('h1');
        const img = document.createElement('img');

        card.classList.add('card', 'customcard', 'text-center');
        cardbody.classList.add('card-body');
        name.classList.add('card-title');
        button.classList.add('btn', 'btn-danger');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#exampleModalCenter');
        img.classList.add('display-img');
        img.src = pokemon.imageURLfront;
        img.alt = 'An image of the Pokemon represented on this card';

        name.innerText = cap(pokemon.name);
        button.innerText = 'See Details';

        cardbody.appendChild(name);
        cardbody.appendChild(button);
        card.appendChild(img);
        card.appendChild(cardbody);

        pokemonList.appendChild(card);
        // event listener for a click to run the showDetails function
        button.addEventListener('click', () => {
          showDetails(pokemon);
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }

  // A functon to load each pokemon name and url
  function loadList() {
    showLoading();
    return fetch(apiUrl)
      .then((response) => response.json())
      .then((json) => {
        json.results.forEach((item) => {
          const pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .then(() => {
        hideLoading();
      })
      .catch((e) => {
        hideLoading();
        console.error(e);
      });
  }

  // Search function
  function search() {
    const searchvalue = searchInput.value;
    const li = document.querySelectorAll('.card');
    const filSearchValue = searchvalue.toLowerCase();
    for (let i = 0; i < li.length; i++) {
      const pokemonName = li[i].querySelector('.card-title').innerText.toLowerCase();
      if (pokemonName.indexOf(filSearchValue) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  }

  // Runs the search function when an search input is detected
  searchInput.addEventListener('keyup', () => {
    search();
  });

  // Allows access to the IIFE from outside the function
  return {
    addf: add,
    getAllf: getAll,
    addListItemf: addListItem,
    loadListf: loadList,
    showDetailsf: showDetails,
  };
}());

pokemonRepo.loadListf()
  .then(() => {
    pokemonRepo.getAllf().forEach((pokemon) => {
      pokemonRepo.addListItemf(pokemon);
    });
  })
  .catch((e) => {
    console.error(e);
  });