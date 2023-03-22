import React, {useContext} from 'react';
import { TodoContex } from '../App';
import style from "../Assets/Style/TodoHome.module.css";


function HomeTag({id}) {
    const appContext = useContext(TodoContex);
    const bgColor=[{
      dot1:"red"
    }]
  return (
    <div>
       { appContext.tags?.map((item, i) => (
                <div
                  value={item.title}
                    className={
                      appContext.better.filter((better, id) => better.id === item.id).length>0
                        ? "col-md-12 my-2 d-flex  border rounded p-2 "+style["Touch"] : "col-md-12 my-2 d-flex p-2"
                      }                      
                      key={i}
                    >  
                      <button
                      // style={{backgroundColor:bgColor.dot1}}
                        className={style["dot-" + item.id]}
                        onClick={() => appContext.dispatch({ type:"HomeTags", id:item.id})}     
                    />
                  <label className="ms-1">{item.title}</label>                    
                </div>
              ))
            }
     </div>
  )
}

export default HomeTag
