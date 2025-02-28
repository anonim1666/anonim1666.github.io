/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { proxyCustomElement, HTMLElement, forceUpdate, h, Host } from '@stencil/core/internal/client';
import { c as createColorClasses, h as hostContext } from './theme.js';
import { b as getIonMode } from './ionic-global.js';

const toolbarIosCss = ":host{--border-width:0;--border-style:solid;--opacity:1;--opacity-scale:1;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;width:100%;padding-right:var(--ion-safe-area-right);padding-left:var(--ion-safe-area-left);color:var(--color);font-family:var(--ion-font-family, inherit);contain:content;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.ion-color){color:var(--ion-color-contrast)}:host(.ion-color) .toolbar-background{background:var(--ion-color-base)}.toolbar-container{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);contain:content;overflow:hidden;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}.toolbar-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;opacity:calc(var(--opacity) * var(--opacity-scale));z-index:-1;pointer-events:none}::slotted(ion-progress-bar){left:0;right:0;bottom:0;position:absolute}:host{--background:var(--ion-toolbar-background, var(--ion-color-step-50, var(--ion-background-color-step-50, #f7f7f7)));--color:var(--ion-toolbar-color, var(--ion-text-color, #000));--border-color:var(--ion-toolbar-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, rgba(0, 0, 0, 0.2)))));--padding-top:3px;--padding-bottom:3px;--padding-start:4px;--padding-end:4px;--min-height:44px}.toolbar-content{-ms-flex:1;flex:1;-ms-flex-order:4;order:4;min-width:0}:host(.toolbar-segment) .toolbar-content{display:-ms-inline-flexbox;display:inline-flex}:host(.toolbar-searchbar) .toolbar-container{padding-top:0;padding-bottom:0}:host(.toolbar-searchbar) ::slotted(*){-ms-flex-item-align:start;align-self:start}:host(.toolbar-searchbar) ::slotted(ion-chip){margin-top:3px}::slotted(ion-buttons){min-height:38px}::slotted([slot=start]){-ms-flex-order:2;order:2}::slotted([slot=secondary]){-ms-flex-order:3;order:3}::slotted([slot=primary]){-ms-flex-order:5;order:5;text-align:end}::slotted([slot=end]){-ms-flex-order:6;order:6;text-align:end}:host(.toolbar-title-large) .toolbar-container{-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:start;align-items:flex-start}:host(.toolbar-title-large) .toolbar-content ion-title{-ms-flex:1;flex:1;-ms-flex-order:8;order:8;min-width:100%}";
const IonToolbarIosStyle0 = toolbarIosCss;

const toolbarMdCss = ":host{--border-width:0;--border-style:solid;--opacity:1;--opacity-scale:1;-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:block;position:relative;width:100%;padding-right:var(--ion-safe-area-right);padding-left:var(--ion-safe-area-left);color:var(--color);font-family:var(--ion-font-family, inherit);contain:content;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}:host(.ion-color){color:var(--ion-color-contrast)}:host(.ion-color) .toolbar-background{background:var(--ion-color-base)}.toolbar-container{-webkit-padding-start:var(--padding-start);padding-inline-start:var(--padding-start);-webkit-padding-end:var(--padding-end);padding-inline-end:var(--padding-end);padding-top:var(--padding-top);padding-bottom:var(--padding-bottom);display:-ms-flexbox;display:flex;position:relative;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;width:100%;min-height:var(--min-height);contain:content;overflow:hidden;z-index:10;-webkit-box-sizing:border-box;box-sizing:border-box}.toolbar-background{left:0;right:0;top:0;bottom:0;position:absolute;-webkit-transform:translateZ(0);transform:translateZ(0);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);contain:strict;opacity:calc(var(--opacity) * var(--opacity-scale));z-index:-1;pointer-events:none}::slotted(ion-progress-bar){left:0;right:0;bottom:0;position:absolute}:host{--background:var(--ion-toolbar-background, var(--ion-background-color, #fff));--color:var(--ion-toolbar-color, var(--ion-text-color, #424242));--border-color:var(--ion-toolbar-border-color, var(--ion-border-color, var(--ion-color-step-150, var(--ion-background-color-step-150, #c1c4cd))));--padding-top:0;--padding-bottom:0;--padding-start:0;--padding-end:0;--min-height:56px}.toolbar-content{-ms-flex:1;flex:1;-ms-flex-order:3;order:3;min-width:0;max-width:100%}::slotted(.buttons-first-slot){-webkit-margin-start:4px;margin-inline-start:4px}::slotted(.buttons-last-slot){-webkit-margin-end:4px;margin-inline-end:4px}::slotted([slot=start]){-ms-flex-order:2;order:2}::slotted([slot=secondary]){-ms-flex-order:4;order:4}::slotted([slot=primary]){-ms-flex-order:5;order:5;text-align:end}::slotted([slot=end]){-ms-flex-order:6;order:6;text-align:end}";
const IonToolbarMdStyle0 = toolbarMdCss;

