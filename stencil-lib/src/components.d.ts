/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface UiSideDrawer {
    }
}
declare global {
    interface HTMLUiSideDrawerElement extends Components.UiSideDrawer, HTMLStencilElement {
    }
    var HTMLUiSideDrawerElement: {
        prototype: HTMLUiSideDrawerElement;
        new (): HTMLUiSideDrawerElement;
    };
    interface HTMLElementTagNameMap {
        "ui-side-drawer": HTMLUiSideDrawerElement;
    }
}
declare namespace LocalJSX {
    interface UiSideDrawer {
    }
    interface IntrinsicElements {
        "ui-side-drawer": UiSideDrawer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "ui-side-drawer": LocalJSX.UiSideDrawer & JSXBase.HTMLAttributes<HTMLUiSideDrawerElement>;
        }
    }
}
