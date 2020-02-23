/**
 * Object containing necessary information
 */
const data = {
    requestLink : 'https://ghibliapi.herokuapp.com/films',
    mainContainer : document.getElementById("myData")
};

function logo(){
    let logo = document.createElement('img');
    logo.src = '../diagrams/logo.png';
    data.mainContainer.appendChild(logo);
}
logo();

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
    let container = document.createElement('div');
    container.setAttribute('class','container');

    data.mainContainer.appendChild(container);

    cleanData.forEach(e => {
        let card = document.createElement('div');
        card.setAttribute('class','card');

        let h1 = document.createElement('h1');
        h1.textContent = e.title;

        let p = document.createElement('p');
        e.desc = e.desc.substring(0,300);
        p.textContent = `${e.desc}...`;

        container.appendChild(card);

        card.appendChild(h1);
        card.appendChild(p);
    });
}
