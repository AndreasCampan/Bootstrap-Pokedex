// This is the pokemon database of all the pokemon wither their respective attributes. Each 
let pokedex = [
  {name: 'Bulbasur', height: 70, weight: 15.2, type: ['grass',' poison']},
  {name: 'Charmander', height: 60, weight: 18.7, type: ['fire']},
  {name: 'Squirtle', height: 50, weight: 19.8, type: ['water']},
  {name: 'Alakazam', height: 150, weight: 105.8, type: ['psychic']},
  {name: 'Gengar', height: 150, weight: 89.3, type: ['ghost',' posion']},
  {name: 'Hitmonchan', height: 140, weight: 110.7, type: ['fighting']},
  {name: 'Gyarados', height: 650, weight: 518.1, type: ['water',' flying']},
  {name: 'Snorlax', height: 210, weight: 1014.1, type: ['normal']},
  {name: 'Dragonite', height: 220, weight: 463, type: ['dragon', ' flying']}
];

/* A for loop to iterate over every element in the array and then write it on the website. There's also an if logic that will look at the weight of the pokemon and add extra text depending on the parameters.
*/
for (let i=0; i < pokedex.length; i++){
  if (pokedex[i].weight > 500 && pokedex[i].weight < 1000) {
    document.write(`${(pokedex[i].name)} - Height: ${pokedex[i].height}cm Weight: ${pokedex[i].weight} lbs - Now that is heavy! <br/> <br/>`);
  } else if (pokedex[i].weight > 1000) {
    document.write(`${(pokedex[i].name)} - Height: ${pokedex[i].height}cm Weight: ${pokedex[i].weight} lbs - Whoa IT'S HUGE!!! <br/> <br/>`);
  } else {
    document.write(`${(pokedex[i].name)} - Height: ${pokedex[i].height}cm Weight: ${pokedex[i].weight} lbs <br/> <br/>`); 
  }
};
