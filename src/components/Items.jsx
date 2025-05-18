import tick from "../assets/tick.png";
import not_tick from "../assets/not_tick.png";
import delete_icon from "../assets/delete.png";

export default function Items({ text, id, completed, deleteTask, toggleTask }) {
  return (
    <div className="flex items-center my-4 gap-2">
      <div
        onClick={() => {
          toggleTask(id);
        }}
        className="flex flex-1 items-center cursor-pointer"
      >
        <img src={completed ? tick : not_tick} alt="" className="w-7" />
        <p className={`ml-4 text-[18px] ${completed ? "line-through text-slate-400" : "text-slate-700"}`}>{text}</p>
      </div>

      <img
        onClick={() => {
          deleteTask(id);
        }}
        src={delete_icon}
        alt=""
        className="w-4 cursor-pointer"
      />
    </div>
  );
}
