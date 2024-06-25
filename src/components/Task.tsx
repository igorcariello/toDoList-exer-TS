import styles from "./Task.module.css"
import { Check, Trash } from '@phosphor-icons/react'

interface TaskProps {
  id: string,
  isChecked: boolean, 
  onToggleTask: (id:string) => void, 
  paragraph: string, 
  onDeleteTask: (paragraph: string) => void

}


export function Task({id, isChecked, onToggleTask, paragraph, onDeleteTask}: TaskProps){

  function handleToggleTask(){
    onToggleTask(id)
  }

  function handleDeleteTask(){
    onDeleteTask(id)
  }
  
  return(
    <div className={styles.task}>
      <label htmlFor={`checkbox-${id}`}>
        <input 
          onChange={handleToggleTask} 
          checked={isChecked} 
          type="checkbox" 
          id={`checkbox-${id}`} 
        />
        <span>
          {isChecked && <Check weight="bold" size={12}/>}
        </span>
        <p className={`${styles.paragraph} ${isChecked ? styles.paragraphChecked : ""}`}>
          {paragraph}
        </p>
      </label>
      <div className={styles.trash}>
        <Trash onClick={handleDeleteTask}/>
      </div>  
    </div>
  )
}