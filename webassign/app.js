let galleryImages = document.querySelectorAll(".gallery-img");
let getLatestOpenedImg;
let windowWidth = window.innerWidth;

if(galleryImages){
    galleryImages.forEach(function(image, index){
        image.onclick = function(){
            let getElementCss = window.getComputedStyle(image);
            let getFullImgUrl = getElementCss.getPropertyValue("background-image");
            let getImgUrlPosition = getFullImgUrl.split("/img/images/");
            let setNewImgUrl = getImgUrlPosition[1].replace('")', '');
            
            getLatestOpenedImg = index + 1; //count current index of image

           /*popup window*/ 
            let container = document.body;
            let newImgWindow = document.createElement("div"); //created element for window
            container.appendChild(newImgWindow); //appling div to the body
            /* attributes for a div */
            newImgWindow.setAttribute("class", "img-window"); //return to css file
            newImgWindow.setAttribute("onclick", "closeImg()"); //close image by function closeImg()

            let newImg = document.createElement("img");
            newImgWindow.appendChild(newImg); //applying image to the div block
            newImg.setAttribute("src", "img/" + setNewImgUrl); 
            newImg.setAttribute("id", "current-img");            

            /**onload so that this function will load after image */
            newImg.onload = function(){
            let imgWidth = this.width;
            let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80; //half, 80 is px
            
            /**change the images */
            let newNextBtn = document.createElement("a"); //link 
            let btnNextText = document.createTextNode("Next");
            newNextBtn.appendChild(btnNextText); //apply the text to the button
            container.appendChild(newNextBtn); //apply button to the body
            newNextBtn.setAttribute("class", "img-btn-next");
            newNextBtn.setAttribute("onclick", "changeImg(1)");
            newNextBtn.style.cssText = "right: " + calcImgToEdge + "px;";
            
            let newPrevBtn = document.createElement("a"); //link
            let btnPrevText = document.createTextNode("Prev");
            newPrevBtn.appendChild(btnPrevText); //apply the text to the button
            container.appendChild(newPrevBtn);
            newPrevBtn.setAttribute("class", "img-btn-prev");
            newPrevBtn.setAttribute("onclick", "changeImg(0)");
            newPrevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
            }
        }
    });
}

/**function for close image */
function closeImg(){
    document.querySelector(".img-window").remove(); //queryselector is used to grab element
    document.querySelector(".img-btn-next").remove(); //queryselector is used to grab element
    document.querySelector(".img-btn-prev").remove(); //queryselector is used to grab element
}
/**function for changing images */
function changeImg(changeDirection){
    document.querySelector("#current-img").remove();

    /**just creating new image */
    let getImgWindow = document.querySelector(".img-window");
    let newImg = document.createElement("img");
    getImgWindow.appendChild(newImg);

    /**attribte link to the new image */
    let calcNewImg;
    if(changeDirection === 1){
        calcNewImg = getLatestOpenedImg + 1;
        if(calcNewImg > galleryImages.length){
            calcNewImg = 1;
        }
    }
    else if(changeDirection === 0){
        calcNewImg = getLatestOpenedImg - 1;
        if(calcNewImg < 1){
            calcNewImg = galleryImages.length;
        }
    }
    newImg.setAttribute("src", "img/img" + calcNewImg + ".jpg");
    newImg.setAttribute("id", "current-img");
    
    getLatestOpenedImg = calcNewImg;

    /*change the position of button */
    newImg.onload = function(){
        let imgWidth = this.width;
        let calcImgToEdge = ((windowWidth - imgWidth) / 2) - 80; //half, 80 is px

        let nextBtn = document.querySelector(".img-btn-next");
        nextBtn.style.cssText = "right: " + calcImgToEdge + "px;";

        let prevBtn = document.querySelector(".img-btn-prev");
        prevBtn.style.cssText = "left: " + calcImgToEdge + "px;";
    }
}
/*modal*/ 
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
