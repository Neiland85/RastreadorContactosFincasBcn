const openai = require('openai');
require('dotenv').config();

const filtrarContactos = async (respuestas) => {
    const prompt = generarPrompt(respuestas);

    try {
        const response = await openai.completions.create({
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 100,
            temperature: 0.7,
        });

        return response.choices[0].text.trim();
    } catch (error) {
        console.error('Error al hacer la petición a OpenAI:', error.response ? error.response.data : error.message);
        throw new Error('Error al filtrar contactos con OpenAI');
    }
};

const generarPrompt = (respuestas) => {
    let urgencia = respuestas.urgencia.toLowerCase();
    let finanzas = respuestas.finanzas.toLowerCase();
    let compromiso = respuestas.compromiso.toLowerCase();

    let recomendacion = "";

    if (urgencia === "alta") {
        recomendacion += "El cliente tiene una alta urgencia para cerrar la transacción. ";
    } else if (urgencia === "media") {
        recomendacion += "El cliente tiene una urgencia moderada. Puedes avanzar a un ritmo regular. ";
    } else {
        recomendacion += "El cliente no tiene prisa para cerrar la transacción. Puedes proceder con cautela. ";
    }

    if (finanzas === "buenas") {
        recomendacion += "El cliente tiene buenas finanzas, lo que significa que hay un alto potencial de cerrar la venta. ";
    } else if (finanzas === "regulares") {
        recomendacion += "El cliente tiene finanzas regulares, lo que podría requerir algunos ajustes o negociaciones en la oferta. ";
    } else {
        recomendacion += "El cliente tiene problemas financieros, lo que podría dificultar el cierre de la venta. Es posible que necesites ajustar el enfoque o buscar soluciones de financiamiento. ";
    }

    if (compromiso === "firme") {
        recomendacion += "El cliente está firmemente comprometido, lo que es una buena señal de que la transacción se cerrará pronto.";
    } else if (compromiso === "medio") {
        recomendacion += "El cliente está moderadamente comprometido, por lo que podría ser necesario un poco más de persuasión o incentivos para cerrar el trato.";
    } else {
        recomendacion += "El cliente no está comprometido. Deberías centrarte en aumentar su interés antes de avanzar con la transacción.";
    }

    return recomendacion;
};

module.exports = { filtrarContactos };

