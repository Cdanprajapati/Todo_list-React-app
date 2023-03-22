import TodoInput from '../Components/TodoInput';
import Pool from '../ChildComponent/Pool';
import React, { useContext } from "react";
import { TodoContex } from "../App";

function HomeChild({id}) {    
  const appContext = useContext(TodoContex);
  
  return (
    <div>
       {appContext.inputOpen && <TodoInput id={id} />}
      {appContext.loginOpen && <Pool />}
    </div>
  )
}

export default HomeChild
