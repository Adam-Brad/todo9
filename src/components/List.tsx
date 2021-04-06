import React from "react";
import Todo from "../interfaces/Todo";

interface ListProps {
    list: Todo[];
}

export default function List(props: ListProps) {

    const { list } = props;

    const displayedList = list.map((todo: Todo, index: number) => (
       <li>{todo.text}</li>
    ));

    return (
        <>
            {displayedList}
        </>
    );
}