import "./style.css";

const parentCard = document.querySelectorAll("picture-card");
function updateUI() {
  for (const node of parentCard) {
    if (state.activeNum == node.getAttribute("data-num")) {
      node.classList.add("isActive");
      node.shadowRoot.querySelector(".container").classList.add("isActive");
    } else {
      node.classList.remove("isActive");
      node.shadowRoot.querySelector(".container").classList.remove("isActive");
    }
  }
}

const activeCard = { activeNum: Math.ceil(parentCard.length / 2) };
const handler = {
  set(obj, prop, value) {
    obj[prop] = value;
    updateUI();
    return Reflect.set(...arguments);
  },
};
const state = new Proxy(activeCard, handler);

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
        .cardDet:hover {
          transform: scale(1.1);
          border-radius: 10px;
          box-shadow: 8px 8px 13px #00cfc3,
                      -8px -8px 13px #00cfc3;
        }
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
    if (e.target.dataset.num == state.activeNum) return;
    if (e.target.dataset.num != state.activeNum) {
      state.activeNum = this.getAttribute("data-num");
    }
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".cardDet")
      .addEventListener("click", (e) => this.toggleExpand(e));
    if (this.getAttribute("data-num") == state.activeNum) {
      this.classList.add("isActive");
      this.shadowRoot.querySelector(".container").classList.add("isActive");
    }
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector(".card").removeEventListener();
  }
}

customElements.define("picture-card", PictureCard);
