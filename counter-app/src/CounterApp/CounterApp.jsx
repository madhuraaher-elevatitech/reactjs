import React, { useEffect,useState } from 'react'
import './CounterApp.css'

const CounterApp = () => {
    const [count,setCount] = useState(0);

    const handleIncrement = () => {
      setCount(prev => prev + 1);
    };

    const handleDecrement = () => {
      setCount(prev => prev - 1);
    };

    const handleReset = () => {
      setCount(0);
    };

    const bindEvents = () => {
      const incBtn = document.getElementById('incrementBtn');
      const decbtn = document.getElementById('decrementBtn');
      const resetBtn = document.getElementById('resetBtn');

      incBtn.onclick = handleIncrement;
      decbtn.onclick = handleDecrement;
      resetBtn.onclick = handleReset;
    };

    
    useEffect(() => {
      bindEvents();
    }, []);


  return (
    <div>
      <div className="counter_container"> 
        <h1>Counter App</h1>

        <div className="count_display">{count}</div>

        {/*Button */}
        <div className="button-group">
            <button
            id="decrementBtn" 
            className='btn decrement'>-</button>

            <button 
            id="resetBtn"
            className='btn reset'>Reset</button>

            <button id="incrementBtn" 
            className='btn increment'>+</button>
        </div>
      </div>
    </div>
  )
}

export default CounterApp
