const images = [
    { 
        alt: "Image for the slider 1",
        src: "images/slide_1.jpg"
    },
    { 
        alt: "Image for the slider 2",
        src: "images/slide_2.jpg"
    },
    { 
        alt: "Image for the slider 3",
        src: "images/slide_3.jpg"
    },
    { 
        alt: "Image for the slider 4",
        src: "images/slide_4.jpg"
    },
    { 
        alt: "Image for the slider 5",
        src: "images/slide_5.jpg"
    },
    { 
        alt: "Image for the slider 6",
        src: "images/slide_6.jpg"
    },
    { 
        alt: "Image for the slider 7",
        src: "images/slide_7.jpg"
    },
    { 
        alt: "Image for the slider 8",
        src: "images/slide_8.jpg"
    },
];

//get elements
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const sliderElem = document.querySelector(".slider_element");
const sliderImage = sliderElem.querySelector(".slider_image");
const sliderCounter = sliderElem.querySelector(".numbertext");

let length = images.length;
let slideIdx = 0;

//set initial slide
sliderImage.setAttribute('src', images[slideIdx].src);
sliderImage.setAttribute('alt', images[slideIdx].alt);
sliderCounter.innerHTML = `${slideIdx+1} / ${length}`;

const updateSlideIdx = function(n) {
    slideIdx += n;
    if(slideIdx == -1) {
        slideIdx = length-1;
    }

    if(slideIdx == length) {
        slideIdx = 0;
    }
    return slideIdx;
};

//remove class for animation to allow add animation to the next slide
function handleEndAnimation() {
    sliderImage.removeEventListener("animationend", handleEndAnimation, false);
    sliderImage.classList.remove('slider_animation');
}

const changeSlide = function(evt, n) {
    evt.preventDefault();

    if(sliderImage.classList.contains('slider_animation')) {
        sliderImage.classList.remove('slider_animation');
    } else {
        sliderImage.classList.add('slider_animation');
        sliderImage.addEventListener("animationend", handleEndAnimation, false);
    }

    slideIdx = updateSlideIdx(n);
    sliderImage.setAttribute('src', images[slideIdx].src);
    sliderImage.setAttribute('alt', images[slideIdx].alt);
    sliderCounter.innerHTML = `${slideIdx+1} / ${length}`;
};

//add listeners
prevBtn.addEventListener("click", (evt) =>
    changeSlide(evt, -1)
);
nextBtn.addEventListener("click", (evt) => 
    changeSlide(evt, 1)
);