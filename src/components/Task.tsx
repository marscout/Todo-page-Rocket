import { useState } from 'react';
import styles from './Task.module.css'
import { Trash,Check } from "phosphor-react";
import { ITask } from './FormTodo';

interface propsTask{
    task: ITask;
    onDelete: (id:string) => void;
    onDoneTask: (id:string) => void;
}
export function Task({task,onDelete, onDoneTask}:propsTask) {

    const [taskDone, setTaskDone] = useState(false)

    function handleChangeTaskDone() {
        onDoneTask(task.id)
        setTaskDone(!taskDone);
    }

    function handleDeleteTask() {
        onDelete(task.id);
    }

    return(
        <div className={styles.taskBody}>
            <div className={styles.taskInfos}>
                <div onClick={handleChangeTaskDone} 
                    className={`${styles.taskCheckbox} 
                        ${!taskDone ? styles.taskNotDoneCheckbox : styles.taskDoneCheckbox}`}>
                            {
                                taskDone ? <Check size={12} weight='bold'/> : ''
                                
                            }
                </div>
                <span className={taskDone? styles.taskDone : ''}>{task.content}</span>
            </div>
            <button onClick={handleDeleteTask} className={styles.taskDelete}><Trash size={16}/></button>
        </div>
    )
}