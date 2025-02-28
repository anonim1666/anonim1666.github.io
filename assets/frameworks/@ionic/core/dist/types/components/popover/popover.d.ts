import type { ComponentInterface, EventEmitter } from '../../stencil-public-runtime';
import type { AnimationBuilder, ComponentProps, ComponentRef, FrameworkDelegate } from '../../interface';
import type { OverlayEventDetail } from '../../utils/overlays-interface';
import type { PopoverInterface, PopoverSize, PositionAlign, PositionReference, PositionSide, TriggerAction } from './popover-interface';
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @slot - Content is placed inside of the `.popover-content` element.
 *
 * @part backdrop - The `ion-backdrop` element.
 * @part arrow - The arrow that points to the reference element. Only applies on `ios` mode.
 * @part content - The wrapper element for the default slot.
 */
export declare class Popover implements ComponentInterface, PopoverInterface {
    private usersElement?;
    private triggerEl?;
    private parentPopover;
    private coreDelegate;
    private readonly lockController;
    private destroyTriggerInteraction?;
    private destroyKeyboardInteraction?;
    private destroyDismissInteraction?;
    private inline;
    private workingDelegate?;
    private focusDescendantOnPresent;
    lastFocus?: HTMLElement;
    presented: boolean;
    el: HTMLIonPopoverElement;
    /** @internal */
    hasController: boolean;
    /** @internal */
    delegate?: FrameworkDelegate;
    /** @internal */
    overlayIndex: number;
    /**
     * Animation to use when the popover is presented.
     */
    enterAnimation?: AnimationBuilder;
    /**
     * Animation to use when the popover is dismissed.
     */
    leaveAnimation?: AnimationBuilder;
    /**
     * The component to display inside of the popover.
     * You only need to use this if you are not using
     * a JavaScript framework. Otherwise, you can just
     * slot your component inside of `ion-popover`.
     */
    component?: ComponentRef;
    /**
     * The data to pass to the popover component.
     * You only need to use this if you are not using
     * a JavaScript framework. Otherwise, you can just
     * set the props directly on your component.
     */
    componentProps?: ComponentProps;
    /**
     * If `true`, the keyboard will be automatically dismissed when the overlay is presented.
     */
    keyboardClose: boolean;
    /**
     * Additional classes to apply for custom CSS. If multiple classes are
     * provided they should be separated by spaces.
     * @internal
     */
    cssClass?: string | string[];
    /**
     * If `true`, the popover will be dismissed when the backdrop is clicked.
     */
    backdropDismiss: boolean;
    /**
     * The event to pass to the popover animation.
     */
    event: any;
    /**
     * If `true`, a backdrop will be displayed behind the popover.
     * This property controls whether or not the backdrop
     * darkens the screen when the popover is presented.
     * It does not control whether or not the backdrop
     * is active or present in the DOM.
     */
    showBackdrop: boolean;
    /**
     * If `true`, the popover will be translucent.
     * Only applies when the mode is `"ios"` and the device supports
     * [`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).
     */
    translucent: boolean;
    /**
     * If `true`, the popover will animate.
     */
    animated: boolean;
    /**
     * Additional attributes to pass to the popover.
     */
    htmlAttributes?: {
        [key: string]: any;
    };
    /**
     * Describes what kind of interaction with the trigger that
     * should cause the popover to open. Does not apply when the `trigger`
     * property is `undefined`.
     * If `"click"`, the popover will be presented when the trigger is left clicked.
     * If `"hover"`, the popover will be presented when a pointer hovers over the trigger.
     * If `"context-menu"`, the popover will be presented when the trigger is right
     * clicked on desktop and long pressed on mobile. This will also prevent your
     * device's normal context menu from appearing.
     */
    triggerAction: TriggerAction;
    /**
     * An ID corresponding to the trigger element that
     * causes the popover to open. Use the `trigger-action`
     * property to customize the interaction that results in
     * the popover opening.
     */
    trigger: string | undefined;
    /**
     * Describes how to calculate the popover width.
     * If `"cover"`, the popover width will match the width of the trigger.
     * If `"auto"`, the popover width will be set to a static default value.
     */
    size: PopoverSize;
    /**
     * If `true`, the popover will be automatically
     * dismissed when the content has been clicked.
     */
    dismissOnSelect: boolean;
    /**
     * Describes what to position the popover relative to.
     * If `"trigger"`, the popover will be positioned relative
     * to the trigger button. If passing in an event, this is
     * determined via event.target.
     * If `"event"`, the popover will be positioned relative
     * to the x/y coordinates of the trigger action. If passing
     * in an event, this is determined via event.clientX and event.clientY.
     */
    reference: PositionReference;
    /**
     * Describes which side of the `reference` point to position
     * the popover on. The `"start"` and `"end"` values are RTL-aware,
     * and the `"left"` and `"right"` values are not.
     */
    side: PositionSide;
    /**
     * Describes how to align the popover content with the `reference` point.
     * Defaults to `"center"` for `ios` mode, and `"start"` for `md` mode.
     */
    alignment?: PositionAlign;
    /**
     * If `true`, the popover will display an arrow that points at the
     * `reference` when running in `ios` mode. Does not apply in `md` mode.
     */
    arrow: boolean;
    /**
     * If `true`, the popover will open. If `false`, the popover will close.
     * Use this if you need finer grained control over presentation, otherwise
     * just use the popoverController or the `trigger` property.
     * Note: `isOpen` will not automatically be set back to `false` when
     * the popover dismisses. You will need to do that in your code.
     */
    isOpen: boolean;
    /**
     * @internal
     *
     * If `true` the popover will not register its own keyboard event handlers.
     * This allows the contents of the popover to handle their own keyboard interactions.
     *
     * If `false`, the popover will register its own keyboard event handlers for
     * navigating `ion-list` items within a popover (up/down/home/end/etc.).
     * This will also cancel browser keyboard event bindings to prevent scroll
     * behavior in a popover using a list of items.
     */
    keyboardEvents: boolean;
    /**
     * If `true`, focus will not be allowed to move outside of this overlay.
     * If `false`, focus will be allowed to move outside of the overlay.
     *
     * In most scenarios this property should remain set to `true`. Setting
     * this property to `false` can cause severe accessibility issues as users
     * relying on assistive technologies may be able to move focus into
     * a confusing state. We recommend only setting this to `false` when
     * absolutely necessary.
     *
     * Developers may want to consider disabling focus trapping if this
     * overlay presents a non-Ionic overlay from a 3rd party library.
     * Developers would disable focus trapping on the Ionic overlay
     * when presenting the 3rd party overlay and then re-enable
     * focus trapping when dismissing the 3rd party overlay and moving
     * focus back to the Ionic overlay.
     */
    focusTrap: boolean;
    onTriggerChange(): void;
    onIsOpenChange(newValue: boolean, oldValue: boolean): void;
    /**
     * If `true`, the component passed into `ion-popover` will
     * automatically be mounted when the popover is created. The
     * component will remain mounted even when the popover is dismissed.
     * However, the component will be destroyed when the popover is
     * destroyed. This property is not reactive and should only be
     * used when initially creating a popover.
     *
     * Note: This feature only applies to inline popovers in JavaScript
     * frameworks such as Angular, React, and Vue.
     */
    keepContentsMounted: boolean;
    /**
     * Emitted after the popover has presented.
     */
    didPresent: EventEmitter<void>;
    /**
     * Emitted before the popover has presented.
     */
    willPresent: EventEmitter<void>;
    /**
     * Emitted before the popover has dismissed.
     */
    willDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the popover has dismissed.
     */
    didDismiss: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the popover has presented.
     * Shorthand for ionPopoverWillDismiss.
     */
    didPresentShorthand: EventEmitter<void>;
    /**
     * Emitted before the popover has presented.
     * Shorthand for ionPopoverWillPresent.
     */
    willPresentShorthand: EventEmitter<void>;
    /**
     * Emitted before the popover has dismissed.
     * Shorthand for ionPopoverWillDismiss.
     */
    willDismissShorthand: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted after the popover has dismissed.
     * Shorthand for ionPopoverDidDismiss.
     */
    didDismissShorthand: EventEmitter<OverlayEventDetail>;
    /**
     * Emitted before the popover has presented, but after the component
     * has been mounted in the DOM.
     * This event exists for ion-popover to resolve an issue with the
     * popover and the lazy build, that the transition is unable to get
     * the correct dimensions of the popover with auto sizing.
     * This is not required for other overlays, since the existing
     * overlay transitions are not effected by auto sizing content.
     *
     * @internal
     */
    ionMount: EventEmitter<void>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    componentWillLoad(): void;
    componentDidLoad(): void;
    /**
     * When opening a popover from a trigger, we should not be
     * modifying the `event` prop from inside the component.
     * Additionally, when pressing the "Right" arrow key, we need
     * to shift focus to the first descendant in the newly presented
     * popover.
     *
     * @internal
     */
    presentFromTrigger(event?: any, focusDescendant?: boolean): Promise<void>;
    /**
     * Determines whether or not an overlay
     * is being used inline or via a controller/JS
     * and returns the correct delegate.
     * By default, subsequent calls to getDelegate
     * will use a cached version of the delegate.
     * This is useful for calling dismiss after
     * present so that the correct delegate is given.
     */
    private getDelegate;
    /**
     * Present the popover overlay after it has been created.
     * Developers can pass a mouse, touch, or pointer event
     * to position the popover relative to where that event
     * was dispatched.
     */
    present(event?: MouseEvent | TouchEvent | PointerEvent | CustomEvent): Promise<void>;
    /**
     * Dismiss the popover overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the popover. For example, 'cancel' or 'backdrop'.
     * @param dismissParentPopover If `true`, dismissing this popover will also dismiss
     * a parent popover if this popover is nested. Defaults to `true`.
     *
     * This is a no-op if the overlay has not been presented yet. If you want
     * to remove an overlay from the DOM that was never presented, use the
     * [remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method.
     */
    dismiss(data?: any, role?: string, dismissParentPopover?: boolean): Promise<boolean>;
    /**
     * @internal
     */
    getParentPopover(): Promise<HTMLIonPopoverElement | null>;
    /**
     * Returns a promise that resolves when the popover did dismiss.
     */
    onDidDismiss<T = any>(): Promise<OverlayEventDetail<T>>;
    /**
     * Returns a promise that resolves when the popover will dismiss.
     */
    onWillDismiss<T = any>(): Promise<OverlayEventDetail<T>>;
    private onBackdropTap;
    private onLifecycle;
    private configureTriggerInteraction;
    private configureKeyboardInteraction;
    private configureDismissInteraction;
    render(): any;
}
