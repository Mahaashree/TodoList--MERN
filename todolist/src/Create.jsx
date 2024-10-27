import React, { useState } from "react";
import axios from 'axios';

function Create({setUpdateUI}) {
    const [task, setTask] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAdd = async () => {
        
        if (!task || !task.trim()) {
            setError("Please enter a task");
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            await axios.post("http://localhost:3001/add", { task: task.trim() });
            setTask(""); 
            setError("");
            setUpdateUI(prev => !prev);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to add task");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    return (
        <div className="create_form">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter Task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    onKeyUp={handleKeyPress}
                    disabled={isLoading}
                />
                <button 
                    type="button"
                    onClick={handleAdd}
                    disabled={isLoading}
                >
                    {isLoading ? "Adding..." : "Add"}
                </button>
            </div>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
}

export default Create;