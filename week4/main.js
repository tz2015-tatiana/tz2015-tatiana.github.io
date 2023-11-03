const cityContainer = document.getElementById("city-info");
const btn = document.querySelector(".button");

const renderHTML = function(data) {
  let htmlString = "";

  for (i=0; i<data.length; i++) {
    htmlString += "<p>" + data[i].name + " is a city in " + data[i].country + ",</br>Where you can enjoy indoor places like: ";
    for (ii = 0; ii < data[i].places.indoor.length; ii++) {
    // Loop through the indoor places of the current city.
      if (ii == 0) {
      htmlString += data[i].places.indoor[ii];
      } else {
      htmlString += ", and " + data[i].places.indoor[ii];
      }
    }
    htmlString += '. & enjoy outdoor places like: ';
    // Loop through the outdoor places of the current city.
    for (ii = 0; ii < data[i].places.outdoor.length; ii++) {
      if (ii == 0) {
      htmlString += data[i].places.outdoor[ii];
      } else {
      htmlString += " and " + data[i].places.outdoor[ii];
      }
    }
    htmlString += '.</p>';
  }  
  cityContainer.insertAdjacentHTML('beforeend' , htmlString);
  btn.classList.add("hide-me");
}

const getData = function() {
  const ourRequest = new XMLHttpRequest();
  ourRequest.open('GET', 'https://tz2015-tatiana.github.io/week4/cities1.json');

  ourRequest.onload = function() {
    let ourData = JSON.parse(ourRequest.responseText);
    //console.log(ourData[0]);
    renderHTML(ourData);
  };

  ourRequest.send();
}

btn.addEventListener("click", getData);