import { useEffect, useState, useCallback } from "react";
import axios from "axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title, description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <h3>Welcome {user?.name} ({user?.role})</h3>
          <p>Manage your team tasks easily</p>
        </div>
        <button
          className="delete-btn"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="task-form">
        <h3>Add Task</h3>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Task description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="primary-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      <h3>Your Tasks</h3>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <span className="status">{task.status}</span>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <p>Assigned to: {task.assignedTo?.name}</p>

              <button className="delete-btn" onClick={() => deleteTask(task._id)}>
                Delete
              </button>

              <button
                className="secondary-btn"
                onClick={() => updateTask(task._id, "Completed")}
              >
                Mark Completed
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;