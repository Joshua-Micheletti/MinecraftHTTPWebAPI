// library for HTTP requests
const express = require("express");
const { exec } = require('child_process');

// express object
const app = express();

app.post('/restart', (req, resp) => {
    exec('sudo systemctl restart minecraft', (error, stdout, stderr) => {
        if (error) {
            console.error('error: ' + error.message);
            return;
        }

        if (stderr) {
            console.error('stderr: ' + stderr);
            return;
        }

        console.log('stdout:\n' + stdout);
    });

    resp.status(200).end();
});

const listener = app.listen(3000, () => {
    console.log("Your app is listening on port " + listener.address().port);
});