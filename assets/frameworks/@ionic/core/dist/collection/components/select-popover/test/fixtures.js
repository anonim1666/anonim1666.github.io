/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { expect } from "@playwright/test";
export class SelectPopoverPage {
    constructor(page) {
        this.options = [];
        this.page = page;
    }
    async setup(config, options, multiple = false) {
        const { page } = this;
        await page.setContent(`
    <ion-popover>
      <ion-select-popover></ion-select-popover>
    </ion-popover>
    <script>
      const selectPopover = document.querySelector('ion-select-popover');
      selectPopover.options = ${JSON.stringify(options)};
      selectPopover.multiple = ${multiple};
    </script>
    `, config);
        const ionPopoverDidPresent = await page.spyOnEvent('ionPopoverDidPresent');
        this.ionPopoverDidDismiss = await page.spyOnEvent('ionPopoverDidDismiss');
        this.popover = page.locator('ion-popover');
        this.selectPopover = page.locator('ion-select-popover');
        this.multiple = multiple;
        this.options = options;
        await this.popover.evaluate((popover) => popover.present());
        await ionPopoverDidPresent.next();
    }
    async screenshot(screenshot, name) {
        await expect(this.selectPopover).toHaveScreenshot(screenshot(name));
    }
    async clickOption(value) {
        const option = this.getOption(value);
        await option.click();
    }
    async pressSpaceOnOption(value) {
        const option = this.getOption(value);
        await option.press('Space');
    }
    getOption(value) {
        const { multiple, selectPopover } = this;
        const selector = multiple ? 'ion-checkbox' : 'ion-radio';
        const index = this.options.findIndex((o) => o.value === value);
        return selectPopover.locator(selector).nth(index);
    }
}
