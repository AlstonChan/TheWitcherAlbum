import "../style.css";
import { resizeEvent } from "./handler";

// Web Component
const template = document.createElement("template");
template.innerHTML = `
      <style>
        .modalContainer {
          position: relative;
        }
        .modalImg {
          width: 90vw;
          max-height: 100vh;
          aspect-ratio: 16/9;
          object-fit: contain;
        }
        button {
          appearance: none;
          border: none;
          background: none;
          position: absolute;
          top: 15px;
          right: 15px;
          width: 50px;
          cursor: pointer;

          transition: transform 160ms ease-in-out;
        }
        button:hover {
          transform: scale(1.05);
        }

        @media screen and (max-width: 450px) {
          button {
            top: 10px;
            right: 10px;
            width: 30px;
          }
        }
      </style> 

      <div class="modalContainer">
        <div class="modal">
            <picture>
              <source srcset="" type="image/avif" />
              <source srcset="" type="image/webp" />
              <img
                src=""
                alt=""
                class="modalImg"
              />
            </picture>
        </div>
        <button id="cancelFullScreen">
          <img src="cancel.svg" alt="cancel icon" style="width: 100%; vertical-align: middle;" />
        </button>
      </div>`;

class PictureModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const sourceImg = this.shadowRoot.querySelectorAll("source");
    sourceImg.forEach((node) => {
      const attr = node.getAttribute("type");
      if (attr === "image/avif") node.srcset = this.getAttribute("avif");
      if (attr === "image/webp") node.srcset = this.getAttribute("webp");
    });
    this.shadowRoot.querySelector("img").src = this.getAttribute("jpg");
    this.shadowRoot.querySelector("img").alt = this.getAttribute("desc");
  }
}

customElements.define("picture-modal", PictureModal);

// initialize
resizeEvent();
