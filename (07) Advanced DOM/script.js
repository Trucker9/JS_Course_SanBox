'use strict';
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn, i) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
//######################################################################
//############# Select - create - delete Elements
//######################################################################
/* console.log(document.documentElement); //returning whole html
console.log(document.head);
console.log(document.body);
//////////////////////////// Selectors
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section'); //Node List
console.log(allSection);

// HTMLCollection Returners
document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button'); // HTMLCollection -> stays updated of we change the HTML (unlike nodeList)
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

////////////////////////////// Inserters

// .insertAdjacentHTML;
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookies for improved functionality and analytics';
message.innerHTML =
  'We use cookies for improved functionality and analytics <button class = "btn btn--close-cookie"> Got it! </button>';
// If we use prepend and append at the same time,  Message will be inserted only an one place ! 
// header.prepend(message);
header.append(message);
// If we needed multiple we need to clone it 
// header.append(message.cloneNode(true));

////////////////////////////// Deleters
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    message.remove();
    // old way of deleting elements
    message.parentElement.removeChild(message);
  });
*/
//######################################################################
//############# Select - create - delete Elements
//######################################################################
/* ////////////////////////////// Style
message.style.backgroundColor = '#37383d';
message.style.width = '120%';

console.log(message.style); // outputs nothing !
console.log(getComputedStyle(message)); // outputs all styles
console.log(getComputedStyle(message).height); 
message.style.height =
  parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

///////////// changing css variables ( css properties)
//root
document.documentElement.style.setProperty('--color-primary', 'orangered');
////////////////////////////// Attributes
// Standard attributes:
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
// Custom attributes
logo.getAttribute('designer');
logo.setAttribute('company', 'Bakist');
// absolute and relative links
const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));
console.log(logo.dataset.versionNumber); //custom shit

///////////////////////// Classes
logo.classList.add( "a" , "b" );
logo.classList.remove("a");
logo.classList.toggle("a");
logo.classList.contains("a");
logo.className = "a"// NEVER USE (overrides all)


*/
//######################################################################
//############# Smooth Scrolling
//######################################################################
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

// getting browser size
console.log(document.documentElement.clientHeight);

btnScrollTo.addEventListener('click', function () {
  const s1coords = section1.getBoundingClientRect();
  // ### old way by passing object
  window.scrollTo({
    left: window.pageXOffset + s1coords.left, // pageXoffset excludes scrollbars
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  });
  section1.scrollIntoView({ behavior: 'smooth' });
});
// btn.addEventListener;

//######################################################################
//############# Events
//######################################################################

// const h1 = document.querySelector('h1');
// const alertH1 = function (e) {
//   alert('Reading the heading');

//   // Remove after first activation
//   h1.removeEventListener('mouseenter', alertH1);
// };
// h1.addEventListener('mouseenter', alertH1);
// ### easier
// h1.onmouseenter = alertH1;
// setTimeout(() => h1.removeEventListener('mouseenter', alertH1), 300);

//######################################################################
//#############Event propagation in practice
//######################################################################
/*
const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const randomColor = () =>
  `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;

// This is to show the propagation effect on events. when event happens, the event goes down from the root to the referred element (Capturing phase) and then travels back up to the root (bubbling phase). Note that addEventListener always listens for bubbling phase and if we want to listen for capturing phase instead, we add "true" as the third argument.
//as we click on the "nav__link", the other methods which are in contact with "nav__links" and "nav" will be executed. because the event travels up the root after invoking the "nav__link"
// the "e" is the same for all of the events in all 3 addEventListeners (check out the console.log)
document.querySelector('.nav__link').addEventListener('click', function (e) {
  // This points to current element (not in arrow functions)
  this.style.backgroundColor = randomColor();
  // target is the element that event happened on it at the first
  console.log('Logged from .nav__link');
  console.log('e.target : ', e.target);
  console.log('e.currentTarget : ', e.currentTarget);
  // in conclusion ->   "this" === "e.currentTarget"

  // Stop bubbling effect (propagation)
  //e.stopPropagation();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Logged from .nav__link');
  console.log('e.target : ', e.target);
  console.log('e.currentTarget : ', e.currentTarget);
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randomColor();
  console.log('Logged from .nav__link');
  console.log('e.target : ', e.target);
  console.log('e.currentTarget : ', e.currentTarget);
});

// so here we handled the same "e" or same event in 3 EventListeners based on event bubbling
*/

//######################################################################
//############# Event delegation
//######################################################################

// ---------------------------- Not efficient ---------------------
// const navLinksNodeList = document.querySelectorAll('.nav__link');
// navLinksNodeList.forEach(function (element) {
//   element.addEventListener('click', function (e) {
//     // get rid of default jumping to the section
//     e.preventDefault();
//     // getting the ID of where each links points to
//     const sectionID = this.getAttribute('href');

