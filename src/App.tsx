import React, {ChangeEvent, useState} from 'react';
import './App.css';
import Input from "./components/Input/Input";
import Todo from "./interfaces/Todo";
import List from "./components/List/List";

function App() {
    const [list, setList] = useState<Todo[]>([]);
    const [currentTask, setCurrentTask] = useState<Todo>({
        text: '',
        isCompleted: false
    });

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

    const markCompleted = (index: number) => {
      const listAfterUpdate: Todo[] = list.map((todo: Todo, i: number) => {
          if (i === index) {
              todo.isCompleted = !todo.isCompleted;
          }
          return todo;
      });
      setList(listAfterUpdate);
    };

    const handleEditChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCurrentTask({
            text: event.target.value,
            isCompleted: false
        });
    };

    const handleSave = (currentTask: Todo, index: number) => {
        const listAfterSave = list.map((todo: Todo, i: number) => {
            if (i === index) {
                todo.text = currentTask.text;
            }
            return todo;
        });
        setList(listAfterSave);
    };

    return (
    <div className="App">
      <Input
          addToList={addToList}
      />
      <List
        list={list}
        deleteFromList={deleteFromList}
        markCompleted={markCompleted}
        handleEditChange={handleEditChange}
        currentTask={currentTask}
        handleSave={handleSave}
      />
    </div>
  );
}

export default App;
