const express = require('express');
const path = require('path');

const app = express();

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// An api endpoint that returns a short list of items
app.get('/api/getList', (req,res) => {
    const { spawn } = require('child_process');
    const pyProg = spawn('python', ['./test.py']);

    pyProg.stdout.on('data', function(data) {
        console.log(data.toString());
        var test = data.toString();
        res.json([test]);
    });
    //var list = ["item1", "item2", "item3", test];
    //res.json(list);
    //console.log('Sent list of items');
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port ' + port);
