"user strict";

import {getMovie} from "./modules/api";

/**
 * @param data
 * @returns {{title: *, desc: *}}
 */
function getMoviedata(data) {
    let movieData = {
        title: data.title,
        desc: data.description
    };
    return movieData;
}

/**
 *
 * @param cleanData
 */
function displayMovie(cleanData) {
    document.getElementById("overview").style.display = 'none';
    emptyScreen("overview");
    document.getElementById("movieDetails").style.display = 'block';

    let container = document.createElement('div');
    container.setAttribute('id','detailContainer');

    document.getElementById("movieDetails").appendChild(container);

    let card = document.createElement('div');
    card.setAttribute('class','card');

    let title = document.createElement('h1');
    title.textContent = cleanData.title;

    let description = document.createElement('p');
    description.textContent = cleanData.desc;


    container.appendChild(card);
    card.appendChild(title);
    card.appendChild(description);
}

/**
 *Retrieves wanted data from the API
 * @param data
 */
function getOverview(data) {
    const cleanData = data.map((item) => {
        return {
            id: item.id,
            title: item.title,
            desc: item.description
        }
    });
    return cleanData;
}

/**
 * Empties divs when switching screens
 * @param id of div to empty
 */
function emptyScreen(id){
    document.getElementById(id).innerHTML = "";
}

/**
 *Take filtered data and displays it on html page.
 * @param cleanData =
 */
function displayHome(cleanData) {
    document.getElementById("movieDetails").style.display = 'none';
    emptyScreen("movieDetails");
    document.getElementById("overview").style.display = 'block';

    let container = document.createElement('div');
    container.setAttribute('id','movieContainer');

    document.getElementById("overview").appendChild(container);

    cleanData.forEach(e => {
        let card = document.createElement('div');
        card.setAttribute('class','card');

        //Link and title of movie
        let href = document.createElement('a');
        href.setAttribute('href', `#movie/${e.id}`);
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



    routie({
        "movie/:id": id => {
            console.log(id);
            getMovie(id).then(json => {
                console.log(json);
                displayMovie(getMoviedata(json));
            });
        },
        "home": () => {
            console.log("home");
            getMovie().then(json => {
                displayHome(getOverview(json));
            });
        },
        "": () => {
            console.log("empty link");
            getMovie().then(json => {
                displayHome(getOverview(json));
            });
        }
    });


