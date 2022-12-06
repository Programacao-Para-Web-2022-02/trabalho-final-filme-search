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

                if (media.poster_path != null && media.poster_path != ""){
                    posterDiv.src = `https://image.tmdb.org/t/p/w342${media.poster_path}`;
                }
                
                //título da média
                if (mediaTypeParam=="tv")
                    movieTitle.innerHTML = media.name;
                else
                    movieTitle.innerHTML = media.title;

                //Descrição
                document.getElementById("overviewDiv").innerHTML = media["overview"];
                
                const providersBR = media["watch/providers"].results.BR;

                if (providersBR === undefined){
                    streamingDiv.innerHTML += "<p>(Sem dados)</p>";
                    rentDiv.innerHTML += "<p>(Sem dados)</p>";
                    buyDiv.innerHTML += "<p>(Sem dados)</p>";
                } else {
                    if ("flatrate" in providersBR){
                        for (i in providersBR.flatrate){
                            const provider = providersBR.flatrate[i];
                            
                            streamingDiv.innerHTML += `<img class="provider" src="https://image.tmdb.org/t/p/w45/${provider.logo_path}" title="${provider.provider_name}">`
                        }
                    } else {
                        streamingDiv.innerHTML += "<p>(Sem dados)</p>";
                    }
    
                    if ("rent" in providersBR){
                        for (i in providersBR.rent){
                            const provider = providersBR.rent[i];
                            
                            rentDiv.innerHTML += `<img class="provider" src="https://image.tmdb.org/t/p/w45/${provider.logo_path}" title="${provider.provider_name}">`
                        }
                    } else {
                        rentDiv.innerHTML += "<p>(Sem dados)</p>";
                    }
    
                    if ("buy" in providersBR){
                        for (i in providersBR.buy){
                            const provider = providersBR.buy[i];
                            
                            buyDiv.innerHTML += `<img class="provider" src="https://image.tmdb.org/t/p/w45/${provider.logo_path}" title="${provider.provider_name}">`
                        }
                    } else {
                        buyDiv.innerHTML += "<p>(Sem dados)</p>";
                    }
                }
            });

