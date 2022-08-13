// library for HTTP requests
const express = require("express");
const cors = require('cors');
const { exec } = require('child_process');

// express object
const app = express();
app.use(cors());

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

app.post('/start', (req, resp) => {
    exec('sudo systemctl start minecraft', (error, stdout, stderr) => {
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

app.post('/stop', (req, resp) => {
    exec('sudo systemctl stop minecraft', (error, stdout, stderr) => {
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

app.get('/checkStatus', (req, resp) => {
    exec('sudo systemctl status minecraft', (error, stdout, stderr) => {
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

app.post('/sendCommand', (req, resp) => {
    var command = req.query.command;

    exec("echo " + command + " > /run/minecraft.stdin", (error, stdout, stderr) => {
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