// File: lib/emailjs.ts
import emailjs from '@emailjs/browser';
import config from "./config";

export const initEmailJS = () => {
  emailjs.init({
    publicKey: config.env.emailjs.publicKey,
  });
};

// Send email using EmailJS
export const sendEmailWithEmailJS = async (
  email: string,
  subject: string,
  message: string,
  fromName: string = "BOOKNEST"
) => {
  initEmailJS();
  
  return emailjs.send(
    config.env.emailjs.serviceId,
    config.env.emailjs.templateId,
    {
      to_email: email,
      subject: subject,
      message_html: message,
      from_name: fromName,
    }
  );
};