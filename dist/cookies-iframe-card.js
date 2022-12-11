import {
  LitElement,
  html,
  css,
} from "https://unpkg.com/lit-element@2.4.0/lit-element.js?module";

const setSession = async hass=>{
  var session = (await hass.callWS({
    type: "supervisor/api",
    endpoint: "/ingress/session",
    method: "post"
  })).session;
  document.cookie = `ingress_session=${session};path=/api/hassio_ingress/;SameSite=Strict${"https:" === location.protocol ? ";Secure" : ""}`;
}

class CookiesIframeCard extends LitElement {

  constructor(){
    super();
    this.initialized = 0;
    this.connected = 0;
  }

  static getConfigElement() {
    return document.createElement("cookies-iframe-card-editor");
  }

  static getStubConfig() {
    return {
      title: "",
      url: "https://www.home-assistant.io",
      aspect_ratio: "50%",
    };
  }  

  static get properties() {
    return {
      _config: {},
      hass: { type: Object },
    };
  }
  
  async _setSession() {
    await setSession(this.hass);
    this.initialized = 1;
    this.requestUpdate();
  }

  connectedCallback() {
    if(this.connected == 1){
      return;
    }
    this.connected = 1;
    if(this.initialized == 0){
      this._setSession()
      window.setInterval(async ()=>{
        setSession(this.hass);
      }, 600000)
    }
    super.connectedCallback();
  }
  
  render() {
      
    if(this.initialized == 0){
      return html``;
    }
    
    let padding = this._config.aspect_ratio ? this._config.aspect_ratio : "50%";
    
    return html`
      <ha-card .header=${this._config.title}>
        <div id="root" style = "padding-top: ${padding}">
          <iframe
            src=${this._config.url}
            sandbox="allow-forms allow-modals allow-popups allow-pointer-lock allow-same-origin allow-scripts"
            allowfullscreen="true"
          ></iframe>
        </div>
      </ha-card>
    `;
  }

  setConfig(config) {
      
    if (!config.url) {
      throw new Error("URL required");
    }

    this._config = config;
  }
  
  static get styles() {
    return css`
      ha-card {
        overflow: hidden;
      }
      #root {
        width: 100%;
        position: relative;
      }
      iframe {
        position: absolute;
        border: none;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
      }
    `;
  }

}

customElements.define("cookies-iframe-card", CookiesIframeCard);