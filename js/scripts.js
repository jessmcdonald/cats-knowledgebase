
var catRepository = (function () {
  const catBreedSearchInput = document.querySelector('.search-bar__input');
  var cats = [];
  var apiUrl = 'https://api.thecatapi.com/v1/breeds';

  //fetch data from API
  function loadList() {
    $.ajax({
      dataType: 'json',
      url: apiUrl,
      success:  function(data) {
        $.each(data.results, function(i, cat) {
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
    },
    error: function (e) {
      console.error(e);
    }
  });
  }



  //get cat image URL using breed ID
  function loadImgUrl(cat) {
    var url = (`https://api.thecatapi.com/v1/images/search?breed_ids=${cat.id}`);
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      cat.imageUrl = details.url;
    }).catch(function (e) {
      console.error(e);
    });
  }




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
    var $newList = $(".cat-list");

    //create li, add button with class name-button, add cat.name to button text, append listItem to newList
    var $listItem = $('<button class="name-button"></button>');
      $listItem.text(cat.name);
      $($newList).append($listItem);

    //add event listener to listItem
    $listItem.on('click', function(event) {showDetails(cat);
    });
  }


// ~~~~~~~~~~~~~~~~~~~~~
// cat info modal functions
// ~~~~~~~~~~~~~~~~~~~~~

//create cat info modal
function showCatModal (cat) {
  var $catModalContainer = $("#modal-container");
  $catModalContainer.addClass("is-visible");

  //clear existing content
  $($catModalContainer).empty();

  // create modal div, assign class catmodal, append to catModalContainer
  var $catModal = $('<div class="catmodal">');
    $($catModalContainer).append($catModal);

  // create closeModal button, assign class catmodal-close, append to catModal
  var $closeButtonElement = $('<button class="catmodal-close">Close</button>');
    $($catModal).append($closeButtonElement);
    $closeButtonElement.on('click', function(event) {hideCatModal()
    });

  //create title element on modal, append to catModal
  var $nameElement = $('<h1></h1>');
  $nameElement.text(cat.name);
  $($catModal).append($nameElement);

  // create content element on modal, append to catModal
  var $infoElement = $('<p></p>');
  $infoElement.append(`<b>Origin: </b> ${cat.origin} <br> <b>Temperament</b> ${cat.temperament} <br> <b>Description: </b> ${cat.description} <br><img src=" ${cat.imageUrl} ">`);
  $($catModal).append($infoElement);
  }


function hideCatModal () {
  var $catModalContainer = $("#modal-container");
  $catModalContainer.removeClass("is-visible");
}


//show cat info modal
function showDetails(cat) {
catRepository
  .loadList(cat)
  .then(function () {
    showCatModal(cat);
});
}

// ~~~~~~~~~~~~~~~~~~~~~
// cat info modal functions
// ~~~~~~~~~~~~~~~~~~~~~

//search
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

$('window').on("keydown", (e) => {
  var $catModalContainer = $("#modal-container");
  if (e.key === 'Escape' && $catModalContainer.classList.contains("is-visible")){
    hideCatModal();
  }
});

$('#modal-container').on("click", (e) => {
  var target = e.target;
  var $catModalContainer = $("#modal-container");
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
