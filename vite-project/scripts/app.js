const searchInput = document.getElementById("searchInput");
const randomBtn = document.getElementById("randomBtn");
const pokemonImage = document.getElementById("pokemonImage");
const pokemonName = document.getElementById("pokemonName");
const pokemonDetails = document.getElementById("pokemonDetails");
const evo1 = document.getElementById("evo1");
const evo2 = document.getElementById("evo2");
const evo3 = document.getElementById("evo3");
const movesList = document.getElementById("movesList");
const abilitiesList = document.getElementById("abilitiesList");
const searchBtn = document.getElementById("searchBtn");
async function fetchPokemon(value) {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
  const data = await res.json();
  console.log(data.name);
  return data;
}

//function to capitalize words and format, replaces hyphens with spaces and makes first letter uppercase
function formatText(text) {
  return text
    .replace(/-/g, " ") // replace hyphens with spaces
    .replace(/\b\w/g, (char) => char.toUpperCase()); // capitalize first letter of each word
}

async function fetchSpecies() {}

searchBtn.addEventListener("click", async () => {
  const value = searchInput.value.trim();

  if (!isNaN(value) && Number(value) > 649) {
    alert("Please enter a Pokémon from Generations 1–5 (1–649).");
    return;
  }
  const data = await fetchPokemon(value);
  console.log(data);
  pokemonName.textContent = (formatText(data.name) +" #"+ data.id);
  pokemonImage.src = data.sprites.front_default;

  movesList.textContent = "";
  abilitiesList.textContent = "";
  pokemonDetails.textContent = "";
  evo1.innerHTML = "";
  evo2.innerHTML = "";
  evo3.innerHTML = "";

  const text2xl = document.createElement("h1");
  const text1xl = document.createElement("h2");

  text1xl.classList.add("text-1xl");
  text2xl.classList.add("text-2xl");

  text2xl.textContent = "Type: " + formatText(data.types[0].type.name);
  const locationText = document.createElement("p");
  locationText.className = "text-lg";

  const response = await fetch(data.location_area_encounters);
  const locationData = await response.json();

  if (locationData.length > 0) {
    locationText.textContent =
      "Location: " + formatText(locationData[0].location_area.name);
  } else {
    locationText.textContent = "Location: Unknown";
  }

  pokemonDetails.appendChild(locationText);
  pokemonDetails.appendChild(text2xl);
  pokemonDetails.appendChild(text1xl);

  console.log(data.results);

  console.log(data.moves);

  data.moves.slice(0, 20).forEach((moveObj) => {
    const li = document.createElement("li");
    li.textContent = formatText(moveObj.move.name);
    movesList.appendChild(li);
  });
  data.abilities.slice(0, 20).forEach((abilityObj) => {
    const li = document.createElement("li");
    li.textContent = formatText(abilityObj.ability.name);
    abilitiesList.appendChild(li);
  });

  const speciesRes = await fetch(data.species.url);
  const speciesData = await speciesRes.json();
  const evoRes = await fetch(speciesData.evolution_chain.url);
  const evoData = await evoRes.json();
  const evoChain = [];
  let current = evoData.chain;
  while (current) {
    evoChain.push(current.species.name);
    current = current.evolves_to[0];
  }

  const evoBoxes = [evo1, evo2, evo3];

  for (let i = 0; i < evoChain.length; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoChain[i]}`);
    const evoPokemon = await res.json();

    const img = document.createElement("img");
    img.src = evoPokemon.sprites.front_default;
    img.classList.add("w-full", "h-full", "object-contain");

    evoBoxes[i].appendChild(img);
  }
});

randomBtn.addEventListener("click", async function () {
  const randomId = Math.floor(Math.random() * 649) + 1;
  const data = await fetchPokemon(randomId);

  pokemonName.textContent = (formatText(data.name) +" #"+ data.id);
  pokemonImage.src = data.sprites.front_default;

  movesList.textContent = "";
  abilitiesList.textContent = "";
  pokemonDetails.textContent = "";
  evo1.innerHTML = "";
  evo2.innerHTML = "";
  evo3.innerHTML = "";

  const text2xl = document.createElement("h1");
  const text1xl = document.createElement("h2");

  text1xl.classList.add("text-1xl");
  text2xl.classList.add("text-2xl");

  text2xl.textContent = "Type: " + formatText(data.types[0].type.name);
  const locationText = document.createElement("p");
  locationText.className = "text-lg";

  const response = await fetch(data.location_area_encounters);
  const locationData = await response.json();

  if (locationData.length > 0) {
    locationText.textContent =
      "Location: " + formatText(locationData[0].location_area.name);
  } else {
    locationText.textContent = "Location: Unknown";
  }

  pokemonDetails.appendChild(locationText);
  pokemonDetails.appendChild(text2xl);
  pokemonDetails.appendChild(text1xl);

  console.log(data.results);

  console.log(data.moves);

  data.moves.slice(0, 20).forEach((moveObj) => {
    const li = document.createElement("li");
    li.textContent = formatText(moveObj.move.name);
    movesList.appendChild(li);
  });
  data.abilities.slice(0, 20).forEach((abilityObj) => {
    const li = document.createElement("li");
    li.textContent = formatText(abilityObj.ability.name);
    abilitiesList.appendChild(li);
  });

  const speciesRes = await fetch(data.species.url);
  const speciesData = await speciesRes.json();
  const evoRes = await fetch(speciesData.evolution_chain.url);
  const evoData = await evoRes.json();
  const evoChain = [];
  let current = evoData.chain;
  while (current) {
    evoChain.push(current.species.name);
    current = current.evolves_to[0];
  }

  const evoBoxes = [evo1, evo2, evo3];

  for (let i = 0; i < evoChain.length; i++) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${evoChain[i]}`);
    const evoPokemon = await res.json();

    const img = document.createElement("img");
    img.src = evoPokemon.sprites.front_default;
    img.classList.add("w-full", "h-full", "object-contain");

    evoBoxes[i].appendChild(img);
  }
});
