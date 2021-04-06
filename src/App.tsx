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

    const deleteFromList = (index: number) => {
      const listAfterDelete = list.filter((todo: Todo, i: number) => i !== index );
      setList(listAfterDelete);
    };

    return (
    <div className="App">
      <Input
          addToList={addToList}
      />
      <List
        list={list}
        deleteFromList={deleteFromList}
      />
    </div>
  );
}

export default App;
