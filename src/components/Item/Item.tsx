import React from "react";
import Todo from "../../interfaces/Todo";
import styles from "./Item.module.css";

interface ItemProps {
    todo: Todo;
    index: number;
    deleteFromList: (index: number) => void;
    markCompleted: (index: number) => void;
}

export default function Item(props: ItemProps) {

    const { todo, index, deleteFromList, markCompleted } = props;

    const removeFromList = () => deleteFromList(index);

    const toggleCompleted = () => markCompleted(index);

    const buttonText = todo.isCompleted ? `Unmark` : `Mark`;

    const itemClasses = todo.isCompleted ? `${styles.completed}` : ``;

    return (
        <>
            <li key={index} className={itemClasses}>{todo.text}</li>
            <button data-testid={`${todo.text}-delete`} onClick={removeFromList}>Delete</button>
            <button data-testid={`${todo.text}-mark`} onClick={toggleCompleted}>{buttonText}</button>
        </>
    );
}