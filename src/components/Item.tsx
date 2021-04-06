import React from "react";
import Todo from "../interfaces/Todo";

interface ItemProps {
    todo: Todo;
    index: number;
    deleteFromList: (index: number) => void;
}

export default function Item(props: ItemProps) {

    const { todo, index, deleteFromList } = props;

    const removeFromList = () => deleteFromList(index);

    return (
        <>
            <li key={index}>{todo.text}</li>
            <button data-testid={`${todo.text}-delete`} onClick={removeFromList}>Delete</button>
        </>
    );
}