//     // selecting the section element and adding smooth scroll
//     document.querySelector(sectionID).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// -------------------- Event delegation version ----------------
// 1. attach the event listener to the common parent element
// 2. determine what element(which child) originated that event
document.querySelector('.nav__links').addEventListener('click', function (e) {
  // e.target shows us the child that event is originated from
  const element = e.target;
  // making sure that the event is happened on a child element not the parent element
  if (element.classList.contains('nav__link')) {
    // get rid of default jumping to the section
    e.preventDefault();
    // getting the ID of where each links points to
    const sectionID = element.getAttribute('href');
    // selecting the section element and adding smooth scroll
    document.querySelector(sectionID).scrollIntoView({ behavior: 'smooth' });
  }
});

//######################################################################
//############# DOM Traversing (selecting an element based on another element)
//######################################################################
/*
const h1 = document.querySelector('h1');

// ------------- Going downwards : child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes); // note that useful because returns everything
console.log(h1.children); // give us direct HTMLCollection
console.log(h1.firstElementChild);
console.log(h1.lastElementChild);

// ------------- Going upwards : parents
console.log(h1.parentNode);
console.log(h1.parentElement);
// not direct parent
h1.closest('.header'); // Returns the element with class="header" that has the h1 as its child somewhere (reverse of querySelector (finds parents))

// Going sideways : siblings
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.previousSibling); // Returns node
console.log(h1.nextSibling); // Returns node

console.log(h1.parentElement.children); // Includes h1 itself

// how we use Arrays ?
[...h1.parentElement.children].forEach(function (el) {
  if (el !== h1) {
    el.style.transform = 'scale(0.5)'; 
  }
});
*/

//######################################################################
//############# Tabbed Component
//######################################################################
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

// Using event delegation to Activate selected tab
tabContainer.addEventListener('click', function (e) {
  const clickedChildrenEl = e.target;
  // now we need the button itself to read the data-tab attribute. but we may click on a child of button (span) and e.target may be that span element. here we make sure that the button is selected using .closest();
  const clickedButtonEl = clickedChildrenEl.closest('.operations__tab');
  console.log(clickedButtonEl);
  // preventing .closest(); to return null when we click on "operations__tab" accidentally (tries to select parent of "operations__tab" which has a class of "operations__tab" -> null )
  if (!clickedButtonEl) return;

  // disabling active tab
  tabs.forEach(function (tab, i, tabsArray) {
    tab.classList.remove('operations__tab--active');
  });
  // adding active tab to the selected button
  clickedButtonEl.classList.add('operations__tab--active');

  // Activating content area
  const selectedTabNumber = clickedButtonEl.dataset.tab;
  const activatedContent = document.querySelector(
    `.operations__content--${selectedTabNumber}`
  );
  tabContent.forEach(content => {
    content.classList.remove('operations__content--active');
  });
  activatedContent.classList.add('operations__content--active');
});

