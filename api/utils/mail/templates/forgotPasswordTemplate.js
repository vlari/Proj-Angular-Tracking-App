
const forgotPasswordTemplate = options => {
  return `<div style="font-family:-apple-system,BlinkMacSystemFont,Roboto,'Helvetica neue',Helvetica,Tahoma,Arial,sans-serif;">
  <h1>Hello</h1>
  <p>
  We received a request to reset your password for your Tracking App account: ${options.email}. We're here to help!  
  </p>
  <p>
  Simply click on the link below to set a new password:  
  </p>
  <a href="${options.resetUrl}">Set a New Password</a>
  <p>
  If you didn't ask to change your password, don't worry! Your password is still safe and you can delete this email.   
  </p>
  </div>`
};

module.exports = forgotPasswordTemplate;
