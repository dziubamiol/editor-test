const getSuggestion = async (baseWord, size) => {
    const response = await fetch(`https://api.datamuse.com/words?ml=${ baseWord }`, { mode: 'no-cors' });
    const wordsText = await response.text();

    const words = JSON.parse(wordsText);
    // not sending request because of cors, with cors

    words.slice(0, size);
    words.forEach(el => el.word);


    return words ? words: ['Test1', 'Test2'];
}

export default getSuggestion;
