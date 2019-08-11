
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

//fetch data from API
function loadList() {
  return fetch(apiUrl).then(function (response) {
    return response.json();
  }).then(function (json) {
    json.forEach(function (cat) {
      var cat = {
        name: cat.name,
        temperament: cat.temperament,
        origin: cat.origin,
        description: cat.description,
        id: cat.id
        };
      //add data from api to repository
      add(cat);
    });
  }).catch(function (e) {
    console.error(e);
  })
}

//get cat image URL using breed ID
function loadImgUrl(cat) {
  var url = `https://api.thecatapi.com/v1/images/search?breed_ids=${cat.id}`;
  return fetch(url).then(function (response) {
    return response.json();
  }).then(function (details) {
    cat.imageUrl = details.url;
  }).catch(function (e) {
    console.error(e);
  });
}



// ~~~~~~~~~~~~~~~~~~~~~
// cat info modal functions
// ~~~~~~~~~~~~~~~~~~~~~

//create cat info modal
function showCatModal (cat) {
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
  infoElement.innerHTML =
    `<b>Origin: </b>${cat.origin} <br> <b>Temperament</b> ${cat.temperament} <br> <b>Description: </b> ${cat.description} <br><img src="${cat.imageUrl}">`;

  catModal.appendChild(closeButtonElement);
  catModal.appendChild(nameElement);
  catModal.appendChild(infoElement);
  $catModalContainer.appendChild(catModal);

  $catModalContainer.classList.add("is-visible");
  }

function hideCatModal () {
  var $catModalContainer = document.querySelector("#modal-container");
  $catModalContainer.classList.remove("is-visible");
}


//show cat info modal
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
  input = document.getElementById("catBreedSearchInput");
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

window.addEventListener("keydown", (e) => {
  var $catModalContainer = document.querySelector("#modal-container");
  if (e.key === 'Escape' && $catModalContainer.classList.contains("is-visible")){
    hideCatModal();
  }
});

document.querySelector('#modal-container').addEventListener("click", (e) => {
  var target = e.target;
  var $catModalContainer = document.querySelector("#modal-container");
  if (target === $catModalContainer) {
    hideCatModal();
  }
});


  //public functions
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    searchFunction: searchFunction,
    loadImgUrl: loadImgUrl,
    showDetails: showDetails,
    showCatModal: showCatModal,
    hideCatModal: hideCatModal,
  };
})();


catRepository.loadList().then(function() {
  // Now the data is loaded!
  catRepository.getAll().forEach(function(cat){
    catRepository.addListItem(cat);
  });
});
