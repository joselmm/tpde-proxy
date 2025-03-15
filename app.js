const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // npm install node-fetch
const sharp = require('sharp'); // npm install sharp

const app = express();
app.use(cors());

app.get('/', async (req, res) => {
  let response = { noError: true };

  try {
    // 1. Obtener la imagen desde thispersondoesnotexist.com
    const imageResponse = await fetch('https://thispersondoesnotexist.com/');
    const buffer = await imageResponse.buffer();

    // 2. Procesar la imagen con sharp para comprimirla en PNG
    // Para PNG, se usa "compressionLevel" (0-9) donde 9 es la máxima compresión
    const outputBuffer = await sharp(buffer)
      .png({ compressionLevel: 9, adaptiveFiltering: true })
      .toBuffer();

    // 3. Convertir el buffer resultante a base64 y formatearlo como Data URI
    const base64Data = outputBuffer.toString('base64');
    response.imageBase64 = `data:image/png;base64,${base64Data}`;

  } catch (err) {
    response.noError = false;
    response.message = err.message;
  }

  res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
