/*jslint browser: true, devel: true, eqeq: true, plusplus: true, sloppy: true, vars: true, white: true*/
/*eslint-env browser*/
/*eslint 'no-console':0*/

/* bronnen: substring: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr
            for loops: https://www.w3schools.com/js/js_loop_for.asp
            ternary operater(ifelse): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
            keypress: https://stackoverflow.com/questions/16089421/simplest-way-to-detect-keypresses-in-javascript
*/


console.log("hello world");

var words = [
    "vakantie", 
    "computer", 
    "muziek", 
    "aardappel", 
    "programmeur", 
    "citroenijs", 
    "pizzabakker", 
    "navigatiesysteem", 
    "televisie", 
    "klaslokaal", 
    "corona", 
    "heineken", 
    "javascript", 
    "achterbak", 
    "theekop", 
    "spellingsfout", 
    "croissant", 
    "ziekenhuis", 
    "schoolgebouw", 
    "disney", 
    "tandarts", 
    "geheim",
    "cavia",
    "krukje",
    "tijd",
    "fors",
    "sambal",
    "zuivel",
    "kritisch",
    "jasje",
    "giga",
    "dieren",
    "lepel",
    "picknick",
    "quasi",
    "verzenden",
    "winnaar",
    "dextrose",
    "vrezen",
    "niqaab",
    "hierbij",
    "quote",
    "botox",
    "cruciaal",
    "zitting",
    "cabaret",
    "bewogen",
    "vrijuit",
    "carrière",
    "ijverig",
    "cake",
    "dyslexie",
    "uier",
    "nihil",
    "sausje",
    "kuuroord",
    "poppetje",
    "docent",
    "camping",
    "schijn",
    "kloppen",
    "detox",
    "boycot",
    "cyclus",
    "quiz",
    "censuur",
    "aaibaar",
    "chagrijnig",
    "fictief",
    "chef",
    "gering",
    "nacht",
    "cacao",
    "triomf",
    "baby",
    "ijstijd",
    "cruisen",
    "ontzeggen",
    "quad",
    "open",
    "turquoise",
    "carnaval",
    "boxer",
    "straks",
    "fysiek",
    "accu",
    "twijg",
    "quote",
    "gammel",
    "flirt",
    "futloos",
    "vreugde",
    "ogen",
    "geloof",
    "periode",
    "volwaardig",
    "uitleg",
    "stuk",
    "volk",
    "even",
    "stijl",
    "val",
    "alliantie",
    "tocht",
    "mooi",
    "joggen",
    "broek",
    "kwik",
    "werksfeer",
    "vorm",
    "nieuw",
    "sopraan",
    "miljoen",
    "inrichting",
    "klacht",
    "dak",
    "echt",
    "schikking",
    "print",
    "oorlog",
    "zijraam",
    "hyacint"
];

var unknownWord = getWord();
var knownWord = "_".repeat(unknownWord.length);
var wrongLetters = []; //array waar foute letters in komen
var rightLetters = []; //array waar goede letters in komen

var foutP = document.getElementById("fouteletters");
var goedP =document.getElementById("goedeletters");
goedP.innerHTML = knownWord;

var health = document.getElementById("health");
var imgPlace = document.getElementById("imgman");
var TempT = document.getElementById("temptext");

function getWord() {
    var index = Math.floor(Math.random() * words.length ); 
    //floor rond naar beneden af
    return words[index];
    //pakt een random woord uit words array
}

document.addEventListener('keypress', function (keyPress) {
    if (keyPress === null) {
        keyPress = window.event;
        //sommige browsers geven niet gelijk een parameter mee maar stoppen die in window.event
    }
    var letter = keyPress.key;
    if (letter < "a" || letter > "z") return;

    checkLetter(letter);
    makeKnownWord();
    foutP.innerHTML = wrongLetters;
    goedP.innerHTML = knownWord;
    img();
    checkWin();
});

//checkt eerst of je ingedrukte letter in het woord zit = true, vervolgens geeft hij true of false mee aan adLetter
function checkLetter(letter) {
    var correct = false;
    // Loopt over unknownWord, per letter
    for (var index = 0; index < unknownWord.length; index++) {
        // Als de letter gelijk is aan de ingedrukte letter
        if (unknownWord[index] === letter) {
            // zet de letter in de lijst met correcte letters
            correct = true;
        }
    }

    if (correct) { //dus als boolean true is
        addLetter(letter, true);
    } else {
        addLetter(letter, false);
    }
}

//kijkt eerst naar de lengte van right of wrong letters. kijkt dan of een letter er al in staat en geeft true of false mee.
function addLetter(letter, isCorrect) {
    var exists = false;
    // ? is een korte if en : is een korte else
    for (var index = 0; (isCorrect) ? index < rightLetters.length : index < wrongLetters.length; index++) {
        if (isCorrect) {
            // if gekozen letter al in de array staat
            if (letter === rightLetters[index]) {
                exists = true;
            }
        } else {
            // if gekozen letter al in de array staat
            if (letter === wrongLetters[index]) {
                exists = true;
            }
        }
    }

    //als de letter nog niet NIET in de array staat
    if (!exists) {
        if (isCorrect) {
            // voegt alleen toe als je letter in het woord staat
            rightLetters += letter;
        } else {
            health.value -= 10;
            wrongLetters += letter;
        }
    }
}

//zorgt ervoor dat je letters op de juiste plek komen te staan wanneer ze juist zijn.
function makeKnownWord() {
    for (var i = 0; i < rightLetters.length; i++) {
        //vind index van letter die je typt
        for (var j = 0; j < unknownWord.length; j++) {
        //vind index van letter in woord
            if (rightLetters[i] === unknownWord[j]) {
                //met substring kan je een deel van de string pakken en in de string werken.
                knownWord = knownWord.substr(0, j) + unknownWord[j] + knownWord.substr(j + 1);
                //knownWord = index 0 tot index van j(6) + letter j(6) + index van j plus 1(7 tot de rest)
            }
        }
    }
}

//als je het woord geraden hebt
function checkWin() {
    if (unknownWord === knownWord) {
        window.location.href = "./winpage.html";
    }
    if (health.value === 0) {
        document.body.innerHTML = "<div class='divl'><h1 class='h1l'> Je hebt verloren!<br> Het woord was "+unknownWord+"<br><br><br> <a class='playl' href='galgje.html'>Probeer opnieuw</a></h1><img class='imgf' src='./images/galgjechar8.svg'></div>";
    }
}

function img() {
    if (health.value <= 10) {
        imgPlace.src = "./images/galgjechar7.svg";
    } else if (health.value <= 20 ) {
        imgPlace.src = "./images/galgjechar6.svg";
    } else if (health.value <= 30 ) {
        imgPlace.src = "./images/galgjechar5.svg";
    } else if (health.value <= 40 ) {
        imgPlace.src = "./images/galgjechar4.svg";
    } else if (health.value <= 60 ) {
        imgPlace.src = "./images/galgjechar3.svg";
    } else if (health.value <= 80 ) {
        imgPlace.src = "./images/galgjechar2.svg";
    } else if (health.value <= 100) {
        imgPlace.src = "./images/galgjechar.svg";
    }
}


imgPlace.addEventListener('mouseover', function(){
    imgPlace.src = "./images/galgjechar1.1.svg";
});

imgPlace.addEventListener('mouseout', img);

document.addEventListener('keypress', function(){
    TempT.innerHTML = "<p> </p>";
});


