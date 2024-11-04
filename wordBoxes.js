var allWords = [];
var currentWord = 0;

function generateWordElem(word, highlightColor) {
	var wordElem = document.createElement('span');
  wordElem.classList.add('word');
  wordElem.textContent = word;
  if (highlightColor) {
  	wordElem.classList.add('highlight');
  	wordElem.classList.add(highlightColor);
  }
  return wordElem;
}

function handleWordsInput(event) {
  var words = event.target.value
  console.log("== new words entered, words:", words)
  allWords = words
    .replace(/[!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~]/g, '')
    .toLowerCase()
    .split(' ')
  currentWord = 0

  console.log("  -- allWords:", allWords)
}

var wordsInput = document.getElementById("words-input")
wordsInput.addEventListener("change", handleWordsInput)

function handleAddWordButtonClick(event) {
  var word = allWords[currentWord]
  if (word) {
    console.log("== button clicked, word:", word)

    var everyNthSelect = document.getElementById("every-nth-select")
    var n = everyNthSelect.value
    console.log("  -- n:", n)
    var highlightColor = null
    if ((currentWord + 1) % n === 0) {
      var selectedRadioButton = document.querySelector("input[name='highlight-color']:checked")
      console.log("  -- selectedRadioButton:", selectedRadioButton)
      highlightColor = selectedRadioButton.value
    }

    var wordElement = generateWordElem(word, highlightColor)
    var clickedButton = event.target
    var container = clickedButton.parentNode.parentNode
    var wordsContainer = container.getElementsByClassName("words-container")[0]
    wordsContainer.appendChild(wordElement)

    currentWord = (currentWord + 1) % allWords.length
  }
}

var addWordButtons = document.getElementsByClassName("add-word-button")
for (var i = 0; i < addWordButtons.length; i++) {
  addWordButtons[i].addEventListener("click", handleAddWordButtonClick)
}
