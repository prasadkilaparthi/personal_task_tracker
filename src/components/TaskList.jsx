import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../FirebaseConfig";
import TaskCard from "./TaskCard";

const TaskList = ({ filter, tasks, onEdit, onDelete }) => {
  const [initialTasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const querySnapShot = await getDocs(collection(db, "tasks"));
      const tasksData = querySnapShot.docs.map((doc) => doc.data()); // Ensure data is returned properly
      setTasks(tasksData); // Update state with fetched tasks
    };

    fetchTasks(); // Uncomment to fetch from Firestore
  }, []);

  // Filter tasks based on the selected filter (e.g., "All", "in-progress", "completed")
  const filterTasks = Array.isArray(tasks)
    ? tasks.filter((task) => (filter === "All" ? true : task.status === filter))
    : [];

  // Mark a task as completed
  const handleOnComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "completed" ? "in-progress" : "completed",
            }
          : task
      )
    );
  };

  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {filterTasks.length > 0 ? (
        filterTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={onEdit}
            onComplete={handleOnComplete}
            onDelete={onDelete}
          />
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-full">
          No tasks found for this filter.
        </p>
      )}
    </div>
  );
};

export default TaskList;
