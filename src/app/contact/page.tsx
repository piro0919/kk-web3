"use client";
import axios, { AxiosResponse } from "axios";
import ContactTop, { ContactTopProps } from "components/ContactTop";
import Title from "components/Title";
import { setCookie } from "nookies";
import { PostEmailBody, PostEmailData } from "pages/api/email";
import { useCallback, useRef, useState } from "react";
import toast from "react-hot-toast";
import Reaptcha from "reaptcha";

function Page(): JSX.Element {
  const recaptchaRef = useRef<Reaptcha>(null);
  const [fieldValues, setFieldValues] =
    useState<Parameters<ContactTopProps["onSubmit"]>[0]>();
  const handleSubmit = useCallback<ContactTopProps["onSubmit"]>(
    async (fieldValues) => {
      if (!recaptchaRef.current) {
        return;
      }

      setFieldValues(fieldValues);

      await recaptchaRef.current.execute();
    },
    [setFieldValues]
  );
  const handleVerify = useCallback<ContactTopProps["onVerify"]>(
    (recaptchaResponse) => {
      if (!fieldValues) {
        return;
      }

      setCookie(null, "token", recaptchaResponse, {
        maxAge: 60,
        path: "/",
        sameSite: "lax",
      });

      const { email, from, subject, text } = fieldValues;
      const myPromise = axios.post<
        PostEmailData,
        AxiosResponse<PostEmailData>,
        PostEmailBody
      >("/api/email", {
        text,
        replyTo: `${from} <${email}>`,
        subject: `【kk-web】${subject}`,
      });

      toast.promise(myPromise, {
        error: "送信に失敗しました…",
        loading: "送信中です…",
        success: "メールを送信しました！",
      });
    },
    [fieldValues]
  );

  return (
    <>
      <Title title="CONTACT" />
      <ContactTop
        onSubmit={handleSubmit}
        onVerify={handleVerify}
        ref={recaptchaRef}
      />
    </>
  );
}

export default Page;
