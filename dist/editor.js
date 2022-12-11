import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

const SCHEMA = [
  { name: "title", selector: { text: {} } },
  {
    name: "",
    type: "grid",
    schema: [
      { name: "url", required: true, selector: { text: {} } },
      { name: "aspect_ratio", selector: { text: {} } }
    ]
  }
];

class CookiesIframeCardEditor extends LitElement {
    
  static get properties() {
    return {
      _config: {},
      hass: { type: Object },
    };
  }
  
  setConfig(config) {
    this._config = config;
  }

  render() {
    return html`
      <ha-form
        @value-changed=${this._valueChanged}
        .hass=${this.hass}
        .data=${this._config}
        .schema=${SCHEMA}
      ></ha-form>
      `;
  }
  
  _valueChanged(ev) {
    const event = new Event("config-changed", {
      bubbles: true,
      composed: true
    });
    event.detail = {config: ev.detail.value};
    this.dispatchEvent(event);
  }
}

customElements.define("cookies-iframe-card-editor", CookiesIframeCardEditor);
window.customCards = window.customCards || [];
window.customCards.push({
  type: "cookies-iframe-card",
  name: "Cookies Iframe Card",
  preview: false, 
  description: "custom iframe card with supervisor ingress cookies"
});