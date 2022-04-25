// Focus div based on nav button click
document.getElementById('homenav').onclick = function() {
    document.getElementById('home').className = 'active'
    document.getElementById('single').className = 'hidden'
    document.getElementById('multi').className = 'hidden'
    document.getElementById('guess').className = 'hidden'
}
document.getElementById('singlenav').onclick = function() {
    document.getElementById('home').className = 'hidden'
    document.getElementById('single').className = 'active'
    document.getElementById('multi').className = 'hidden'
    document.getElementById('guess').className = 'hidden'
}
document.getElementById('multinav').onclick = function() {
    document.getElementById('home').className = 'hidden'
    document.getElementById('single').className = 'hidden'
    document.getElementById('multi').className = 'active'
    document.getElementById('guess').className = 'hidden'
}
document.getElementById('guessnav').onclick = function() {
    document.getElementById('home').className = 'hidden'
    document.getElementById('single').className = 'hidden'
    document.getElementById('multi').className = 'hidden'
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
    var count = document.getElementById("count").value;

    fetch('http://localhost:5000/app/flips/coins', {
        body: JSON.stringify({"number": count}),
        headers: {"Content-Type": "application/json",},
        method: "post"
    })
        .then((response) => {
            return response.json();
        })
        .then((result) => {
            console.log(result);
            document.getElementById("heads").innerHTML = result.summary.heads;
            document.getElementById("tails").innerHTML = result.summary.tails;
            
            var coindisplay = document.getElementById("coindisplay");
            var data = document.createElement("table");
            var row = data.insertRow();
            var i = 0;
            while(i < result.raw.length){
                for(var j = 0; j < 5; j++){
                    if(i < result.raw.length){
                        var cell = row.insertCell();
                        var image = document.createElement('img');
                        image.setAttribute("src", "/assets/img/"+result.raw[i]+".png");
                        image.setAttribute("class", "smallcoin");
                        cell.appendChild(image); 
                        i++;
                    }
                }
            }
            coindisplay.appendChild(data);
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
            document.getElementById("result").innerHTML = "You " + result.result;
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
            document.getElementById("result").innerHTML = "You " + result.result;
        })
}