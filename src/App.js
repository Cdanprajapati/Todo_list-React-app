import TodoHome from "./Components/TodoHome";
import { useReducer, createContext } from "react";

export const TodoContex = createContext();

const initialstate = {
  update: true,
  // resfesh: true,
  inputOtpOpen: false,
  createpassOpen: false,
  inputOpen: false,
  taskMenu: false,
  taskDone: false,
  // isDone: false,
  isDeleted: false,
  loginOpen: false,
  visiblecnfpassword: false,
  id: 0,
  forgetpasswordOpen: false,
  poolOpen: false,
  visible: false,
  hideDoneTask: false,
  filterTask: false,
  loaderOpen: false,
  signUpOpen: false,
  selectedHomeTags: false,
  toastOpen: false,
  loginSuccess: false,
  better: [],
  border: [],
  allTodos: [],
  filterTodos: [],
  selected: "",
  title: "",
  errorMsg: "",
  description: "",
  taskDoneOpen: true,
  taskMenuOpen: true,
  tags: [
    { title: "work", id: 1 },
    { title: "study", id: 2 },
    { title: "Enjoyment", id: 3 },
    { title: "family", id: 4 },
  ],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "InputOpen":
      return {
        ...state,
        inputOpen: true,
        title: "",
        description: "",
        border: [],
        better: [],
      };

    case "Bulk":
      return {
        ...state,
        allTodos: [...action.apiTodo],
      };

    case "CreatePasswordOpen":
      return {
        ...state,
        createpassOpen: true,
        inputOtpOpen: false,
      };

    case "InputOTPopen":
      return {
        ...state,
        forgetpasswordOpen: false,
        inputOtpOpen: true,
        emailOtp:action.value,
      };

    case "YouCanLogin":
      return {
        ...state,  
        loginSuccess: true,
        loginOpen: false,  
      };

    case "YouCnt":
      return {
        ...state,
        loginOpen: false,
        toastOpen: false,
        loginSuccess: false,
      };

    case "VisibleConfirmPassword":
      return {
        ...state,
        visible: false,
        visiblecnfpassword: !state.visiblecnfpassword,
      };
    case "ToastOpen":
      return {
        ...state,
        toastOpen: true,
        text: action.text,
      };

    case "ToastClose":
      return {
        ...state,
        toastOpen: false,
        text: "",
      };

    case "LoaderOpen":
      return {
        ...state,
        loaderOpen: true,
        toastOpen: true,
      };

    case "LoaderClose":
      return {
        ...state,
        loaderOpen: false,
      };

    case "ForgetPasswordOpen":
      return {
        ...state,
        forgetpasswordOpen: true,
      };

    case "ForgetPassClose":
      return {
        ...state,
        signUpOpen: false,
        forgetpasswordOpen: false,
        loginOpen: true,
        inputOtpOpen: true,
      };

    case "Loginclose":
      return {
        ...state,
        loginOpen: false,
        signUpOpen: false,
        forgetpasswordOpen: false,
      };

    case "SignUpClose":
      return {
        ...state,
        signUpOpen: false,
        loginSuccess: false,
      };

    case "SignUpOpen":
      return {
        ...state,
        signUpOpen: true,
        toastOpen: false,
        inputOtpOpen: false,
        forgetpasswordOpen: false,
        loginSuccess: false,
      };

    case "LoginOpen":
      return {
        ...state,
        createpassOpen: false,
        // update: true,
        loginOpen: true,
        poolOpen: true,
        toastOpen: false,
        loaderOpen: false,
      };

    case "SelectedTags":
      let selected = state.tags.filter((item, id) => item.id === action.id);
      let prev = state.border.filter((item, id) => item.id === action.id);
      let border = [...state.border, ...selected];
      if (prev.length > 0) {
        border = border.filter((item, id) => item.id !== action.id);
      }
      return {
        ...state,
        selected,
        border,
      };

    case "VisiblePassword":
      return {
        ...state,
        visible: !state.visible,
      };

    case "HomeTags":
      let homeTags = state.tags.filter((item, id) => item.id === action.id);
      let tap = state.better.filter((item, id) => item.id === action.id);
      let better = [...state.better, ...homeTags];

      if (tap.length > 0) {
        better = better.filter((item, id) => item.id !== action.id);
      }

      return {
        ...state,
        selectedHomeTags: true,
        isDone: true,
        homeTags,
        better,
        filterTask: better.length > 0,
      };

    case "EditOpen":
      let edit = state.allTodos;
      console.log(edit, action.id);
      let Update = edit.filter((item, index) => item["_id"] === action.id);
      return {
        ...state,
        id: action.id,
        inputOpen: true,
        taskMenuOpen: false,
        title: Update[0].title,
        description: Update[0].description,
        border: Update[0].tags,
        taskMenu: true,
      };

    case "UpdatedTask":
      let obj = {
        id: state.id,
        title: state.title,
        description: state.description,
        tags: state.border,
      };
      let updateTodo = state.allTodos.map((item, index) => {
        if (index === state.id) item = obj;
        return item;
      });
      return {
        ...state,
        inputOpen: false,
        taskMenu: false,
        allTodos: updateTodo,
        update: true,
      };

    case "InputClose":
      return {
        ...state,
        inputOpen: false,
        setEdit: false,
        taskMenu: false,
      };

    case "Title":
      return {
        ...state,
        title: action.data,
      };

    case "Description":
      return {
        ...state,
        description: action.data,
      };

    case "Deleted":
      let donetask = state.allTodos;
      let check = donetask.filter((item, index) => index !== action.id);
      return {
        ...state,
        allTodos: check,
        update: true,
        taskMenu: false,
      };

      case "DeletedUpdate":
      return {
        ...state,
        update: false,
      };

    case "Donetask":
      let todos = state.allTodos;
      todos[action.id] = {
        ...todos[action.id],
        isDone: true,
      };
      return {
        ...state,
        allTodos: todos,
        update: true,
      };

    case "HideDonetask":
      return {
        ...state,
        hideDoneTask: action.checked,
      };

    case "TaskMenu":
      return {
        ...state,
        taskMenu: !state.taskMenu,
        taskMenuOpen: action.id,
      };

    case "ErMsgSingUp":
      return {
        ...state,
        errorMsg: action.text,
      };

    case "addTodo":
      let update = state.allTodos;
      if (action.id)
        update[action.id] = {
          ...update[action.id],
        };

      return {
        ...state,
        inputOpen: false,
        update: true,
        taskMenu: false,
        filterTask: false,
        allTodos: [
          ...state.allTodos,
          {
            title: state.title,
            description: state.description,
            isDone: state.isDone,
            tags: state.border,
          },
        ],
      };

    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialstate);

  return (
    <div className="App">
      <TodoContex.Provider value={{ ...state, dispatch: dispatch }}>
        <TodoHome />
      </TodoContex.Provider>
    </div>
  );
}
export default App;
