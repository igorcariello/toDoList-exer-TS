import { Header } from "./components/Header";
import styles from "./App.module.css"
import { Button } from "./components/Button";
import { Task } from './components/Task'

import clipboard from "./assets/clipboard.png"
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

interface TaskChecked {
  [key: string]:boolean
}

interface Task {
  id: string;
  text: string
}


export function App() {
 
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState<string>('')

  const [taskChecked, setTaskChecked] = useState<TaskChecked>({})

  function deleteTask(taskToDelete: string){
   
    const tasksFiltered = tasks.filter( (task) => task.id !== taskToDelete) 
    
    setTasks(tasksFiltered)
    setTaskChecked((prev) => {
      const updated = {...prev}
      delete updated[taskToDelete]
      return updated
    })
  }

  

  function handleAddTask(){
    if (!newTask){
      return alert("É necessário escrever qual é a tarefa que você quer criar.")
    }

    const newTaskObject: Task ={ id: uuidv4(), text: newTask}
    setTasks( state => [...state, newTaskObject])
    setTaskChecked((prev) => ({...prev, [newTaskObject.id]: false}))
    setNewTask('')
  }

  function toggleTask(id: string) {
    setTaskChecked((prev)=> ({
      ...prev,
      [id]: !prev[id],
    }))

  }

  const taskCheckedCounter = Object.values(taskChecked).filter(Boolean).length 

  return (
    <div className={styles.general}>
      <Header />
      <main className={styles.content}>
        <header>
          <input 
            value={newTask} 
            onChange={ (e) => setNewTask(e.target.value)} 
            placeholder="Adicione uma nova tarefa"
          />
          <Button onClick={handleAddTask} />
        </header>
        <div className={styles.title}>
          <p className={styles.taskCreate}> 
            Tarefas criadas 
            <span>
              {tasks.length}
            </span>
          </p>
          <p className={styles.taskFinished}>
            Concluídas 
            <span>
              {
                tasks.length === 0
                ? 0 
                :  `${taskCheckedCounter} de ${tasks.length}`  

              }
            </span>
          </p>
        </div>
        <div className={styles.contentTask}>
          {
            tasks.length === 0 
            ? <div className={styles.emptyTasks}>
                <img src={clipboard} alt="" />
                <p>Você ainda não tem tarefas cadastradas</p>
                <span>Crie tarefas e organize seus itens a fazer</span>
              </div> 
            : ( <div className={styles.tasks}>
                { 
                  tasks.map((task) => (
                    <Task 
                      key={task.id}
                      id={task.id} 
                      paragraph={task.text}
                      isChecked= {taskChecked[task.id]}  
                      onDeleteTask={deleteTask} 
                      onToggleTask = {toggleTask}
                    />
                  ))
                }  
              </div>
            )
            }
        </div>
      </main>
    </div>
  )
}