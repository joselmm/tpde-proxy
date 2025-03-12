const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // Asegúrate de instalar node-fetch: npm install node-fetch

const app = express();

// Habilitar CORS para todos los orígenes
app.use(cors());

app.get('/', async (req, res) => {
  let response = { noError: true };

  try {
    // 1. Obtener la imagen desde thispersondoesnotexist.com
    const imageResponse = await fetch('https://thispersondoesnotexist.com/');
    
    // Leer la respuesta como un buffer de bytes
    const buffer = await imageResponse.buffer();

    // Obtener el content-type de la respuesta (ej: "image/jpeg" o "image/png")
    const mimeType = imageResponse.headers.get('content-type');

    // Codificar la imagen en base64
    const base64Data = buffer.toString('base64');

    // Formatear el string en Data URI
    response.imageBase64 = `data:${mimeType};base64,${base64Data}`;
  } catch (err) {
    response.noError = false;
    response.message = err.message;
  }

  // Devolver el JSON como respuesta
  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
