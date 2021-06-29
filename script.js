const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = [];


(async function(){
    const  response = await fetch(endpoint)
    const data = await response.json();
    cities.push(...data);
    //console.log("hello ji this is iife")
})()


function findMatch(wordToMatch, cities){
    return cities.filter(place => {
        const regex = new RegExp(wordToMatch, 'gi');
        return place.city.match(regex) || place.state.match(regex);

    })
}

let search = document.querySelector(".search");
let suggestions = document.querySelector(".suggestions");

function display(){
    const array = findMatch(this.value,cities);
 //   console.log(array);
    const newHTML = array.map(item =>{
        // const newElement = document.createElement('li');
        // const textNode = document.createTextNode(`${item.city}, ${item.state}`);
        // newElement.appendChild(textNode);
        // suggestions.appendChild(newElement);
        const regexp = new RegExp(this.value,'gi');
        const cityName = item.city.replace(regexp, `<span class="hl">${this.value}</span>`)
        const stateName = item.state.replace(regexp, `<span class="hl">${this.value}</span>`)


        return `
        <li>
        <span class="name">${cityName}, ${stateName}</span>
        <span class="population">${item.population} </span>
        </li>

        `;
    }).join("")
    suggestions.innerHTML = newHTML;
}



search.addEventListener('change',display);
search.addEventListener('keyup',display);