//######################################################################
//############# Passing Argument to event Handlers (menu fade)
//######################################################################
const navbar = document.querySelector('.nav');
// mouseenter and mouseleave doesn't bubble so we use mouseover and mouseout
navbar.addEventListener('mouseover', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const clickedLink = e.target;
    const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = clickedLink.closest('.nav').querySelector('img');
    siblings.forEach(function (el) {
      if (el !== clickedLink) el.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

navbar.addEventListener('mouseout', function (e) {
  if (e.target.classList.contains('nav__link')) {
    const clickedLink = e.target;
    const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = clickedLink.closest('.nav').querySelector('img');
    siblings.forEach(function (el) {
      if (el !== clickedLink) el.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

// ----------------------------- Refactoring ---------------------
const handleLinkHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const clickedLink = e.target;
    const siblings = clickedLink.closest('.nav').querySelectorAll('.nav__link');
    const logo = clickedLink.closest('.nav').querySelector('img');
    siblings.forEach(function (el) {
      if (el !== clickedLink) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};
// bind : returns a new version of function and sets the "this" keyword to what we pass as the first argument ...
// Here the addEventListener automatically passes "e" to the new function that bind returns (handleLinkHover has "e" at its definition)
navbar.addEventListener('mouseover', handleLinkHover.bind(0.5));
navbar.addEventListener('mouseout', handleLinkHover.bind(1));

//######################################################################
//############# Sticky Navigation (Intersection Observer)
//######################################################################
// // -------------------------- Practice with Observer  --------------------
// const obsOptions = {
//   // The element that the target is intersecting (target : section1)
//   root: null, // null : target intersecting with the entire viewport
//   threshold: [0, 0.2], // 0 % and 10 %
//   // age section1, n% az safhe ro eshqal kone, tabe ejra mishe
//   // 0 : harvaqt section1 maloom nabashe
//   // 1: harvaqt kol3 viewport(safhe) beshe section1
// };
// const obsCallbackFunc = function (entries, observer) {
//   // entries are the array of thresholds.
//   entries.forEach(ent => {
//     console.log(ent);
//   });
// };
// // The callback function will be executed each time that the root intersects the target at the threshold that we defined.

// const observer = new IntersectionObserver(obsCallbackFunc, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = navbar.getBoundingClientRect().height;

const stickyNavObsFunc = function (entries, observer) {
  // console.log(entries[0]);
  if (entries[0].isIntersecting == false) navbar.classList.add('sticky');
  else navbar.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNavObsFunc, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`, // -80px ->  makes what we've chosen as root 90px smaller to detect as intersecting
  // viewport will be smaller and this makes the navbar to be visible sooner
});
headerObserver.observe(header);

//######################################################################
//############# Revealing in scroll
//######################################################################
const revealSection = function (entries, obs) {
  const entry = entries[0]; // to har section ke bere araye tak ozvi mide
  if (entry.isIntersecting) entry.target.classList.remove('section--hidden');

  // Stopping obs
  obs.unobserve(entry.target);
};
const sectionObs = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, //section will be revealed when it is 15% visible
});
const allSections = document.querySelectorAll('section');
allSections.forEach(sec => {
  // sec.classList.add('section--hidden');
  sectionObs.observe(sec);
});
//######################################################################
//############# Lazy load images
//######################################################################
// selecting all images that have data-src attribute (css)
const targetImages = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  if (!entries[0].isIntersecting) return;

  // Replace src attribute with data-src
  const imageEl = entries[0].target;

  imageEl.src = imageEl.dataset.src;
  // If we simply remove the "lazy-img" of classList, on slow internets, the blur effect changes before the original image being loaded. we want to remove the blur after that image is completely loaded and shown. the load event will be emitted after the <img> tag is loaded completely.
  imageEl.addEventListener('load', () => {
    imageEl.classList.remove('lazy-img');

    // Removing observation after lazy loading is completed
    observer.unobserve(imageEl);
  });
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '+200px', //to start loading before reaching the img
});
targetImages.forEach((curr, i, arr) => {
  imgObserver.observe(curr);
});

//######################################################################
//############# Slider Component
//######################################################################
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotsDiv = document.querySelector('.dots');

// slider.style.transform = 'scale(0.5)';
// slider.style.overflow = 'visible';

const slidesCount = slides.length;
let currSlide = 0;

const goToSlide = function (slide) {
  slides.forEach((sli, i) => {
    sli.style.transform = `translateX(${100 * (i - slide)}%)`;
    // 100% means move it across the X axis for distance of 100% of the width
  });
};
const nextSlide = function () {
  if (currSlide + 1 === slidesCount) currSlide = 0;
  else currSlide++;
  goToSlide(currSlide);
  activateDot(currSlide);
};

const prevSlide = function () {
  if (currSlide === 0) currSlide = slidesCount - 1;
  else currSlide--;
  goToSlide(currSlide);
  activateDot(currSlide);
};

btnRight.addEventListener('click', () => nextSlide());
btnLeft.addEventListener('click', () => prevSlide());

document.addEventListener('keydown', function (e) {
  e.key === 'ArrowLeft' && prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

const generateDots = function () {
  slides.forEach(function (_, i) {
    // iterate to the length of "slides"
    const HTML = `<button class="dots__dot" data-slide="${i}"></button>`;
    dotsDiv.insertAdjacentHTML('beforeend', HTML);
  });
};

// Using event delegation
dotsDiv.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slideNum = e.target.dataset.slide;
    goToSlide(slideNum);
    activateDot(slideNum);
  }
});

const activateDot = function (activeSlide) {
  // Remove active of all dots
  document.querySelectorAll('.dots__dot').forEach(function (dot, i) {
    dot.classList.remove('dots__dot--active');
  });

  // Add active to the selected one
  document
    .querySelector(`.dots__dot[data-slide="${activeSlide}"]`)
    .classList.add('dots__dot--active');
};

const init = function () {
  // giving transform to all slides
  goToSlide(0);

  generateDots();
  activateDot(0);
};
init();
//######################################################################
//############# Life Cycle events
//######################################################################

// Fires when HTML is completely downloaded and parsed into DOM tree (Only HTML and JS downloaded)
// Does not wait for images and resources(css)
document.addEventListener('DOMContentLoaded', function (e) {
  console.log(e);
});

// Fires when everything (including images) are loaded and loading page is finished
window.addEventListener('load', function (e) {
  console.log(e);
});

// Fires immediately after closing the page
// window.addEventListener('beforeunload', function (e) {
//   console.log(e);
//   e.returnValue = ''; // Historical reasons
// });
//######################################################################
//#############
//######################################################################

//######################################################################
//#############
//######################################################################
