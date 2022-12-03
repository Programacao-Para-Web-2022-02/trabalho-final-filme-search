//Elementos HTML
const searchBar    = document.getElementById("searchBar");
const searchButton = document.getElementById("searchButton")
const resultsDiv   = document.getElementById('resultsDiv');

//Parâmetros URL (informações contidas na URL)
const QuerySring  = window.location.search;
const urlParams   = new URLSearchParams(QuerySring);
const SearchParam = urlParams.get('search'); //Acessa o termo da última busca, que foi "salvo" na url (O texto aqui é decodificado do formato URI)
const PageParam   = urlParams.get('page');

searchBar.value = SearchParam; //Garante que a barra de pesquisa não seja esvaziada
search(SearchParam); //Refaz a última pesquisa ao atualizar a página

function teclaPressionada(event){
    if(event.keyCode == 13) searchButton.click();
}

function search(val,page) { 
    
    if (val != "" && val != null){

        val = encodeURI(val); //Converte o valor para URI. Isso é feito quando se quer inserir o valor numa URL
        console.log("search: ", val);

        history.pushState(null, "", `?search=${val}&page=${page}`); //"Salva" o termo da pesquisa na URL
        resultsDiv.innerHTML = ""; //Limpa os itens da busca anterior
        
        //Acessa a API
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=pt-BR&query=${val}&page=${PageParam}&include_adult=false&region=BR`)
            .then(response => response.json())
            .then(data => {

                //'data' representa os dados retornados pela API e está no formato json, ou seja, é um 'objeto' em js (equivalente a um dicionário em python).   
                //'results' é um nome de um dos itens do objeto que a gente recebeu, e contém uma lista(array) de objetos. Cada um desses objetos representa um filme.

                console.log(data);

                
                //para cada filme é inserido sua respectiva imagem no elemento 'resultsDiv'

                for(i in data.results){  
                    const item = data.results[i];
                    if (item.media_type != 'person'){
                        if (item.poster_path != "" && item.poster_path != null)
                            scr = `https://image.tmdb.org/t/p/w154${item.poster_path}`;
                        else
                            scr ="";
                        
                        resultsDiv.innerHTML += 
                            `
                                <img src="${scr}" alt="${item.title}" onclick=location.href="result.html?media_type=${item.media_type}&id=${item.id}">
                            `;
                    }        
                    
                }

            
            //chama a paginação
            paginacao(data.page, data.total_pages);
        });

    }   

}

function paginacao(page, pages){
    
    console.log(pages);
    console.log(page);


    if (pages == 1)
        document.getElementById("paginacaoDiv").innerHTML = "Página 1/1";    
    else 
    {
       document.getElementById("paginacaoDiv").innerHTML = `Página ${page}/${pages} <a href="index.html?search=${SearchParam}&page=${page + 1}">></a>`;
    }
}