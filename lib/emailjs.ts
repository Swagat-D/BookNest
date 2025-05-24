// File: lib/emailjs.ts
import config from "./config";

// Send email using EmailJS REST API for server-side usage
export const sendEmailWithEmailJS = async (
  email: string,
  subject: string,
  message: string,
  fromName: string = "BOOKNEST"
) => {
  try {
    const emailData = {
      service_id: config.env.emailjs.serviceId,
      template_id: config.env.emailjs.templateId,
      user_id: config.env.emailjs.publicKey,
      template_params: {
        to_email: email,
        subject: subject,
        message_html: message,
        from_name: fromName,
      },
      accessToken: config.env.emailjs.privateKey,
    };

    console.log('Sending email with data:', { 
      service_id: emailData.service_id,
      template_id: emailData.template_id,
      to_email: email 
    });

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`EmailJS API error: ${response.status} - ${errorText}`);
      throw new Error(`EmailJS API error: ${response.status} - ${errorText}`);
    }

    const result = await response.text();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error in sendEmailWithEmailJS:', error);
    throw error;
  }
};