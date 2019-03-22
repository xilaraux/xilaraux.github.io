import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
// import '../icon-toggle.js';

/**
 * @customElement
 * @polymer
 */
class AppRoot extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
          font-family: sans-serif;
          
          --icon-toggle-color: red;
          --icon-toggle-outline-color: black;
          --icon-toggle-pressed-color: red;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      
      <!-- <icon-toggle toggle-icon="star" pressed></icon-toggle> -->
    `;
  }

  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'app-root'
      }
    };
  }
}

window.customElements.define('app-root', AppRoot);
