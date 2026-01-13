const hamburger = document.getElementById("hamburger");
const navMenu = document.querySelector(".nav-menu");

  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });


// Carousel 1 (Best Selling Coffee)
const prev = document.getElementById("prev");
const next = document.getElementById("next");
const carouselInner = document.getElementById("cCarousel-inner");
const items = document.querySelectorAll(".cCarousel-item");
const indicatorsContainer = document.getElementById("carouselIndicators");

let currentPage = 0;
let itemsPerPage = 3;
let totalPages = 0;
let movementSize = 0;

function getItemsPerPage() {
  if (window.innerWidth <= 510) return 1;
  if (window.innerWidth <= 770) return 2;
  return 3;
}

function initCarousel() {
  itemsPerPage = getItemsPerPage();

  const itemWidth = items[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(carouselInner).gap);

  movementSize = itemWidth * itemsPerPage + gap * (itemsPerPage - 1);
  totalPages = Math.ceil(items.length / itemsPerPage);

  currentPage = Math.min(currentPage, totalPages - 1);
  carouselInner.style.left = -movementSize * currentPage + "px";

  buildDots();
}

function buildDots() {
  indicatorsContainer.innerHTML = "";

  for (let i = 0; i < totalPages; i++) {
    const dot = document.createElement("span");
    dot.classList.add("dot");

    if (i === currentPage) dot.classList.add("active");

    dot.addEventListener("click", () => {
      currentPage = i;
      carouselInner.style.left = -movementSize * currentPage + "px";
      updateDots();
    });

    indicatorsContainer.appendChild(dot);
  }
}

function updateDots() {
  document.querySelectorAll(".dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentPage);
  });
}

prev.addEventListener("click", () => {
  if (currentPage > 0) {
    currentPage--;
    carouselInner.style.left = -movementSize * currentPage + "px";
    updateDots();
  }
});

next.addEventListener("click", () => {
  if (currentPage < totalPages - 1) {
    currentPage++;
    carouselInner.style.left = -movementSize * currentPage + "px";
    updateDots();
  }
});

window.addEventListener("resize", initCarousel);
initCarousel();


/* SHOW FRAPPE MENU ON DROPDOWN */
const dropdown = document.getElementById("categoryDropdown");
const selectMenu = document.getElementById("selectMenu");
const frappeMenu = document.getElementById("frappeMenu");
const espressoMenu = document.getElementById("espressoMenu");
const dessertMenu = document.getElementById("dessertMenu");
const sandwichMenu = document.getElementById("sandwichMenu");


dropdown.addEventListener("change", () => {
  // HIDE ALL MENUS FIRST (INCLUDING SELECT)
  selectMenu.style.display = "none";
  frappeMenu.style.display = "none";
  espressoMenu.style.display = "none";
  dessertMenu.style.display = "none";
  sandwichMenu.style.display = "none";

  switch (dropdown.value) {
    case "select":
      selectMenu.style.display = "block";
      initSelectMenu();
      break;

    case "frappe":
      frappeMenu.style.display = "block";
      initFrappeCarousel();
      break;

    case "espresso":
      espressoMenu.style.display = "block";
      initEspressoCarousel();
      break;

    case "dessert":
      dessertMenu.style.display = "block";
      initDessertCarousel();
      break;

    case "sandwich":
      sandwichMenu.style.display = "block";
      initSandwichCarousel();
      break;
  }
});


const mPrev = document.getElementById("mPrev");
const mNext = document.getElementById("mNext");
const mInner = document.getElementById("menu-inner");
const mItems = document.querySelectorAll(".menu-item");
const mDotsContainer = document.getElementById("mCarouselIndicators");

let mPage = 0;
let mPerPage = 3;
let mTotal = 0;
let mMove = 0;

function mGetPerPage() {
  if (window.innerWidth <= 510) return 1;
  if (window.innerWidth <= 770) return 2;
  return 3;
}

function initSelectMenu() {
  // RESET POSITION
  mPage = 0;
  mInner.style.left = "0px";

  mPerPage = mGetPerPage();

  const itemWidth = mItems[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(mInner).gap);

  mMove = itemWidth * mPerPage + gap * (mPerPage - 1);
  mTotal = Math.ceil(mItems.length / mPerPage);

  buildMDots();
}

