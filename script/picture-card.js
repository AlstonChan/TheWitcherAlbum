import "../style.css";
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
        .cardImg {
          width: 100%;
          height: 350px;
          object-fit: cover;
          object-position: center;
          border-radius: 10px;
          vertical-align: middle;
          filter: saturate(50%);
        }
        .isActive {
          filter: saturate(100%);
          border-radius: 10px;
          cursor: pointer;
          transition: box-shadow 160ms ease-in-out
        }
        .isActive:hover {
          box-shadow:  7px 0px 5px #00cfc3, -7px 0px 5px #00cfc3;
        }
        
        @media screen and (min-width:2100px) {
          .cardImg {
            height: 550px;
          }
        }
        @media screen and (min-width:1440px) {
          .cardImg {
            height: 450px;
          }
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
