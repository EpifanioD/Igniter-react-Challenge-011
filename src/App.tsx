import { PlusCircle } from '@phosphor-icons/react';

import { Header } from "./components/Header";
import { NewTask } from "./components/NewTask";
import { Button } from "./components/Button";

import { ListHeader } from "./components/List/ListHeader";
import { Empty } from "./components/List/Empty";
import { Task } from './components/List/Task'

import { v4 as uuidv4 } from 'uuid';

import styles from './App.module.css';

import './global.css';
import { useState } from 'react';

export interface ITask {
  id: string
  text: string
  isChecked: boolean
}

function App() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  console.log(tasks);
  const [inputValue, setInputValue] = useState('');

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  function handleAddTask() {
    if(!inputValue){
      return
    }

    const newTask: ITask = {
      id: uuidv4(),
      text: inputValue,
      isChecked: false,
    }

    setTasks((state) => [...state, newTask]);
   
    setInputValue('');
  }

  function handleRemoveTask(id: string) {
    console.log("ID to remove:", id);
    
    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return;
    }
    
    const filteredTasks = tasks.filter((task) => task.id !== id);
    console.log("Filtered tasks:", filteredTasks);
  
    setTasks(filteredTasks);
  }

  function handleToggleTask({ id, value }: { id: string; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  return (
    <>
      <main className={styles.wrapper}>
        <Header/>
        <section className={styles.content}>
          <div className={styles.taskInfoContainer}>
            <NewTask
              onChange={(e) => setInputValue(e.target.value)}
              value={inputValue}
            />
            <Button onClick={handleAddTask}>
              Criar
              <PlusCircle size={16} color="#f2f2f2" weight="bold" />
            </Button>
          </div>

          <div className={styles.taskList}>
            <ListHeader 
              tasksCounter={tasks.length}
              checkedTasksCounter={checkedTasksCounter}
            />


            {tasks.length > 0 ? (
              <div>
                {tasks.map((task) => (
                  <Task
                    key={task.id}
                    data={task}
                    removeTask={handleRemoveTask}
                    toggleTaskStatus={handleToggleTask}
                  />
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </div>
        </section>
      </main>
    </>
  )
}

export default App
