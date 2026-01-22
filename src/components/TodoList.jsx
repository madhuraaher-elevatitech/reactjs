import TodoItem from "./TodoItem";

function TodoList({tasks, deleteTask, toggleTask}){
    return(
        <ul>
            {tasks.map(task =>(
                <TodoItem 
                    key={task.id}
                    task={task}
                    deleteTask={deleteTask}
                    toggleTask={toggleTask}
                />
            ))}
        </ul>
    );
}
export default TodoList;