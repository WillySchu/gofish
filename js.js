var orderedDeck = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'j', 'q', 'k', 'a'];
var deck = [];
var humHand = [];
var cpuHand = [];
var x = [];

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
  paint();
}

function guess(card, yourHand, oppHand) {
  var again = false;
  while(oppHand.indexOf(card) > - 1) {
    again = true;
    yourHand.push(oppHand.splice(oppHand.indexOf(card), 1)[0]);
  }
  return again;
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

function cpuGo() {
  var i = Math.floor(cpuHand.length * Math.random());
  var tarCard = cpuHand.slice(i, i + 1)[0];
  var again = false;
  console.log(tarCard);
  again = guess(tarCard, cpuHand, humHand);
  check(cpuHand);
  paint();
  if(again){
    console.log("again");
    cpuGo();
  }
  else {
    draw(deck, cpuHand);
  }
}

function check(hand){
  var count = {};
  for (var i = 0; i < hand.length; i++) {
    if (!count.hasOwnProperty(hand[i])) {
      count[hand[i]] = 0;
    }
    count[hand[i]] += 1;
  }
  for (k in count) {
    if (count[k] === 4){
      if(!isNaN(k)){
        k = parseInt(k);
      }
      while (hand.indexOf(k) > -1) {
        x.push(hand.splice(hand.indexOf(k), 1)[0]);
      }
      $("#books").append($("<div>" + k + "</div>"));
    }
  }
}

function start() {
  deck = makeDeck(deck, orderedDeck);
  deck = shuffle(deck);

  humHand = [];
  cpuHand = [];

  for (var i = 0; i < 7; i++) {
    draw(deck, humHand);
    draw(deck, cpuHand);
  }
  paint()
}

$("#hum").click(function(event) {
  var again = false;
  var tarCard = $(event.target).text();
  if(!isNaN(tarCard)){
    tarCard = parseInt(tarCard);
  }
  again = guess(tarCard, humHand, cpuHand);
  check(humHand);
  paint();
  if(!again){
    draw(deck, humHand);
    cpuGo();
  }
})