const Toolbar = /*@__PURE__*/ proxyCustomElement(class Toolbar extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.childrenStyles = new Map();
        this.color = undefined;
    }
    componentWillLoad() {
        const buttons = Array.from(this.el.querySelectorAll('ion-buttons'));
        const firstButtons = buttons.find((button) => {
            return button.slot === 'start';
        });
        if (firstButtons) {
            firstButtons.classList.add('buttons-first-slot');
        }
        const buttonsReversed = buttons.reverse();
        const lastButtons = buttonsReversed.find((button) => button.slot === 'end') ||
            buttonsReversed.find((button) => button.slot === 'primary') ||
            buttonsReversed.find((button) => button.slot === 'secondary');
        if (lastButtons) {
            lastButtons.classList.add('buttons-last-slot');
        }
    }
    childrenStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const newStyles = {};
        const childStyles = this.childrenStyles.get(tagName) || {};
        let hasStyleChange = false;
        Object.keys(updatedStyles).forEach((key) => {
            const childKey = `toolbar-${key}`;
            const newValue = updatedStyles[key];
            if (newValue !== childStyles[childKey]) {
                hasStyleChange = true;
            }
            if (newValue) {
                newStyles[childKey] = true;
            }
        });
        if (hasStyleChange) {
            this.childrenStyles.set(tagName, newStyles);
            forceUpdate(this);
        }
    }
    render() {
        const mode = getIonMode(this);
        const childStyles = {};
        this.childrenStyles.forEach((value) => {
            Object.assign(childStyles, value);
        });
        return (h(Host, { key: '462538a5ecd01baf3cde116c9f029aeda26c81be', class: Object.assign(Object.assign({}, childStyles), createColorClasses(this.color, {
                [mode]: true,
                'in-toolbar': hostContext('ion-toolbar', this.el),
            })) }, h("div", { key: 'c0b4415d3b2472de643a9be7cb3b13b3b628621b', class: "toolbar-background" }), h("div", { key: '0ccb8a2dbeaa28d8f9bed87629c0c097446690c2', class: "toolbar-container" }, h("slot", { key: '3e726dac359e923df21d80301651f16063a3de20', name: "start" }), h("slot", { key: 'cd799330b56a7f8833bc61bb2807aafb21846f71', name: "secondary" }), h("div", { key: '395282e6ac8c53576922dcdb5f08c25d34638c86', class: "toolbar-content" }, h("slot", { key: 'a437c60e4ba5aae65e55169ae82a6f379868ec1d' })), h("slot", { key: '711af9b9d321a7b31ede924c9bdcad767aa9a1ca', name: "primary" }), h("slot", { key: 'ecc02edeaf80a837890bcb08d5096df1e22a0b9a', name: "end" }))));
    }
    get el() { return this; }
    static get style() { return {
        ios: IonToolbarIosStyle0,
        md: IonToolbarMdStyle0
    }; }
}, [33, "ion-toolbar", {
        "color": [513]
    }, [[0, "ionStyle", "childrenStyle"]]]);
function defineCustomElement() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["ion-toolbar"];
    components.forEach(tagName => { switch (tagName) {
        case "ion-toolbar":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, Toolbar);
            }
            break;
    } });
}

export { Toolbar as T, defineCustomElement as d };
