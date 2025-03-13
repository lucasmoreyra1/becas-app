import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Función para enviar correo
export const sendEmail = async (to, subject, html) => {
  const mailOptions = {
    from: EMAIL_USER,
    to,
    subject,
    html,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado:", info.response);
    return info;
  } catch (error) {
    console.error("Error enviando correo:", error);
    throw error;
  }
};
