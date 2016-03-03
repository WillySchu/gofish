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
  var again = false;
  while(oppHand.indexOf(card) > -1) {
    again = true;
    console.log(oppHand);
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
  paint();
  if(again){
    console.log("again");
    cpuGo();
  }
}

function check(deck){
  for (var i = 0; i < deck.length; i++) {
    deck[i] //inprogress
  }
}

function start() {
  deck = makeDeck(deck, orderedDeck);
  deck = shuffle(deck);

  for (var i = 0; i < 7; i++) {
    draw(deck, humHand);
    draw(deck, cpuHand);
  }
  paint()
}

$("#hum").click(function(event) {
  var again = false;
  tarCard = parseInt($(event.target).text(), 10);
  guess(tarCard, humHand, cpuHand);
  paint();
  if(!again){
    cpuGo();
  }
})
