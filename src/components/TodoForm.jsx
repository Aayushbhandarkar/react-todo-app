import React, { useState } from 'react';
import { useTodo } from '../context';

function TodoForm() {
    const [todo, setTodo] = useState("");
    const { addTodo } = useTodo();

    const add = (e) => {
        e.preventDefault();
        if (!todo.trim()) return;

        addTodo({ todo, completed: false });
        setTodo("");
    };

    return (
        <form onSubmit={add} className="flex gap-2">
            <input
                type="text"
                placeholder="What needs to be done?"
                className="w-full px-4 py-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 outline-none text-gray-200 placeholder-gray-400 transition-all duration-200"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button 
                type="submit" 
                className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 shrink-0"
            >
                Add Task
            </button>
        </form>
    );
}

export default TodoForm;