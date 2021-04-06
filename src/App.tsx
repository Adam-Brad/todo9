import React, {useState} from 'react';
import './App.css';
import Input from "./components/Input";
import Todo from "./interfaces/Todo";
import List from "./components/List";

function App() {
    const [list, setList] = useState<Todo[]>([]);

    const addToList = (task: string) => {
        const additionalTodo: Todo = {
            text: task,
            isCompleted: false
        };
        setList([additionalTodo, ...list])
    };

    return (
    <div className="App">
      <Input
          addToList={addToList}
      />
      <List
        list={list}
      />
    </div>
  );
}

export default App;
