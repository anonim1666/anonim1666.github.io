import type { ComponentInterface } from '../../stencil-public-runtime';
import type { ButtonInterface } from "../../utils/element-interface";
import type { SegmentValue } from '../segment/segment-interface';
import type { SegmentButtonLayout } from './segment-button-interface';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @part native - The native HTML button element that wraps all child elements.
 * @part indicator - The indicator displayed on the checked segment button.
 * @part indicator-background - The background element for the indicator displayed on the checked segment button.
 */
export declare class SegmentButton implements ComponentInterface, ButtonInterface {
    private segmentEl;
    private nativeEl;
    private inheritedAttributes;
    el: HTMLElement;
    checked: boolean;
    /**
     * The `id` of the segment content.
     */
    contentId?: string;
    /**
     * If `true`, the user cannot interact with the segment button.
     */
    disabled: boolean;
    /**
     * Set the layout of the text and icon in the segment.
     */
    layout?: SegmentButtonLayout;
    /**
     * The type of the button.
     */
    type: 'submit' | 'reset' | 'button';
    /**
     * The value of the segment button.
     */
    value: SegmentValue;
    valueChanged(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillLoad(): void;
    private get hasLabel();
    private get hasIcon();
    private updateStyle;
    private updateState;
    /**
     * @internal
     * Focuses the native <button> element
     * inside of ion-segment-button.
     */
    setFocus(): Promise<void>;
    render(): any;
}
