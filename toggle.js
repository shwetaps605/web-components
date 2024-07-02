class ToggleButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'})
        this.shadowRoot.innerHTML = `
        <button>show</button><p id="info-box"><slot></slot></p>
        `
    }

    connectedCallback() {
        const toggleButton = this.shadowRoot.querySelector('button')
        const toggleText = this.shadowRoot.querySelector("p")

        let isHidden = this.getAttribute('isHidden');
        if(isHidden) {
            toggleText.style.display = 'block';
            toggleButton.textContent = 'Hide';
        } else {
            toggleText.style.display = 'none';
            toggleButton.textContent = 'Show';
        }


        toggleButton.addEventListener('click', () => {
            if (isHidden) {
                toggleText.style.display = 'block';
                toggleButton.textContent = 'Hide';
              } else {
                toggleText.style.display = 'none';
                toggleButton.textContent = 'Show';
              }
            isHidden = !isHidden;
        })
    }

    
}

customElements.define('uc-toggle',ToggleButton)