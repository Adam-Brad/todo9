import React, {ChangeEvent, useState} from "react";

interface InputProps {
    addToList: (task: string) => void;
}

export default function Input(props: InputProps) {
    const [task, setTask] = useState<string>('');

    const { addToList } = props;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
         setTask(event.target.value);
    };

    const createAddition =  () => {
      addToList(task);
      setTask('');
    };

    return (
        <>
            <label htmlFor="input">Add a new todo</label>
            <input id="input" onChange={handleChange} value={task}/>
            <button onClick={createAddition}>Click to Add</button>
        </>
    );
}