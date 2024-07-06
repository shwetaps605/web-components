import {h, Component } from "@stencil/core";

@Component({
  tag: 'ui-side-drawer',
  styleUrl: './side-drawer.css',
  scoped: true
})
export class SideDrawer {
  render(){
    return(
      <aside>
        <h1>side-drawer</h1>
      </aside>
    )
  }

}


