// Focus div based on nav button click
document.getElementById('homenav').onclick = function() {
    document.getElementById('homenav').className = 'active'
    document.getElementById('singlenav').className = 'hidden'
    document.getElementById('multinav').className = 'hidden'
    document.getElementById('guessnav').className = 'hidden'
}
document.getElementById('homenav').onclick = function() {
    document.getElementById('home').className = 'hidden'
    document.getElementById('one').className = 'active'
    document.getElementById('many').className = 'hidden'
    document.getElementById('guess').className = 'hidden'
}
document.getElementById('homenav').onclick = function() {
    document.getElementById('home').className = 'hidden'
    document.getElementById('one').className = 'hidden'
    document.getElementById('many').className = 'active'
    document.getElementById('guess').className = 'hidden'
}
document.getElementById('homenav').onclick = function() {
    document.getElementById('home').className = 'hidden'
    document.getElementById('one').className = 'hidden'
    document.getElementById('many').className = 'hidden'
    document.getElementById('guess').className = 'active'
}

// Flip one coin and show coin image to match result when button clicked
function flipCoin() {
    fetch('http://localhost:5000/app/flip/')
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            document.getElementById("outcome").innerHTML = result.flip;
            document.getElementById("image").setAttribute("src", "assets/img/" + result.flip + ".png");
        })
}

// Flip multiple coins and show coin images in table as well as summary results
// Enter number and press button to activate coin flip series
function flipCoins() {
    numberCoins = document.getElementById("number").value;
    fetch('http://localhost:5000/app/flips/coins', {
        body: JSON.stringify({
            "number": number
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "post"
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            console.log(result);
            document.getElementById("totalHeads").innerHTML = result.summary.heads;
            document.getElementById("totalTails").innerHTML = result.summary.tails;

            var tableBody = document.getElementById("data");
            for (var i = 0; i < result.raw.length; i++) {
                var row = document.createElement("tr");
                var counter = document.createElement("td");
                var result = document.createElement("td");
                var cell = document.createElement("td");
                var image = document.createElement("img");

                counter.innerHTML = i + 1;
                result.innerHTML = result.raw[i];

                image.setAttribute("src", "assets/img/" + result.raw[i] + ".png");
                image.setAttribute("class", "smallcoin");

                row.appendChild(counter);
                row.appendChild(result);
                cell.appendChild(image);
                row.appendChild(cell);
                tableBody.appendChild(row);
            }
            document.getElementById("resultTable").setAttribute("class", "active");
        })
}
// Guess a flip by clicking either heads or tails button
function guessTails() {
    fetch('http://localhost:5000/app/flip/call/tails')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
            document.getElementById("outcome").setAttribute("src", "/assets/img/" + result.flip + ".png");
            document.getElementById("result").innerHTML = "You " + result.result + ".";
        })
}

function guessHeads() {
    fetch('http://localhost:5000/app/flip/call/heads')
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
            document.getElementById("outcome").setAttribute("src", "/assets/img/" + result.flip + ".png");
            document.getElementById("result").innerHTML = "You " + result.result + ".";
        })
}