import "./style.css";

// ================== //
// current active picture state
const parentCard = document.querySelectorAll("picture-card");
function updateUI() {
  for (const node of parentCard) {
    if (activePicture.activeNum == node.getAttribute("data-num")) {
      node.classList.add("isActive");
      node.shadowRoot.querySelector(".container").classList.add("isActive");
    } else {
      node.classList.remove("isActive");
      node.shadowRoot.querySelector(".container").classList.remove("isActive");
    }
  }
}

// state
const activePicture = new Proxy(
  { activeNum: Math.ceil(parentCard.length / 2) },
  {
    set(obj, prop, value) {
      obj[prop] = value;
      updateUI();
      return Reflect.set(...arguments);
    },
  }
);

// ================== //
// number of picture card can be shown on screen
const resizeEvent = () => {
  if (window.innerWidth > 2100) {
    if (onScreenCard.num == 7) return;
    onScreenCard.num = 7;
  } else if (window.innerWidth > 1440) {
    if (onScreenCard.num == 5) return;
    onScreenCard.num = 5;
  } else if (window.innerWidth > 600) {
    if (onScreenCard.num == 3) return;
    onScreenCard.num = 3;
  } else if (window.innerWidth <= 600) {
    if (onScreenCard.num == 1) return;
    onScreenCard.num = 1;
  }
};
window.addEventListener("resize", resizeEvent);

function updateCardNum() {
  const parentCard = document.querySelectorAll("picture-card");
  for (const node of parentCard) {
    if (parentCard[Math.floor(onScreenCard.num / 2)] == node) {
      node.shadowRoot.querySelector("img").style.height = "600px";
      console.log(node);
      node.style.width = `${(100 / onScreenCard.num) * 2}%`;
    } else {
      node.shadowRoot.querySelector("img").style.height = "";
      node.style.width = `${
        (100 - (100 / onScreenCard.num) * 2) / (onScreenCard.num - 1)
      }%`;
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

// image corousel
const leftNavBtn = document.getElementById("leftNav");
const rightNavBtn = document.getElementById("rightNav");

const handleImgCarousel = (e) => {
  const parentNode = document.getElementById("cardHolder");

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
    }, 150);
  }
};

leftNavBtn.addEventListener("click", handleImgCarousel);
rightNavBtn.addEventListener("click", handleImgCarousel);

// Web Component
const template = document.createElement("template");
template.innerHTML = `
      <style>
        .cardDet{
          position: relative; 
          display: inline-block;
          appearance: none;
          border: none;
          background: none;
          outline: none;
          padding: 0;
          margin: 0;
          transition: transform 200ms ease-in-out
        }
        // .cardDet:hover {
        //   transform: scale(1.1);
        //   border-radius: 10px;
        //   box-shadow: 8px 8px 13px #00cfc3,
        //               -8px -8px 13px #00cfc3;
        // }
        .cardImg {
          width: 100%;
          height: 500px;
          object-fit: cover;
          object-position: center;
          border-radius: 10px;
          vertical-align: middle;
        }
        .container {
          display: inline-block;
          position: absolute;
          z-index: 1;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 10px;
          cursor: pointer;
        }
        .fade {
          background-color: rgb(0,0,0,0.31);
        }
        .isActive {
          background: none;
        }
      </style> 

      <div class="cardDet">
        <picture>
          <source srcset="" type="image/webp" />
          <img
            src=""
            alt=""
            class="cardImg"
          />
        </picture>
        <div class="fade container"></div>
      </div>`;

class PictureCard extends HTMLElement {
  constructor() {
    super();

    this.open = false;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("source").srcset =
      this.getAttribute("src-des");
    this.shadowRoot.querySelector("img").src = this.getAttribute("pic");
    this.shadowRoot.querySelector("img").alt = this.getAttribute("desc");
    this.shadowRoot.querySelector("img").style.objectPosition =
      this.getAttribute("obj-pos");
  }

  toggleExpand(e) {
    if (e.target.dataset.num == activePicture.activeNum) return;
    if (e.target.dataset.num != activePicture.activeNum) {
      activePicture.activeNum = this.getAttribute("data-num");
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".cardDet")
      .addEventListener("click", (e) => this.toggleExpand(e));
    if (this.getAttribute("data-num") == activePicture.activeNum) {
      this.classList.add("isActive");
      this.shadowRoot.querySelector(".container").classList.add("isActive");
    }
  }
  disconnectedCallback() {
    this.shadowRoot
      .querySelector(".cardDet")
      .removeEventListener("click", (e) => this.toggleExpand(e));
  }
}

customElements.define("picture-card", PictureCard);

// initialize
resizeEvent();
