const express = require('express');
const path = require('path');
const phpExpress = require('php-express')({
  binPath: 'php',
  alwaysUseRequestBody: true
});

const app = express();
const PORT = 3000;

app.engine('php', phpExpress.engine);
app.set('views', __dirname);
app.set('view engine', 'php');

app.all(/.+\.php$/, phpExpress.router);

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use(express.static(path.join(__dirname, 'pages')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
