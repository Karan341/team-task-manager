import { useEffect, useState, useCallback } from "react";
import axios from "axios";

const API_URL = "https://team-task-manager-production-661a.up.railway.app";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchTasks = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.response?.data || error.message);
    }
  }, [token]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const addTask = async () => {
    if (!title || !description || !dueDate) {
      alert("Please fill title, description and due date");
      return;
    }

    try {
      await axios.post(
        `${API_URL}/api/tasks`,
        {
          title,
          description,
          dueDate,
          assignedTo: user?._id,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTitle("");
      setDescription("");
      setDueDate("");
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error.response?.data || error.message);
    }
  };

  const updateTask = async (id, status) => {
    try {
      await axios.put(
        `${API_URL}/api/tasks/${id}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error.response?.data || error.message);
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h2>Dashboard</h2>
          <h3>
            Welcome {user?.name} ({user?.role})
          </h3>
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

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <button className="primary-btn" onClick={addTask}>
          Add Task
        </button>
      </div>

      <h3>{user?.role === "Admin" ? "All Tasks" : "My Tasks"}</h3>

      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => {
            const isOverdue =
              task.dueDate &&
              new Date(task.dueDate) < new Date() &&
              task.status !== "Completed";

            return (
              <div className="task-card" key={task._id}>
                <span className="status">{task.status}</span>

                <h3>{task.title}</h3>
                <p>{task.description}</p>

                {isOverdue && (
                  <p style={{ color: "red", fontWeight: "bold" }}>
                    Overdue ⚠️
                  </p>
                )}

                <p>
                  <strong>Assigned to:</strong>{" "}
                  {task.assignedTo?.name || "Not assigned"}
                </p>

                <p>
                  <strong>Created by:</strong>{" "}
                  {task.createdBy?.name || "Unknown"}
                </p>

                <p>
                  <strong>Assigned on:</strong>{" "}
                  {task.createdAt
                    ? new Date(task.createdAt).toLocaleDateString()
                    : "N/A"}
                </p>

                <p>
                  <strong>Due date:</strong>{" "}
                  {task.dueDate
                    ? new Date(task.dueDate).toLocaleDateString()
                    : "N/A"}
                </p>

                <button
                  className="delete-btn"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => updateTask(task._id, "Completed")}
                >
                  Mark Completed
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Dashboard;