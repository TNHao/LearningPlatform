const nodemailer = require("nodemailer");
const { verification, invitation } = require("../../utils/emailTemplate");

const MAIL_SENDER = "learnhub.h2b@gmail.com";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "learnhub.h2b@gmail.com",
    pass: "aajftyxkppydpwii",
  },
});

// var transporter = nodemailer.createTransport({
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "e20ee919b840d7",
//     pass: "f16fdb6d7cb28c"
//   }
// });

async function sendVerificationMail(receivers, verificationUrl, callbacks) {
  const htmlBody = verification(verificationUrl);

  return sendMail(
    {
      htmlBody,
      receivers,
      subject: "Verify Email Address",
      sender: MAIL_SENDER,
    },
    callbacks
  );
}

async function sendInvitationMail(
  inviter,
  groupName,
  receivers,
  inviteUrl,
  callbacks
) {
  const htmlBody = invitation(inviter, groupName, inviteUrl);

  return sendMail(
    {
      htmlBody,
      receivers,
      subject: `${groupName} group invitation`,
      sender: MAIL_SENDER,
    },
    callbacks
  );
}

async function sendMail(mailInfo, callbacks) {
  const { htmlBody, subject, sender, receivers } = mailInfo;

  try {
    let info = await transporter.sendMail({
      from: sender,
      to: receivers.join(","),
      subject: subject,
      html: htmlBody,
    });
    callbacks?.success(info);
    return info;
  } catch (error) {
    callbacks?.error(error);
    return error;
  }
}

module.exports = {
  sendVerificationMail,
  sendInvitationMail,
};