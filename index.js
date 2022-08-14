// library for HTTP requests
const express = require("express");
const cors = require('cors');
const { exec } = require('child_process');

// express object
const app = express();
app.use(cors({
    origin: '*'
}));

app.post('/restart', (req, resp) => {
    exec('sudo systemctl restart minecraft', (error, stdout, stderr) => {
        if (error) {
            console.error('error: ' + error.message);
            resp.status(400).send(error.message).end();
            return;
        }

        if (stderr) {
            console.error('stderr: ' + stderr);
            resp.status(400).send(stderr).end();
            return;
        }

        console.log('stdout:\n' + stdout);
        resp.status(200).send(stdout).end();
    });
});

app.post('/start', (req, resp) => {
    exec('sudo systemctl start minecraft', (error, stdout, stderr) => {
        if (error) {
            console.error('error: ' + error.message);
            resp.status(400).send(error.message).end();
            return;
        }

        if (stderr) {
            console.error('stderr: ' + stderr);
            resp.status(400).send(stderr).end();
            return;
        }

        console.log('stdout:\n' + stdout);
        resp.status(200).send(stdout).end();
    });
});

app.post('/stop', (req, resp) => {
    exec('sudo systemctl stop minecraft', (error, stdout, stderr) => {
        if (error) {
            console.error('error: ' + error.message);
            resp.status(400).send(error.message).end();
            return;
        }

        if (stderr) {
            console.error('stderr: ' + stderr);
            resp.status(400).send(stderr).end();
            return;
        }

        console.log('stdout:\n' + stdout);
        resp.status(200).send(stdout).end();
    });
});

app.get('/checkStatus', (req, resp) => {
    var output = "";

    exec('sudo systemctl status minecraft', (error, stdout, stderr) => {
        if (error) {
            console.error('error: ' + error.message);
            resp.status(400).send(error.message).end();
            return;
        }

        if (stderr) {
            console.error('stderr: ' + stderr);
            resp.status(400).send(stderr).end();
            return;
        }

        console.log('stdout:\n' + stdout);
        output = stdout;
        resp.status(200).send(output).end();
    });    
});

app.post('/sendCommand', (req, resp) => {
    var command = req.query.command;
    var output = "";
    console.log("echo '" + command + "' > /run/minecraft.stdin");
    exec("echo '" + command + "' > /run/minecraft.stdin", (error, stdout, stderr) => {
        if (error) {
            console.error('error: ' + error.message);
            resp.status(400).send(error.message).end();
            return;
        }

        if (stderr) {
            console.error('stderr: ' + stderr);
            resp.status(400).send(stderr).end();
            return;
        }

        console.log('stdout:\n' + stdout);
        output = stdout;
        resp.status(200).send(stdout).end();
    });
});


const listener = app.listen(3001, () => {
    console.log("Your app is listening on port " + listener.address().port);
});