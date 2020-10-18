import { https } from 'firebase-functions'
import next from 'next'

const isDev = process.env.NODE_ENV !== 'production'
const nextjsDistDir = '.next'
const nextjsServer = next({
    dev: isDev,
    conf: {
        distDir: nextjsDistDir,
    },
})

const nextjsHandle = nextjsServer.getRequestHandler()

exports.app = https.onRequest((req, res) => {
    return nextjsServer.prepare().then(() => nextjsHandle(req, res))
})