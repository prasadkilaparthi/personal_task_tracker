import { onAuthStateChanged } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaCircleMinus, FaCirclePlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import AddTaskModal from "../components/AddTaskModal";
import Sidebar from "../components/Sidebar";
import TaskList from "../components/TaskList";
import { auth, db } from "../FirebaseConfig";

const Dashboard = () => {
  const [filter, setFilter] = useState("All");
  const { filterType } = useParams();
  const [modelOpen, setModelOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState(null);

  // Set up user authentication listener
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
        setTasks([]); // Clear tasks when user logs out
      }
    });
    return unsubscribeAuth;
  }, []);

  // Fetch tasks when user is authenticated and `userId` is available
  useEffect(() => {
    if (!userId) return;

    const userTaskQuery = query(
      collection(db, "tasks"),
      where("userId", "==", userId)
    );

    const unsubscribeTasks = onSnapshot(userTaskQuery, (snapshot) => {
      const tasksData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTasks(tasksData);
    });

    return unsubscribeTasks;
  }, [userId]);

  // Update the filter state when `filterType` changes
  useEffect(() => {
    setFilter(filterType === "all" ? "All" : filterType);
  }, [filterType]);

  const handleAddTask = async (newTask) => {
    try {
      await addDoc(collection(db, "tasks"), {
        ...newTask,
        userId: userId, // Ensure task is associated with the logged-in user
        status: "in-progress",
        createdAt: new Date(), // Optional: Timestamp for sorting
      });
      setModelOpen(false);
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleUpdateTask = async (updatedTask) => {
    try {
      await updateDoc(doc(db, "tasks", updatedTask.id), {
        title: updatedTask.title,
        description: updatedTask.description,
        dueDate: updatedTask.dueDate,
        status: updatedTask.status,
      });
      console.log("Task updated successfully:", updatedTask.id);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Filter tasks based on the selected filter type
  const filteredTasks = tasks.filter(
    (task) => filter === "All" || task.status === filter
  );

  return (
    <div className="min-h-screen flex flex-col sm:flex-row bg-gray-100 text-gray-800">
      <Sidebar />

      <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col">
        <h1 className="text-3xl font-bold mb-6">My Tasks</h1>

        <TaskList
          tasks={filteredTasks}
          filter={filter}
          onDelete={handleDeleteTask}
          onEdit={handleUpdateTask}
        />

        <button
          onClick={() => setModelOpen(!modelOpen)}
          className="fixed bottom-12 right-8 bg-teal-600 text-white w-12 h-12 p-4 rounded-full text-center shadow-lg hover:bg-teal-700 sm:w-14 sm:h-14 sm:p-5 lg:w-16 lg:h-16 lg:p-6"
        >
          {modelOpen ? (
            <FaCircleMinus className="fa-minus-circle" />
          ) : (
            <FaCirclePlus className="fa-plus-circle" />
          )}
        </button>

        {modelOpen && (
          <AddTaskModal
            onClose={() => setModelOpen(false)}
            onSave={handleAddTask}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
