const baseUrl = 'https://rickandmortyapi.com/api/'
const characterList = document.getElementById('characters-list');
const locationsList = document.getElementById('locations-list');
const episodesList = document.getElementById('episodes-list');

const GetCharactersList = async url =>{
    /*fetch(`${baseUrl}${url}`) //Aquí se llama al link que se tiene
    .then(res => console.log(res.json()));*/ 

    const reponse = await fetch(`${baseUrl}${url}`);
    const data = await reponse.json();
    const {results} = data; 
    
    const infoArr = results.map(element => {
        //console.log(element);
        const {image, url} = element;
        return {characterImg: image, characterUrl: url}; //Aquí creas variables para imagen y personaje de Url especifica 
        //console.log(image);
    }); //Aquí se desestructura el arreglo, tomando los objetos del JSON

    await infoArr.forEach(element => {
        const imgElement = document.createElement('img');
        imgElement.src = element.characterImg;
        imgElement.onclick = ()=> {
            localStorage.setItem('characterUrl', element.characterUrl); //Aquí le asignas la url específica del personaje seleccionado
            window.location.href = 'file:///C:/Users/josed/Documents/probramaci%C3%B3n-hipermedia/app03/character.htm';
        }; //Al hacer click en una imagen, saltara a la pagina de info con ese personaje específico clickeado
        characterList.appendChild(imgElement);
    });

    //console.log(await imgArr);
    //console.log(await data.results); //Al poner .results se imprimen en la concola solo el array result
}

GetLocationsList = async url =>{
    const reponse = await fetch(`${baseUrl}${url}`);
    const dataJson = await reponse.json();
    const results = dataJson.results;

    //console.log(dataJson); //se llama a la info del arreglo de results
    const locationR = results.map(element => {
        const {name, dimension} = element;
        //console.log(element); //Se obtiene solo la información que habia en results
        return {LocationName: name, LocationDim: dimension};
    })

    locationR.forEach(element => {
    locationsList.innerHTML += `<div> <li>${element.LocationName}</li> <li>${element.LocationDim}</li> <br> </div>`
    })
}

GetEpisodeList = async url=>{
    const reponse = await fetch(`${baseUrl}${url}`);
    const dataJson = await reponse.json();
    const results = dataJson.results;

    //console.log(dataJson);
    results.forEach(element =>{
        episodesList.innerHTML +=
         `
        <tr> <td>${element.episode}</td> <td>${element.name}</td> <td>${element.air_date}</td> </tr>
        `
    })
}

GetEpisodeList('episode')

GetLocationsList('location');

GetCharactersList('character');