import React, { useContext, useState } from "react";
import style from "../Assets/Style/InputOtp.module.css";
import { RxCross1 } from "react-icons/rx";
import useFetchAPI from "../hook/useFetchAPI";
import { TodoContex } from "../App";

function InputOtp() {
  const appContext = useContext(TodoContex)
  const loginAPI = useFetchAPI();
  const [allfields, setAllfilds] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState(false);
  const [alert, setAlert] = useState(false);

  function CreatepasswordHandle() {
    let error = 0;
    if (otp.length < 1) {
      setOtpErr(true);
      error++;
    }

    if(otp.length < 2){
        setAllfilds(true)
        error++;
    }

    if (otp.length > 0 && otp.length < 6) {
      setAlert(true);
      error++;
    } else {
      setAlert(false);
    }
    if (error === 0) {
      let data = { email:appContext.emailOtp, otp };
      const mypost = (res, error) => {
        if (error) {
          appContext.dispatch({ type: "ToastOpen", text: error });
        }
        
        if (res) {
          appContext.dispatch({ type: "ToastOpen", text: res.message })
          appContext.dispatch({ type: "CreatePasswordOpen"});
          localStorage.setItem("Token",res.access_token);
          
        }
      };
      loginAPI("user/otp-verification", "POST", data, mypost)
    }
  }

  return (
    <div className={"card shadow-lg p-3  rounded " + style["Body"]}>
      <form>
        <div className="row">
          <div className="col-sm-8 col-8">
            <h5 className="text-bold">Enter Your OTP</h5>
          </div>
          <div className="col-sm-2 col-1"></div>
          <div className={"col-sm-2 col-3 " + style["Cross"]}
            onClick={() => appContext.dispatch({ type: "Loginclose" })}
          >
            <RxCross1 />
          </div>
        </div>

        <label className={"pt-1 " +style["text-size"]}>Email</label>
        <input
          type="email"
          value={appContext.emailOtp}
          className={"form-control " +style["placeholder"]}
          // placeholder={emailErr ? "Email is required..!" : ""}
          // onChange={(e) => setEmail(e.target.value)}
          disabled
        />

        <label className={"pt-1 " +style["text-size"]}>
          Enter Your One Time Password
        </label>
        <input
          type="number"
          className={"form-control text-center " +style["placeholder"]}
          value={otp}
          placeholder={otpErr ? "OTP is required..!" : " "}
          onChange={(e) => setOtp(e.target.value)}
        />

        {alert ? (
          <p className={style["alert"]}>Your OTP must be at least 6 digits</p>
        ) : (
          " "
        )}

        {allfields ? (
          <p className={style["alert"]}>
            Make sure you ave filled all fileds
          </p>
        ) : (
          " "
        )}

        <button
          className={"btn py-1 container-fluid mt-2 " +style["btn"]}
          type="button"
          onClick={CreatepasswordHandle}
        >
          create new Password
        </button>

        {/* <a className={style["password"]} href="#">
          Forgot Password ?
        </a> */}
        <hr />
        <p className={"text-center " +style["bottom-p"]}>
          Already have an account ?
        </p>
        <a className={"text-center " +style["anchor-tag"]} 
          onClick={() => appContext.dispatch({ type: "SignUpOpen" })}
        href="#">
          SignUp
        </a>
      </form>
    </div>
  );
}

export default InputOtp;
