import { VerifyEmail } from "@/emails/verify-email";

import { render } from "@react-email/render";
import { getUserByEmail } from "./user";
import PasswordResetEmail from "@/emails/reset-password";
import TwoFactorEmail from "@/emails/two-factor";

// const domain = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
const domain = "http://localhost:3000";
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const trackingSettings = {
  clickTracking: {
    enable: false,
    enableText: false,
  },
  openTracking: {
    enable: false,
  },
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const user = await getUserByEmail(email);
  const confimationLink = `${domain}/auth/verify-email?token=${token}`;

  const verificationEmailHtml = render(
    VerifyEmail({ confirmationLink: confimationLink })
  );

  const msg = {
    to: email,
    from: "les.chinyanga@gmail.com",
    subject: "Verify Your Email",
    text: `${user?.name}, please verify your email address by clicking the link below: ${domain}/auth/verify-email?token=${token}`,
    html: verificationEmailHtml,
    trackingSettings,
  };
  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error);
    });
};

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const user = await getUserByEmail(email);
  const resetLink = `${domain}/auth/reset-password?token=${token}`;

  const resetPasswordEmailHtml = render(
    PasswordResetEmail({
      resetPasswordLink: resetLink,
      userFirstname: user?.name!,
    })
  );

  const msg = {
    to: email,
    from: "les.chinyanga@gmail.com",
    subject: "Reset Your Password",
    text: `${user?.name}, reset your password by clicking the link below: ${resetLink}`,
    html: resetPasswordEmailHtml,
    trackingSettings,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error);
    });
};

export const sendTwoFactorEmail = async (email: string, token: string) => {
  const twoFactorEmailHtml = render(TwoFactorEmail({ validationCode: token }));

  const msg = {
    to: email,
    from: "les.chinyanga@gmail.com",
    subject: "Two Factor Authentication",
    text: `Your two factor authentication token is: ${token}`,
    html: twoFactorEmailHtml,
    trackingSettings,
  };

  await sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error);
    });
};
