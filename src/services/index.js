const express = require('express'); 
const app = express(); 
const { filtrarContactos } = require('./openaiService');
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hola, servidor en ejecución!');
});

app.post('/filtrar', async (req, res) => {
    try {
        const resultado = await filtrarContactos(req.body.respuestas);
        res.send({ resultado });
    } catch (error) {
        res.status(500).send({ error: 'Error al filtrar contactos' });
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

