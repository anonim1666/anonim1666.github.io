/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { createAnimation } from "../../../utils/animation/animation";
import { getElementRoot } from "../../../utils/helpers";
import { calculateWindowAdjustment, getPopoverDimensions, getPopoverPosition } from "../utils";
const POPOVER_MD_BODY_PADDING = 12;
/**
 * Md Popover Enter Animation
 */
// TODO(FW-2832): types
export const mdEnterAnimation = (baseEl, opts) => {
    var _a;
    const { event: ev, size, trigger, reference, side, align } = opts;
    const doc = baseEl.ownerDocument;
    const isRTL = doc.dir === 'rtl';
    const bodyWidth = doc.defaultView.innerWidth;
    const bodyHeight = doc.defaultView.innerHeight;
    const root = getElementRoot(baseEl);
    const contentEl = root.querySelector('.popover-content');
    const referenceSizeEl = trigger || ((_a = ev === null || ev === void 0 ? void 0 : ev.detail) === null || _a === void 0 ? void 0 : _a.ionShadowTarget) || (ev === null || ev === void 0 ? void 0 : ev.target);
    const { contentWidth, contentHeight } = getPopoverDimensions(size, contentEl, referenceSizeEl);
    const defaultPosition = {
        top: bodyHeight / 2 - contentHeight / 2,
        left: bodyWidth / 2 - contentWidth / 2,
        originX: isRTL ? 'right' : 'left',
        originY: 'top',
    };
    const results = getPopoverPosition(isRTL, contentWidth, contentHeight, 0, 0, reference, side, align, defaultPosition, trigger, ev);
    const padding = size === 'cover' ? 0 : POPOVER_MD_BODY_PADDING;
    const { originX, originY, top, left, bottom } = calculateWindowAdjustment(side, results.top, results.left, padding, bodyWidth, bodyHeight, contentWidth, contentHeight, 0, results.originX, results.originY, results.referenceCoordinates);
    const baseAnimation = createAnimation();
    const backdropAnimation = createAnimation();
    const wrapperAnimation = createAnimation();
    const contentAnimation = createAnimation();
    const viewportAnimation = createAnimation();
    backdropAnimation
        .addElement(root.querySelector('ion-backdrop'))
        .fromTo('opacity', 0.01, 'var(--backdrop-opacity)')
        .beforeStyles({
        'pointer-events': 'none',
    })
        .afterClearStyles(['pointer-events']);
    wrapperAnimation.addElement(root.querySelector('.popover-wrapper')).duration(150).fromTo('opacity', 0.01, 1);
    contentAnimation
        .addElement(contentEl)
        .beforeStyles({
        top: `calc(${top}px + var(--offset-y, 0px))`,
        left: `calc(${left}px + var(--offset-x, 0px))`,
        'transform-origin': `${originY} ${originX}`,
    })
        .beforeAddWrite(() => {
        if (bottom !== undefined) {
            contentEl.style.setProperty('bottom', `${bottom}px`);
        }
    })
        .fromTo('transform', 'scale(0.8)', 'scale(1)');
    viewportAnimation.addElement(root.querySelector('.popover-viewport')).fromTo('opacity', 0.01, 1);
    return baseAnimation
        .easing('cubic-bezier(0.36,0.66,0.04,1)')
        .duration(300)
        .beforeAddWrite(() => {
        if (size === 'cover') {
            baseEl.style.setProperty('--width', `${contentWidth}px`);
        }
        if (originY === 'bottom') {
            baseEl.classList.add('popover-bottom');
        }
    })
        .addAnimation([backdropAnimation, wrapperAnimation, contentAnimation, viewportAnimation]);
};
