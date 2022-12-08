
const searchBar    = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton")
const resultsDiv   = document.getElementById('resultsDiv');

const QuerySring  = window.location.search;
const urlParams   = new URLSearchParams(QuerySring);
const SearchParam = urlParams.get('search');

searchBar.value = SearchParam;
search(SearchParam);

function teclaPressionada(event){
    if(event.keyCode == 13) searchButton.click();
}

function search(val) { 
    
    if (val != "" && val != null){

        val = encodeURI(val);
        console.log("search: ", val);

        history.pushState(null, "", `?search=${val}`);
        resultsDiv.innerHTML = "";
        
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=pt-BR&query=${val}&page=1&region=BR`)
        .then(response => response.json())
        .then(data => {

            console.log(data);

            for(i in data.results){  
                const item = data.results[i];
                if (item.media_type != 'person'){
                    if (item.poster_path != "" && item.poster_path != null)
                        scr = `https://image.tmdb.org/t/p/w154${item.poster_path}`;
                    else
                        scr = "filme.jpg";
                    if (item.media_type == 'movie'){
                        itemTitle = item.title;
                    } else {
                        itemTitle = item.name;
                    }
                    resultsDiv.innerHTML += `<img class="poster" title="${itemTitle}" src="${scr}" width="154" height="218" onclick=location.href="result.html?media_type=${item.media_type}&id=${item.id}">`;
                }                   
            }
        }); 
    }
}