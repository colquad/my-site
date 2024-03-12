var cards = [];

function createCard() {
  var name = document.getElementById('name').value;
  var email = document.getElementById('email').value;
  var address = document.getElementById('address').value;
  var phone = document.getElementById('phone').value;
  var birthdate = document.getElementById('birthdate').value;
  
  var card = new Card(name, email, address, phone, birthdate);
  cards.push(card);
}


function printCard() {
    var outputDiv = document.getElementById('output');
    var htmlString = "";

    for (var i = 0; i < cards.length; i++) {
        htmlString += "<br>";
        htmlString += "Name: " + cards[i].name + "<br>";
        htmlString += "Email: " + cards[i].email + "<br>";
        htmlString += "Address: " + cards[i].address + "<br>";
        htmlString += "Phone: " + cards[i].phone + "<br>";
        htmlString += "Birthdate: " + cards[i].birthdate + "<br><br>";
        htmlString += "<hr>";
    }
     outputDiv.innerHTML = htmlString;
}

function Card(name, email, address, phone, birthdate) { 
  this.name = name;
  this.email = email;
  this.address = address;
  this.phone = phone;
  this.birthdate = birthdate;
}