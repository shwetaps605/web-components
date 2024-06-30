

class Tooltip extends HTMLElement {
    _tooltipContainer;
    _tooltipText = "dummy dum dum!"

    constructor() {
        super()
        console.log("tooltip working!")
        this.attachShadow({mode: true})
    }

    connectedCallback() {
        const tooltip = document.createElement('span')
        tooltip.textContent = "(?)"
        this.shadowRoot.appendChild(tooltip)
        this.addEventListener('mouseenter',()=>{
            this._tooltipContainer = document.createElement('div')
            this._tooltipContainer.textContent = this._tooltipText 
            if(this.hasAttribute('text')){
                this._tooltipContainer.textContent = this.getAttribute('text')
            }
            this.shadowRoot.appendChild(this._tooltipContainer)
        })
        this.addEventListener('mouseleave',()=>{
            this.shadowRoot.removeChild(this._tooltipContainer)
        })
       
    }
}

customElements.define('ui-tooltip',Tooltip)