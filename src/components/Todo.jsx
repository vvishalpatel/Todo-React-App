import React, { useEffect, useRef, useState } from "react";
import Todoitems from "./Todoitems";
import Appicon from "../assets/Appicon.png"

const Todo = () => {
//to store text in todoList we need to provide some particular info like id ..etc
//we store the data todos into local storage int todoList , but data is in string so we convert it array using JSON parse and we are also using ternary , but data is there then it store otherwise its empty
    const [todoList, setTodoList] = useState(localStorage.getItem("todos")? JSON.parse(localStorage.getItem("todos")) : []);

    // take input text into inputRef
    const inputRef = useRef();

    //get value entered into input field using inputRef 
    const add = () => {
        const inputText =  inputRef.current.value.trim();

        if(inputText === ""){
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
//after this we store this object into use state , so we use setter function
        }
        setTodoList((prev) =>[...prev, newTodo]);
        //after storing the text we need to clear the input field
        inputRef.current.value = "";
    }
//to delete we need id and we use todoList state to delete the task
    const deleteTodo = (id) => {
        setTodoList((prvTodos) => {
           return prvTodos.filter((Todo) => Todo.id !== id)
        })

    }
    useEffect(() => {
        localStorage.setItem("todos",JSON.stringify(todoList));
// localStorage will store the todo list  and this will convert the todolist which is an array into string can store into brower local storage
    },[todoList])

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) =>{
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo
            })
        })

    }
    return (
        
        <div className="backdrop-blur-md bg-purple-300 shadow-2xl place-self-center w-11/12 max-w-md flex flex-col p-6 rounded-3xl border border-white/20">
         

        <div className=" flex items-center mt-4 gap-2">
            <img className=" w-7" src={Appicon} alt=""/>
            <h1 className="text-2xl font-semibold">To Do List</h1>
        </div>

        <div className=" flex items-center my-7  bg-white rounded-full">
            <input ref={inputRef} className="bg-transparent border-0 outline-none flex-1 h-12 pl-6 pr-2 placeholder:text-slate-500" type="text" placeholder="Add your Task"/>
            <button onClick={add} className="bg-gradient-to-r from-pink-400 to-pink-600 hover:from-pink-500 hover:to-pink-700 transition-all duration-300 rounded-full px-5 py-2 h-12 text-white font-semibold">Add +</button>
            
        </div>
        <div>
            {todoList.map((items, index) => {
                return <Todoitems key={index} text= {items.text} id = {items.id} isComplete={items.isComplete} deleteTodo = {deleteTodo} toggle ={toggle}/>

            })}

        </div>
        
            

        </div>
    )
}
export default Todo;