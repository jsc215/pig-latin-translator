const translateToPigLatin = (english) => {
  english = `${english}`;
  const splitWords = english.split(' ');
  let pigLatin = '';
  const splitWordsPigLatin = [];

  splitWords.forEach((word) => {
    const consonantStartPattern = /^[^a-z]*(([bcdfghjklmnpqrstvwxyz]){1}([a-z']*))/i;
    const consonantMatches = word.match(consonantStartPattern);
    const vowelStartPattern = /^[^a-z]*(([aeiou]){1}([a-z']*))/i;
    const vowelMatches = word.match(vowelStartPattern);
    let origWord;
    let rebuiltWord = null;

    const consistentCases = (matches) => {
      if (/[A-Z]/.test(matches[2]) && matches[3].length > 0) {
        if (matches[3] !== matches[3].toUpperCase())
          matches[2] = matches[2].toLowerCase();

        matches[3] = matches[3].replace(
          /^[a-z]{1}/,
          matches[3][0].toUpperCase()
        );
      }
    };

    if (consonantMatches !== null) {
      consistentCases(consonantMatches);
      origWord = consonantMatches[1];
      rebuiltWord = `${consonantMatches[3]}${consonantMatches[2]}ay`;
    } else if (vowelMatches !== null) {
      consistentCases(vowelMatches);
      origWord = vowelMatches[1];
      rebuiltWord = `${vowelMatches[2]}${vowelMatches[3]}way`;
    }

    if (rebuiltWord) {
      word = word.replace(origWord, rebuiltWord);
    }
    splitWordsPigLatin.push(word);
  });
  pigLatin = splitWordsPigLatin.join(' ');
  return pigLatin;
};

let form = document.querySelector('.english-form');
let clicker = document.querySelector('button');
let pig = (e) => {
  e.preventDefault();
  let english = document.querySelector('[name=english]').value;
  document.querySelector('.pigLatin-output').innerHTML = translateToPigLatin(english);
  document.querySelector('[name=english]').value = '';
};

form.addEventListener('submit', pig);
clicker.addEventListener('click', pig);
