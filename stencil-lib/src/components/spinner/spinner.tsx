import {h, Component } from "@stencil/core";

@Component({
  tag:'ui-spinner',
  shadow: true
})
export class Spinner {
  render() {
    return <span>Loading...</span>
  }

}
