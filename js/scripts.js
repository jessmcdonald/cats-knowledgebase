
var catRepository = (function () {
  const catBreedSearchInput = document.querySelector('.search-bar__input');
  var cats = [];
  var apiUrl = 'https://api.thecatapi.com/v1/breeds';

  // ~~~~~~~~~~~~~~~~~~~~~
  // repository functions
  // ~~~~~~~~~~~~~~~~~~~~~

  function add(cat) {
      cats.push(cat);
    }

  function getAll() {
      return cats;
    }

  function addListItem(cat) {

    //select already existing element
    var $newList = document.querySelector(".cat-list");

    //create li
    var $listItem = document.createElement("li");

    //create a button
    var $button = document.createElement("button");

    //append list to $newList
    $newList.appendChild($listItem);

    //add text to button
    $button.innerText = cat.name;

    //append button to list
    $listItem.appendChild($button);

    //add class to button
    $button.classList.add("name-button");

    //add event listener to list
    $button.addEventListener('click', function(event) {showDetails(cat);
    });
  }

/*
  function getPokemonHeight(pokemonHeight){
    return (pokemonHeight > 20) ? (pokemonHeight / 10) + 'm (woah that\'s big!)<br>'
         : (pokemonHeight < 10) ? (pokemonHeight / 10) + 'm (small one!)<br>'
         :  (pokemonHeight / 10) + 'm<br>';
    }
  function getPokemonTypes(pokemonTypes){
    let result = ''
      if(pokemonTypes.includes('bug')){
        result += '<img src="img/types/Bug.png">'
      }
      if(pokemonTypes.includes('dark')){
        result += '<img src="img/types/Dark.png">'
      }
      if(pokemonTypes.includes('dragon')){
        result += '<img src="img/types/Dragon.png">'
      }
      if(pokemonTypes.includes('electric')){
        result += '<img src="img/types/Electric.png">'
      }
      if(pokemonTypes.includes('fairy')){
        result += '<img src="img/types/Fairy.png">'
      }
      if(pokemonTypes.includes('fighting')){
        result += '<img src="img/types/Fighting.png">'
      }
      if(pokemonTypes.includes('fire')){
        result += '<img src="img/types/Fire.png">'
      }
      if(pokemonTypes.includes('ghost')){
        result += '<img src="img/types/Ghost.png">'
      }
      if(pokemonTypes.includes('grass')){
        result += '<img src="img/types/Grass.png">'
      }
      if(pokemonTypes.includes('ground')){
        result += '<img src="img/types/Ground.png">'
      }
      if(pokemonTypes.includes('ice')){
        result += '<img src="img/types/Ice.png">'
      }
      if(pokemonTypes.includes('normal')){
        result += '<img src="img/types/Normal.png">'
      }
      if(pokemonTypes.includes('poison')){
        result += '<img src="img/types/Poison.png">'
      }
      if(pokemonTypes.includes('psychic')){
        result += '<img src="img/types/Psychic.png">'
      }
      if(pokemonTypes.includes('rock')){
        result += '<img src="img/types/Rock.png">'
      }
      if(pokemonTypes.includes('steel')){
        result += '<img src="img/types/Steel.png">'
      }
      if(pokemonTypes.includes('water')){
        result += '<img src="img/types/Water.png">'
      }
        return result
  }
*/

//fetch data from API
function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.results.forEach(function (cat) {
      var cat = {
        name: cat.name,
        temperament: cat.temperament,
        origin: cat.origin,
        description: cat.description,
        };
      //add data from api to repository
      add(cat);
    });
  }).catch(function (e) {
    console.error(e);
  })
}
/*
//get pokemon details using Url from pokemon object in parameter
function loadDetails(cat) {
  var url = cat.detailsUrl;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    // now add the details to the item
    //pokemon.imageUrl = details.sprites.front_default;
    cat.height = details.height;
    pokemon.types = [];
          details.types.forEach(function(type) {
            pokemon.types.push(type.type.name);
          });
  }).catch(function (e) {
    console.error(e);
  });
}

// ~~~~~~~~~~~~~~~~~~~~~
// pokemon info modal functions
// ~~~~~~~~~~~~~~~~~~~~~

//create pokemon info modal
function showCatModal (pokemon) {
  var $catModalContainer = document.querySelector("#modal-container");
  //clear existing content
  $catModalContainer.innerHTML = "";
  // create modal div and assign class
  var catModal = document.createElement("div");
  catModal.classList.add("catmodal")

  var closeButtonElement = document.createElement("button");
  closeButtonElement.classList.add("catmodal-close");
  closeButtonElement.innerText = "Close";
  closeButtonElement.addEventListener("click", hideCatModal);

  var nameElement = document.createElement("h1");
  nameElement.innerText = cat.name;

  var infoElement = document.createElement("p");
  infoElement.innerHTML = `<b>Height:</b> ${catRepository.getPokemonHeight(pokemon.height)}
  <br><b>Types:</b> ${pokemonRepository.getPokemonTypes(pokemon.types)}
  <br><img src="${pokemon.imageUrl}">`;

  pokemonModal.appendChild(closeButtonElement);
  pokemonModal.appendChild(nameElement);
  pokemonModal.appendChild(infoElement);
  $pokemonModalContainer.appendChild(pokemonModal);

  $pokemonModalContainer.classList.add("is-visible");
  }

function hidePokemonModal () {
  var $pokemonModalContainer = document.querySelector("#modal-container");
  $pokemonModalContainer.classList.remove("is-visible");
}
*/

//show pokemon info modal
function showDetails(cat) {
catRepository
  .loadList(cat)
  .then(function () {
    showCatModal(cat);
});
}



//search bar function
function searchFunction() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("catSearchInput");
  filter = input.value.toUpperCase();
  ul = document.querySelector(".cat-list");
  li = ul.getElementsByTagName("li");


  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("button")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

/*

window.addEventListener("keydown", (e) => {
  var $pokemonModalContainer = document.querySelector("#modal-container");
  if (e.key === 'Escape' && $pokemonModalContainer.classList.contains("is-visible")){
    hidePokemonModal();
  }
});

document.querySelector('#modal-container').addEventListener("click", (e) => {
  var target = e.target;
  var $pokemonModalContainer = document.querySelector("#modal-container");
  if (target === $pokemonModalContainer) {
    hidePokemonModal();
  }
});

*/

  //public functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    /*
    loadDetails: loadDetails,
    showDetails: showDetails,
    showPokemonModal: showPokemonModal,
    hidePokemonModal: hidePokemonModal,
    searchFunction: searchFunction,
    getPokemonTypes: getPokemonTypes,
    getPokemonHeight: getPokemonHeight,
    */
  };
})();


catRepository.loadList().then(function() {
  // Now the data is loaded!
  catRepository.getAll().forEach(function(ca){
    catRepository.addListItem(cat);
  });
});
