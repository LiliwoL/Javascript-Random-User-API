/**
 * Pour rappel, une requête HTTP comprend:
 * - une méthode (GET, POST, DELETE...)
 * - une URL
 * - éventuellement des données
 * 
 * 
 * RFC du protocole HTTP: https://datatracker.ietf.org/doc/html/rfc2616
 */

// Définition de l'url à appeler
const url = "https://randomuser.me/api?results=50&nat=FR";

// Lancement de l'appel
// https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch
fetch( url )
    //  Version ultra condensée en fonction fléchée
    // .then( response => console.log(response) );
    .then( function (response) 
    {
        // Debug de la réponse et affichage dans la console
        console.log(response);

        // Renvoi de la transformation de la réponse en JSON
        return response.json();
    })
    .then(
        // Syntaxe avec une fonction fléchée
        data => {
            // Affichage du résultat de la transfo. en JSON
            console.table(data);

            // Affichage du premier résultat
            console.log(data.results[0]);
        }
    );