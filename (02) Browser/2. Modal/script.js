'use strict';

/* We have implemented all the classes
* in the CSS and now we just add or remove
* some classes based on events.
* each part of the HTML file that has the  class="hidden"
* wont be displayed and here. (but its implemented)
* we can add or remove that class by using JS */


const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
/* Selecting multiple classes with the same name. it stores is as Array */
const btnShowModal = document.querySelectorAll(".show-modal");



/* Its now an Array */
for (let i = 0; i < btnShowModal.length; i++) {
    btnShowModal[i].addEventListener("click",showModalFunc);
}
btnCloseModal.addEventListener("click", closeModalFunc);
overlay.addEventListener("click", closeModalFunc);
document.addEventListener("keydown", closeOnESC );



/* What is the "e" ?
When a key is pressed, this function will be executed, the "e" is the event
* object that is created by the JS itself and we need to use it here. The "e" or
* the event has information about the event happened that we need it. so we tell
* the JS to pass the event which caused this function to run into it.
* you can look into it by    console.log(e)   */



function closeModalFunc() {
    modal.classList.add("hidden"); /* name of the class to remove with no dot */
    overlay.classList.add("hidden");
}
function showModalFunc() {

    modal.classList.remove("hidden"); /* name of the class to remove with no dot */
    overlay.classList.remove("hidden");

}
function closeOnESC(e){

    if(e.key === "Escape"){
    if(!classIsHidden(modal))
    closeModalFunc();}
}
function classIsHidden( className ){
    return className.classList.contains("hidden");
}

















