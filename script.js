function getSongs(searchText) {
    fetch(`https://api.lyrics.ovh/suggest/${searchText}`)
        .then(res => res.json())
        .then(data => {
            globalData = data;
            displaySongs(data)
        })
}

function displaySongs(songs) {
    let data = songs.data;
    data = data.slice(0, 10)
    const searchResultContainer = document.getElementById('search-result')
    searchResultContainer.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
        const song = data[i];
        const singleResult = document.createElement('div');
        singleResult.innerHTML = `
        <!-- single result -->
                    <div class="single-result row align-items-center my-3 p-3">
                        <div class="col-md-9">
                            <h3 class="lyrics-name">${song.title}</h3>
                            <p class="author lead">Album by <span>${song.artist.name}</span> <img src="${song.artist.picture}" style="width: 50px"></img></p>
                        </div>
                        <div class="col-md-3 text-md-right text-center">
                            <button class="btn btn-success" onclick="getAndDisplayLyrics(${i})">Get Lyrics</button>
                        </div>
                    </div>
        <!-- ./ single result -->
        `;
        searchResultContainer.appendChild(singleResult)
    }
}

function getAndDisplayLyrics(index) {
    let data = globalData.data;
    data = data.slice(0, 10)
    const song = data[index]
    fetch(`https://api.lyrics.ovh/v1/${song.artist.name}/${song.title}`)
        .then(res => res.json())
        .then(data => {
            document.getElementById('lyrics-container').innerHTML = `
            <button class="btn go-back">&lsaquo;</button>
                <h2 class="text-success mb-4">${song.artist.name} - ${song.title}</h2>
                <pre class="lyric text-white">
                    ${data.lyrics}
                </pre>
            `;
        })
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const searchText = document.getElementById('searchText').value;
    getSongs(searchText)
})