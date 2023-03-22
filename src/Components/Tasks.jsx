import { useContext } from "react";
import { TodoContex } from "../App";
import TaskSkelton from "./TaskSkelton";
function Tasks() {
  const appContext = useContext(TodoContex);
  return (
    <div>
      <div className="container">
        <div className="row">
          {
            appContext.allTodos.map((item, i) => {
              return  <> 
                {
                 (item.isDone == true && appContext.hideDoneTask == true) ? null :
                      <TaskSkelton
                       key={i} 
                       id={item._id} 
                       title={item.title}
                       description={item.description}
                       tags={item.tags}
                       isDone={item.isDone}
                       isCompleted={item.isCompleted==="true"}
                     />
                }
                </>
              })
          }
        </div>
      </div>
    </div>
  );
}
export default Tasks;