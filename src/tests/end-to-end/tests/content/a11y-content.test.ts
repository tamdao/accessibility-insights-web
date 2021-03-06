// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
import { contentPages } from '../../../../content';
import { Browser } from '../../common/browser';
import { launchBrowser } from '../../common/browser-factory';
import { DetailsViewCommonSelectors } from '../../common/element-identifiers/common-selectors';
import { scanForAccessibilityIssues } from '../../common/scan-for-accessibility-issues';

describe('A11Y for content pages', () => {
    const contentPaths = contentPages.allPaths();

    describe('Normal mode', () => {
        let browser: Browser;

        beforeAll(async () => {
            browser = await launchBrowser({ suppressFirstTimeDialog: true });
        });

        afterAll(async () => {
            if (browser) {
                await browser.close();
                browser = undefined;
            }
        });

        it.each(contentPaths)('%s', async path => {
            const content = await browser.newContentPage(path);

            const results = await scanForAccessibilityIssues(content, '*');

            expect(results).toHaveLength(0);

            await content.close();
        });
    });

    describe('High Contrast mode', () => {
        let browser: Browser;
        let targetTabId: number;

        beforeAll(async () => {
            browser = await launchBrowser({ suppressFirstTimeDialog: true });
            targetTabId = await generateTargetTabId();
            const detailsViewPage = await browser.newExtensionDetailsViewPage(targetTabId);
            await detailsViewPage.clickSelector(DetailsViewCommonSelectors.gearButton);
            await detailsViewPage.clickSelector(DetailsViewCommonSelectors.settingsButton);
            await detailsViewPage.clickSelector(DetailsViewCommonSelectors.highContrastToggle);
        });

        afterAll(async () => {
            if (browser) {
                await browser.close();
                browser = undefined;
            }
        });

        it.each(contentPaths)('%s', async path => {
            const content = await browser.newContentPage(path);

            const results = await scanForAccessibilityIssues(content, '*');

            expect(results).toHaveLength(0);

            await content.close();
        });

        async function generateTargetTabId(): Promise<number> {
            const targetPage = await browser.newTestResourcePage('all.html');
            await targetPage.bringToFront();
            return await browser.getActivePageTabId();
        }
    });
});
