const express = require('express');
5. const app = express();
6.
7. app.use(express.json());
8.
9. app.post('/filtrar-contactos', (req, res) => {
10. const { respuestas } = req.body;
11. // Aquí integrarías la IA para filtrar los contactos
12. res.json({ mensaje: 'Contacto procesado' });
13. });
14.
15. app.listen(3000, () => {
16. console.log('Servidor escuchando en puerto 3000');
17. });
