import axios, { AxiosResponse } from "axios";
import ContactTop, { ContactTopProps } from "components/ContactTop";
import Seo from "components/Seo";
import { setCookie } from "nookies";
import { PostEmailBody, PostEmailData } from "pages/api/email";
import { useCallback, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import toast from "react-hot-toast";

function Contact(): JSX.Element {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const handleSubmit = useCallback<ContactTopProps["onSubmit"]>(
    async (values) => {
      if (!recaptchaRef.current) {
        return;
      }

      const token = await recaptchaRef.current.executeAsync();

      if (!token) {
        return;
      }

      setCookie(null, "token", token, {
        maxAge: 60,
        path: "/",
        sameSite: "lax",
      });

      const myPromise = axios.post<
        PostEmailData,
        AxiosResponse<PostEmailData>,
        PostEmailBody
      >("/api/email", { ...values });

      toast.promise(myPromise, {
        error: "送信に失敗しました…",
        loading: "送信中です…",
        success: "メールを送信しました！",
      });
    },
    []
  );

  return (
    <>
      <Seo title="CONTACT" />
      <ContactTop onSubmit={handleSubmit} ref={recaptchaRef} />
    </>
  );
}

export default Contact;