function buildMDots() {
  mDotsContainer.innerHTML = "";

  for (let i = 0; i < mTotal; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === mPage ? " active" : "");

    dot.onclick = () => {
      mPage = i;
      mInner.style.left = -mMove * mPage + "px";
      updateMDots();
    };

    mDotsContainer.appendChild(dot);
  }
}

function updateMDots() {
  mDotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === mPage);
  });
}

mPrev.onclick = () => {
  if (mPage > 0) {
    mPage--;
    mInner.style.left = -mMove * mPage + "px";
    updateMDots();
  }
};

mNext.onclick = () => {
  if (mPage < mTotal - 1) {
    mPage++;
    mInner.style.left = -mMove * mPage + "px";
    updateMDots();
  }
};

/* FRAPPE CAROUSEL */
const fPrev = document.getElementById("fPrev");
const fNext = document.getElementById("fNext");
const fInner = document.getElementById("frappe-inner");
const fItems = document.querySelectorAll(".frappe-item");
const fDotsContainer = document.getElementById("fCarouselIndicators");

let fPage = 0;
let fPerPage = 3;
let fTotal = 0;
let fMove = 0;

function fGetPerPage() {
  if (window.innerWidth <= 510) return 1;
  if (window.innerWidth <= 770) return 2;
  return 3;
}

function initFrappeCarousel() {
  // RESET POSITION
  fPage = 0;
  fInner.style.left = "0px";

  fPerPage = fGetPerPage();

  const itemWidth = fItems[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(fInner).gap);

  fMove = itemWidth * fPerPage + gap * (fPerPage - 1);
  fTotal = Math.ceil(fItems.length / fPerPage);

  buildFDots();
}

function buildFDots() {
  fDotsContainer.innerHTML = "";

  for (let i = 0; i < fTotal; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === fPage ? " active" : "");

    dot.onclick = () => {
      fPage = i;
      fInner.style.left = -fMove * fPage + "px";
      updateFDots();
    };

    fDotsContainer.appendChild(dot);
  }
}

function updateFDots() {
  fDotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === fPage);
  });
}

fPrev.onclick = () => {
  if (fPage > 0) {
    fPage--;
    fInner.style.left = -fMove * fPage + "px";
    updateFDots();
  }
};

fNext.onclick = () => {
  if (fPage < fTotal - 1) {
    fPage++;
    fInner.style.left = -fMove * fPage + "px";
    updateFDots();
  }
};


/* ESPRESSO CAROUSEL */
const ePrev = document.getElementById("ePrev");
const eNext = document.getElementById("eNext");
const eInner = document.getElementById("espresso-inner");
const eItems = document.querySelectorAll(".espresso-item");
const eDotsContainer = document.getElementById("eCarouselIndicators");

let ePage = 0;
let ePerPage = 3;
let eTotal = 0;
let eMove = 0;

function eGetPerPage() {
  if (window.innerWidth <= 510) return 1;
  if (window.innerWidth <= 770) return 2;
  return 3;
}

function initEspressoCarousel() {
  ePage = 0;
  eInner.style.left = "0px";

  ePerPage = eGetPerPage();

  const itemWidth = eItems[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(eInner).gap);

  eMove = itemWidth * ePerPage + gap * (ePerPage - 1);
  eTotal = Math.ceil(eItems.length / ePerPage);

  buildEDots();
}

function buildEDots() {
  eDotsContainer.innerHTML = "";

  for (let i = 0; i < eTotal; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === ePage ? " active" : "");

    dot.onclick = () => {
      ePage = i;
      eInner.style.left = -eMove * ePage + "px";
      updateEDots();
    };

    eDotsContainer.appendChild(dot);
  }
}

function updateEDots() {
  eDotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === ePage);
  });
}

ePrev.onclick = () => {
  if (ePage > 0) {
    ePage--;
    eInner.style.left = -eMove * ePage + "px";
    updateEDots();
  }
};

eNext.onclick = () => {
  if (ePage < eTotal - 1) {
    ePage++;
    eInner.style.left = -eMove * ePage + "px";
    updateEDots();
  }
};


