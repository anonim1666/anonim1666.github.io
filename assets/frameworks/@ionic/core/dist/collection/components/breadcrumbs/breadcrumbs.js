/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { createColorClasses, hostContext } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 */
export class Breadcrumbs {
    constructor() {
        this.breadcrumbsInit = () => {
            this.setBreadcrumbSeparator();
            this.setMaxItems();
        };
        this.resetActiveBreadcrumb = () => {
            const breadcrumbs = this.getBreadcrumbs();
            // Only reset the active breadcrumb if we were the ones to change it
            // otherwise use the one set on the component
            const activeBreadcrumb = breadcrumbs.find((breadcrumb) => breadcrumb.active);
            if (activeBreadcrumb && this.activeChanged) {
                activeBreadcrumb.active = false;
            }
        };
        this.setMaxItems = () => {
            const { itemsAfterCollapse, itemsBeforeCollapse, maxItems } = this;
            const breadcrumbs = this.getBreadcrumbs();
            for (const breadcrumb of breadcrumbs) {
                breadcrumb.showCollapsedIndicator = false;
                breadcrumb.collapsed = false;
            }
            // If the number of breadcrumbs exceeds the maximum number of items
            // that should show and the items before / after collapse do not
            // exceed the maximum items then we need to collapse the breadcrumbs
            const shouldCollapse = maxItems !== undefined && breadcrumbs.length > maxItems && itemsBeforeCollapse + itemsAfterCollapse <= maxItems;
            if (shouldCollapse) {
                // Show the collapsed indicator in the first breadcrumb that collapses
                breadcrumbs.forEach((breadcrumb, index) => {
                    if (index === itemsBeforeCollapse) {
                        breadcrumb.showCollapsedIndicator = true;
                    }
                    // Collapse all breadcrumbs that have an index greater than or equal to
                    // the number before collapse and an index less than the total number
                    // of breadcrumbs minus the items that should show after the collapse
                    if (index >= itemsBeforeCollapse && index < breadcrumbs.length - itemsAfterCollapse) {
                        breadcrumb.collapsed = true;
                    }
                });
            }
        };
        this.setBreadcrumbSeparator = () => {
            const { itemsAfterCollapse, itemsBeforeCollapse, maxItems } = this;
            const breadcrumbs = this.getBreadcrumbs();
            // Check if an active breadcrumb exists already
            const active = breadcrumbs.find((breadcrumb) => breadcrumb.active);
            // Set the separator on all but the last breadcrumb
            for (const breadcrumb of breadcrumbs) {
                // The only time the last breadcrumb changes is when
                // itemsAfterCollapse is set to 0, in this case the
                // last breadcrumb will be the collapsed indicator
                const last = maxItems !== undefined && itemsAfterCollapse === 0
                    ? breadcrumb === breadcrumbs[itemsBeforeCollapse]
                    : breadcrumb === breadcrumbs[breadcrumbs.length - 1];
                breadcrumb.last = last;
                // If the breadcrumb has defined whether or not to show the
                // separator then use that value, otherwise check if it's the
                // last breadcrumb
                const separator = breadcrumb.separator !== undefined ? breadcrumb.separator : last ? undefined : true;
                breadcrumb.separator = separator;
                // If there is not an active breadcrumb already
                // set the last one to active
                if (!active && last) {
                    breadcrumb.active = true;
                    this.activeChanged = true;
                }
            }
        };
        this.getBreadcrumbs = () => {
            return Array.from(this.el.querySelectorAll('ion-breadcrumb'));
        };
        this.slotChanged = () => {
            this.resetActiveBreadcrumb();
            this.breadcrumbsInit();
        };
        this.collapsed = undefined;
        this.activeChanged = undefined;
        this.color = undefined;
        this.maxItems = undefined;
        this.itemsBeforeCollapse = 1;
        this.itemsAfterCollapse = 1;
    }
    onCollapsedClick(ev) {
        const breadcrumbs = this.getBreadcrumbs();
        const collapsedBreadcrumbs = breadcrumbs.filter((breadcrumb) => breadcrumb.collapsed);
        this.ionCollapsedClick.emit(Object.assign(Object.assign({}, ev.detail), { collapsedBreadcrumbs }));
    }
    maxItemsChanged() {
        this.resetActiveBreadcrumb();
        this.breadcrumbsInit();
    }
    componentWillLoad() {
        this.breadcrumbsInit();
    }
    render() {
        const { color, collapsed } = this;
        const mode = getIonMode(this);
        return (h(Host, { key: 'fe64e9cdf597ede2db140bf5fa05a0359d82db57', class: createColorClasses(color, {
                [mode]: true,
                'in-toolbar': hostContext('ion-toolbar', this.el),
                'in-toolbar-color': hostContext('ion-toolbar[color]', this.el),
                'breadcrumbs-collapsed': collapsed,
            }) }, h("slot", { key: 'a2c99b579e339055c50a613d5c6b61032f5ddffe', onSlotchange: this.slotChanged })));
    }
    static get is() { return "ion-breadcrumbs"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["breadcrumbs.ios.scss"],
            "md": ["breadcrumbs.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["breadcrumbs.ios.css"],
            "md": ["breadcrumbs.md.css"]
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
            "maxItems": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The maximum number of breadcrumbs to show before collapsing."
                },
                "attribute": "max-items",
                "reflect": false
            },
            "itemsBeforeCollapse": {
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
                    "text": "The number of breadcrumbs to show before the collapsed indicator.\nIf `itemsBeforeCollapse` + `itemsAfterCollapse` is greater than `maxItems`,\nthe breadcrumbs will not be collapsed."
                },
                "attribute": "items-before-collapse",
                "reflect": false,
                "defaultValue": "1"
            },
            "itemsAfterCollapse": {
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
                    "text": "The number of breadcrumbs to show after the collapsed indicator.\nIf `itemsBeforeCollapse` + `itemsAfterCollapse` is greater than `maxItems`,\nthe breadcrumbs will not be collapsed."
                },
                "attribute": "items-after-collapse",
                "reflect": false,
                "defaultValue": "1"
            }
        };
    }
    static get states() {
        return {
            "collapsed": {},
            "activeChanged": {}
        };
    }
    static get events() {
        return [{
                "method": "ionCollapsedClick",
                "name": "ionCollapsedClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the collapsed indicator is clicked on."
                },
                "complexType": {
                    "original": "BreadcrumbCollapsedClickEventDetail",
                    "resolved": "BreadcrumbCollapsedClickEventDetail",
                    "references": {
                        "BreadcrumbCollapsedClickEventDetail": {
                            "location": "import",
                            "path": "../breadcrumb/breadcrumb-interface",
                            "id": "src/components/breadcrumb/breadcrumb-interface.ts::BreadcrumbCollapsedClickEventDetail"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "maxItems",
                "methodName": "maxItemsChanged"
            }, {
                "propName": "itemsBeforeCollapse",
                "methodName": "maxItemsChanged"
            }, {
                "propName": "itemsAfterCollapse",
                "methodName": "maxItemsChanged"
            }];
    }
    static get listeners() {
        return [{
                "name": "collapsedClick",
                "method": "onCollapsedClick",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
