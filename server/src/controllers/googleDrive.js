import { google } from 'googleapis';
import fs from 'fs';

export const uploadImage = async (req, res) => {
    const auth = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.REDIRECT_URI
    );
  

    // Aquí se obtiene el token de acceso de la sesión actual
    const accessToken = req.session.access_token;

    // Configuración de la API de Google Drive
    const drive = google.drive({ version: 'v3', auth });
    const fileMetadata = {
        name: req.file.originalname
    };
    const media = {
        mimeType: req.file.mimetype,
        body: fs.createReadStream(req.file.path)
    };

    // Se sube el archivo a Google Drive
    const uploadedFile = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    }, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    // Aquí se obtiene la URL pública del archivo recién subido
    const fileId = uploadedFile.data.id;
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;

    // Se elimina el archivo temporal del servidor
    fs.unlinkSync(req.file.path);

    // Se envía la URL pública como respuesta
    res.json({ fileUrl });
};