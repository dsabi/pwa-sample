const { injectManifest } = require('workbox-build')

let workboxConfig = {
  globDirectory: './dist/workbox-angular',
  globPatterns: ['favicon.ico', 'index.html', '*.css', '*.js'],
  swSrc: './src/sw.js',
  swDest: './dist/workbox-angular/sw.js',
}

injectManifest(workboxConfig)
  .then(({ count, size }) => {
    console.log(
      `Generated ${workboxConfig.swDest}, which will precache ${count} files, totaling ${size} bytes.`
    )
  })
  .catch(e => console.log('Error injecting manifest', e))
