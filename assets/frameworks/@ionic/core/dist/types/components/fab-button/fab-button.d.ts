import type { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import type { AnchorInterface, ButtonInterface } from "../../utils/element-interface";
import type { AnimationBuilder, Color } from '../../interface';
import type { RouterDirection } from '../router/utils/interface';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @part native - The native HTML button or anchor element that wraps all child elements.
 * @part close-icon - The close icon that is displayed when a fab list opens (uses ion-icon).
 */
export declare class FabButton implements ComponentInterface, AnchorInterface, ButtonInterface {
    private fab;
    private inheritedAttributes;
    el: HTMLElement;
    /**
     * The color to use from your application's color palette.
     * Default options are: `"primary"`, `"secondary"`, `"tertiary"`, `"success"`, `"warning"`, `"danger"`, `"light"`, `"medium"`, and `"dark"`.
     * For more information on colors, see [theming](/docs/theming/basics).
     */
    color?: Color;
    /**
     * If `true`, the fab button will be show a close icon.
     */
    activated: boolean;
    /**
     * If `true`, the user cannot interact with the fab button.
     */
    disabled: boolean;
    /**
     * This attribute instructs browsers to download a URL instead of navigating to
     * it, so the user will be prompted to save it as a local file. If the attribute
     * has a value, it is used as the pre-filled file name in the Save prompt
     * (the user can still change the file name if they want).
     */
    download: string | undefined;
    /**
     * Contains a URL or a URL fragment that the hyperlink points to.
     * If this property is set, an anchor tag will be rendered.
     */
    href: string | undefined;
    /**
     * Specifies the relationship of the target object to the link object.
     * The value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types).
     */
    rel: string | undefined;
    /**
     * When using a router, it specifies the transition direction when navigating to
     * another page using `href`.
     */
    routerDirection: RouterDirection;
    /**
     * When using a router, it specifies the transition animation when navigating to
     * another page using `href`.
     */
    routerAnimation: AnimationBuilder | undefined;
    /**
     * Specifies where to display the linked URL.
     * Only applies when an `href` is provided.
     * Special keywords: `"_blank"`, `"_self"`, `"_parent"`, `"_top"`.
     */
    target: string | undefined;
    /**
     * If `true`, the fab button will show when in a fab-list.
     */
    show: boolean;
    /**
     * If `true`, the fab button will be translucent.
     * Only applies when the mode is `"ios"` and the device supports
     * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
     */
    translucent: boolean;
    /**
     * The type of the button.
     */
    type: 'submit' | 'reset' | 'button';
    /**
     * The size of the button. Set this to `small` in order to have a mini fab button.
     */
    size?: 'small';
    /**
     * The icon name to use for the close icon. This will appear when the fab button
     * is pressed. Only applies if it is the main button inside of a fab containing a
     * fab list.
     */
    closeIcon: string;
    /**
     * Emitted when the button has focus.
     */
    ionFocus: EventEmitter<void>;
    /**
     * Emitted when the button loses focus.
     */
    ionBlur: EventEmitter<void>;
    connectedCallback(): void;
    private onFocus;
    private onBlur;
    private onClick;
    componentWillLoad(): void;
    render(): any;
}
