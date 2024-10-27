import React, { useState, useEffect } from "react";
import Create from "./Create";
import axios from "axios";
import { BsCircleFill, BsFillTrashFill, BsFillCheckCircleFill, BsPencilFill } from 'react-icons/bs';

function Home() {
    const [todos, setTodos] = useState([]);
    const [updateUI, setUpdateUI] = useState(false);
    const [editingTask, setEditingTask] = useState(null);  // Changed from 0 to null
    const [updatedText, setUpdatedText] = useState("");    // Changed from 0 to empty string

    useEffect(() => {
        axios.get('http://localhost:3001/get')
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [updateUI]);

    const handleEdit = (id) => {
        axios.put(`http://localhost:3001/update/${id}`)  // Fixed template literal syntax
            .then(() => {
                setUpdateUI(prev => !prev)
            })
            .catch(err => console.log(err))
    }

    const startEditing = (todo) => {
        setEditingTask(todo._id);
        setUpdatedText(todo.task);
    }

    const handleUpdateTask = async (id) => {
        try {
            await axios.put(`http://localhost:3001/updateTask/${id}`, {  // Fixed template literal syntax
                task: updatedText
            });
            setEditingTask(null);
            setUpdateUI(prev => !prev);
        } catch (err) {
            console.error(err);
        }
    }

    const cancelEditing = () => {
        setEditingTask(null);
        setUpdatedText('');
    }

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3001/delete/${id}`)  // Fixed template literal syntax
            .then(() => {
                setUpdateUI(prev => !prev)
            })
            .catch(err => console.log(err))
    }

    return (
        <div className="home">
            <h2>ToDo List</h2>
            <Create setUpdateUI={setUpdateUI} />
            {todos.length === 0 ? (
                <div className="no-tasks"><h3>No Tasks yet!</h3></div>
            ) : (
                todos.map(todo => (
                    <div className="task" key={todo._id}>
                        <div className="checkbox" onClick={() => handleEdit(todo._id)}>
                            {todo.done ? (
                                <BsFillCheckCircleFill />
                            ) : (
                                <BsCircleFill className="icon" />
                            )}
                        </div>

                        {editingTask === todo._id ? (
                            <div className="edit-input-container">
                                <input
                                    type="text"
                                    value={updatedText}
                                    onChange={(e) => setUpdatedText(e.target.value)}
                                    className="edit-input"
                                />
                                <button onClick={() => handleUpdateTask(todo._id)} className="save-btn">
                                    Save
                                </button>
                                <button onClick={cancelEditing} className="cancel-btn">
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        )}

                        <div className="task-actions">
                            {!editingTask && (
                                <BsPencilFill
                                    className="icon edit-icon"
                                    onClick={() => startEditing(todo)}
                                />
                            )}
                            <BsFillTrashFill
                                className="icon"
                                onClick={() => handleDelete(todo._id)}
                            />
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default Home;