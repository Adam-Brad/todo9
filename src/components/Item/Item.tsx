import React, {useState, MouseEvent, ChangeEvent} from "react";
import Todo from "../../interfaces/Todo";
import styles from "./Item.module.css";

interface ItemProps {
    todo: Todo;
    index: number;
    deleteFromList: (index: number) => void;
    markCompleted: (index: number) => void;
    handleEditChange: (event: ChangeEvent<HTMLInputElement>) => void;
    currentTask: Todo;
    handleSave: (currentTask: Todo, index: number) => void;
}

export default function Item(props: ItemProps) {
    const [isEditable, setIsEditable] = useState<boolean>(false);

    const { todo, index, deleteFromList, markCompleted, handleEditChange, currentTask, handleSave } = props;

    const removeFromList = () => deleteFromList(index);

    const toggleCompleted = () => markCompleted(index);

    const handleEdit = () => {
        setIsEditable(!isEditable);
    }

    const saveUpdatedTodo = () => {
        handleSave(currentTask, index);
        setIsEditable(false);
    }

    const editOrSaveAction = isEditable ? saveUpdatedTodo : handleEdit;

    const editOrSaveButtonText = isEditable ? `Save` : `Edit`;

    const markButtonText = todo.isCompleted ? `Unmark` : `Mark`;

    const itemClasses = todo.isCompleted ? `${styles.completed}` : ``;

    return (
        <>
            {isEditable ?
                <input data-testid={`${todo.text}-input`} onChange={handleEditChange} />
            :
                <li key={index} className={itemClasses}>{todo.text}</li>
            }

            <button data-testid={`${todo.text}-delete`} onClick={removeFromList}>Delete</button>
            <button data-testid={`${todo.text}-mark`} onClick={toggleCompleted}>{markButtonText}</button>
            <button data-testid={`${todo.text}-edit`} onClick={editOrSaveAction}>{editOrSaveButtonText}</button>
        </>
    );
}