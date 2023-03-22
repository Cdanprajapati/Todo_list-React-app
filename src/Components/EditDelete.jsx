import React, { useContext } from "react";
import style from "../Assets/Style/EditDelete.module.css";
import { TodoContex } from "../App";
import useFetchAPI from "../hook/useFetchAPI";

function EditDelete({ id }) {
  const loginAPI = useFetchAPI();
  const appContext = useContext(TodoContex);

  function Deletehandle() {
    let data = { _id: id };
    const mypost = (res, error) => {
      if (error) {
        appContext.dispatch({ type: "ToastOpen", text: error });
      }
      if (res) {
        appContext.dispatch({ type: "LoaderOpen" });
        appContext.dispatch({ type: "ToastOpen", text: res.message });
        appContext.dispatch({ type: "Deleted", id });
      }
    };
    loginAPI("user/deleteTodo", "DELETE", data, mypost);
  }

  return (
    <div className={"container " + style["card"]}>
      <div className="row ">
        <div className="col-sm-12">
          <div className={"border border-1 rounded-top " + style["Edit"]}>
            <p
              className="card-title ms-2 pt-1 text-start text-dark"
              onClick={()=>appContext.dispatch({ type: "EditOpen", id })}
            >
              Edit..
            </p>
          </div>
        </div>
      </div> 
      <div className="row">
        <div className="col-sm-12">
          <div
            className={"border border-1 rounded-bottom " + style["Delete"]}
            onClick={Deletehandle}
          >
            <p className="card-title ms-2 pt-1 text-start text-dark">Delete</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditDelete;
