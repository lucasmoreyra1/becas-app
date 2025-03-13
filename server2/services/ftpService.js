// services/ftpService.js
import ftp from "basic-ftp";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const uploadFileToFTP = async (localFilePath, remoteFilePath) => {
  console.log("localpath" + localFilePath);
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client
      .access({
        host: process.env.FTP_HOST,
        user: process.env.FTP_USER,
        password: process.env.FTP_PASSWORD,
        secure: process.env.FTP_SECURE === "true",
        secureOptions: { rejectUnauthorized: false },
      })
      .catch((error) => {
        console.error("Error de conexión FTP:", error);
        throw new Error("Error de conexión al servidor FTP.");
      });

    if (!fs.existsSync(localFilePath)) {
      throw new Error(`El archivo local no existe en ${localFilePath}`);
    }

    await client.uploadFrom(localFilePath, remoteFilePath);
    console.log(`Archivo subido a ${remoteFilePath}`);
  } catch (error) {
    console.error(`Error subiendo archivo a FTP:`, error);
    // throw error;
  } finally {
    client.close();
  }
};

/**
 * Descarga un archivo desde el servidor FTP y lo guarda en una carpeta temporal.
 * @param {string} remoteFilePath - Ruta del archivo en el servidor FTP.
 * @returns {Promise<string>} - Devuelve la ruta temporal del archivo descargado.
 */
export const downloadFileFromFTP = async (remoteFilePath) => {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  const tempDir = path.join(__dirname, "../temp");
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir, { recursive: true });
  }

  const localFilePath = path.join(tempDir, path.basename(remoteFilePath));

  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: process.env.FTP_SECURE === "true",
      secureOptions: { rejectUnauthorized: false },
    });

    await client.downloadTo(localFilePath, remoteFilePath);
    console.log(`Archivo descargado en ${localFilePath}`);

    return localFilePath;
  } catch (error) {
    console.error("Error descargando archivo de FTP:", error);
    throw new Error("No se pudo descargar el archivo.");
  } finally {
    client.close();
  }
};
