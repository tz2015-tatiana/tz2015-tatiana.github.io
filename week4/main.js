const myCity = {
  "name": "Dubai",
  "country": "UAE",
  "place": "Dubai Mall"
}

const ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://tz2015-tatiana.github.io/week4/cities1.json');

ourRequest.onload = function() {
  console.log(ourRequest.responseText);
};

ourRequest.send();