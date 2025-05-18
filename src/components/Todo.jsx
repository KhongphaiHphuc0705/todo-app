import todo_icon from "../assets/todo_icon.png";
import { useEffect, useRef, useState } from "react";
import Items from "./Items";

export default function Todo() {
  const inputRef = useRef();
  const [tasks, setTasks] = useState(localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []);

  const addTask = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === "") {
      return;
    }

    const newTasks = {
      id: Date.now(),
      text: inputText,
      completed: false,
    };

    setTasks((prevTasks) => [...prevTasks, newTasks]);
    inputRef.current.value = "";
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      })
    );
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl">
      <div className="flex items-center mt-4 gap-2">
        <img src={todo_icon} alt="" className="w-8" />
        <h1 className="text-3xl font-semibold text-center">To-do List</h1>
      </div>

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add your task"
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
        />
        <button onClick={addTask} className="border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer">
          ADD +
        </button>
      </div>

      <div>
        {tasks.map((task, index) => {
          return <Items key={index} text={task.text} id={task.id} completed={task.completed} deleteTask={deleteTask} toggleTask={toggleTask} />;
        })}
      </div>
    </div>
  );
}
