import styles from './NewTask.module.css';

export function NewTask({
  ...rest
}: React.DetailedHTMLProps<
React.InputHTMLAttributes<HTMLInputElement>,HTMLInputElement>){
  return (
    <input 
      className={styles.NewTaskForm}
      placeholder='Adicione uma nova tarefa'
      {...rest}
    />
  )
}