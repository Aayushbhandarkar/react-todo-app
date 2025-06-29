import { useState, useEffect } from 'react';
import './App.css';
import { TodoProvider } from './context';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem('todos'));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
              Task Master
            </h1>
            <p className="text-gray-400 max-w-md mx-auto">
              Organize your work and life with this simple yet powerful task manager.
            </p>
          </div>
          
          <div className="bg-gray-800/50 backdrop-blur-lg rounded-xl shadow-xl overflow-hidden border border-gray-700/30 mb-8">
            <div className="p-6">
              <TodoForm />
            </div>
          </div>
          
          <div className="space-y-4">
            {todos.length === 0 ? (
              <div className="text-center py-12">
                <div className="mx-auto h-24 w-24 text-gray-600 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-300">No tasks yet</h3>
                <p className="mt-1 text-sm text-gray-500">Add your first task to get started</p>
              </div>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="transition-all duration-200 hover:scale-[1.005]">
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
          
          {todos.length > 0 && (
            <div className="mt-6 text-center text-sm text-gray-500">
              {todos.filter(todo => todo.completed).length} of {todos.length} tasks completed
            </div>
          )}
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;