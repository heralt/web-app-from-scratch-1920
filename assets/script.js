
/**
 * Object containing necessary information
 */
const data = {
    requestLink : 'https://ghibliapi.herokuapp.com/films',
    mainContainer : document.getElementById("myData")
};

/**
 *
 */
fetch(data.requestLink)
    .then(response => {
        if (response.ok) {
            console.log("SUCCESS");
        } else {
            console.log("FAILED")
        }
        return response.json(); // returns promise object
    })
    .then((json) => {
        let cleanData = getCleanData(json);
        display(cleanData);
    })
    .catch(err => {
        console.log(err);
    });

/**
 *Retrieves wanted data from the API
 * @param data
 */
function getCleanData(data) {
    const cleanData = data.map((item) => {
        return {
            title: item.title,
            desc: item.description
        }
    });
    return cleanData;
}

/**
 *Takes data and displays it on webpage
 * @param cleanData
 */
function display(cleanData) {
    cleanData.forEach( e => {
        let div = document.createElement("div");
        div.innerHTML = 'movies: ' + e.title;
        data.mainContainer.appendChild(div);
    });
}

let hello = {
    hello: 'hello',
    goodbye: '<i>Goodbye</i>',
    greeting: 'Howdy!',
    'hi-label': 'Terve!'
};

Transparency.render(document.getElementById('container'),hello);

