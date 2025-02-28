import type { EventEmitter } from '../../stencil-public-runtime';
import type { AnimationBuilder, ComponentProps, FrameworkDelegate } from '../../interface';
import type { NavOutlet, RouteID, RouteWrite, RouterDirection } from '../router/utils/interface';
import type { NavComponent, NavComponentWithProps, NavOptions, TransitionDoneFn } from './nav-interface';
import type { ViewController } from './view-controller';
export declare class Nav implements NavOutlet {
    private transInstr;
    private sbAni?;
    private gestureOrAnimationInProgress;
    private useRouter;
    private isTransitioning;
    private destroyed;
    private views;
    private gesture?;
    private didLoad;
    el: HTMLElement;
    /** @internal */
    delegate?: FrameworkDelegate;
    /**
     * If the nav component should allow for swipe-to-go-back.
     */
    swipeGesture?: boolean;
    swipeGestureChanged(): void;
    /**
     * If `true`, the nav should animate the transition of components.
     */
    animated: boolean;
    /**
     * By default `ion-nav` animates transition between pages based in the mode (ios or material design).
     * However, this property allows to create custom transition using `AnimationBuilder` functions.
     */
    animation?: AnimationBuilder;
    /**
     * Any parameters for the root component
     */
    rootParams?: ComponentProps;
    /**
     * Root NavComponent to load
     */
    root?: NavComponent;
    rootChanged(): void;
    /**
     * Event fired when Nav will load a component
     * @internal
     */
    ionNavWillLoad: EventEmitter<void>;
    /**
     * Event fired when the nav will change components
     */
    ionNavWillChange: EventEmitter<void>;
    /**
     * Event fired when the nav has changed components
     */
    ionNavDidChange: EventEmitter<void>;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    connectedCallback(): void;
    disconnectedCallback(): void;
    /**
     * Push a new component onto the current navigation stack. Pass any additional
     * information along as an object. This additional information is accessible
     * through NavParams.
     *
     * @param component The component to push onto the navigation stack.
     * @param componentProps Any properties of the component.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    push<T extends NavComponent>(component: T, componentProps?: ComponentProps<T> | null, opts?: NavOptions | null, done?: TransitionDoneFn): Promise<boolean>;
    /**
     * Inserts a component into the navigation stack at the specified index.
     * This is useful to add a component at any point in the navigation stack.
     *
     * @param insertIndex The index to insert the component at in the stack.
     * @param component The component to insert into the navigation stack.
     * @param componentProps Any properties of the component.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    insert<T extends NavComponent>(insertIndex: number, component: T, componentProps?: ComponentProps<T> | null, opts?: NavOptions | null, done?: TransitionDoneFn): Promise<boolean>;
    /**
     * Inserts an array of components into the navigation stack at the specified index.
     * The last component in the array will become instantiated as a view, and animate
     * in to become the active view.
     *
     * @param insertIndex The index to insert the components at in the stack.
     * @param insertComponents The components to insert into the navigation stack.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    insertPages(insertIndex: number, insertComponents: NavComponent[] | NavComponentWithProps[], opts?: NavOptions | null, done?: TransitionDoneFn): Promise<boolean>;
    /**
     * Pop a component off of the navigation stack. Navigates back from the current
     * component.
     *
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    pop(opts?: NavOptions | null, done?: TransitionDoneFn): Promise<boolean>;
    /**
     * Pop to a specific index in the navigation stack.
     *
     * @param indexOrViewCtrl The index or view controller to pop to.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    popTo(indexOrViewCtrl: number | ViewController, opts?: NavOptions | null, done?: TransitionDoneFn): Promise<boolean>;
    /**
     * Navigate back to the root of the stack, no matter how far back that is.
     *
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    popToRoot(opts?: NavOptions | null, done?: TransitionDoneFn): Promise<boolean>;
    /**
     * Removes a component from the navigation stack at the specified index.
     *
     * @param startIndex The number to begin removal at.
     * @param removeCount The number of components to remove.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    removeIndex(startIndex: number, removeCount?: number, opts?: NavOptions | null, done?: TransitionDoneFn): Promise<boolean>;
    /**
     * Set the root for the current navigation stack to a component.
     *
     * @param component The component to set as the root of the navigation stack.
     * @param componentProps Any properties of the component.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    setRoot<T extends NavComponent>(component: T, componentProps?: ComponentProps<T> | null, opts?: NavOptions | null, done?: TransitionDoneFn): Promise<boolean>;
    /**
     * Set the views of the current navigation stack and navigate to the last view.
     * By default animations are disabled, but they can be enabled by passing options
     * to the navigation controller. Navigation parameters can also be passed to the
     * individual pages in the array.
     *
     * @param views The list of views to set as the navigation stack.
     * @param opts The navigation options.
     * @param done The transition complete function.
     */
    setPages(views: NavComponent[] | NavComponentWithProps[], opts?: NavOptions | null, done?: TransitionDoneFn): Promise<boolean>;
    /**
     * Called by the router to update the view.
     *
     * @param id The component tag.
     * @param params The component params.
     * @param direction A direction hint.
     * @param animation an AnimationBuilder.
     *
     * @return the status.
     * @internal
     */
    setRouteId(id: string, params: ComponentProps | undefined, direction: RouterDirection, animation?: AnimationBuilder): Promise<RouteWrite>;
    /**
     * Called by <ion-router> to retrieve the current component.
     *
     * @internal
     */
    getRouteId(): Promise<RouteID | undefined>;
    /**
     * Get the active view.
     */
    getActive(): Promise<ViewController | undefined>;
    /**
     * Get the view at the specified index.
     *
     * @param index The index of the view.
     */
    getByIndex(index: number): Promise<ViewController | undefined>;
    /**
     * Returns `true` if the current view can go back.
     *
     * @param view The view to check.
     */
    canGoBack(view?: ViewController): Promise<boolean>;
    /**
     * Get the previous view.
     *
     * @param view The view to get.
     */
    getPrevious(view?: ViewController): Promise<ViewController | undefined>;
    /**
     * Returns the number of views in the stack.
     */
    getLength(): Promise<number>;
    private getActiveSync;
    private canGoBackSync;
    private getPreviousSync;
    /**
     * Adds a navigation stack change to the queue and schedules it to run.
     *
     * @returns Whether the transition succeeds.
     */
    private queueTrns;
    private success;
    private failed;
    private fireError;
    /**
     * Consumes the next transition in the queue.
     *
     * @returns whether the transition is executed.
     */
    private nextTrns;
    /** Executes all the transition instruction from the queue. */
    private runTransition;
    private prepareTI;
    /**
     * Returns the view that will be entered considering the transition instructions.
     *
     * @param ti The instructions.
     * @param leavingView The view being left or undefined if none.
     *
     * @returns The view that will be entered, undefined if none.
     */
    private getEnteringView;
    /**
     * Adds and Removes the views from the navigation stack.
     *
     * @param enteringView The view being entered.
     * @param leavingView The view being left.
     * @param ti The instructions.
     */
    private postViewInit;
    private transition;
    private transitionFinish;
    /**
     * Inserts a view at the specified index.
     *
     * When the view already is in the stack it will be moved to the new position.
     *
     * @param view The view to insert.
     * @param index The index where to insert the view.
     */
    private insertViewAt;
    /**
     * Removes a view from the stack.
     *
     * @param view The view to remove.
     */
    private removeView;
    private destroyView;
    /**
     * Unmounts all inactive views after the specified active view.
     *
     * DOM WRITE
     *
     * @param activeView The view that is actively visible in the stack. Used to calculate which views to unmount.
     */
    private unmountInactiveViews;
    private canStart;
    private onStart;
    private onMove;
    private onEnd;
    render(): any;
}
