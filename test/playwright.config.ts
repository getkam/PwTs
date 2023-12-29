import { defineConfig } from '@playwright/test';
import { config } from 'dotenv';

config();
// @ts-ignore
export default defineConfig({
    testDir: './tests',
    
    fullyParallel: true,
    
    forbidOnly: false,
    retries: 1,
    workers: 4,
    reporter: [['dot'], ['junit', { outputFile: './reports/temp/junit.xml' }], ['html', {
        outputFolder: './reports/temp/html',
        open: 'never',
        host: '0.0.0.0',
        port: 9223,
    }]],
    // globalTimeout: settings.timeout,
    timeout: 180_000,
    preserveOutput: 'always',
    reportSlowTests: {
        max: 0,
        threshold: 30_000
    },
    use: {
        headless: false,
        screenshot: 'on',
        trace: 'on',
        video: 'on',
        launchOptions: {
            //slowMo: settings.slow_mo,
            timeout: 30_000,
            args: ['--use-fake-ui-for-media-stream', '--use-fake-device-for-media-stream'],
            firefoxUserPrefs: {
                'media.navigator.streams.fake': true,
                'media.navigator.permission.disabled': true,
            }
        },
    },
    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            outputDir: './reports/temp/chromium',
            snapshotDir: './reports/temp/chromium/snapshots',
            use: {
                browserName: 'chromium',
                viewport: { width: 1600, height: 900 },
            },
        },
        // {
        //     name: 'firefox',
        //     outputDir: './reports/temp/firefox',
        //     snapshotDir: './reports/temp/firefox/snapshots',
        //     use: {
        //         browserName: 'firefox',
        //         viewport: { width: settings.viewport_width, height: settings.viewport_height },
        //     },
        // },
        // {
        //     name: 'webkit',
        //     outputDir: './reports/temp/webkit',
        //     snapshotDir: './reports/temp/webkit/snapshots',
        //     use: {
        //         browserName: 'webkit',
        //         viewport: { width: settings.viewport_width, height: settings.viewport_height },
        //     },
        // },
    ],
    testIgnore: '*ignore',
});