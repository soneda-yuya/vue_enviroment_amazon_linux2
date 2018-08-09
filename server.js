const Vue = require('vue')
const server = require('express')()
const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
//const serverBundle = require('./dist/vue-ssr-server-bundle.json')
//const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const log4js = require('log4js');
const logger = log4js.getLogger();
logger.level = "debug";

/*
const app = require('./src/app');
const webpack = require('webpack');
const webpackConfig = require('./build/webpack.dev.conf.js');
const compiler = webpack(webpackConfig);
server.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
}));
server.use(require("webpack-hot-middleware")(compiler));
*/

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const clientConfig = require('./build/webpack.client.config.js');
const clientcompiler = webpack(clientConfig);
const clientDevMiddleware = webpackDevMiddleware(clientcompiler, {
  noInfo: true,
  hot: true,
  publicPath: clientConfig.output.publicPath,
})
server.use(clientDevMiddleware);
server.use(webpackHotMiddleware(clientcompiler, { heartbeat: 5000 }));

logger.debug(clientDevMiddleware)

// server bundle
const serverConfig = require('./build/webpack.server.config.js');
const serverCompiler = webpack(serverConfig);
logger.debug(serverConfig.output.path);
const serverDevMiddleware = webpackDevMiddleware(serverCompiler, {
  noInfo: true,
  hot: true,
  publicPath: serverConfig.output.publicPath,
})
server.use(serverDevMiddleware);

// inside a server handler...
server.get('*', (req, res) => {
  const context = { url: req.url };
  const vueSsrServerBundle = JSON.parse(serverDevMiddleware.fileSystem.readFileSync(path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json'), 'utf-8'))
  const vueSsrClientManifest = JSON.parse(clientDevMiddleware.fileSystem.readFileSync(path.join(clientConfig.output.path, 'vue-ssr-client-manifest.json'), 'utf-8'))
  const template = require('fs').readFileSync('./index.template.html', 'utf-8')
  const renderer = createBundleRenderer(vueSsrServerBundle, {
    template,
    vueSsrClientManifest
  });


  // logger.debug(res.locals.webpackStats.toJson());
  // No need to pass an app here because it is auto-created by
  // executing the bundle. Now our server is decoupled from our Vue app!
  renderer.renderToString(context, (err, html) => {
      logger.debug(err);

    // handle error...
    res.end(html)
  })
});
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
