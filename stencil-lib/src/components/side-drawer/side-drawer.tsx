import {h, Component, Prop, State, Method } from "@stencil/core";

@Component({
  tag: 'ui-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true
})
export class SideDrawer {

  @State() showContactInfo = false;

  @Prop({reflect: true})
  title: string;

  //PROPS BY DEFAULT ARE IMMUTABLE
  @Prop({reflect: true,mutable: true}) open: boolean = false;

  onCloseDrawer() {
    this.open = false;
  }

  onToggleTabs(content: string) {
    this.showContactInfo = content === 'contact';
  }


  @Method()
  openDrawer() {
    this.open = true;
  }

  closeDrawer() {
    this.open = false;
  }

  render(){

    let mainContent = <slot/>
    if(this.showContactInfo) {
      mainContent=(
        <div id='contact-tab'>
          <h2>Contact Information</h2>
          <p>You can reach via phone or email address</p>
          <ul>
            <li>Phone: 498043543</li>
            <li>Email: <a href="mailto:reachme@stencil.com">reachme@stencil.com</a></li>
          </ul>
        </div>
      )
    }


    return [<div id="backdrop" onClick={this.closeDrawer.bind(this)}></div>,
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onToggleTabs.bind(this, 'nav')}>Navigation</button>
          <button class={this.showContactInfo ? 'active' : ''} onClick={this.onToggleTabs.bind(this, 'contact')}>Contact</button>
        </section>
        <main>{mainContent}</main>
      </aside>
    ];
  }

}


