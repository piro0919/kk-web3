import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import nodemailer from "nodemailer";
import { Options } from "nodemailer/lib/mailer";
import { SentMessageInfo } from "nodemailer/lib/smtp-transport";
import { parseCookies } from "nookies";

export type PostEmailBody = Pick<Options, "replyTo" | "subject" | "text">;

export type PostEmailData = SentMessageInfo;

type ExtendedPostRequest = {
  body: PostEmailBody;
};

type ExtendedPostResponse = {
  json: (body: PostEmailData) => void;
};

const handler = nc<NextApiRequest, NextApiResponse<ExtendedPostResponse>>({
  onError: (err, _, res) => {
    console.error(err.stack);

    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
}).post<ExtendedPostRequest, ExtendedPostResponse>(async (req, res) => {
  const { token } = parseCookies({ req });
  const {
    data: { success },
  } = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`
  );

  if (!success) {
    res.status(500);
    res.end();

    return;
  }

  const { body } = req;
  const transporter = nodemailer.createTransport({
    auth: {
      pass: process.env.NODEMAILER_AUTH_PASS,
      user: process.env.NODEMAILER_AUTH_USER,
    },
    port: 465,
    secure: true,
    service: "gmail",
    tls: {
      rejectUnauthorized: !process.env.URL?.includes("localhost"),
    },
  });
  const { replyTo, subject, text } = body as PostEmailBody;
  const info = await transporter.sendMail({
    replyTo,
    subject,
    text,
    to: process.env.NODEMAILER_AUTH_USER,
  });

  res.status(200);
  res.json(info);
  res.end();
});

export default handler;
