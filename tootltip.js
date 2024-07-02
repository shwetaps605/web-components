

class Tooltip extends HTMLElement {
    _tooltipContainer;
    _tooltipText = "dummy dum dum!"

    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        // const template = document.querySelector("#tooltip-template")
        // this.shadowRoot.appendChild(template.content.cloneNode(true))
        this.shadowRoot.innerHTML = `<span>(?)</span><slot>default value</slot>
        <style>
            div {
                background-color: black;
                color: white;
                position: absolute;
                z-index: 2;
                padding: 2px;
                width: 100px;
            }
        </style>`
    }

    connectedCallback() {
        this.style.position = "relative"
        const tooltip = this.shadowRoot.querySelector('span') 
        tooltip.addEventListener('mouseenter',() => {
            this._tooltipContainer = document.createElement('div')
            this._tooltipContainer.textContent = this._tooltipText
            if(this.hasAttribute('text')){
                this._tooltipContainer.textContent = this.getAttribute('text')
            }
            this.shadowRoot.appendChild(this._tooltipContainer)
        })
        tooltip.addEventListener('mouseleave',()=>{
            this.shadowRoot.removeChild(this._tooltipContainer)
        })
       
    }
}

customElements.define('ui-tooltip',Tooltip)