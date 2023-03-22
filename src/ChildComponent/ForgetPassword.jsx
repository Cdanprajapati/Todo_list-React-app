import React, { useContext, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { TodoContex } from "../App";
import style from '../Assets/Style/ForgetPassword.module.css';
import useFetchAPI from "../hook/useFetchAPI";

function ForgetPassword() {
  const appContext = useContext(TodoContex);
  const loginAPI = useFetchAPI();
  const [err, setErr] = useState(false);
  const [email, setEmail] = useState("");

  function SendOtp(){
   
      setErr(false)
      let data = {email}
      const mypost = (res, error) => {
        if(error) {
          appContext.dispatch({ type: "ToastOpen", text: error });
        }
        if(res) {
          appContext.dispatch({ type: "ToastOpen", text: res.message });
          appContext.dispatch({ type: "InputOTPopen", value:email})
        }
      };
      loginAPI("user/forgot-password", "POST", data, mypost);
    }
  


  return (
   
            <div className={"card shadow-lg p-3  rounded " + style["Body"]}>
              <form>
                <div className="row">
                  <div className="col-sm-7 mb-2">
                    <b className="text-bold">Forget Password</b>
                  </div>
                  <div className="col-sm-3"></div>
                  <div className={"col-sm-2 "+style["Cross"]}>
                    <b onClick={()=>appContext.dispatch({type:"Loginclose"})}>
                      <RxCross1 />
                    </b>
                  </div>
                </div>              

                <label className={"pt-1 " + style["text-size"]}>Email</label>
                <input
                  type="email"
                  value={email}
                  placeholder={ err ? "Email is required..!" : " " }
                  className={"form-control " + style["placeholder"]}
                  onChange={(e)=>setEmail(e.target.value)}
                />      
               
                <button
                  className={
                    "btn py-1 container-fluid mt-2 " + style["btn"]
                  }
                  type="button"
                  onClick={SendOtp}
                >
                  Send OTP
                </button>
                <hr />
                <p className={"text-center " + style["bottom-p"]}>
                  Already have an account ?
                </p>
                <a className={"text-center " + style["anchor-tag"]} 
                  onClick={()=>appContext.dispatch({type: "SignUpOpen"})}
                href="#">
                  SignUp
                </a>
              </form>
              {/* </div> */}
            </div>
        
  );
}

export default ForgetPassword;
