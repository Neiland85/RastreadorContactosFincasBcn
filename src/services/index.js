const express = require('express');
const bodyParser = require('body-parser');
const { filtrarContactos } = require('./openaiService');

const app = express();

app.use(bodyParser.json());

app.post('/filtrar', async (req, res) => {
    console.log('Cuerpo recibido:', req.body);
    try {
        const respuestaFiltrada = await filtrarContactos(req.body.respuestas);
        res.json({ resultado: respuestaFiltrada });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
});

