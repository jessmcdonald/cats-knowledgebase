
var catRepository = (function () {
  const catBreedSearchInput = document.querySelector('.search-bar__input');
  var cats = [];
  var apiUrl = 'https://api.thecatapi.com/v1/breeds';

  //fetch data from API
  function loadList() {
    return $.ajax({
      dataType: 'json',
      url: apiUrl,
      headers: {
        "x-api-key" : "00f17009-223f-4ff6-ae8f-d9fb84f6ca88"
      },
      success:  function(data) {
        $.each(data, function(i, cat) {

          var catList = {}
            //loadImgUrl(cat.id).then(function(cats) {
              catList = {
                name: cat.name,
                temperament: cat.temperament,
                origin: cat.origin,
                description: cat.description,
                id: cat.id,
                //image: cats
          };

        //add data from api to repository
        add(catList);
      //}).catch(er => console.log(er))
    });
  },
    error: function (e) {
      console.error(e);
    }
  });
  }


  //get cat image URL using breed ID
  function loadImgUrl(cat) {
      var url = (`https://api.thecatapi.com/v1/images/search?breed_ids=${cat}`);
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // console.log(details)
        return details[0].url //i return only the url, [0] because there is only one in the array
          //cat.imageUrl = details.url;
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

    //create li, append listItem to newList
    var $listItem = $('<li></li>');
      $($newList).append($listItem);

    //create button with class name-button, add cat.name to button text, append button to li
    var $button = $('<button type="button" class="btn btn-primary"></button>');
      $button.text(cat.name);
      $($listItem).append($button);

    //add event listener to listItem
    $button.on('click', function(event) {showDetails(cat);
    });
  }


// ~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~

function showDetails(cat) {
catRepository
  .loadList(cat)
  .then(function () {
    showCatModal(cat);
});
}

}

// ~~~~~~~~~~~~~~~~~~~~~
// search function
// ~~~~~~~~~~~~~~~~~~~~~

$(document).ready(function(){
  $("#catBreedSearchInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#listDiv *").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});


// ~~~~~~~~~~~~~~~~~~~~~
// public functions
// ~~~~~~~~~~~~~~~~~~~~~

  return {
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
  };

})();


catRepository.loadList().then(function() {
  // Now the data is loaded!
  catRepository.getAll().forEach(function(cat){
    catRepository.addListItem(cat);
  });
});
