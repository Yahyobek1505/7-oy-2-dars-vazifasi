import React, { useState } from "react";
import { connect } from "react-redux";
import { addTask } from "../redux/actions";

const TaskForm = ({ addTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskEmail, setTaskEmail] = useState("");
  const [taskAge, setTaskAge] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskName.trim() && !taskAge.trim()) return alert("Name is empty!")
    addTask({ 
      id: new Date().getTime(), 
      name: taskName,
      email: taskEmail,
      age: taskAge,
      completed: false });
    setTaskName("");
    setTaskEmail("");
    setTaskAge("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-slate-400 rounded-lg w-[60vw] text-center"
    >
      <input
        className="input w-full max-w-xs text-xl"
        type="text"
        placeholder="Enter user name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      /> <br />
      <input
        className="input w-full max-w-xs my-4 text-xl"
        type="email"
        placeholder="Enter user @ email"
        value={taskEmail}
        onChange={(e) => setTaskEmail(e.target.value)}
      /> <br />
      <input
        className="input w-full max-w-xs text-xl"
        type="number"
        placeholder="Enter user age"
        value={taskAge}
        onChange={(e) => setTaskAge(e.target.value)}
      /> <br />
      <button className="btn bg-blue-600 ml-5 mt-4 text-purple-800 text-2xl" type="submit">
        Add User
      </button>
    </form>
  );
};

const mapDispatchToProps = {
  addTask,
};

export default connect(null, mapDispatchToProps)(TaskForm);
