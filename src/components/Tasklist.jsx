// TaskList.js
import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { connect } from "react-redux";
import { deleteTask, updateTask } from "../redux/actions";


const TaskList = ({ tasks, deleteTask, updateTask }) => {
  const [editedTaskName, setEditedTaskName] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);

  const handleDelete = (taskId) => {
    deleteTask(taskId);
  };

  const handleUpdate = (taskId, updatedTask) => {
    updateTask(taskId, updatedTask);
    setEditingTaskId(null);
  };

  const handleEdit = (taskId, taskName) => {
    setEditingTaskId(taskId);
    setEditedTaskName(taskName);
  };

  const handleInputChange = (e) => {
    setEditedTaskName(e.target.value);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedTaskName("");
  };

  return (
    <div className="w-[70vw]">
      <h2 className="text-4xl p-6 font-semibold text-yellow-800">Users</h2>
      <ul className="text-2xl p-6 border-solid border-2 border-indigo-600 rounded-lg divide-y">
        <div className="heading flex justify-between  pr-4">
        <div className="first flex gap-20 ">
        <span>№</span>
        <span>Name</span>
        </div>
        <span>Email</span>
        <span>Age</span>
        <span>Action</span>
        </div>
        {tasks.map((task, index) => (
          <li key={task.id} className="flex gap-4">
            {editingTaskId === task.id ? (
              <>
                <input
                  className="input"
                  type="text"
                  value={editedTaskName}
                  onChange={handleInputChange}
                />
                <button
                  className="btn"
                  onClick={() =>
                    handleUpdate(task.id, { name: editedTaskName })
                  }
                >
                  Save
                </button>
                <button className="btn" onClick={handleCancelEdit}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                {index + 1}
                <div className="flex justify-between w-full">
                  <div className="flex justify-around w-full">
                  <span>{task.name}</span>
                  <span>{task.email}</span>
                  <span className="mr-32">{task.age}</span>
                  </div>
                  <div className="flex gap-4 mr-4">
                    <FaRegTrashCan  className=" text-red-600 cursor-pointer"
                      onClick={() => handleDelete(task.id)}/>
                    <FaEdit  className="text-blue-600 cursor-pointer"
                      onClick={() => handleEdit(task.id, task.name)}/>
                  </div>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.tasks,
});

const mapDispatchToProps = {
  deleteTask,
  updateTask,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
