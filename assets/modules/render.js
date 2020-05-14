import "../libraries/transparency/dist/transparency.min.js";

/**
 * hide/show detail or overview page
 * @param idShow
 * @param idHide
 */
function displayScreens(idShow,idHide) {
    document.getElementById(idShow).style.display = 'block';
    document.getElementById(idHide).style.display = 'none';
    document.getElementById(idHide).innerHTML = null;
}

/**
 * Create div that will contain rendered data
 * @param divID
 * @param divContainer
 * @returns {string}
 */
function createDiv(divID, divContainer) {
    let container = document.createElement('div');
    container.setAttribute('id', divID);
    document.getElementById(divContainer).appendChild(container);
    return container.id;
}

/**
 * Render home and detail page. filter results on home page.
 * @type {{displayHome: render.displayHome, displayMovie: render.displayMovie, filterMovie: render.filterMovie}}
 */
export const render = {
    displayHome: function(cleanData){
        displayScreens("overview","movieDetail");

        let container = createDiv("movieContainer", "overview");
        const home = document.getElementById(container);

        let cards = cleanData.map(e => {
            return `<div class="card"><a href="#movie/${e.id}" data-id="${e.id}"><h1>${e.title}</h1></a>
                <p>${e.desc.substring(0, 300)}...</p></div>`;
        });

        home.innerHTML = cards.join('\n');
    },
    filterMovie: function(cleanData){
        const searchBar = document.getElementById('search-movie');

        searchBar.addEventListener("keyup", ev => {
            const searchString = ev.target.value.toLowerCase();
            const filteredMovies = cleanData.filter(movies => {
                let movie = movies.title.toLowerCase();
                return movie.includes(searchString);
            });

            render.displayHome(filteredMovies);
        });
    },
    displayMovie: function (cleanData) {
        displayScreens("movieDetail", "overview");
        let divId = createDiv("card","movieDetail");
        document.getElementById(divId).innerHTML = `<h1 id="title"></h1><p id="desc"></p>`;

        let movie = {
            titleMovie: cleanData.title,
            descMovie: cleanData.desc,
        };

        const directives = {
            title: {html: function() {return this.titleMovie;},
            },
            desc: {html: function() {return this.descMovie;}
            }
        };

        Transparency.render(document.getElementById("card"),movie,directives);
    }
};

/**
 * loading state on homepage pageload.
 */
window.addEventListener('load',()=> {
    const loader = document.querySelector(".loader");
    loader.className += " hidden";
});



