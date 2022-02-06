'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.official}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages}</p>
      <p class="country__row"><span>💰</span>${data.currencies}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  // countriesContainer.style.opacity = 1;
};
const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  // countriesContainer.style.opacity = 1;
};

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
///////////////////////////////////////

//######################################################################
//############# Old school Ajax call
//######################################################################
/*
const getCountryData = function (country) {
  const req = new XMLHttpRequest();
  // opening request to api
  req.open('Get', `https://restcountries.com/v3.1/name/${country}`);
  // sending
  req.send();
  // getting the result after it arrives
  req.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); // this = req
    console.log(data);
    // This must be edited base on what data is.
    const html = `
  <article class="country">
    <img class="country__img" src="${data.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${data.name.official}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages.fas}</p>
      <p class="country__row"><span>💰</span>${data.currencies.IRR.name}</p>
    </div>
  </article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1; // for transition effect
  });
};

getCountryData("iran");
*/
//######################################################################
//############# Callback hell
//######################################################################
/*


const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country (2)
    const [neighbour] = data.borders;

    if (!neighbour) return;

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v3.1/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
 
      const [data2] = JSON.parse(this.responseText);
      console.log(data2);

      renderCountry(data2, 'neighbour');
    });
  });
};

//  getCountryAndNeighbour('portugal');
getCountryAndNeighbour('usa');

setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 second passed');
      setTimeout(() => {
        console.log('4 second passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);

*/
//######################################################################
//############# // Consuming Promises-Chaining Promises-Handling Rejected Promises-Throwing Errors Manually
//######################################################################
/*

// const getCountryData = function (country) {
//   const promise = fetch(`https://restcountries.com/v3.1/name/${country}`);

//   promise
//     .then(function (response) {
//       // The callback function that we pass to the .then() will be executed when the promised is fulfilled. (result is available )
//       console.log(response);
//       // json
//       return response.json(); // .json(); returns the request data as a promise again :|
//     })
//     .then(function (data) {
//       // calling .then() on the promise of .json()
//       console.log(data);
//       renderCountry(data[0]);
//     });
// };

// 3 methods can be applied to a promise :
// 1. then -> callback function execution will happen if the promise is fulfilled
// 2. catch -> callback function execution will happen if the promise is rejected
// 3. finally -> callback function will be executed no matter what
// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v3.1/name/${country}`)
//     // .then() -> first argument -> callback func & Second argument -> err handling
//     .then(
//       response => {
//         // Throwing error like this will reject the promise and the catch method will kick in
//         if (!response.ok) throw new Error('Country not found !');
//         return response.json();
//       },
//       err => renderError(`Connection lost : ${err}`)
//     )
//     .then(data => {
//       // Getting neighbour data
//       const neighbour = data[0].borders[0];
//       if (!neighbour) return;
//       // telling .then() to return this new promise.
//       renderCountry(data[0]);

//       // returning to exit this callback and chain it again.
//       return fetch(`https://restcountries.com/v3.1/alpha/${neighbour}`);
//     })
//     .then(response => response.json())
//     .then(data => {
//       renderCountry(data[0], 'neighbour');
//     }) // NOW WE HAVE A PROBLEM : .catch() will work when promise is rejected due internet connection. but if the server can't find the response for our request (404), then the catch wont kick in. -> solution: throwing error to make the promise rejected.
//     .catch(err => renderError(`Connection lost : ${err}`))
//     .finally((countriesContainer.style.opacity = 1));
// };
// btn.addEventListener('click', function () {
//   getCountryData('usa');
// });

// ### Same as above, cleaner.
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});
// getCountryData('australia');
*/
//######################################################################
//############# Coding challenge #1
//######################################################################
// In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

// Here are your tasks:

// PART 1
// 1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
// 2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
// The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
// 3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
// 4. Chain a .catch method to the end of the promise chain and log errors to the console
// 5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

// PART 2
// 6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
// 7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

// TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
// TEST COORDINATES 2: 19.037, 72.873
// TEST COORDINATES 2: -33.933, 18.474

// GOOD LUCK 😀

//######################################################################
//############# Event loop (video 14)
//######################################################################
// console.log('Test start');
// setTimeout(() => console.log('0 sec timer'), 0);
// Promise.resolve('Resolved promise 1').then(res => console.log(res));

// Promise.resolve('Resolved promise 2').then(res => {
//   for (let i = 0; i < 1000000000; i++) {}
//   console.log(res);
// });

// console.log('Test end');
//######################################################################
//############# Building Promise + Promisifying
//######################################################################
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      // Calling resolve means the promise is fulfilled
      resolve('You WIN 💰');
    } else {
      // Calling reject means the promise is rejected
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// ---------------------------------- Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/

//######################################################################
//############# Async Await
//######################################################################
/*
const whereAmI = async function (country) {
  try {
    // "await" waits for the result IN THE BACKGROUND because its async
    // before : fetch returns a Promise, .then() waits for the promise to fulfill, .json() returns a new promise, next .then() waits for the result of json(), then we have the data.
    // but here is different.
    const response = await fetch(
      `https://restcountries.com/v3.1/name/${country}`
    );
    const [data] = await response.json();
    console.log(data);
    renderCountry(data);
    countriesContainer.style.opacity = 1;

    return 'the selected country is ' + country;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);
    // NOTE : if any error appears, the promise that Async returns will be still fulfilled and the .catch() wont kick in. we have to rethrow it to make the promise rejected !
    throw err;
  }
};

// ###############  Returning from Async
// because there is no way of knowing that when Async will return the value, Async function will always return a Promise which we can later use it with .then()

// const countryPromise = whereAmI('usa');
// console.log(countryPromise); // - shows a pending promise !
// countryPromise.then(result =>
//   console.log(result).catch(err => ` You fucked up : ${err}`)
// ); // ->shows correct answer
// CONVERTING TO ASYNC using IIFE
(async function () {
  try {
    const data = await whereAmI('usa');
    console.log(data);
  } catch (err) {
    renderError(`💥 ${err.message}`);
  }
})();
*/

//######################################################################
//############# parallel promises
//######################################################################
const get3Countries = async function (c1, c2, c3) {
  try {

    // Running in sequence (last await must be done for the next one to be done )
    // const [data1] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${c1}`
    // );
    // const [data2] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${c2}`
    // );
    // const [data3] = await getJSON(
    //   `https://restcountries.com/v3.1/name/${c3}`
    // );
    // console.log([data1.capital, data2.capital, data3.capital]);


    // Promise.all() -> takes an array of promises and returns a new promise which will run all those promises at the same time.
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v3.1/name/${c1}`),
      getJSON(`https://restcountries.com/v3.1/name/${c2}`),
      getJSON(`https://restcountries.com/v3.1/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('portugal', 'canada', 'tanzania'); 

//######################################################################
//############# parallel promises
//######################################################################

// Other Promise Combinators: race, allSettled and any
// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.eu/rest/v2/name/italy`),
    getJSON(`https://restcountries.eu/rest/v2/name/egypt`),
    getJSON(`https://restcountries.eu/rest/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([
  getJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(5),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));
*/