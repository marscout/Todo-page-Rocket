import { Notepad, PlusCircle } from "phosphor-react";
import { ChangeEvent, FormEvent, useState,InvalidEvent } from "react"
import styles from "./Form.module.css";
import { Task } from "./Task";

export interface ITask{
    id: string;
    content:string;
    isDone: boolean;
}
const tasksArray: ITask[] =[
    
]
function uuidv4() { 
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) { 
        const r = Math.random() * 16 | 0,  
            v = c == 'x' ? r : (r & 0x3 | 0x8); 
        return v.toString(16); 
    }); 
}
export function FormTodo() {

    const [textTask, setTextTask] = useState('')
    const [tasks, setTasks] = useState(tasksArray)
    const donedTasks = tasks.filter(task => task.isDone).length

    
    function handleNewText(event: ChangeEvent<HTMLInputElement>) {
        event.target.setCustomValidity('')
        setTextTask(event.target.value);
    }

    function handleOnSubmit(event: FormEvent) {
        event.preventDefault();

        const newTask:ITask = {
            id: uuidv4(),
            content: textTask,
            isDone: false
        }
        setTasks([...tasks, newTask]);
        setTextTask('');
    }

    function OnDelete(id:string) {
        const postWithoutDeleteOne = tasks.filter(task => {
            return task.id !== id
        });

        setTasks(postWithoutDeleteOne);
    }

    function OnDoneTask(id:string) {

        const nextArray = tasks.map(task => {
            if(task.id === id){
                return {...task, isDone: !task.isDone};
            }else{
                return task;
            }
        })

        setTasks(nextArray);
    }

    function handleNewCommentInvalid(event: InvalidEvent<HTMLInputElement>) {
        event.target.setCustomValidity("Este campo é obrigatório!")
    }
    return(
        <>
        <form className={styles.formTodo} onSubmit={handleOnSubmit}>
            <input value={textTask}
                onChange={handleNewText}
                className={styles.inputTodo}
                type="text"
                onInvalid={handleNewCommentInvalid}
                required
                name="tarefa" 
                placeholder="Adicione uma nova tarefa"
            />
            <button className={styles.btnTodo} type="submit">
                Criar<PlusCircle size={20} weight="bold"/>
            </button>
        </form>

        <div className={styles.taskArea}>
            <div className={styles.taskInfo}>
                <div>
                    <span className={styles.fontBlue}>Tarefas criadas</span>
                    <span>{tasks.length}</span>
                </div>
                <div>
                    <span className={styles.fontPurple}>Concluídas</span>
                    <span>{donedTasks === 0? '0': `${donedTasks} de ${tasks.length}` }</span>
                </div>
            </div>
            <div className={styles.tasks}>
            {tasks.length > 0? 
        
                (
                    tasks.map(task => {
                        return <Task key={task.id} task={task} onDelete={OnDelete} onDoneTask={OnDoneTask}/>
                    })
                    
                ):
                (
                    <div className={styles.emptyTasks}>
                        <Notepad size={56} color="#808080" weight="duotone" />
                        <strong>Você ainda não tem tarefas cadastradas</strong>
                        <span>Crie tarefas e organize seus itens a fazer</span>
                    </div>
                )
            
            }
            </div>
        </div>
        
            
        </>
    )
}