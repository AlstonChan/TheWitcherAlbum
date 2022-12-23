import "../style.css";

// picture-card.js
// ================== //
// number of picture card can be shown on screen
export const resizeEvent = () => {
  if (window.innerWidth > 2100) {
    if (onScreenCard.num == 7) return;
    onScreenCard.num = 7;
  } else if (window.innerWidth >= 1440) {
    if (onScreenCard.num == 5) return;
    onScreenCard.num = 5;
  } else if (window.innerWidth < 1440) {
    if (onScreenCard.num == 3) return;
    onScreenCard.num = 3;
  }
};
window.addEventListener("resize", resizeEvent);

const handleActiveImg = (e) => {
  const modal = document.createElement("picture-modal");
  modal.setAttribute("jpg", e.target.getAttribute("jpg"));
  modal.setAttribute("webp", e.target.getAttribute("webp"));
  modal.setAttribute("avif", e.target.getAttribute("avif"));

  modal.setAttribute("desc", e.target.getAttribute("desc"));
  document.querySelector("main").appendChild(modal);

  toggleFullImg.open = true;
};

function updateCardNum() {
  const parentCard = document.querySelectorAll("picture-card");
  for (const node of parentCard) {
    // if the img card IS in the middle
    if (parentCard[Math.floor(onScreenCard.num / 2)] == node) {
      if (onScreenCard.num > 5) {
        node.shadowRoot.querySelector("img").style.height = "650px";
      } else if (onScreenCard.num > 3) {
        node.shadowRoot.querySelector("img").style.height = "550px";
      } else node.shadowRoot.querySelector("img").style.height = "450px";
      node.style.width = `${(100 / onScreenCard.num) * 2}%`;
      node.shadowRoot.querySelector("img").classList.add("isActive");
      node.addEventListener("click", handleActiveImg);
    } else {
      // if the img card IS NOT in the middle
      node.shadowRoot.querySelector("img").style.height = "";
      node.style.width = `${
        (100 - (100 / onScreenCard.num) * 2) / (onScreenCard.num - 1)
      }%`;
      node.classList.remove("isActive");
      node.shadowRoot.querySelector("img").classList.remove("isActive");
      node.removeEventListener("click", handleActiveImg);
    }
  }
}

// state
const onScreenCard = new Proxy(
  { num: 0 },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      updateCardNum();
      return Reflect.set(...arguments);
    },
  }
);

// ================== //
// cooldown for nav btn
// state
const navBtnCooldown = new Proxy(
  { onCooldown: false },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      return Reflect.set(...arguments);
    },
  }
);

// image corousel
const leftNavBtn = document.getElementById("leftNav");
const rightNavBtn = document.getElementById("rightNav");

const handleImgCarousel = (e) => {
  const parentNode = document.getElementById("cardHolder");
  if (navBtnCooldown.onCooldown) return;
  navBtnCooldown.onCooldown = true;

  if (e.currentTarget.getAttribute("id") === "rightNav") {
    parentNode.firstElementChild.style.marginLeft = `-${
      (100 - (100 / onScreenCard.num) * 2) / (onScreenCard.num - 1)
    }%`;
    const firstElementChild = parentNode.firstElementChild.cloneNode(true);
    setTimeout(() => {
      firstElementChild.style.marginLeft = `0`;
      parentNode.removeChild(parentNode.firstElementChild);
      parentNode.insertBefore(firstElementChild, null);
      updateCardNum();
      navBtnCooldown.onCooldown = false;
    }, 500);
  }

  if (e.currentTarget.getAttribute("id") === "leftNav") {
    const lastElementChild = parentNode.lastElementChild.cloneNode(true);
    lastElementChild.style.marginLeft = `-${
      (100 - (100 / onScreenCard.num) * 2) / (onScreenCard.num - 1)
    }%`;
    parentNode.insertBefore(lastElementChild, parentNode.firstElementChild);
    parentNode.removeChild(parentNode.lastElementChild);
    setTimeout(() => {
      parentNode.firstElementChild.style.marginLeft = `0`;
      updateCardNum();
      navBtnCooldown.onCooldown = false;
    }, 225);
  }
};

leftNavBtn.addEventListener("click", handleImgCarousel);
rightNavBtn.addEventListener("click", handleImgCarousel);

// picture-modal.js
// ================== //
// toggle fullscreen image
const fullImgBtn = () => {
  if (toggleFullImg.open) {
    const pictureModal = document.querySelector("picture-modal");
    const btn = pictureModal.shadowRoot.getElementById("cancelFullScreen");
    btn.removeEventListener("click", fullImgBtn);
    pictureModal.parentNode.removeChild(pictureModal);
    toggleFullImg.open = false;
  }
};

const triggerFullImg = () => {
  if (toggleFullImg.open) {
    const btn = document
      .querySelector("picture-modal")
      .shadowRoot.getElementById("cancelFullScreen");
    btn.addEventListener("click", fullImgBtn);
  }
};

// state
const toggleFullImg = new Proxy(
  { open: false },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      triggerFullImg();
      return Reflect.set(...arguments);
    },
  }
);
