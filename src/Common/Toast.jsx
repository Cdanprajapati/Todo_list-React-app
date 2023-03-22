import React, { useEffect } from "react";
import style from "../Assets/Style/Toast.module.css";
import { useContext } from "react";
import { TodoContex } from "../App";
import { RxCross1 } from "react-icons/rx";

function Toast() {
  const appContext = useContext(TodoContex);
  useEffect(() => {
    if (appContext.toastOpen === true)
      setTimeout(() => {appContext.dispatch({ type: "ToastClose" });
    }, 3000);
  }, [appContext.toastOpen]);

  return (
    <div>
      <div className={"card shadow-lg p-3 mt-3 border border-4 rounded " + style["Body"]}>
        <form>
          <div className={style["Toast"]}>
            <p className={"col-sm-6 col-6 " + style["text-size"]}>
              {appContext.text}
            </p>
            <p className={"col-sm-2 col-2 " + style["Cross"]}>
              <b onClick={() => appContext.dispatch({ type: "ToastClose" })}>
                <RxCross1 />
              </b>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Toast;

// async function fetchData() {
//   try {
//     const response = await fetch('https://example.com/data');
//     if (response.ok) {
//       const data = await response.json();
//       // do something with the data
//     } else {
//       // handle error
//     }
//   } catch (error) {
//     // handle error
//   }
// }
