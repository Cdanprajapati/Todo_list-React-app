import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { TodoContex } from "../App";
import style from "../Assets/Style/TodoHome.module.css";
import Tasks from "../Components/Tasks";
import HomeChild from "../ChildComponent/HomeChild";
import HomeTag from "../ChildComponent/HomeTag";
import useFetchAPI from "../hook/useFetchAPI";

function TodoHome({ id }) {
  const appContext = useContext(TodoContex);
  const loginAPI = useFetchAPI();

  useEffect(()=>{
  let token = localStorage.getItem("Token")
  if(token)
    appContext.dispatch({ type: "YouCanLogin"})
  },[])

  function Logout(){
    localStorage.removeItem("Token");
    appContext.dispatch({ type: "YouCnt"})
  }

  //fir se chalana hai? 
  useEffect(() => {
    if(appContext.update === true && appContext.loginSuccess === true){
      const mypost = (res, error) => {
        if(error) {
          appContext.dispatch({ type: "ToastOpen", text: error });        
        }
        if(res){
          appContext.dispatch({ type: "LoaderOpen" });
         appContext.dispatch({ type: "ToastOpen", text: res.message }); 
          appContext.dispatch({ type: "Bulk", apiTodo: res.AllTodo});
        }
      }
      loginAPI("user/all-todo", "GET",null, mypost);
      appContext.dispatch({type:"DeletedUpdate"})
    }
  },[appContext.update && appContext.loginSuccess])
  // console.log(appContext.update,"====here update===>")

  return (
    <div>
      <HomeChild />
      <div className="container">
        <div className="row pt-5">
          <div className="col-sm-2 col-4 col-md-4">
            <h3>todo</h3>
          </div>
          <div className="col-sm-9 col-6 col-md-6"></div>
          <div className="col-sm-1 col-2 col-md-2">
            {appContext.loginSuccess ? (
              <h3 onClick={() => appContext.dispatch({ type: "InputOpen" })}>
                <FontAwesomeIcon icon={faPlus} />
              </h3>
            ) : (
              " "
            )}
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-sm-3">
            <HomeTag />
            <div className="row">
              <div className="col-sm-12">
                <input
                  className="mt-5"
                  type="checkbox"
                  onClick={(e) =>
                    appContext.dispatch({
                      type: "HideDonetask",
                      checked: e.target.checked,
                    })
                  }
                />
                <label className={"ps-1 " + style["HideTask"]}>
                  Hide Done Task
                </label>
                <br />
                {appContext.loginSuccess ? (
                  <button
                    className={"btn " + style["loginBtn"]}
                    onClick={Logout}
                  >
                    logout
                  </button>
                ) : (
                  <button
                    className={"btn " + style["loginBtn"]}
                    onClick={() => appContext.dispatch({ type: "LoginOpen" })}
                  >
                    login
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="col-sm-9">
          {appContext.loginSuccess ? <Tasks id={id} /> : "" }
          </div>
        </div>
      </div>
    </div>
  );
}
export default TodoHome;
