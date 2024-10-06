const openai = require('openai');
require('dotenv').config();

const filtrarContactos = async (respuestas) => {
    const prompt = generarPrompt(respuestas);

    const response = await openai.completions.create({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 100,
        temperature: 0.7,
    });

    return response.choices[0].text.trim();
};

const generarPrompt = (respuestas) => {
    return `
        Eres un experto en ventas inmobiliarias.
        Un cliente te ha proporcionado la siguiente información:
        Urgencia: ${respuestas.urgencia}
        Finanzas: ${respuestas.finanzas}
        Compromiso: ${respuestas.compromiso}

        Evalúa la seriedad del cliente en base a estos factores y da una recomendación detallada.
    `;
};

module.exports = { filtrarContactos };

