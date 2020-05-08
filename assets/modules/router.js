import {getMovie} from "./api.js";
import {render} from "./render.js";

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
    return data.map((item) => {
        return {
            id: item.id,
            title: item.title,
            desc: item.description
        }
    });
}

export function init(){
    routie({
        "movie/:id": id => {
            getMovie(id).then(json => {
                render.displayMovie(getMoviedata(json));
            });
        },
        "home": () => {
            getMovie().then(json => {
                render.displayHome(getOverview(json));
                render.filterMovie(getOverview(json));
            });
        },
        "": () => {
            getMovie().then(json => {
                render.displayHome(getOverview(json));
            });
        }
    });
}