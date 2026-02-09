import { defineConfig } from 'vite'
import path from 'node:path'
import electron from 'vite-plugin-electron/simple'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        electron({
            main: {
                // Main-Process entry file of the Electron App.
                entry: 'electron/main.ts',
                vite: {
                    build: {
                        sourcemap: false,
                        minify: process.env./* @__PURE__*/ NODE_ENV === 'production',
                        rollupOptions: {
                            external: [
                                'electron',
                                'electron-updater',
                                'chokidar',
                                'node-cron',
                                'nodemailer',
                                'express',
                                'cors',
                                'axios',
                                'firebase',
                                'date-fns',
                                'fs',
                                'path',
                                'os',
                                'child_process'
                            ],
                            output: {
                                format: 'cjs',
                                entryFileNames: '[name].cjs'
                            }
                        }
                    }
                }
            },
            preload: {
                input: 'electron/preload.ts',
                vite: {
                    build: {
                        sourcemap: false,
                        rollupOptions: {
                            output: {
                                format: 'cjs',
                                entryFileNames: '[name].cjs'
                            }
                        }
                    }
                }
            },
        }),
    ],
})
