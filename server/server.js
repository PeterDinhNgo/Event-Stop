const express = require('express');
const app = express();
const path = require('path');
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;


app.use(express.static(publicPath));

app.get('*', (req, res) => { // request object'req' and response object'res
    res.sendFile(path.join(publicPath, 'index.html'));
}); //function to run when someone makes a get request to our server.


// Axios AJAX


app.listen(port, () => {
    console.log('Server is up!');
});

