import { Client as WorkflowClient } from "@upstash/workflow";
import { Client as QStashClient } from "@upstash/qstash";
import config from "@/lib/config";



export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    // Using QStash to schedule email sending through EmailJS
    await qstashClient.publishJSON({
      url: `${config.env.prodApiEndpoint}/api/send-email`,
      body: {
        email,
        subject,
        message,
      },
    });
  } catch (error) {
    console.error("Error scheduling email:", error);
    throw error;
  }
};