const nextImg = document.querySelector(".next");
const prevImg = document.querySelector(".previous");

//const allImgContainers = document.querySelectorAll(".img-container");
//const allCircleContainers = document.querySelectorAll(".circle-nav");

let translationRate = 60;
let lastTranslation = 40;

function updateCarousel(imgContainer, circleContainer, imgCountValue) {
    imgContainer.style.transform = `translateX(${lastTranslation}%)`;
    selectCircle(circleContainer, imgCountValue);
    imgContainer.dataset.imgcount = imgCountValue.toString();
}

function next(imgContainer) {
    let imgCountValue = Number(imgContainer.dataset.imgcount);
    let circleContainer = imgContainer.parentNode.parentNode.querySelector(".circle-nav");

    if (lastTranslation === -200) {
        lastTranslation = 40;
        imgCountValue = 1;
    } else {
        lastTranslation -= translationRate
        imgCountValue += 1;
    }

    updateCarousel(imgContainer, circleContainer, imgCountValue);
}

function previous(imgContainer) {
    let imgCountValue = Number(imgContainer.dataset.imgcount);
    let circleContainer = imgContainer.parentNode.parentNode.querySelector(".circle-nav");

    if (lastTranslation === 40) {
        lastTranslation = -200;
        imgCountValue = 5;
    } else {
        lastTranslation += translationRate
        imgCountValue -= 1;
    }

    updateCarousel(imgContainer, circleContainer, imgCountValue);
}

function selectImg(imgContainer, circleNum) {
    let imgCount = imgContainer.dataset.imgcount;

    if (imgCount < circleNum) {
        for (let i = imgCount; i < circleNum; i++) {
            next(imgContainer);
        }
    } else {
        for (let i = imgCount; i > circleNum; i--) {
            previous(imgContainer);
        }
    }
}

function selectCircle(circleContainer, circleNum) {
    let circleList = circleContainer.querySelectorAll(".img-circle");
    let circle = circleList[(circleNum - 1)]

    circleList.forEach((circle) => {
        if (circle.classList.contains("selected")) {
            circle.classList.remove("selected");
        }
    });

    circle.classList.add("selected");
}

setInterval(function () {next(document.querySelector(".img-container"))}, 5000)

window.addEventListener("click", function(event) {
    if (event.target.className === "next") {
        let imgContainer = event.target.parentNode.parentNode.querySelector(".img-container");
        next(imgContainer);
    }
    if (event.target.className === "previous") {
        let imgContainer = event.target.parentNode.parentNode.querySelector(".img-container");
        previous(imgContainer);
    }
    if (event.target.className === "img-circle") {
        let parentContainer = event.target.parentNode;

        let imgContainer = parentContainer.parentNode.querySelector(".img-container");

        let circleNum = event.target.dataset.circlenum; //determine this on start

        selectCircle(parentContainer, circleNum);
        selectImg(imgContainer, circleNum);
    }
});

//40 is the "location" of the first image
//-200 is the "location" of the last image
//need to make these values more modular for more/less images, etc.
//do some math in a function that runs on start to calculate the "last" and "first" locations
//maybe lastTranslation - (translationRate * numberOfImgs)