/* DESSERT CAROUSEL */
const dPrev = document.getElementById("dPrev");
const dNext = document.getElementById("dNext");
const dInner = document.getElementById("dessert-inner");
const dItems = document.querySelectorAll(".dessert-item");
const dDotsContainer = document.getElementById("dCarouselIndicators");

let dPage = 0;
let dPerPage = 3;
let dTotal = 0;
let dMove = 0;

function dGetPerPage() {
  if (window.innerWidth <= 510) return 1;
  if (window.innerWidth <= 770) return 2;
  return 3;
}

function initDessertCarousel() {
  // RESET POSITION
  dPage = 0;
  dInner.style.left = "0px";

  dPerPage = dGetPerPage();

  const itemWidth = dItems[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(dInner).gap);

  dMove = itemWidth * dPerPage + gap * (dPerPage - 1);
  dTotal = Math.ceil(dItems.length / dPerPage);

  buildDDots();
}

function buildDDots() {
  dDotsContainer.innerHTML = "";

  for (let i = 0; i < dTotal; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === dPage ? " active" : "");

    dot.onclick = () => {
      dPage = i;
      dInner.style.left = -dMove * dPage + "px";
      updateDDots();
    };

    dDotsContainer.appendChild(dot);
  }
}

function updateDDots() {
  dDotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === dPage);
  });
}

dPrev.onclick = () => {
  if (dPage > 0) {
    dPage--;
    dInner.style.left = -dMove * dPage + "px";
    updateDDots();
  }
};

dNext.onclick = () => {
  if (dPage < dTotal - 1) {
    dPage++;
    dInner.style.left = -dMove * dPage + "px";
    updateDDots();
  }
};

/* SANDWICH CAROUSEL */
const sPrev = document.getElementById("sPrev");
const sNext = document.getElementById("sNext");
const sInner = document.getElementById("sandwich-inner");
const sItems = document.querySelectorAll(".sandwich-item");
const sDotsContainer = document.getElementById("sCarouselIndicators");

let sPage = 0;
let sPerPage = 3;
let sTotal = 0;
let sMove = 0;

function sGetPerPage() {
  if (window.innerWidth <= 510) return 1;
  if (window.innerWidth <= 770) return 2;
  return 3;
}

function initSandwichCarousel() {
  // RESET POSITION
  sPage = 0;
  sInner.style.left = "0px";

  sPerPage = sGetPerPage();

  const itemWidth = sItems[0].offsetWidth;
  const gap = parseFloat(getComputedStyle(sInner).gap);

  sMove = itemWidth * sPerPage + gap * (sPerPage - 1);
  sTotal = Math.ceil(sItems.length / sPerPage);

  buildSDots();
}

function buildSDots() {
  sDotsContainer.innerHTML = "";

  for (let i = 0; i < sTotal; i++) {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === sPage ? " active" : "");

    dot.onclick = () => {
      sPage = i;
      sInner.style.left = -sMove * sPage + "px";
      updateSDots();
    };

    sDotsContainer.appendChild(dot);
  }
}

function updateSDots() {
  sDotsContainer.querySelectorAll(".dot").forEach((dot, i) => {
    dot.classList.toggle("active", i === sPage);
  });
}

sPrev.onclick = () => {
  if (sPage > 0) {
    sPage--;
    sInner.style.left = -sMove * sPage + "px";
    updateSDots();
  }
};

sNext.onclick = () => {
  if (sPage < sTotal - 1) {
    sPage++;
    sInner.style.left = -sMove * sPage + "px";
    updateSDots();
  }
};

/* GLOBAL RESIZE HANDLER */
window.addEventListener("resize", () => {
  if (frappeMenu.style.display === "block") {
    initFrappeCarousel();
  }
  if (espressoMenu.style.display === "block") {
    initEspressoCarousel();
  }

  if (dessertMenu.style.display === "block") {
    initDessertCarousel();
  }

  if (sandwichMenu.style.display === "block") {
    initSandwichCarousel();
  }

  if (selectMenu.style.display === "block") {
    initSelectMenu();
  }
});

