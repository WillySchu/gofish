$(document).ready(function(){
  var orderedDeck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k', 'a'];
  var deck = [];
  var humHand = [];
  var cpuHand = [];

  function makeDeck(deck, orderedDeck) {
    for (var i = 0; i < 4; i++) {
      deck = deck.concat(orderedDeck);
    }
    return deck;
  }

  function shuffle(udeck) {
    var sdeck = [];
    for (var i = 0; i < 52; i++) {
      sdeck[i] = udeck.splice(Math.floor(udeck.length * Math.random()), 1)[0];
    }
    return sdeck;
  }

  function draw(deck, hand) {
    var card = deck.pop();
    hand.push(card);
  }

  function guess(card, yourHand, oppHand) {
    if (oppHand.indexOf(card) === -1) {
      return false;
    }
    while(oppHand.indexOf(card) > -1) {
      console.log(oppHand);
      yourHand.push(oppHand.splice(oppHand.indexOf(card), 1)[0]);
    }
    return true;
  }

  function paint() {
    $("#cpu").empty();
    $("#hum").empty();

    for (var i = 0; i < cpuHand.length; i++) {
      var card = $("<div></div>").text(cpuHand[i]);
      $("#cpu").append(card);
    }

    for (var i = 0; i < humHand.length; i++) {
      var card = $("<div></div>").text(humHand[i]);
      $("#hum").append(card);
    }
  }

  $("#hum").click(function() {
    console.log($(this));
  })

  deck = makeDeck(deck, orderedDeck);

  deck = shuffle(deck);

  humHand = [1, 3];

  cpuHand = [1, 1, 5];
  paint();
})
