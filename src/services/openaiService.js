const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const filtrarContactos = async (respuestas) => {
  try {
    if (!respuestas || !respuestas.urgencia || !respuestas.finanzas || !respuestas.compromiso) {
      throw new Error('Datos de contacto incompletos');
    }

    const prompt = generarPrompt(respuestas);

    const respuesta = await openai.createCompletion({
      model: "text-davinci-003", // Puedes ajustar el modelo si es necesario
      prompt: prompt,
      max_tokens: 150,
      temperature: 0.3,
    });

    return respuesta.data.choices[0].text.trim();
  } catch (error) {
    console.log('Error al hacer la petición a OpenAI:', error);
    throw new Error('Error al filtrar contactos con OpenAI');
  }
};

const generarPrompt = (respuestas) => {
  return `
    Eres un experto en ventas inmobiliarias. Un cliente te ha proporcionado la siguiente información:
    Urgencia: ${respuestas.urgencia}
    Finanzas: ${respuestas.finanzas}
    Compromiso: ${respuestas.compromiso}

    Evalúa la seriedad del cliente en base a estos factores y da una recomendación detallada.
  `;
};

module.exports = {
  filtrarContactos,
};

