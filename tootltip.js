

class Tooltip extends HTMLElement {
    _tooltipContainer;
    _tooltipText = "dummy dum dum!"

    constructor() {
        super()
        console.log("tooltip working!")
        // this._tooltipContainer
        
    }

    connectedCallback() {
        const tooltip = document.createElement('span')
        tooltip.textContent = "(?)"
        this.appendChild(tooltip)
        this.addEventListener('mouseenter',()=>{
            this._tooltipContainer = document.createElement('div')
            this._tooltipContainer.textContent = this._tooltipText 
            if(this.hasAttribute('text')){
                this._tooltipContainer.textContent = this.getAttribute('text')
            }
            this.appendChild(this._tooltipContainer)
        })
        this.addEventListener('mouseleave',()=>{
            this.removeChild(this._tooltipContainer)
        })
       
    }
}

customElements.define('ui-tooltip',Tooltip)