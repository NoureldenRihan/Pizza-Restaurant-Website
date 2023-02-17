let pizzaData = [];
let pizzaImgs = [
  "./imgs/Pizza-01.jpg",
  "./imgs/Pizza-02.jpg",
  "./imgs/Pizza-03.jpg",
  "./imgs/Pizza-04.jpg",
  "./imgs/Pizza-05.jpg",
  "./imgs/Pizza-06.jpg",
  "./imgs/Pizza-07.jpg",
];
let imgCurrentIndex = 0;
let colorpalettes = {
  1: ["#ff7800", "#ffbc97", "#ffe300"],
  2: ["#d63447", "#f57b51", "#ffd31d"],
  3: ["#b31313", "#ff9000", "#fdda16"],
};
let backgroundImgs = [
  "./imgs/pizza-restaurent-banner-cropped-1920.jpg",
  "./imgs/pizza-restaurent-banner-2-1920.jpg",
  "./imgs/pizza-restaurent-banner-3-1920.jpg",
  "./imgs/pizza-restaurent-banner-4-1920.jpg",
];
let leftImg = document.getElementById("leftImg");
let middleImg = document.getElementById("middleImg");
let rightImg = document.getElementById("rightImg");

window.onload = () => {
  gallerySetup();

  randBackground();

  fetch("https://pizza-data-api.cyclic.app/pizzas")
    .then((res) => res.json())
    .then((data) => {
      menuSetup(data);
      pizzaData = [...data];
    });

  let currentPallete = localStorage.getItem("paletteNum");

  if (currentPallete === null) {
    localStorage.setItem("paletteNum", "1");
    currentPallete = localStorage.getItem("paletteNum");
  } else {
    initialColorSetup(currentPallete);
  }
};

// Fetching data every 10 Minutes to Keep the Menu Updated
setInterval(() => {
  fetch("https://pizza-data-api.cyclic.app/pizzas")
    .then((res) => res.json())
    .then((data) => {
      menuSetup(data);
      pizzaData = [...data];
    });
}, 600000);

// Setting up Form to display a text after fake submitting
document.getElementById("fake-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".reserve").style.opacity = "0";
  setTimeout(() => {
    document.querySelector(
      ".reserve"
    ).innerHTML = `<h1 class='reserved'>Reservation Complete</h1>`;
  }, 600);
  setTimeout(() => {
    document.querySelector(".reserve").style.opacity = "1";
  }, 900);
});

// Setting up Gallery Imgs Close Up view by clicking them
document.querySelectorAll(".main-gallery .gallery-img img").forEach((el) => {
  el.addEventListener("click", (e) => {
    if (e.target.classList.contains("closeup")) {
      document
        .querySelectorAll(".main-gallery .gallery-img img")
        .forEach((el) => el.classList.remove("closeup"));
    } else {
      document
        .querySelectorAll(".main-gallery .gallery-img img")
        .forEach((el) => el.classList.remove("closeup"));
      e.target.classList.add("closeup");
    }
  });
});

// Setting up opening and Closing of Options Box
document.querySelector(".options-area .icon").addEventListener("click", (e) => {
  let box = document.querySelector(".options-box");
  if (box.style.left !== "0px") {
    box.style.left = "0";
    document.querySelector(".options-area .icon").style.left = "39.7vw";
    document.querySelector(".options-area .icon").style.transform =
      "rotate(180deg)";
  } else {
    box.style.left = "-100vw";
    document.querySelector(".options-area .icon").style.left = "0";
    document.querySelector(".options-area .icon").style.transform =
      "rotate(0deg)";
  }
});

// Setting up Menu by receiving data from an Ajax Fetch Call to setup the Markup for the Menu Items
function menuSetup(data) {
  document.getElementById("main-menu").innerHTML = "";
  data.forEach((pizza) => {
    let pizzaTags = pizzaInfoSetup(pizza.tags);
    let pizzaIng = pizzaInfoSetup(pizza.ingredients);
    let menuItemTemplate = `
    <div id="${pizza.id}" class="menu-item">
        <h1>${pizza.name}</h1>
        <h2>${pizza.price}$</h2>
        <h3>${pizzaTags}</h3>
        <h4>Made with: ${pizzaIng}</h4>
    </div>`;
    document.getElementById("main-menu").innerHTML += menuItemTemplate;
  });
}

// Fix and Adjust Pizza Info by setting up commas and periods
function pizzaInfoSetup(pizzaData) {
  let pizzaInfo = "";
  let dataMaxIndex = pizzaData.length - 1;
  for (let i = 0; i < pizzaData.length; i++) {
    if (i !== dataMaxIndex) {
      pizzaInfo += pizzaData[i] + ", ";
    } else {
      pizzaInfo += pizzaData[i] + "";
      return pizzaInfo;
    }
  }
}

