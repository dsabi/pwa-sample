module.exports = {
	globDirectory: 'dist/workbox-angular/',
	globPatterns: ['**/*.{txt,ico,js,html,css,png,json}'],
	swDest: 'dist/workbox-angular/sw.js',
	cleanupOutdatedCaches: true,
	clientsClaim: true,
	skipWaiting: true,
	importScripts: ['version_sw.js'],
	runtimeCaching: [
		{
			// Match any request ends with .png, .jpg, .jpeg or .svg.
			urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

			// Apply a cache-first strategy.
			handler: 'StaleWhileRevalidate',

			options: {
				// Use a custom cache name.
				cacheName: 'images',

				// Only cache 10 images.
				expiration: {
					maxEntries: 50,
				},
			},
		},
	],
};
