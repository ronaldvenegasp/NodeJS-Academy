const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ronaldvenegasp@gmail.com",
    subject: "Thanks for joining in!",
    text: `Welcome to the app ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "ronaldvenegasp@gmail.com",
    subject: "Sorry you're leaving!",
    text: `I'm sorry you're leaving ${name}. Let me know if there is something I can do to get you back using the app.`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail,
};
