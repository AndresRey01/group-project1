const ts = "1696296053511";
const publicKey = "4f8605997b56aaa26b6a6841d247a894";
const hashVal = "f8c1d9d4323bdd3e48f6f09a3c88c7c9";

// Construct the URL for the Marvel API request
const apiUrl = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hashVal}`;

// Make the API request using the fetch function
fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    // Handle the fetched data here
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    // Handle errors here
  });

