import { resizeEvent } from "./handler";
import pictureArr from "./pictureArr";

const cardHolder = document.getElementById("cardHolder");
for (const pic of pictureArr) {
  const pictureCardElement = document.createElement("picture-card");
  pictureCardElement.setAttribute("pic", pic.picSrc);
  pictureCardElement.setAttribute("desc", pic.desc);
  pictureCardElement.setAttribute("obj-pos", pic.objPos);
  pictureCardElement.classList.add("card");
  cardHolder.appendChild(pictureCardElement);
}

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
          filter: saturate(50%);
        }
        .isActive {
          filter: saturate(100%);
          border-radius: 10px;
          box-shadow:  7px 0px 5px #00cfc3, -7px 0px 5px #00cfc3;
          cursor: pointer;
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
      </div>`;

class PictureCard extends HTMLElement {
  constructor() {
    super();

    this.open = false;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector("source").srcset = this.getAttribute("pic");
    this.shadowRoot.querySelector("img").src = this.getAttribute("pic");
    this.shadowRoot.querySelector("img").alt = this.getAttribute("desc");
    this.shadowRoot.querySelector("img").style.objectPosition =
      this.getAttribute("obj-pos");
  }
}

customElements.define("picture-card", PictureCard);

// initialize
resizeEvent();
