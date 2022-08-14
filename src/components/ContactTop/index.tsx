import { ForwardedRef, forwardRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";
import styles from "./style.module.scss";

type FieldValues = {
  from: string;
  replyTo: string;
  subject: string;
  text: string;
};

export type ContactTopProps = {
  onSubmit: SubmitHandler<FieldValues>;
};

function ContactTop(
  { onSubmit }: ContactTopProps,
  recaptchaRef: ForwardedRef<ReCAPTCHA>
): JSX.Element {
  const {
    formState: { errors, isSubmitting },
    handleSubmit,
    register,
    setFocus,
  } = useForm<FieldValues>({
    defaultValues: {
      from: "",
      replyTo: "",
      subject: "",
      text: "",
    },
  });

  useEffect(() => {
    setFocus("from");
  }, [setFocus]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ? (
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
              size="invisible"
              theme="dark"
            />
          ) : null}
          <div className={styles.formInner}>
            <div className={styles.fieldsWrapper}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="from">
                  Name<abbr>*</abbr>
                </label>
                <input
                  {...register("from", {
                    required: "お名前を入力してください",
                  })}
                  className={styles.input}
                  id="from"
                />
                {errors?.from?.message ? (
                  <p className={styles.errorMessage}>{errors.from.message}</p>
                ) : null}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="replyTo">
                  Email<abbr>*</abbr>
                </label>
                <input
                  {...register("replyTo", {
                    required: "メールアドレスを入力してください",
                  })}
                  className={styles.input}
                  id="replyTo"
                  type="email"
                />
                {errors?.replyTo?.message ? (
                  <p className={styles.errorMessage}>
                    {errors.replyTo.message}
                  </p>
                ) : null}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="subject">
                  Subject<abbr>*</abbr>
                </label>
                <input
                  {...register("subject", {
                    required: "件名を入力してください",
                  })}
                  className={styles.input}
                  id="subject"
                />
                {errors?.subject?.message ? (
                  <p className={styles.errorMessage}>
                    {errors.subject.message}
                  </p>
                ) : null}
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="text">
                  Message<abbr>*</abbr>
                </label>
                <TextareaAutosize
                  {...register("text", { required: "本文を入力してください" })}
                  className={styles.textarea}
                  id="text"
                  minRows={6}
                />
                {errors?.text?.message ? (
                  <p className={styles.errorMessage}>{errors.text.message}</p>
                ) : null}
              </div>
            </div>
            <div className={styles.buttonWrapper}>
              <button
                className={styles.button}
                disabled={isSubmitting}
                type="submit"
              >
                送信する
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default forwardRef<ReCAPTCHA, ContactTopProps>(ContactTop);
