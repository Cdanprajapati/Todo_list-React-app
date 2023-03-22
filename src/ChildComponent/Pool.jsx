import React, { useContext } from "react";
import { TodoContex } from "../App";
import style from "../Assets/Style/Pool.module.css";
import SignUp from "../Components/SignUp";
import Loader from "./Loader";
import Login from "../Components/Login";
import ForgetPassword from "./ForgetPassword";
import Toast from "../Common/Toast";
import InputOtp from "../Common/InputOtp";
import CreatePassword from '../Common/CreatePassword';

function Pool() {
  const appContext = useContext(TodoContex);
  return (
    <div>
      {appContext.toastOpen && <Toast />}
      <div className={style["Section"]}>
        <div className="container">
          <div className={style["loader"]}>
            {appContext.loaderOpen ? (
              <Loader />
            ) : (
              <>
                {appContext.forgetpasswordOpen ? (  <ForgetPassword /> ) : ( <> {appContext.inputOtpOpen ? (  <InputOtp />  ) :
                (<> {appContext.createpassOpen ? ( <CreatePassword/> ) : ( <> {appContext.signUpOpen ? ( <SignUp />) : <Login />}</>)}  </> )}</>)}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pool;

{/*  */}