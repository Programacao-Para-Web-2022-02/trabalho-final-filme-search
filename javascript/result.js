//Elementos HTML
const posterDiv = document.getElementById("posterDiv")
const providersDiv = document.getElementById("providersDiv");
const streamingDiv = document.getElementById("streamingDiv");
const rentDiv = document.getElementById("rentDiv");
const buyDiv = document.getElementById("buyDiv");
const movieTitle = document.getElementById("movieTitle");

//Parâmetros URL (informações contidas na URL)
const QuerySring = window.location.search;
const urlParams = new URLSearchParams(QuerySring);
const idParam = urlParams.get('id');
const mediaTypeParam = urlParams.get('media_type');


fetch(`https://api.themoviedb.org/3/${mediaTypeParam}/${idParam}?api_key=15e383204c1b8a09dbfaaa4c01ed7e17&language=pt-BR&append_to_response=watch/providers`)
            .then(response => response.json())
            .then(media => {
                
                console.log(media);

                posterDiv.src = `https://image.tmdb.org/t/p/w342${media.poster_path}`;
                
                //título da média
                if (mediaTypeParam=="tv")
                    movieTitle.innerHTML = media.name;
                else
                    movieTitle.innerHTML = media.title;

                //Descrição
                document.getElementById("overviewDiv").innerHTML = media["overview"];
                
                    const providersBR = media["watch/providers"].results.BR;

                for (i in providersBR.flatrate){
                    const provider = providersBR.flatrate[i];
                    
                    streamingDiv.innerHTML += `<img src="https://image.tmdb.org/t/p/w45/${provider.logo_path}">`
                }
                for (i in providersBR.rent){
                    const provider = providersBR.rent[i];
                    
                    rentDiv.innerHTML += `<img src="https://image.tmdb.org/t/p/w45/${provider.logo_path}">`
                }
                for (i in providersBR.buy){
                    const provider = providersBR.buy[i];
                    
                    buyDiv.innerHTML += `<img src="https://image.tmdb.org/t/p/w45/${provider.logo_path}">`
                }

            });
