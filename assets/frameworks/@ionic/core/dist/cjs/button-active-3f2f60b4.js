/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
'use strict';

const index$1 = require('./index-73f75efb.js');
const haptic = require('./haptic-f6b37aa3.js');
const index = require('./index-ee07ed59.js');

const createButtonActiveGesture = (el, isButton) => {
    let currentTouchedButton;
    let initialTouchedButton;
    const activateButtonAtPoint = (x, y, hapticFeedbackFn) => {
        if (typeof document === 'undefined') {
            return;
        }
        const target = document.elementFromPoint(x, y);
        if (!target || !isButton(target) || target.disabled) {
            clearActiveButton();
            return;
        }
        if (target !== currentTouchedButton) {
            clearActiveButton();
            setActiveButton(target, hapticFeedbackFn);
        }
    };
    const setActiveButton = (button, hapticFeedbackFn) => {
        currentTouchedButton = button;
        if (!initialTouchedButton) {
            initialTouchedButton = currentTouchedButton;
        }
        const buttonToModify = currentTouchedButton;
        index$1.writeTask(() => buttonToModify.classList.add('ion-activated'));
        hapticFeedbackFn();
    };
    const clearActiveButton = (dispatchClick = false) => {
        if (!currentTouchedButton) {
            return;
        }
        const buttonToModify = currentTouchedButton;
        index$1.writeTask(() => buttonToModify.classList.remove('ion-activated'));
        /**
         * Clicking on one button, but releasing on another button
         * does not dispatch a click event in browsers, so we
         * need to do it manually here. Some browsers will
         * dispatch a click if clicking on one button, dragging over
         * another button, and releasing on the original button. In that
         * case, we need to make sure we do not cause a double click there.
         */
        if (dispatchClick && initialTouchedButton !== currentTouchedButton) {
            currentTouchedButton.click();
        }
        currentTouchedButton = undefined;
    };
    return index.createGesture({
        el,
        gestureName: 'buttonActiveDrag',
        threshold: 0,
        onStart: (ev) => activateButtonAtPoint(ev.currentX, ev.currentY, haptic.hapticSelectionStart),
        onMove: (ev) => activateButtonAtPoint(ev.currentX, ev.currentY, haptic.hapticSelectionChanged),
        onEnd: () => {
            clearActiveButton(true);
            haptic.hapticSelectionEnd();
            initialTouchedButton = undefined;
        },
    });
};

exports.createButtonActiveGesture = createButtonActiveGesture;
