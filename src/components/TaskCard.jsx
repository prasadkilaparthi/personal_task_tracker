import React, { useState } from "react";
import { FaCheck, FaEdit, FaSave, FaTimes, FaTrash } from "react-icons/fa";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ ...task });

  const handleToggleStatus = () => {
    onEdit({
      ...task,
      status: task.status === "in-progress" ? "completed" : "in-progress",
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setEditedTask({ ...task }); // Reset edited fields on cancel
  };

  const handleSaveEdit = () => {
    onEdit(editedTask);
    setIsEditing(false);
  };

  const isLongDescription = task.description.length > 50;
  const isOverdue = !task.completed && new Date(task.dueDate) < new Date();
  const dueDateStyles = isOverdue
    ? "text-red-500 font-semibold"
    : "text-gray-600";

  return (
    <div className="p-4 bg-white rounded shadow-md hover:shadow-lg transition duration-300 w-full sm:max-w-md mx-auto sm:px-6 md:px-8 lg:px-10">
      <div className="flex justify-between items-center">
        {isEditing ? (
          <input
            type="text"
            value={editedTask.title}
            onChange={(e) =>
              setEditedTask({ ...editedTask, title: e.target.value })
            }
            className="text-xl font-semibold text-gray-800 border-b-2 focus:outline-none w-full sm:w-4/5 lg:w-3/4"
          />
        ) : (
          <h3 className="text-xl font-semibold text-gray-800">{task.title}</h3>
        )}
        <div className="flex items-center space-x-2">
          {isEditing ? (
            <button
              onClick={handleSaveEdit}
              className="text-green-500 hover:text-green-700"
            >
              <FaSave className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleEditToggle}
              className="text-blue-500 hover:text-blue-700"
            >
              <FaEdit className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            <FaTrash className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Description Section */}
      <div
        className={`text-sm text-gray-600 mt-2 ${
          isExpanded ? "max-h-48 overflow-y-scroll" : "max-h-[200px]"
        } overflow-hidden`}
      >
        {isEditing ? (
          <textarea
            value={editedTask.description}
            onChange={(e) =>
              setEditedTask({ ...editedTask, description: e.target.value })
            }
            className="w-full mt-2 p-2 border rounded focus:outline-none resize-none"
          />
        ) : isLongDescription && !isExpanded ? (
          `${task.description.slice(0, 50)}...`
        ) : (
          task.description
        )}
      </div>

      {isLongDescription && !isEditing && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-500 mt-2 hover:underline text-sm"
        >
          {isExpanded ? "Read Less" : "Read More"}
        </button>
      )}

      <p className={`text-sm mt-2 ${dueDateStyles}`}>
        Due Date:{" "}
        {isEditing ? (
          <input
            type="date"
            value={editedTask.dueDate}
            onChange={(e) =>
              setEditedTask({ ...editedTask, dueDate: e.target.value })
            }
            className="border-b-2 focus:outline-none"
          />
        ) : task.dueDate ? (
          new Date(task.dueDate).toLocaleDateString()
        ) : (
          "No due date"
        )}
      </p>

      <button
        onClick={handleToggleStatus}
        className={`mt-4 px-4 py-2 text-white rounded-full text-sm w-full sm:w-auto ${
          task.status === "in-progress"
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-green-500 hover:bg-green-600"
        } flex items-center justify-center gap-2`}
      >
        {task.status === "completed" ? (
          <>
            <FaTimes /> Mark as in-progress
          </>
        ) : (
          <>
            <FaCheck /> Mark as completed
          </>
        )}
      </button>
    </div>
  );
};

export default TaskCard;
