import "./style.css";

const template = document.createElement("template");
template.innerHTML = `
      <style>
        .cardDet{
          position: relative; 
          width: fit-content; 
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
          z-index: 20;
        }
        .cardImg {
          width: 200px;
          height: 500px;
          object-fit: cover;
          object-position: center;
          border-radius: 10px;
          vertical-align: middle;
          transition: width 200ms ease-in-out
        }
        .container {
          display: inline-block;
          position: absolute;
          z-index: 10;
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
          width: 600px;
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
    console.log(e);
  }

  connectedCallback() {
    this.shadowRoot
      .querySelector(".cardDet")
      .addEventListener("click", (e) => this.toggleExpand(e));
  }
  disconnectedCallback() {
    this.shadowRoot.querySelector(".card").removeEventListener();
  }
}

customElements.define("picture-card", PictureCard);
