const Router = require('koa-router')
const axios = require('axios')
const path = require('path')
const fs = require('fs')
// const MemoryFS = require('memory-fs') // 扩展了fs模块功能，不把数据写入磁盘上面而是内存

const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

// const serverRender = require('./server-render')
const serverRender = require('./server-render-no-bundle')
const serverConfig = require('../../build/webpack.config.server')

// const NativeModule = require('module')
// const vm = require('vm')
// const mfs = new MemoryFS()
const serverCompiler = webpack(serverConfig)

// serverCompiler.outputFileSystem = mfs

let bundle

serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  // webpack 报错的相关设置 输出和警告
  stats = stats.toJson()
  stats.errors.forEach(err => console.log(err))
  stats.warnings.forEach(warn => console.warn(err))

  const bundlePath = path.join(
    serverConfig.output.path,
    // 'vue-ssr-server-bundle.json'
    'server-entry.js'
  )

  delete require.cache[bundlePath]
  bundle = require('../../server-build/server-entry.js').default
  // bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  // function (module, exports, require)
  // try {
  //   const m = { exports: {} }
  //   const bundleStr = mfs.readFileSync(bundlePath, 'utf-8')
  //   const wrapper = NativeModule.wrap(bundleStr)
  //   const script = new vm.Script(wrapper, {
  //     filename: 'server-entry.js',
  //     displayErrors: true
  //   })
  //   const result = script.runInThisContext()
  //   result.call(m.exports, m.exports, require, m)
  //   bundle = m.exports.default
  // } catch (err) {
  //   console.error('compile js error:', err)
  // }
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = 'wait a second...'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )
  // 带有script标签注入到ejs模板里面
  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    // .createBundleRenderer(bundle, {
    .createRenderer(bundle, {
      inject: false,
      clientManifest
    })

  // await serverRender(ctx, renderer, template)
  await serverRender(ctx, renderer, template, bundle)
}

const router = new Router()

router.get('*', handleSSR)

module.exports = router
