import React, { useState } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuid } from "uuid";
import { Todo } from "./Todo";
import { EditTodo } from "./EditTodoForm";
uuid();

export const TodoWrapper = () => {
    const [todos, setTodos] = useState([])

    const addTodo = todo => {
        setTodos([...todos, {
            id: uuid(),
            task: todo,
            completed: false,
            isEditing: false
        }])
        console.log(todos)
    }

    const deleteTodo = id => {
        setTodos(todos.filter(todo => todo.id !== id))
      }

    const toggleComplete = id => {
        setTodos(todos.map(todo => todo.id !== id))
    }

    const editTodo = id => {
        setTodos(todos.map(todo => todo.id === id ?
            { ...todo, isEditing: !todo.isEditing } : todo))
    }

    const editTask = (task, id) => {
        setTodos(todos.map(todo => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
      }
    return (
        <div className="todo-wrapper">
            <TodoForm addTodo={addTodo} />
            {todos.map((todo, index) => (
                todo.isEditing ? (
                    <EditTodo editTodo={editTask} task={todo}/>
                ) : (
                    <Todo
                        task={todo}
                        key={index}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                )
            ))}
        </div>
    )
}