// Initial Setup for Gallery
function gallerySetup() {
  leftImg.src = `${pizzaImgs[0]}`;
  middleImg.src = `${pizzaImgs[1]}`;
  rightImg.src = `${pizzaImgs[2]}`;
  imgCurrentIndexLeft = 2;
  imgCurrentIndexRight = 0;
}

// Setting up Gallery Icon Actions by shifting images by one according to the direction
function moveGallery(direction) {
  document
    .querySelectorAll(".main-gallery .gallery-img img")
    .forEach((el) => el.classList.remove("closeup"));
  let imgsMaxIndex = pizzaImgs.length - 1;
  if (direction === "right") {
    document
      .querySelectorAll(".gallery-img")
      .forEach((el) => (el.style.opacity = "0"));
    setTimeout(() => {
      if (imgCurrentIndexLeft < imgsMaxIndex) {
        leftImg.src = middleImg.src;
        middleImg.src = rightImg.src;
        rightImg.src = `${pizzaImgs[imgCurrentIndexLeft + 1]}`;
        imgCurrentIndexLeft += 1;
        imgCurrentIndexRight += 1;
        imgCurrentIndexRight >= 8 ? (imgCurrentIndexRight = 0) : "";
      } else {
        imgCurrentIndexLeft = 0;
        leftImg.src = middleImg.src;
        middleImg.src = rightImg.src;
        rightImg.src = `${pizzaImgs[0]}`;
      }
      document
        .querySelectorAll(".gallery-img")
        .forEach((el) => (el.style.opacity = "1"));
    }, 400);
  } else if (direction === "left") {
    document
      .querySelectorAll(".gallery-img")
      .forEach((el) => (el.style.opacity = "0"));
    setTimeout(() => {
      if (imgCurrentIndexRight > 0) {
        rightImg.src = middleImg.src;
        middleImg.src = leftImg.src;
        leftImg.src = `${pizzaImgs[imgCurrentIndexRight - 1]}`;
        imgCurrentIndexRight -= 1;
        imgCurrentIndexLeft -= 1;
        imgCurrentIndexLeft <= -1 ? (imgCurrentIndexLeft = imgsMaxIndex) : "";
      } else {
        imgCurrentIndexRight = imgsMaxIndex;
        rightImg.src = middleImg.src;
        middleImg.src = leftImg.src;
        leftImg.src = `${pizzaImgs[imgsMaxIndex]}`;
      }
      document
        .querySelectorAll(".gallery-img")
        .forEach((el) => (el.style.opacity = "1"));
    }, 400);
  }
}

// Randomize Background by looping through images and assigning them
function randBackground() {
  let num = 1;
  setInterval(() => {
    document.getElementById(
      "landing"
    ).style.backgroundImage = `url('${backgroundImgs[num]}')`;
    num += 1;
    if (num >= backgroundImgs.length) {
      num = 0;
    }
  }, 5000);
}

// Adding Click Event Listener for each palette
document.querySelectorAll(".palette").forEach((el) => {
  el.addEventListener("click", (e) => colorpalettesSetup(e));
});

document.querySelector(".p1").style.backgroundColor = `${colorpalettes[1][0]}`;
document.querySelector(".p2").style.backgroundColor = `${colorpalettes[2][0]}`;
document.querySelector(".p3").style.backgroundColor = `${colorpalettes[3][0]}`;

// Initial Color Setup from Local Storage
function initialColorSetup(num) {
  let currentColors = colorpalettes[num];
  document.documentElement.style.setProperty("--main-color", currentColors[0]);
  document.documentElement.style.setProperty(
    "--main-alt-color",
    currentColors[1]
  );
  document.documentElement.style.setProperty(
    "--secondary-color",
    currentColors[2]
  );
}

//Setting Color Palettes
function colorpalettesSetup(e) {
  document
    .querySelectorAll(".palette")
    .forEach((el) => el.classList.remove("active"));
  e.target.classList.add("active");
  let currentColors = colorpalettes[e.target.dataset.num];
  document.documentElement.style.setProperty("--main-color", currentColors[0]);
  document.documentElement.style.setProperty(
    "--main-alt-color",
    currentColors[1]
  );
  document.documentElement.style.setProperty(
    "--secondary-color",
    currentColors[2]
  );
  localStorage.setItem("paletteNum", e.target.dataset.num);
}

// Decrease the Height of Navbar when Scrolling
window.onscroll = () => {
  let windowHeight = window.innerHeight;
  let menuHeight = document.getElementById("menu").offsetHeight;
  let menuTop = document.getElementById("menu").offsetTop;
  let windowY = window.pageYOffset;
  let logoHeight = document.querySelector("#navbar .logo").offsetHeight + 10;

  if (windowY > menuTop + menuHeight * 0.1 - windowHeight) {
    document.getElementById("navbar").classList.add("movedNavbar");
    document.querySelector(".navbar").style.top = `-${logoHeight}px`;
  } else {
    document.querySelector(".navbar").style.top = `0`;
    document.getElementById("navbar").classList.remove("movedNavbar");
  }
};
