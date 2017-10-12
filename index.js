
var refreshCards = function() {
  $('.cards-container').empty();
  $('.input-wrapper').addClass('loading');
  
  var searchString = $('input[name="pokemon-name"]').val();
  $.get('https://api.pokemontcg.io/v1/cards?name=' + encodeURI(searchString), function(result) {
    $('.input-wrapper').removeClass('loading');
    
    for(var i = 0; i < result['cards'].length; i++) {
      var card = result['cards'][i];
      var cardElement = $(
        '<a class="card flipped">' +
          '<div class="side front" style="background-image:url(\'' + card['imageUrl'] + '\')"></div>' +
          '<div class="side back"></div>' +
        '</a>')
      $('.cards-container').append(cardElement);
      
      setTimeout((function(){
        $(this).removeClass('flipped');
      }).bind(cardElement), 100 * i);
    }
  });
}

var refreshTimeout;
$('input[name="pokemon-name"]').keydown(function(){
  clearTimeout(refreshTimeout);
  refreshTimeout = setTimeout(refreshCards, 500);
});