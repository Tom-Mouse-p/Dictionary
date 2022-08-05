document.querySelector('#search_word').addEventListener("click", () => {

  const dict_input = document.querySelector('#word_input').value;
  fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${dict_input}`)
    .then(response => response.json())
    .then(data => {

      var org = data;
      var datas = JSON.stringify(org);

      var word = org[0].word;
      var phonetic = org[0].phonetic;
      var audio = {
        "uk": {
          "text": org[0].phonetics[0].text,
          "audio": `<audio src="${org[0].phonetics[0].audio}" controls ></audio>`,
        },
        "us": {
          "text": org[0].phonetics[1].text,
          "audio": `<audio src="${org[0].phonetics[1].audio}" controls ></audio>`,
        },

      }
      var audio = `
  				<audio src="${org[0].phonetics[0].audio}" controls ></audio>
  `;

      // document.querySelector('#results').innerHTML = org[0].meanings.length;

    })

});

