import { google } from 'googleapis'
import { Readable } from 'stream'
import fs from 'fs';

export const oauth2Client = new google.auth.OAuth2(process.env.CLIENT_DRIVE_ID, process.env.CLIENT_DRIVE_SECRET, process.env.REDIRECT_DRIVE_URI);

try {
    const creds = fs.readFileSync("creds.json");
    oauth2Client.setCredentials(JSON.parse(creds));
} catch (error) {
    console.log("no creds found");
}


const drive = google.drive({ version: 'v3', auth: oauth2Client });

export const uploadImage = async (file) => {
    console.log('file:', file)
    const fileMetadata = {
        name: file.originalname, // Acceder al nombre original del archivo
        parents: ['1U5asdsH2rYcqcbHMQwI5G-VKUKX759Br'],
    };
    const media = {
        mimeType: file.mimetype, // Acceder al tipo MIME del archivo
        body: Readable.from(file.buffer),

    };

    const response = await drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id',
    });

    return `https://drive.google.com/uc?id=${response.data.id}`;
};


