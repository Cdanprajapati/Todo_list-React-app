import React, { useContext, useState } from "react";
import { TodoContex } from "../App";
import "react-toastify/dist/ReactToastify.css";
import style from "../Assets/Style/SignUp.module.css";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import useFetchAPI from "../hook/useFetchAPI";
import { RxCross1 } from "react-icons/rx";

function SignUp() {
  const appContext = useContext(TodoContex);
  const loginAPI = useFetchAPI();
  const [matchpassword, setMatchpassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [fnameErr, setFnameErr] = useState(false);
  const [termErr, setTermErr] = useState(false);
  const [lastName, setlastName] = useState("");
  const [checked, setChecked] = useState(false);
  const [lnameErr, setlnameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState(false);
  const [passAlert, setPassAlert] = useState(false);
  const [confirm_password, setConfirm_Password] = useState("");
  const [cnfpassword, setCnfpassword] = useState(false);

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  const HandleSubmit = () => {
    let err = 0;
    if (firstName.length < 3) {
      setFnameErr(true);
      err++;
    }

    if (lastName.length < 3) {
      setlnameErr(true);
      err++;
    }

    if (email.length < 5) {
      setEmailErr(true);
      err++;
    }

    if (password.length == 0) {
      setPasswordErr(true);
      err++;
    }

    if (password.length > 0 && password.length < 6) {
      setPassAlert(true);
      err++;
    } else {
      setPassAlert(false);
    }

    if (confirm_password.length < 4) {
      setCnfpassword(true);
      err++;
    }

    if (password !== confirm_password) {
      setMatchpassword((pre) => !pre);
      err++;
    }

    if (!checked) {
      setTermErr(true);
      err++;
    } else {
      setTermErr(false);
    }

    if (err === 0) {
      let data = { firstName, lastName, email, password, confirm_password };
      const mypost = (res, error) => {
        if (error) {
          appContext.dispatch({ type: "ToastOpen", text: error });
        }
        if (res) {
          appContext.dispatch({ type: "SignUpClose" });
          appContext.dispatch({ type: "LoaderOpen" });
          appContext.dispatch({ type: "ToastOpen", text: res.message });
        }
      };
      loginAPI("user/register", "POST", data, mypost);
    }
  };

  return (
    <div>
      <div className={"card shadow-lg p-3  p-3 rounded " + style["Body"]}>
        <form>
          <div className="row">
            <div className="col-sm-6 col-8">
              <h5 className="text-bold">Sign Up</h5>
            </div>
            <div className="col-sm-4 col-2"></div>
            <div className="col-sm-2 col-2">
              <b
                className={style["Xcross"]}
                onClick={() => appContext.dispatch({ type: "Loginclose" })}
              >
                <RxCross1 />
              </b>
            </div>
          </div>

          <label className={style["text-size"]}>First Name</label>
          <input
            type="text"
            className={"form-control " + style["placeholder"]}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={fnameErr ? "First Name is required" : ""}
            name="firstName"
            value={firstName}
          />

          <label className={"pt-1 " + style["text-size"]}>Last Name</label>
          <input
            type="text"
            className={"form-control " + style["placeholder"]}
            name="lastName"
            placeholder={lnameErr ? "Last Name is required" : ""}
            onChange={(e) => setlastName(e.target.value)}
            value={lastName}
          />

          <label className={"pt-1 " + style["text-size"]}>Email</label>
          <input
            type="email"
            className={"form-control " + style["placeholder"]}
            name="email"
            placeholder={emailErr ? "Email is required" : ""}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />

          <label className={"pt-1 " + style["text-size"]}>Password</label>
          <input
            type={appContext.visible ? "text" : "password"}
            className={"form-control " + style["placeholder"]}
            name="password"
            placeholder={passwordErr ? "Password is required" : " "}
            onChange={(e) => setPassword(e.target.value)}
            value={password}
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
          <label className={"pt-1 " + style["text-size"]}>
            {" "}
            Confirm Password
          </label>
          <input
            type={appContext.visiblecnfpassword ? "text" : "password"}
            className={"form-control " + style["placeholder"]}
            name="confirm_password"
            placeholder={cnfpassword ? "Confirm password is required" : ""}
            onChange={(e) => setConfirm_Password(e.target.value)}
            value={confirm_password}
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
          {matchpassword ? (
            <p className={style["matchpassword"]}>
              <br />
              Confirm password should be same as password
            </p>
          ) : (
            " "
          )}
          <hr />
          <input
            type="checkbox"
            value={checked}
            onClick={(e) => setChecked(e.target.value)}
            className={"pt-1 " + style["checkbox"]}
          />
          <label className={"pt-1 ms-2 " + style["text-size"]}>
            I agree with{" "}
            <a className={style["Terms"]} href="#">
              Terms
            </a>{" "}
            and{" "}
            <a className={style["Condition"]} href="#">
              Privacy
            </a>
          </label>
          <div className="text-center">
            {termErr ? (
              <p className={style["alert"]}>
                <strong>Please..! </strong>accept terms and conditions
              </p>
            ) : (
              ""
            )}
          </div>
          <button
            className={"btn py-1 container-fluid mt-2 " + style["btn"]}
            type="button"
            onClick={HandleSubmit}
          >
            SignUp
          </button>

          <hr />
          <div className={"ms-2 " + style["account-text"]}>
            <p className="text-center">Already have an account ?</p>
            <a
              className={style["anchorTag"]}
              onClick={() => appContext.dispatch({ type: "SignUpClose" })}
              href="#"
            >
              Login
            </a>
          </div>
        </form>
        {/* </div> */}
      </div>
    </div>
  );
}

export default SignUp;
