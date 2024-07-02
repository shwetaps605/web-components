class ConfirmLink extends HTMLAnchorElement {
    // constructor() {
    //     super();
    //     this.attachShadow({mode: 'open '})
    // }

    connectedCallback() {
        this.addEventListener('click', (event)=>{
            if(!confirm('Do you really want to leave')) {
                event.preventDefault();
            }

        })
    }
}

customElements.define('ui-confirm-link', ConfirmLink , { extends: 'a'})