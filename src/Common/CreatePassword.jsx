import React, { useContext, useState } from "react";
import style from "../Assets/Style/CreatePassword.module.css";
import { RxCross1 } from "react-icons/rx";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { TodoContex } from "../App";
import useFetchAPI from "../hook/useFetchAPI";

function CreatePassword() {
  const LoginAPI = useFetchAPI();
  const appContext = useContext(TodoContex);
  const [password, setPassword] = useState("");
  const [matchpass, setMatchpas] = useState(false);
  const [passAlert, setPassAlert] = useState(false);
  const [inputAlert, setInputAlert] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [cnfpass, setCnfpass] = useState(false);

  function Generatepassword() {
    let error = 0;
    if (password.length < 1) {
      setPassAlert(true);
      error++;
    }

    if (confirmPassword.length < 1) {
      setCnfpass(true);
      error++;
    }

    if (password !== confirmPassword) {
      setMatchpas((pre) => !pre);
      setInputAlert(false);
    }

    if (password.length > 0 && password.length < 6) {
      setInputAlert(true);
      error++;
    } else {
      setInputAlert(false);
    }

    if (error === 0) {
      let data = { password, confirmPassword };
      const mypost = (res, error) => {
        if (error) {
          appContext.dispatch({ type: "ToastOpen", text: error });
        }
        if (res) {
          appContext.dispatch({ type: "LoaderOpen" });
          appContext.dispatch({ type: "ToastOpen", text: res.message });
          appContext.dispatch({ type: "LoginOpen"})
        }
      };
      LoginAPI("user/verify-reset-password", "PUT", data, mypost);
    }
  }

  return (
    <div className={"card shadow-lg p-3  rounded " + style["Body"]}>
      <form>
        <div className="row">
          <div className="col-sm-8 col-8">
            <h5 className="text-bold">Create Password</h5>
          </div>
          <div className="col-sm-2 col-1"></div>
          <div className={"col-sm-2 col-3 " + style["Cross"]}
            onClick={() => appContext.dispatch({ type: "Loginclose" })}
          >
            <RxCross1 />
          </div>
        </div>

        <label className={"pt-1 " + style["text-size"]}>Password</label>
        <input
          type={appContext.visible ? "text" : "password"}
          value={password}
          className={"form-control " + style["placeholder"]}
          placeholder={passAlert ? "Password is required..!" : ""}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div
            className={style["EyeIcons"]}
            onClick={() => appContext.dispatch({ type: "VisiblePassword" })}
          >
            {appContext.visible ? <AiFillEye /> : <AiFillEyeInvisible />}
          </div>

        <label className={"pt-1 " + style["text-size"]}>Confirm Password</label>
        <input
           type={appContext.visiblecnfpassword ? "text" : "password"}
          className={"form-control " + style["placeholder"]}
          value={confirmPassword}
          placeholder={cnfpass ? "Confirm Password must be required...!" : " "}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
         <div
            className={style["EyeIcons"]}
            onClick={() =>
              appContext.dispatch({ type: "VisibleConfirmPassword" })
            }
          >
            {appContext.visiblecnfpassword ? (
              <AiFillEye />
            ) : (
              <AiFillEyeInvisible />
            )}
          </div>
        {inputAlert ? (
          <p className={style["alert"]}>
            Password must be at least 6 character and can have !@#$
          </p>
        ) : (
          " "
        )}

        {matchpass ? (
          <p className={style["alert"]}>
            confirm Password should be same password
          </p>
        ) : (
          ""
        )}

        <button
          className={"btn py-1 container-fluid mt-2 " + style["btn"]}
          type="button"
          onClick={Generatepassword}
        >
           Create Password
        </button>

        <a
          className={style["password"]}
          onClick={() => appContext.dispatch({ type: "ForgetPasswordOpen" })}
          href="#"
        >
          Forgot Password ?
        </a>
        <hr />
        {/* <p className={"text-center " + style["bottom-p"]}>
          Already have an account ?
        </p> */}
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

export default CreatePassword;
