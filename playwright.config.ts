// after creating this config file with projects run e.g.: " npx playwright test --config=playwright.config.ts --project=Chromium "

import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    timeout: 60000, // 60 sec    or   "0" - for no timeout
    retries: 0,
    use: {
        headless: false,
        viewport: { width: 1280, height: 720 },
        actionTimeout: 15000, // 15 sec
        ignoreHTTPSErrors: true,
        video: 'off',
        screenshot: 'off'
    },
    projects: [
        {
            name: 'Chromium',
            use: {
                browserName: 'chromium'
            }
        },
        {
            name: 'Firefox',
            use: {
                browserName: 'firefox'
            }
        }
    ]

}

export default config

