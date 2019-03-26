import {requestImage} from './utils/giphy.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    :host {
        width: 100%;
        height: 100%;
    }
    
    .app {
        width: 100vw;
        height: 100vh;
    }
  </style>
  
  <video class="app" width="500" height="500" autoplay></video>
`;

class AppRoot extends HTMLElement {
  static get observedAttributes() {
    console.log('observedAttributes');
    return [
      'redirect-to',
    ];
  }

  constructor() {
    super();
    console.log('constructor');

    this._shadowRoot = this.attachShadow({ 'mode': 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    this._app = this._shadowRoot.querySelector('.app');

    this.addEventListener('onFetched', (e) => { this.handleFetchedImage(e) });

    requestImage().then((e) => {this.handleLoadingImage(e)});
  }

  connectedCallback() {
    console.log('connectedCallback');
  }

  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  attributeChangedCallback(name, oldVal, newVal) {
    console.log(name, oldVal, newVal);
    console.log('attributeChangedCallback');
  }

  adoptedCallback() {
    console.log('adoptedCallback');
  }

  handleLoadingImage(imageURL) {
    this.dispatchEvent(new CustomEvent('onFetched', { detail: imageURL }));
  }

  handleFetchedImage(event) {
    const imageURL = event.detail;

    this.setAppSource(imageURL);
  }

  setAppSource(url) {
    const source = document.createElement('source');
    source.setAttribute('src', url);

    this._app && this._app.appendChild(source);
    this._app.play();

    // Temporary fix for mobile Chrome
    this._app.addEventListener('click', () => this._app.play());
  }
}

window.customElements.define('app-root', AppRoot);
