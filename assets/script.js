const requestLink = 'https://ghibliapi.herokuapp.com/films';
const mainContainer = document.getElementById("myData");

/**
 *
 */
fetch(requestLink)
    .then(response => {
        if (response.ok) {
            console.log("SUCCESS");
        } else {
            console.log("FAILED")
        }
        return response.json(); // returns promise object
    })
    .then((json) => {
        getWantedData(json)
    })
    .catch(err => {
        console.log(err);
    });

/**
 *
 * @param data
 */
function getWantedData(data) {
    const cleanData = data.map((item) => {
        return {
            title: item.title,
            desc: item.description
        }
    });
    display(cleanData)
}

/**
 *
 * @param wantedData
 */
function display(wantedData) {
    for (let i = 0; i < wantedData.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = 'movies: ' + wantedData[i].title;
        mainContainer.appendChild(div);
    }

}

