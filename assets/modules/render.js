
/**
 * Empties divs when switching screens
 * @param id of div to empty
 */
function emptyScreen(id) {
    document.getElementById(id).style.display = 'none';
    document.getElementById(id).innerHTML = "";
}

function display(id) {
    document.getElementById(id).style.display = 'block';
}

function createDiv(divID, divContainer) {
    let container = document.createElement('div');
    container.setAttribute('id', divID);

    document.getElementById(divContainer).appendChild(container);
    return container;
}

export const render = {
    displayHome: function(cleanData){
        emptyScreen("movieDetails");
        display("overview");
        let container = createDiv("movieContainer", "overview");
        let cards = cleanData.map(e => {
            return `<div class="card"><a href="#movie/${e.id}" data-id="${e.id}"><h1 style="color: black">${e.title}</h1></a>
                <p>${e.desc.substring(0, 300)}...</p></div>`;
        });
        document.getElementById(container.id).innerHTML = cards.join('\n');
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
    displayMovie: function (cleanData){
        emptyScreen("overview");
        display("movieDetails");
        let container = createDiv("detailContainer", "movieDetails");
        document.getElementById(container.id).innerHTML =
            `<div class="card"><h1>${cleanData.title}</h1><p>${cleanData.desc}</p></div>`;
    }
};