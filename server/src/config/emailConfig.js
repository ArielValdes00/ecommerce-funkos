import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 587,
  logger: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASSWORD, 
  },
  tls: {
    rejectUnauthorized: true
  }
});
