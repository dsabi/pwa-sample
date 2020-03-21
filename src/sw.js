importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js'
  )
  
  const SW_VERSION = '1.0.5'
  
  if (workbox) {
    workbox.setConfig({ debug: true })
    workbox.core.skipWaiting()
    workbox.core.clientsClaim()
    workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
  
    self.addEventListener('message', event => {
        console.log('messageeeee from SW', event)
    //   if (event.data.type === 'RELOAD_APP') {
    //       console.log('reloadddd')
    //       self.location.reload();
    //   }
      if (event.data.type === 'GET_VERSION') {
        event.ports[0].postMessage(SW_VERSION)
      }
    })
    self.addEventListener('notificationclick', function(e) {
      clients
        .matchAll({ includeUncontrolled: true, type: 'window' })
        .then(clis => {
          const client = clis[0]
          if (client !== undefined) {
            client.postMessage(e.action)
          }
          e.notification.close()
        })
    })
    self.addEventListener('message', event => {
        if (!event.data) {
          return
        }
    
        if (event.data === 'skipWaiting') {
          self.skipWaiting()
        }
      })
  }
  
  workbox.precaching.cleanupOutdatedCaches()
  