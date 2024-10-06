const express = require('express');
const bodyParser = require('body-parser');
const { filtrarContactos } = require('./openaiService');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/filtrar', async (req, res) => {
    console.log('Cuerpo recibido:', req.body);

    const { respuestas } = req.body;
    if (!respuestas || !respuestas.urgencia || !respuestas.finanzas || !respuestas.compromiso) {
        return res.status(400).json({ error: 'Faltan datos requeridos: urgencia, finanzas o compromiso.' });
    }
     
    try {
        const respuestaFiltrada = await filtrarContactos(respuestas);
        res.json({ resultado: respuestaFiltrada });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});

