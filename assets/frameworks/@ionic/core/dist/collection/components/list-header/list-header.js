/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { createColorClasses } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export class ListHeader {
    constructor() {
        this.color = undefined;
        this.lines = undefined;
    }
    render() {
        const { lines } = this;
        const mode = getIonMode(this);
        return (h(Host, { key: 'fb78bd8601cbd7b90ec84a96e0c8325be1132b1e', class: createColorClasses(this.color, {
                [mode]: true,
                [`list-header-lines-${lines}`]: lines !== undefined,
            }) }, h("div", { key: '2580ad49f3a54973e15f14d645a1e55a6fa066ac', class: "list-header-inner" }, h("slot", { key: '677b2e2ec8eeb3ae6ad329e86c76451cf3ae6c2f' }))));
    }
    static get is() { return "ion-list-header"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["list-header.ios.scss"],
            "md": ["list-header.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["list-header.ios.css"],
            "md": ["list-header.md.css"]
        };
    }
    static get properties() {
        return {
            "color": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Color",
                    "resolved": "\"danger\" | \"dark\" | \"light\" | \"medium\" | \"primary\" | \"secondary\" | \"success\" | \"tertiary\" | \"warning\" | string & Record<never, never> | undefined",
                    "references": {
                        "Color": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::Color"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The color to use from your application's color palette.\nDefault options are: `\"primary\"`, `\"secondary\"`, `\"tertiary\"`, `\"success\"`, `\"warning\"`, `\"danger\"`, `\"light\"`, `\"medium\"`, and `\"dark\"`.\nFor more information on colors, see [theming](/docs/theming/basics)."
                },
                "attribute": "color",
                "reflect": true
            },
            "lines": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'full' | 'inset' | 'none'",
                    "resolved": "\"full\" | \"inset\" | \"none\" | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "How the bottom border should be displayed on the list header."
                },
                "attribute": "lines",
                "reflect": false
            }
        };
    }
}
