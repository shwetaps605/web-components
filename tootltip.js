

class Tooltip extends HTMLElement {
    _tooltipText = "dummy dum dum!"
    _tooltipIcon;
   

    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this._tooltipVisible = false;
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
            ::slotted(.highlight){
                font-weight: bold;
            }
            :host{
               background-color: #eee;
               position: relative;
            }

            :host(.important){
               color: orange;
            }

            :host-context(p) {
              color: blue;
              margin-left: 10px;
            }
        </style>`
    }

    connectedCallback() {
        this._tooltipIcon = this.shadowRoot.querySelector('span') 
        this._render();
        if(this.hasAttribute('text')){
            this._tooltipText = this.getAttribute('text')
        }
        this._tooltipIcon.addEventListener('mouseenter',() => {
            this._tooltipVisible = true;
            this._render();
            
        })
        this._tooltipIcon.addEventListener('mouseleave',()=>{
            this._tooltipVisible = false;
            this._render();
        })
    }

    static get observedAttributes() {
        return ['text']
    }

    //KEEP ALL THE RENDERING LOGIC AT ONE PLACE
    _render() {
        let tooltipContainer = this.shadowRoot.querySelector('div')
        if(this._tooltipVisible) {
            tooltipContainer = document.createElement('div')
            tooltipContainer.textContent = this._tooltipText
            this.shadowRoot.appendChild(tooltipContainer)
        } else {
            if(tooltipContainer) {
                this.shadowRoot.removeChild(tooltipContainer)
            }
        }
        
    }

    attributeChangedCallback(name,oldValue, newValue) {
        console.log(name,oldValue,newValue)
        // if(oldValue === newValue) return

        // if(name === 'text') {
        //     this._tooltipText = newValue;
        // }

    }

    disconnectedCallback() {
        console.log('disconnected')
        this._tooltipIcon.removeEventListener('mouseenter',()=>{console.log('enter event')});
        this._tooltipIcon.removeEventListener('mouseleave',()=>{console.log('leave event')});

        
    }
}

customElements.define('ui-tooltip',Tooltip)