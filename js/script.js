// This is the pokemon database of all the pokemon wither their respective attributes. Each 
let pokemonRepo = (function(){
  let pokedex = [
    {name: 'Bulbasur', height: 70, weight: 15.2, type: ['Grass',' Poison']},
    {name: 'Charmander', height: 60, weight: 18.7, type: ['Fire']},
    {name: 'Squirtle', height: 50, weight: 19.8, type: ['Water']},
    {name: 'Alakazam', height: 150, weight: 105.8, type: ['Psychic']},
    {name: 'Gengar', height: 150, weight: 89.3, type: ['Ghost',' Posion']},
    {name: 'Hitmonchan', height: 140, weight: 110.7, type: ['Fighting']},
    {name: 'Gyarados', height: 650, weight: 518.1, type: ['Water',' Flying']},
    {name: 'Snorlax', height: 210, weight: 1014.1, type: ['Normal']},
    {name: 'Dragonite', height: 220, weight: 463, type: ['Dragon', ' Flying']}
  ];
  // Adds pokemon to the pokedex - contains a datatype check
  function add(pokemon) {
    if (typeof pokemon === 'object' && typeof pokemon !== null) {
        pokedex.push(pokemon);
      } else {
        console.log('you need an object');
      }
    }
    // Function to allow the retrival of the pokedex data
    function getAll() {
      return pokedex;
    }

    return {
      addf: add,
      getAllf: getAll
    };
  })();

pokemonRepo.addf({name: 'Mew', height: 41, weight: 8.8, type: 'Psychic'});
  
//Using the .forEach method, this is iterating over the elements in the pokedex array and deciding based on weight parameters how to write them out

pokemonRepo.getAllf().forEach(function(pokemon) {
  if (pokemon.weight > 500 && pokemon.weight < 1000) {
    document.write(`${(pokemon.name)} - Height: ${pokemon.height}cm - Weight: ${pokemon.weight} lbs - Now that is heavy! <br/> <br/>`);
  } else if (pokemon.weight > 1000) {
    document.write(`${(pokemon.name)} - Height: ${pokemon.height}cm - Weight: ${pokemon.weight} lbs - Whoa IT'S HUGE!!! <br/> <br/>`);
  } else {
    document.write(`${(pokemon.name)} - Height: ${pokemon.height}cm - Weight: ${pokemon.weight} lbs <br/> <br/>`); 
  }
});


/*
The old for loop to iterate over every element in the array and then write it on the website. There's also an if logic that will look at the weight of the pokemon and add extra text depending on the parameters.

for (let i=0; i < pokedex.length; i++){
  if (pokedex[i].weight > 500 && pokedex[i].weight < 1000) {
    document.write(`${(pokedex[i].name)} - Height: ${pokedex[i].height}cm Weight: ${pokedex[i].weight} lbs - Now that is heavy! <br/> <br/>`);
  } else if (pokedex[i].weight > 1000) {
    document.write(`${(pokedex[i].name)} - Height: ${pokedex[i].height}cm Weight: ${pokedex[i].weight} lbs - Whoa IT'S HUGE!!! <br/> <br/>`);
  } else {
    document.write(`${(pokedex[i].name)} - Height: ${pokedex[i].height}cm Weight: ${pokedex[i].weight} lbs <br/> <br/>`); 
  }
};
*/