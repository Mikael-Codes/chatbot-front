import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Saves uploaded PDF to the server
export default async function handler(req, res) {
  const form = new formidable.IncomingForm({multiples: false});
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error uploading file' });
    }
    const file = files.file;
    // Check if file is a PDF
    if (files.file.mimetype !== 'application/pdf') {
      return res.status(400).json({ message: 'Invalid file type' });
    }

    const fileName = path.join(process.cwd(), 'uploads', file.originalFilename);

    const fileContent = await fs.promises.readFile(file.filepath);
    await fs.promises.writeFile(fileName, fileContent);

  });
}
