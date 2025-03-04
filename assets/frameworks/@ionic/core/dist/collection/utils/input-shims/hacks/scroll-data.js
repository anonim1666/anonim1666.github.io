/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { SCROLL_AMOUNT_PADDING } from "./common";
const SCROLL_ASSIST_SPEED = 0.3;
export const getScrollData = (componentEl, contentEl, keyboardHeight, platformHeight) => {
    var _a;
    const itemEl = (_a = componentEl.closest('ion-item,[ion-item]')) !== null && _a !== void 0 ? _a : componentEl;
    return calcScrollData(itemEl.getBoundingClientRect(), contentEl.getBoundingClientRect(), keyboardHeight, platformHeight);
};
const calcScrollData = (inputRect, contentRect, keyboardHeight, platformHeight) => {
    // compute input's Y values relative to the body
    const inputTop = inputRect.top;
    const inputBottom = inputRect.bottom;
    // compute visible area
    const visibleAreaTop = contentRect.top;
    const visibleAreaBottom = Math.min(contentRect.bottom, platformHeight - keyboardHeight);
    // compute safe area
    const safeAreaTop = visibleAreaTop + 15;
    const safeAreaBottom = visibleAreaBottom - SCROLL_AMOUNT_PADDING;
    // figure out if each edge of the input is within the safe area
    const distanceToBottom = safeAreaBottom - inputBottom;
    const distanceToTop = safeAreaTop - inputTop;
    // desiredScrollAmount is the negated distance to the safe area according to our calculations.
    const desiredScrollAmount = Math.round(distanceToBottom < 0 ? -distanceToBottom : distanceToTop > 0 ? -distanceToTop : 0);
    // our calculations make some assumptions that aren't always true, like the keyboard being closed when an input
    // gets focus, so make sure we don't scroll the input above the visible area
    const scrollAmount = Math.min(desiredScrollAmount, inputTop - visibleAreaTop);
    const distance = Math.abs(scrollAmount);
    const duration = distance / SCROLL_ASSIST_SPEED;
    const scrollDuration = Math.min(400, Math.max(150, duration));
    return {
        scrollAmount,
        scrollDuration,
        scrollPadding: keyboardHeight,
        inputSafeY: -(inputTop - safeAreaTop) + 4,
    };
};
