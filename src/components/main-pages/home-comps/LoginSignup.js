import { address, post } from "../../../utils/http";

export const LoginSignup = ({ loginSignup, setLoginSignup }) => {
  let loginSingupTexts =
    loginSignup === "login"
      ? ["Log in", "Dont have account?", "Sign up"]
      : ["Sign up", "By singing up you agree osvosv", "terms and conditions"];

  const signupOrTermsCond = () => {
    loginSignup === "login"
      ? setLoginSignup("signup")
      : console.log("terms and condition page");
  };

  return (
    <section className="flex center login-con-logsign-con">
      <input
        type="submit"
        className="center login-btn"
        onClick={() => {
          document.querySelector(".login-con-form-userpass").submit();
        }}
        value={loginSingupTexts[0]}
      ></input>
      <p className="center login-con-noaccount">
        {loginSingupTexts[1]}
        <span onClick={() => signupOrTermsCond()}>{loginSingupTexts[2]}</span>
      </p>
    </section>
  );
};
