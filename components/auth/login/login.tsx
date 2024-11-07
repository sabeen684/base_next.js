import { successToast } from "@/lib/toastify";
import UIButton from "@/ui/uibutton";
import UIInput from "@/ui/uiinput";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <section className="login">
        <div className="login-container">
          <div className="login-container--image"></div>
          <form className="login-container--form">
            <div className="login-container--form_header">
              <h1>Login</h1>
            </div>
            <UIInput
              label="Email"
              id="email"
              type="email"
              name="email"
              isRequired
            />
            <UIInput
              label=" Password"
              type="password"
              id="password"
              name="password"
              isRequired
            />
            <UIButton label="Login" type="primary" onClick={() => {successToast("Logged In")}} />

            <div className="login-container--form_forgetPass">
              <Link className="form-links" href={"#"}>
                Other issue with sign in
              </Link>
              <Link href="/forgot-password" className="form-links">
                Forgot your password
              </Link>
            </div>
          </form>
          <div className="login-container--bottom">
            <div></div>
            <span>New to our community</span>
            <div></div>
          </div>
          <UIButton
            label="Register Your Hotel"
            href="/register"
            type="secondary"
          />
        </div>
      </section>
    </>
  );
}
