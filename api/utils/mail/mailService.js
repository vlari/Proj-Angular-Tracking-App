const nodemailer = require('nodemailer');
const env = require('../../src/config/env');
const forgotPasswordTemplate = require('./templates/forgotPasswordTemplate');

exports.getTransporter = () => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: env.MAIL_USER,
      pass: env.MAIL_PASSWORD,
    },
  });

  return transporter;
};

exports.getEmailSettings = (options) => {
  const { type, email, resetUrl } = options;
  let template;

  switch (type) {
    case 'forgotPassword':
      template = forgotPasswordTemplate({ email, resetUrl });
      break;
    default:
      break;
  }

  const emailSettings = {
    from: env.MAIL_USER,
    to: email,
    subject: 'Reset Password',
    html: `${template}`,
    amp: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
        <style amp4email-boilerplate>body{visibility:hidden}</style>
        <style amp4email-boilerplate>
        body{visibility:hidden}
        h1, p,a {
          padding: 15px;
        }
        
        a {
          text-decoration: none;
          border-radius: 4px;
          color: #FFF;
          background-color: #b366ff;
          outline: none;
        }
        </style>
        <script async src="https://cdn.ampproject.org/v0.js"></script>
        <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
      </head>
      <body>
       ${template}
      </body>
    </html>`
  };

  return emailSettings;
};
