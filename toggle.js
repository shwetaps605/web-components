class ToggleButton extends HTMLElement {

    
    constructor() {
        super();
        this.attachShadow({mode:'open'})
        this.shadowRoot.innerHTML = `
        <button>show</button><p id="info-box"><slot></slot></p>`
        this._toggleButton = this.shadowRoot.querySelector('button')
        this._toggleText = this.shadowRoot.querySelector("p")
    }

    connectedCallback() {
        // const toggleButton = this.shadowRoot.querySelector('button')
        // const toggleText = this.shadowRoot.querySelector("p")

        // let isHidden = this.getAttribute('isHidden');
        // if(isHidden) {
        //     toggleText.style.display = 'block';
        //     toggleButton.textContent = 'Hide';
        // } else {
        //     toggleText.style.display = 'none';
        //     toggleButton.textContent = 'Show';
        // }

        let isHidden = this.getAttribute('isHidden');
        if(!isHidden) {
            this._toggleText.style.display = 'block';
            this._toggleButton.textContent = 'Hide';
        } else {
            this._toggleText.style.display = 'none';
            this._toggleButton.textContent = 'Show';
        }


        this._toggleButton.addEventListener('click', () => {
            if (isHidden) {
                this._toggleText.style.display = 'block';
                this._toggleButton.textContent = 'Hide';
              } else {
                this._toggleText.style.display = 'none';
                this._toggleButton.textContent = 'Show';
              }
              isHidden = !isHidden;
        })
    }

    
}

customElements.define('uc-toggle',ToggleButton)