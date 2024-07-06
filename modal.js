class Modal extends HTMLElement {
    constructor(){
        super();
        this.attachShadow({mode:'open'})
        this.shadowRoot.innerHTML= `
        <style>
            :host {
                position: relative;
            }

            :host([opened]) #backdrop {
                opacity: 1;
                pointer-events: all;
            }
            :host([opened]) #modal {
                opacity: 1;
                pointer-events: all;
            }

            :host([opened]) {
                top: 15vh;
            }

            #backdrop{
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100vh;
                background: rgba(0,0,0,0.75);
                z-index: -1;
                opacity: 0;
                pointer-events: none;
            }

            header {
                padding: 10px;
                border-bottom: 1px solid #ccc;

            }

            header h1 {
                
            }

            #main {
                padding: 10px;
            }

            #modal{
                postion: fixed;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                top: 10vh;
                left: 50%;
                width: 50%;
                background: white;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                z-index: 100;
                opacity: 0;
                pointer-events: none;
                transition: all 0.3s ease-out;
            }

            #actions {
                padding: 10px;
                border-top: 1px solid #ccc;
                display: flex;
                gap:5px;
                justify-content: flex-end;
            }

            ::slotted(h1) {
                font-size: 1.25rem;
                margin: 0;
            }

        </style>
        <div id="backdrop"></div>
        <div id="modal">
            <header>
                <slot name="title">please confirm</slot>
            </header>
            <section id="main">
                <slot></slot>
            </section>
            <section id="actions">
                <button id='cancel-btn'>Cancel</button>
                <button id='confirm-btn'>Confirm</button>
            </section>
        </div>
        `;

    
        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[1].addEventListener('slotchange',(event)=>{
            console.dir(slots[1].assignedNodes())
        })

        const cancelBtn = this.shadowRoot.querySelector('#cancel-btn')
        const confirmBtn = this.shadowRoot.querySelector('#confirm-btn')
        cancelBtn.addEventListener('click', this._cancel.bind(this))
        confirmBtn.addEventListener('click', this._confirm.bind(this))

        // cancelBtn.addEventListener('cancel',()=>{
        //     console.log('catching event inside the component')
        // })

        const backdrop = this.shadowRoot.querySelector('#backdrop')
        backdrop.addEventListener('click',this._cancel.bind(this))

        
    }

    _cancel(event) {
        this.close()
        const cancelEvent = new Event('cancel', {bubbles:true,composed:true});
        event.target.dispatchEvent(cancelEvent)
    }

    _confirm() {
        this.close()
        this.dispatchEvent(new Event('confirm'));
        

    }

    connectedCallback() {
        // const buttons = this.shadowRoot.querySelectorAll('button')
        // buttons.forEach(button => button.addEventListener('click', ()=>{
        //     this.close();
        // }))
    }


    static get observedAttributes() {
        return ['opened']
    }

    // attributeChangedCallback(name,oldValue,newValue) {
    //     if(name === 'opened') {
    //         if(this.hasAttribute('opened')) {
    //             this.shadowRoot.querySelector('#backdrop')
    //         }
    //     }
    // }

    open() {
        this.setAttribute('opened','')
    }

    close() {
        this.removeAttribute('opened');
    }

}

customElements.define('ui-modal', Modal);