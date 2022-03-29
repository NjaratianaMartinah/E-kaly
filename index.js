const { main, app } = require('./api/main');
const path = require('path');
app.get('/ekaly/*', (req, res) => res.sendFile(path.join(__dirname, 'dist/ekaly-fo/index.html')));
app.get('/ekaly/', (req, res) => res.sendFile(path.join(__dirname, 'dist/ekaly-fo/index.html')));
main();
