"user strict";


/**
 * Object containing necessary information
 */
const data = {
    baseLink : 'https://ghibliapi.herokuapp.com/films',
    mainContainer : document.getElementById("myData")
};

/**
 *
 */
fetch(data.baseLink)
    .then(response => {
        if (response.ok) {
            console.log("SUCCESS");
        } else {
            throw Error("ERROR");
        }
        return response.json(); // returns promise object
    })
    .then((json) => {
        let cleanData = getCleanData(json);
        displayHome(cleanData);
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
            id: item.id,
            title: item.title,
            desc: item.description
        }
    });
    return cleanData;
}

function pushMovies(cleanData){
    cleanData.forEach( e => {
        movies.push()
    })
}

/**
 *Take filtered data and displays it on html page.
 * @param cleanData
 */
function displayHome(cleanData) {
    let container = document.createElement('div');
    container.setAttribute('id','container');

    data.mainContainer.appendChild(container);

    cleanData.forEach(e => {
        let card = document.createElement('div');
        card.setAttribute('class','card');

        //Remove space and place _, makes it easier with routie
        let title = e.title.replace(/\s+/g, '_');

        //Link and title of movie
        let href = document.createElement('a');
        href.setAttribute('href', `#${title}`);
        href.setAttribute('data-id', e.id);
        href.innerHTML = `<h1 style="color: black">${e.title}</h1>`;

        //short movie description
        let p = document.createElement('p');
        e.desc = e.desc.substring(0,300);
        p.textContent = `${e.desc}...`;

        //Put seperate movie cards in container and add details
        container.appendChild(card);
        card.appendChild(href);
        card.appendChild(p);
    });
}

function getMovie(movieId){
    let link = data.baseLink + `/${movieId}`;
    return fetch(link).then( response => {return response.json});
}

function displayMovie(promise){
    let mainContainer = document.getElementById('container');
    mainContainer.style.display = 'none';

    let container = document.createElement('div');
    container.setAttribute('class','movie_container');

    data.mainContainer.appendChild(container);
}

routie({
    home: () => {
        console.log('home');
    },
    Castle_in_the_Sky: () => {
        console.log('Castle in the Sky');
        console.log(getMovie('2baf70d1-42bb-4437-b551-e5fed5a87abe'));
    },
    Castle_in_the_Sky: () => {
        console.log('Castle in the Sky');
        console.log(getMovie('2baf70d1-42bb-4437-b551-e5fed5a87abe'));
    },
});