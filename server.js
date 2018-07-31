const Vue = require('vue')
const server = require('express')()
const { createBundleRenderer } = require('vue-server-renderer')

const template = require('fs').readFileSync('./index.template.html', 'utf-8')
const serverBundle = require('./dist/vue-ssr-server-bundle.json')
const clientManifest = require('./dist/vue-ssr-client-manifest.json')

const renderer = createBundleRenderer(serverBundle, {
  template,
  clientManifest
})


// inside a server handler...
server.get('*', (req, res) => {
  const context = { url: req.url }
  // No need to pass an app here because it is auto-created by
  // executing the bundle. Now our server is decoupled from our Vue app!
  renderer.renderToString(context, (err, html) => {
    // handle error...
    res.end(html)
  })
})
/*
// server.js
const createApp = require('./src/app')

server.get('*', (req, res) => {
  const context = { url: req.url }
  const app = createApp(context)

  renderer.renderToString(app, (err, html) => {
    // handle error...
    res.end(html)
  })
})
*/
/*
// Step 1: Create a Vue instance
const Vue = require('vue')
const app = new Vue({
  template: `<div>Hello World</div>`
})

// Step 2: Create a renderer
const renderer = require('vue-server-renderer').createRenderer({
  template: require('fs').readFileSync('./index.template.html', 'utf-8')
})

const context = {
  title: 'hello',
  meta: `
    <meta ...>
    <meta ...>
  `
}
// Step 3: Render the Vue instance to HTML
renderer.renderToString(app, context, (err, html) => {
  if (err) throw err
  console.log(html)
  // => <div data-server-rendered="true">Hello World</div>
})

// in 2.5.0+, returns a Promise if no callback is passed:
renderer.renderToString(app, context).then(html => {
  console.log(html)
}).catch(err => {
  console.error(err)
})
*/
server.listen(8080)