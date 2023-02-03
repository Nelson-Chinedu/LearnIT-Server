import sgMail from '@sendgrid/mail';
import winstonEnvLogger from 'winston-env-logger';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export const sendMail = async (data: {
  email: string;
  subject: string;
  body: string;
}) => {
  const { email, subject, body } = data;
  try {
    const msg = {
      to: email,
      from: 'LearnIT <no-reply@learnit>',
      subject,
      html: body,
    };
    await sgMail.send(msg);
  } catch (error) {
    winstonEnvLogger.error({
      message: 'An error occured sending mail',
      error,
    });
    throw new Error('An error occured sending mail');
  }
};
