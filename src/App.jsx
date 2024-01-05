import { useEffect, useState } from "react";
import { Icons } from "./assets/icons/index";
import { baseURL } from "./constants";
import axios from "axios";
import { convertToIST } from "./utils";

function App() {
  const [value, setValue] = useState("");
  const [todo, setTodo] = useState([]);

  useEffect(() => getAllTodosFromServer(), []);

  const getAllTodosFromServer = () => {
    axios
      .get(`${baseURL}/getAllTodo`)
      .then((response) => {
        setTodo(response.data);
      })
      .catch((error) => console.log(error));
  };

  function onChangeTodo(value) {
    setValue(value);
  }

  const onAddTodoOnServer = () => {
    if (!(value === "")) {
      axios
        .post(`${baseURL}/addTodo`, {
          text: value,
        })
        .then((response) => console.log(response.data))
        .then(() => getAllTodosFromServer())
        .then(() => setValue(""))
        .catch((error) => console.log(error));
    }
  };

  const deleteTodoFromServer = (todoId) => {
    axios
      .post(`${baseURL}/deleteTodo`, { _id: todoId })
      .then((response) => console.log(response.data))
      .then(() => getAllTodosFromServer())
      .catch((error) => console.log(error));
  };

  function onCheckTodoOnServer(todoId) {
    const editedTodo = todo.find((item) => item._id === todoId);
    axios
      .post(`${baseURL}/updateTodo`, {
        _id: todoId,
        text: editedTodo.text,
        isCompleted: true,
      })
      .then((response) => console.log(response.data))
      .then(() => getAllTodosFromServer())
      .catch((error) => console.log(error));
  }

  function onUnCheckTodoOnServer(todoId) {
    const editedTodo = todo.find((item) => item._id === todoId);
    axios
      .post(`${baseURL}/updateTodo`, {
        _id: todoId,
        text: editedTodo.text,
        isCompleted: false,
      })
      .then((response) => console.log(response.data))
      .then(() => getAllTodosFromServer())
      .catch((error) => console.log(error));
  }

  return (
    <div className="flex flex-col justify-start items-center h-screen w-full py-8">
      <h1 className="text-2xl my-4 text-zinc-950 font-bold">To Do App</h1>
      <div className="flex w-full flex-row justify-center items-center mb-8">
        <input
          className="caret-pink-900 placeholder:text-zinc-400 w-[60%] h-12 p-3 mr-5 rounded text-xl bg-zinc-300 text-pink-950 border-0 outline-transparent"
          placeholder="Add Todo"
          value={value}
          onChange={(e) => onChangeTodo(e.target.value)}
        />
        <button
          className="border-0 text-pink-900 bg-zinc-300 py-2 rounded px-6"
          onClick={onAddTodoOnServer}
        >
          Add
        </button>
      </div>

      <div className="flex flex-col justify-center items-center w-[90%] border-2 border-zinc-300 rounded py-4 ">
        {todo.map((item) => {
          return (
            <div
              className="Todo flex flex-row justify-between items-center p-4 m-4 border-[1px]  border-zinc-400 rounded w-[90%] relative"
              key={item._id}
            >
              <div className="flex flex-col justify-between items-start h-full w-full">
                <h1
                  className={`text-zinc-900  text-2xl ${
                    item.isCompleted ? "line-through" : "no-underline"
                  } `}
                >
                  {item.text}
                </h1>

                <h6 className="text-pink-900 text-[9px] font-light">{`created on : ${convertToIST(
                  item.createdAt
                )}`}</h6>
              </div>

              {item.isCompleted ? (
                <button
                  className="bg-transparent border-0"
                  onClick={() => onUnCheckTodoOnServer(item._id)}
                >
                  <img className="h-6" src={Icons.check} />
                </button>
              ) : (
                <button
                  className="bg-transparent border-0"
                  onClick={() => onCheckTodoOnServer(item._id)}
                >
                  <img className="h-6" src={Icons.uncheck} />
                </button>
              )}

              <img
                src={Icons.delete}
                className="h-5 absolute top-[-8px] right-[-8px] z-[1]"
                onClick={() => deleteTodoFromServer(item._id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default App;
