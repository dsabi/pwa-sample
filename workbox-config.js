module.exports = {
	globDirectory: 'dist/workbox-angular/',
	globPatterns: ['**/*.{txt,ico,js,css}'],
	swDest: 'dist/workbox-angular/sw.js',
	cleanupOutdatedCaches: true,
	clientsClaim: true,
	importScripts: ['version_sw.js'],
	runtimeCaching: [
		{
			// Match any request ends with .png, .jpg, .jpeg or .svg.
			urlPattern: /\.(?:png|jpg|jpeg|svg)$/,

			// Apply a cache-first strategy.
			handler: 'NetworkFirst',

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
