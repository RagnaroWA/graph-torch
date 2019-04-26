const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/getHomo', (req,res) => {
    const { spawn } = require('child_process');
    let filePath = req.query['filePath'];
    let partial = req.query['partial'];
    // console.log(req.query);
    console.log("Start to process the homogeneous graph for " + filePath);
    const args = [filePath, partial];
    args.unshift('./python/homo.py');
    const pyProg = spawn('python', args);
    pyProg.stdout.on('data', function(data) {
        // console.log(data.toString());
        var result = data.toString();
        res.json([result]);
        console.log(result);
    });
});

app.get('/api/getHete', (req,res) => {
    const { spawn } = require('child_process');
    let filePath = req.query['filePath'];
    let metaNum = req.query['metaNum'];
    // console.log(req.query);
    console.log("Start to process the heterogeneous graph for " + filePath);
    const args = [filePath, metaNum];
    args.unshift('./python/hete.py');
    const pyProg = spawn('python', args);
    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
        var result = data.toString();
        res.json([result]);
        console.log(result);
    });
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
