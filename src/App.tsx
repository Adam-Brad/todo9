import React, {ChangeEvent, useState} from 'react';
import './App.css';
import Input from "./components/Input/Input";
import Todo from "./interfaces/Todo";
import List from "./components/List/List";
import { v4 as uuidv4 } from 'uuid';

function App() {
    const [list, setList] = useState<Todo[]>([]);
    const [currentTask, setCurrentTask] = useState<string>('');

    const addToList = (task: string) => {
        if (!task.length) {
            alert("Blank todos not allowed");
            return;
        }

        const hasDuplicate = list.reduce((haveSeenDuplicate: boolean, todo: Todo) => {
            if (task === todo.text) {
                haveSeenDuplicate = true;
            }
            return haveSeenDuplicate;
        }, false)

        if (hasDuplicate) {
            alert("Duplicate");
            return;
        }

        const additionalTodo: Todo = {
            text: task,
            isCompleted: false,
            id: uuidv4()
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
        setCurrentTask(event.target.value);
    };

    const handleSave = (task: string, index: number) => {
        const listAfterSave = list.map((todo: Todo, i: number) => {
            if (i === index) {
                todo.text = task;

            }
            return todo;
        });
        setList(listAfterSave);
    };

    return (
    <div className="App">
        <h1>Typescript Todo #9</h1>
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
