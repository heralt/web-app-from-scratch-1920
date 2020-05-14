/**
 * retrieve data from API
 * @param movieId
 * @returns {Promise<Response>}
 */
export function getMovie(movieId){
    let baseLink = 'https://ghibliapi.herokuapp.com/films';
    let link = '';

    if(movieId){
        link = baseLink + `/${movieId}`;
    } else {
        link = baseLink;
    }

    return fetch(link)
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error("ERROR");
            }
        }).then(json => {
            return json;
        }).catch(error => {
            console.log(error);
        })
}