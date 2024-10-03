/*
    TP - Consommation d'une API randomuser.me
*/

// Documentation: https://randomuser.me/documentation

// API Endpoint: https://randomuser.me/api/
let endpoint="https://randomuser.me/api/?results=50";


// 1. Fetch des datas
// ***********************
// https://developer.mozilla.org/fr/docs/Web/API/Fetch_API/Using_Fetch

// Vérifier que le navigateur peut faire du fetch
if (window.fetch){

    // Appel
    fetch( endpoint )
    .then(
        // Premier fonction de callback, c'est la fonction en cas de succès
        // Et on aura un paramètre qui est la réponse
        function (response) {
            console.info("SUCCESS");
            console.log( response.statusText );

            // Tester le statut de la réponse
                // https://developer.mozilla.org/en-US/docs/Web/API/Response/statusText
            // et en fonction on continue ou non
            if ( response.status == 200 ){
                
                // On peut continuer
                // Par défaut, l'API renvoie le format JSON
                // Transformer la réponse en JSON interpétable
                response.json()
                .then(
                    // Succès de la promesse de transformation de la réponse en JSON
                    function (datas) {
                        // Succès
                        console.table(datas);

                        // En observant les données reçues, on voit que les résultats sont dans
                        // datas.results

                        // Ici que tout commence
                        // On appelle la fonction d'affichage
                        // pour CHAQUE résultat

                        // On va sélectionner l'élement ayant l'id userLines
                        let tabUsers = document.getElementById( "userLines" );

                        datas.results.forEach(element => {
                            //console.log( generateUserLine(element) );

                            // ajouter à l'élement id userLines la ligne générée
                            tabUsers.appendChild( generateUserLine(element) );
                        });
                    }
                    ,
                    // Erreur de la promesse de transformation de la réponse en JSON
                    function (error) {
                        console.error("ERROR de transformation de la réponse en JSON");
                        console.error(error);
                    }
                )


            }else{
                // Erreur
            }

        },

        // La deuxième fonction de callback, c'est la fonction en cas d'échec
        // On aura comme paramètre l'erreur
        function (error) {
            console.error("ERROR");
            console.error ( error );
        }        
    )

}else{

    alert("Votre navigateur ne permet pas de faire du fetch");
    // On devra faire du XmlHttpRequest à la papa

}


// 2. Fonction de création des lignes HTML des users
// ***********************
/**
 * Prend en paramètre un objet USER issu de l'appel de l'API
 * 
 * @returns Element HTML TR
 */
function generateUserLine( user ){
    /*
        Cette fonction va recevoir les infos d'un utilisateur
        et elle va renvoyer un élément HTML TR
        https://developer.mozilla.org/fr/docs/Web/API/Document_Object_Model/Introduction

        <!-- Template des lignes -->
        <tr>
            <td>ID</td>
            <td>M/F/ND</td>
            <td>NOM PRENOM</td>
            <td><img src="" alt=""/></td>
            <td>VILLE</td>
            <td>PAYS</td>
        </tr>
    */

    console.table(user);

    // Création de la structure des éléments
    // Affectation des valeurs
    let generatedUserLine = document.createElement('TR');

    // ID
    let tdIDHTML = document.createElement('TD');
    tdIDHTML.innerText = user.login.username;

    // Genre
    let tdGenreHTML = document.createElement('TD');    
        let imgGenreHTML = document.createElement('img');
        //@TODO: faire un switch pour choisir une icone
        switch ( user.gender ){
            case 'male':
                imgGenreHTML.setAttribute("src", "assets/img/noun-face-2068237.svg");                
                break;

            case 'female':
            default:
                imgGenreHTML.setAttribute("src", "assets/img/noun-woman-2078474.svg");
                break;
        }
        imgGenreHTML.setAttribute('width', 50);
        tdGenreHTML.appendChild(imgGenreHTML);

    // Nom Prenom
    let tdNameHTML = document.createElement('TD');
    tdNameHTML.innerText = user.name.title + " " + user.name.first.toUpperCase() + " " + user.name.last;

    // Image
    let tdPictureHTML = document.createElement('TD');
    let imgPictureHTML = document.createElement('IMG');
        // Attributs
        imgPictureHTML.setAttribute( "src", user.picture.thumbnail);
        imgPictureHTML.setAttribute( "alt", user.name.first.toUpperCase() + " " + user.name.last);
        imgPictureHTML.setAttribute( "class", "rounded");
        // Filiation / Greffe de IMG au TD
        tdPictureHTML.appendChild( imgPictureHTML );

    // Ville
    let tdCityHTML = document.createElement('TD');
    tdCityHTML.innerText = user.location.city;

     // Pays
    let tdCountryHTML = document.createElement('TD');
    tdCountryHTML.innerText = user.location.country;

    // Pays
    let tdNationalityHTML = document.createElement('TD');

        // Drapeau
        // On utilise pour cela un fichier CSS contenant tous les drapeaux
        // https://github.com/lipis/flag-icons
        let spanFlagHTML = document.createElement('span');
        spanFlagHTML.setAttribute('class', 'fi fi-' + user.nat.toLowerCase() );

        // Filiation
        tdNationalityHTML.appendChild( spanFlagHTML );


    // **************    

    // Filiation de tous les TD au TR
        // Greffe de l'élément TD ID sur la branche TR
        generatedUserLine.appendChild( tdIDHTML );
        generatedUserLine.appendChild( tdGenreHTML );
        generatedUserLine.appendChild( tdNameHTML );
        generatedUserLine.appendChild( tdPictureHTML );
        generatedUserLine.appendChild( tdCityHTML );
        generatedUserLine.appendChild( tdCountryHTML );
        generatedUserLine.appendChild( tdNationalityHTML );
        // ...


    // La ligne renvoyée contient un ELEMENT TR avec des sous éléments TD
    return generatedUserLine;
}