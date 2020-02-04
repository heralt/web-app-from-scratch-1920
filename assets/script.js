
let requestLink = 'https://ghibliapi.herokuapp.com/films';

fetch(requestLink, {

})
.then(response => {
    if(response.ok){
        console.log("SUCCESS");
    } else {
        console.log("FAILED")
    }
    return response.json(); // returns promise object
})
.then(json => {
    console.log(json); // returns data in promise
})
    .catch( err => {
        console.log(err);
    });