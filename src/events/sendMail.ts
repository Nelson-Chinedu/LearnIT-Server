import { Resend } from 'resend';

import winstonEnvLogger from 'winston-env-logger';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendMail = async (data: {email: string; subject: string; body: string; from: string}) => {

  const { email, subject, body, from } = data;

  try {
    const msg = {
      subject,
      from,
      to: email,
      html: body,
    }
    await resend.emails.send(msg);
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured sending mail',
      error,
    });
    throw new Error('An error occured sending mail');
  }
}