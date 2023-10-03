// Here is were our API's will go
const apiUrl1 = `1332bde37202c04762035c029a340211`
const apiUrl2 = ``

const getMarvelDetails = () => {
    const marvelUrl = `https://gateway.marvel.com/v1/public/characters?apikey=${apiUrl1}`;
}

fetch(`https://gateway.marvel.com/v1/public/characters?apikey=${apiUrl1}`).then(res => res.json()).then(data =>{
    console.log(data);
})