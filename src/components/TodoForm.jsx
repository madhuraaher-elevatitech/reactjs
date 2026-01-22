import { useState } from 'react';

function TodoForm({addTask}) {
  const[text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim() ==='') return;
    addTask(text);
    setText('');
  };

return(
  <form onSubmit={handleSubmit} className='todo-form'>
    <div className="input-wrapper">
    <input
     type="text"
     placeholder= "Add a task"
     value={text}
     onChange={(e) =>setText(e.target.value)}
    />
    <button type="submit">Add</button>
    </div>
  </form>
);
}
export default TodoForm;








//JSX renders a controlled form where the input value is managed 
// by React state. The onChange handler updates the state as the user types,
//  and the onSubmit handler processes the form submission.”







