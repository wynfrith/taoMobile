var liveServer = require("live-server");

var params = {
    port: 8081, // Set the server port. Defaults to 8080.
    host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0.
    open: true, // When false, it won't load your browser by default.
    ignore: 'deploy.js,server.js', // comma-separated string for paths to ignore
    file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
    wait: 0 // Waits for all changes, before reloading. Defaults to 0 sec.
};
liveServer.start(params);
