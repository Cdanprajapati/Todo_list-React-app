import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { TodoContex } from "../App";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import style from "../Assets/Style/Login.module.css";
import useFetchAPI from "../hook/useFetchAPI";


function Login() {
  const appContext = useContext(TodoContex);
  const loginAPI = useFetchAPI();
  const [email, setEmail] = useState("");
  const [enable, setDisabled] = useState(false);
  const [passAlert, setPassAlert] = useState(false);
  const [emailErr, setEmailError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);


  function handleLogin() {
    let error = 0;
    if (email.length < 4) {
      setEmailError(true);
      error++;
    }
    if (password.length == 0) {
      setPasswordError(true);
      error++;
    } else {
      setPasswordError(false);
    }
    if (password.length > 0 && password.length < 6) {
      setPassAlert(true);
      error++;
    } else {
      setPassAlert(false);
    }
    if (error === 0) {
      let data = { email, password };
      
      const mypost = (res, error) => {
        if (error) {
          // appContext.dispatch({ type: "ToastOpen", text: error.message });
          setDisabled(false);
        }

        if (res) {          
          appContext.dispatch({ type: "Loginclose"});
          appContext.dispatch({ type: "LoaderOpen"});
          appContext.dispatch({ type: "ToastOpen", text:res.message});          
          appContext.dispatch({ type: "YouCanLogin"});
          localStorage.setItem("Token", res.access_token);
          return;
        }
      };
      loginAPI("user/login", "POST", data, mypost);
    }
  }

  return (
    <div className={"card shadow-lg p-3  rounded " + style["Body"]}>
      <form>
        <div className="row">
          <div className="col-sm-6 col-8">
            <h5 className="text-bold">Log in</h5>
          </div>
          <div className="col-sm-4 col-1"></div>
          <div className={"col-sm-2 col-3 " + style["Cross"]}>
            <b onClick={() => appContext.dispatch({ type: "Loginclose" })}>
              <RxCross1 />
            </b>
          </div>
        </div>

        <label className={"pt-1 " + style["text-size"]}>Email</label>
        <input
          type="email"
          value={email}
          className={"form-control " + style["placeholder"]}
          placeholder={emailErr ? "Email is required" : ""}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className={"pt-1 " + style["text-size"]}>Password</label>
        <input
          type={appContext.visible ? "text" : "password"}
          className={"form-control " + style["placeholder"]}
          value={password}
          placeholder={passwordError ? "password must be required" : " "}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
          className={style["EyeIcons"]}
          onClick={() => appContext.dispatch({ type: "VisiblePassword" })}
        >
          {appContext.visible ? <AiFillEye /> : <AiFillEyeInvisible />}
        </div>
        {passAlert ? (
          <p className={style["alert"]}>
            Password must be at least 6 character and can have !@#$
          </p>
        ) : (
          " "
        )}

        <button
          className={"btn py-1 container-fluid mt-2 " + style["btn"]}
          type="button"
          onClick={handleLogin}
          disabled={enable}
        >
          Login
        </button>

        <a
          className={style["password"]}
          onClick={() => appContext.dispatch({ type: "ForgetPasswordOpen" })}
          href="#"
        >
          Forgot Password ?
        </a>
        <hr />
        <p className={"text-center " + style["bottom-p"]}>
          Already have an account ?
        </p>
        <a
          className={"text-center " + style["anchor-tag"]}
          onClick={() => appContext.dispatch({ type: "SignUpOpen" })}
          href="#"
        >
          SignUp
        </a>
      </form>
    </div>
  );
}

export default Login;
