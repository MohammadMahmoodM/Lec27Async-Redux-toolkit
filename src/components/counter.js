import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, incrementByAmount, counterUpdate } from '../store/counterSlice';

function Counter() {

    //const [counter, setCounter] = useState(0);   //instead of useState using useSelector because thats also update values
    const [value, setValue] = useState(0);
    const dispatch = useDispatch();
    const { counter, isLoading } = useSelector((state) => {
        console.log(state);
        //return state.counter.count;
        return {
            counter: state.Counter.count,
            isLoading: state.counter.isLoading
        }
    });

    if (isLoading) return <div>Loading...</div>

    return (
        <div>
            <div> Counter: {counter} </div>
            <button onClick={() =>
            //{setCounter(counter+1)} 
            //dispatch({type: "INCREMENT"})
            { dispatch(increment()); }
            } >Increment</button>
            <button onClick={() =>
            //{ setCounter(counter - 1) }
            //dispatch({type: "DECREMENT"})
            { dispatch(decrement()); }
            }>Decrement</button>
            <input type="text" onChange={(e) => { setValue(e.target.value) }} />
            {console.log(value)};
            <button onClick={() =>
            //{ setCounter(counter + Number(value)) }
            //dispatch({type: "ADD_BY_VALUE", Payload: Number(value)})
            { dispatch(incrementByAmount(Number(value))) }
            }>Increment By Value</button>
            {console.log(counter)};

            <button onClick={() => { dispatch(counterUpdate()) }}>Increment from Server</button>
        </div>
    )
}

export default Counter;