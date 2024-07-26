document.addEventListener("DOMContentLoaded", () => {
  const arrayWords = [
    "camisa",
    "pepino",
    "empanada",
    "papa",
    "puerto",
    "java",
    "javascript",
    "go",
    "python",
  ];
  let wordGuess = "";
  let wordDOMGues = "";
  function getRandomWord() {
    const position = Math.floor(Math.random() * arrayWords.length);
    const word = arrayWords[position];

    const positonsTakes = [];
    const wordComplete = [];

    for (let i = 0; i < word.length; i++) {
      let positionOfWord = Math.floor(Math.random() * word.length);
      while (positonsTakes.includes(positionOfWord)) {
        positionOfWord = Math.floor(Math.random() * word.length);
      }
      positonsTakes.push(positionOfWord);
      wordComplete.push(word.charAt(positionOfWord));
    }
    const wordWithoutSpaces = wordComplete.join("");

    return wordWithoutSpaces;
  }
  function removeOportunity(tries) {
    //OPORTUNITIES
    const oportunities = document.getElementById("oportunities");
    //
    for (let i = 0; i < 5 - tries; i++) {
      const oportunity = oportunities.children[i];
      if (oportunity.classList.contains("trie")) {
        oportunity.classList.remove("trie");
        oportunity.classList.add("no-trie");
      }
    }
  }
  function handleChange(e) {
    const spanTries = document.getElementById("tries");
    const tries = Number(spanTries.textContent);
    const codigo = e.which || e.keyCode;
    if (tries <= 0) {
      alert("no tienes más intentos");
      return;
    }
    if (codigo === 8 && e.target.value !== "") {
      wordGuess = wordGuess.substring(0, wordGuess.length - 1);
    }
    if (!(wordGuess.length < wordDOMGues.length)) return;
    if (codigo >= 65 && codigo <= 90) {
      wordGuess += e.key;
    }
    if (Object.values(wordDOMGues).includes(e.key)) {
      alert("has encontrado uno");
    } else {
      spanTries.innerHTML = tries - 1;
      removeOportunity(Number(spanTries.textContent));
    }
    teclaActual = codigo;
  }
  function generateInputGuessWord(wordLength) {
    const guessContainer = document.querySelector(".guess-container");

    while (guessContainer.firstChild) {
      guessContainer.removeChild(guessContainer.firstChild);
    }
    for (let i = 0; i < wordLength; i++) {
      const newInput = document.createElement("input");
      newInput.classList.add("input");
      newInput.setAttribute("maxlength", "1");
      newInput.addEventListener("keydown", handleChange);
      guessContainer.appendChild(newInput);
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    //WORD
    const spanWord = document.getElementById("word");
    const word = getRandomWord();
    wordDOMGues = word;

    spanWord.innerHTML = word;
    //

    //INPUT TO GUESS WORD
    generateInputGuessWord(word.length);
  }

  function handleReset() {
    console.log("Reseteando");
  }
  const form = document.getElementById("form");
  form.addEventListener("submit", handleSubmit);
  form.addEventListener("reset", handleReset);
});
