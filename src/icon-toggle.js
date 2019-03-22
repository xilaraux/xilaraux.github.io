import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';

class IconTogle extends PolymerElement {
  static get template() {
    console.log('template');

    // TODO: find out whether native WebComponents should return HTMLTemplateElement or it could be just TemplateString
    return html`
      <style>
        :host {
            display: inline-block;
            color: var(--icon-toggle-color, red);
        }
        
        iron-icon {
            fill: var(--icon-toggle-color, rgba(0, 0, 0, 0));
            stroke: var(--icon-toggle-outline-color, currentcolor);
        }
        
        :host([pressed]) iron-icon {
            fill: var(--icon-toggle-pressed-color, currentcolor); 
        }
      </style>
      
      <!-- shadow DOM goes here -->
      <span>Props:</span>
      <span>[[toggleIcon]]</span>
      <iron-icon icon="[[toggleIcon]]"></iron-icon>
    `;
  }

  static get properties() {
    console.log('properties');

    return {
      toggleIcon: {
        type: String,
      },
      pressed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true,
      },
    };
  }

  constructor() {
    super();
    console.log('constructor');

    this.addEventListener('click', this.toggle.bind(this));
  }

  toggle() {
    console.log('toggle');
    this.pressed = !this.pressed;
  }
}

window.customElements.define('icon-toggle', IconTogle);
