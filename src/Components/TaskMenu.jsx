import { useContext } from "react";
import EditDelete from "./EditDelete";
import {HiDotsHorizontal} from "react-icons/hi"
import { TodoContex } from "../App";

export default function TaskMenu({id}){

    const appContext = useContext(TodoContex)

    return <>    
        <div className="col-sm-2 text-end text-primary text-dark">                     
            <HiDotsHorizontal onClick={()=>appContext.dispatch({type: "TaskMenu", id})} style={{cursor:"pointer"}}/>
            { appContext.taskMenu && appContext.taskMenuOpen===id && <EditDelete id={id}/>}
        </div>
    </> 
}