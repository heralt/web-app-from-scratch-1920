"user strict";


import {getMovie} from "./modules/api.js";
import {displayHome, displayMovie} from "./modules/render.js";

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

init();

function init(){
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
}
