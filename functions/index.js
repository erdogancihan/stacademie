const functions = require("firebase-functions");
const admin = require("firebase-admin");
const nodemailer = require("nodemailer");
const cors = require("cors")({ origin: true });
admin.initializeApp();

exports.addAdminRole = functions.https.onCall((data, context) => {
  //check if request made by an admin

  if (context.auth.token.admin === true) {
    return { error: "Only admins can add other admins." };
  }

  //get user and add custom claim(admin).
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: true
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an admin`
      };
    })
    .catch(err => {
      return err;
    });
});

exports.addUserRole = functions.https.onCall((data, context) => {
  //check if request made by an admin
  if (context.auth.token.admin !== true) {
    return { error: "Only admins can add other admins." };
  }
  //get user and add custom claim(user).
  return admin
    .auth()
    .getUserByEmail(data.email)
    .then(user => {
      return admin.auth().setCustomUserClaims(user.uid, {
        admin: false
      });
    })
    .then(() => {
      return {
        message: `Success! ${data.email} has been made an User`
      };
    })
    .catch(err => {
      return err;
    });
});


let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    type: "OAuth2",
    user: "staakademie@gmail.com",
    clientId:
      "1080959195235-k8ja4dkv3as6t904gvdigbk2fajipc8f.apps.googleusercontent.com",
    clientSecret: "fxQPBn_jUciLSHXEUK0xZTnm",
    accessToken:
      "ya29.Il-0B65i9qnVz6wGk6msCrSsIOWc1tMd65olXPF0-Wu_yipb4ryQCfyARxz_vG_QLelhKIuGSzdPtIZQfWLoOp7XrpY8hopLB3fEGexXZHUvvkkh1m2pQJ8qv79N0oPS_g",
    refreshToken:
      "1//04WCHS_VEgChNCgYIARAAGAQSNwF-L9IrXcGYY7d0_svRNnyn8X0Vm2MqATm3y9qBCxbhjmjIPKwyNjRJvzL9JLPbUJllexc0_dE"
  }
});

exports.sendMail = functions.https.onCall(data => {
  //sends email

  const dest = data.email;
  const mailOptions = {
    from: "staakademie@gmail.com",
    to: dest,
    bcc:"erdogancihan@icloud.com",
    subject: "Schweißtechnik Akademie",
    text: data.message,
    html: `<p> ${data.message} + ${data.name} + ${data.phoneNumber} </p>`
  };
  return transporter
    .sendMail(mailOptions)
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
});

