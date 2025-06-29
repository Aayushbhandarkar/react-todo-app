import React, { useState } from 'react';
import { useTodo } from '../context';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoMsg, setTodoMsg] = useState(todo.todo);
    const { updateTodo, deleteTodo, toggleCompleted } = useTodo();

    const editTodo = () => {
        updateTodo(todo.id, { ...todo, todo: todoMsg });
        setIsTodoEditable(false);
    };

    const toggleCompletedHandler = () => {
        toggleCompleted(todo.id);
    };

    return (
        <div
            className={`flex items-center gap-4 p-4 rounded-lg border transition-all duration-200 ${
                todo.completed 
                    ? 'bg-gray-700/50 border-gray-600' 
                    : 'bg-gray-800 border-gray-700'
            }`}
        >
            <input
                type="checkbox"
                className="w-5 h-5 text-cyan-500 bg-gray-700 border-gray-600 rounded focus:ring-cyan-400 focus:ring-offset-gray-800 cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompletedHandler}
            />
            <input
                type="text"
                className={`w-full bg-transparent outline-none ${
                    isTodoEditable 
                        ? 'border-b border-cyan-400 px-2 py-1' 
                        : 'border-transparent'
                } ${
                    todo.completed 
                        ? 'line-through text-gray-400' 
                        : 'text-gray-200'
                }`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' && isTodoEditable) {
                        editTodo();
                    }
                }}
            />
            <div className="flex gap-2">
                <button
                    className={`p-2 rounded-lg ${
                        todo.completed 
                            ? 'text-gray-500 cursor-not-allowed' 
                            : 'text-cyan-400 hover:bg-gray-700'
                    } transition-colors duration-200`}
                    onClick={() => {
                        if (todo.completed) return;
                        if (isTodoEditable) {
                            editTodo();
                        } else {
                            setIsTodoEditable((prev) => !prev);
                        }
                    }}
                    disabled={todo.completed}
                    title={todo.completed ? "Completed tasks can't be edited" : isTodoEditable ? "Save" : "Edit"}
                >
                    {isTodoEditable ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    )}
                </button>
                <button
                    className="p-2 rounded-lg text-red-400 hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => deleteTodo(todo.id)}
                    title="Delete"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    );
}

export default TodoItem;