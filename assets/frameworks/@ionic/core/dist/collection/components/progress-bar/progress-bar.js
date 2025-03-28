/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { clamp } from "../../utils/helpers";
import { createColorClasses } from "../../utils/theme";
import { config } from "../../global/config";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @part progress - The progress bar that shows the current value when `type` is `"determinate"` and slides back and forth when `type` is `"indeterminate"`.
 * @part stream - The animated circles that appear while buffering. This only shows when `buffer` is set and `type` is `"determinate"`.
 * @part track - The track bar behind the progress bar. If the `buffer` property is set and `type` is `"determinate"` the track will be the
 * width of the `buffer` value.
 */
export class ProgressBar {
    constructor() {
        this.type = 'determinate';
        this.reversed = false;
        this.value = 0;
        this.buffer = 1;
        this.color = undefined;
    }
    render() {
        const { color, type, reversed, value, buffer } = this;
        const paused = config.getBoolean('_testing');
        const mode = getIonMode(this);
        // If the progress is displayed as a solid bar.
        const progressSolid = buffer === 1;
        return (h(Host, { key: '8d8ddf0b26fe33803d3a6168cbedd523d1a888e7', role: "progressbar", "aria-valuenow": type === 'determinate' ? value : null, "aria-valuemin": "0", "aria-valuemax": "1", class: createColorClasses(color, {
                [mode]: true,
                [`progress-bar-${type}`]: true,
                'progress-paused': paused,
                'progress-bar-reversed': document.dir === 'rtl' ? !reversed : reversed,
                'progress-bar-solid': progressSolid,
            }) }, type === 'indeterminate' ? renderIndeterminate() : renderProgress(value, buffer)));
    }
    static get is() { return "ion-progress-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["progress-bar.ios.scss"],
            "md": ["progress-bar.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["progress-bar.ios.css"],
            "md": ["progress-bar.md.css"]
        };
    }
    static get properties() {
        return {
            "type": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'determinate' | 'indeterminate'",
                    "resolved": "\"determinate\" | \"indeterminate\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The state of the progress bar, based on if the time the process takes is known or not.\nDefault options are: `\"determinate\"` (no animation), `\"indeterminate\"` (animate from left to right)."
                },
                "attribute": "type",
                "reflect": false,
                "defaultValue": "'determinate'"
            },
            "reversed": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If true, reverse the progress bar direction."
                },
                "attribute": "reversed",
                "reflect": false,
                "defaultValue": "false"
            },
            "value": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The value determines how much of the active bar should display when the\n`type` is `\"determinate\"`.\nThe value should be between [0, 1]."
                },
                "attribute": "value",
                "reflect": false,
                "defaultValue": "0"
            },
            "buffer": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If the buffer and value are smaller than 1, the buffer circles will show.\nThe buffer should be between [0, 1]."
                },
                "attribute": "buffer",
                "reflect": false,
                "defaultValue": "1"
            },
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
            }
        };
    }
}
const renderIndeterminate = () => {
    return (h("div", { part: "track", class: "progress-buffer-bar" }, h("div", { class: "indeterminate-bar-primary" }, h("span", { part: "progress", class: "progress-indeterminate" })), h("div", { class: "indeterminate-bar-secondary" }, h("span", { part: "progress", class: "progress-indeterminate" }))));
};
const renderProgress = (value, buffer) => {
    const finalValue = clamp(0, value, 1);
    const finalBuffer = clamp(0, buffer, 1);
    return [
        h("div", { part: "progress", class: "progress", style: { transform: `scaleX(${finalValue})` } }),
        /**
         * Buffer circles with two container to move
         * the circles behind the buffer progress
         * with respecting the animation.
         * When finalBuffer === 1, we use display: none
         * instead of removing the element to avoid flickering.
         */
        h("div", { class: { 'buffer-circles-container': true, 'ion-hide': finalBuffer === 1 }, style: { transform: `translateX(${finalBuffer * 100}%)` } }, h("div", { class: "buffer-circles-container", style: { transform: `translateX(-${finalBuffer * 100}%)` } }, h("div", { part: "stream", class: "buffer-circles" }))),
        h("div", { part: "track", class: "progress-buffer-bar", style: { transform: `scaleX(${finalBuffer})` } }),
    ];
};
