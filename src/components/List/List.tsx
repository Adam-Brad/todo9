import React from "react";
import Todo from "../../interfaces/Todo";
import Item from "../Item/Item";

interface ListProps {
    list: Todo[];
    deleteFromList: (index: number) => void;
    markCompleted: (index: number) => void;
}

export default function List(props: ListProps) {

    const { list, deleteFromList, markCompleted } = props;

    const displayedList = list.map((todo: Todo, index: number) => (
        <Item
            todo={todo}
            index={index}
            deleteFromList={deleteFromList}
            markCompleted={markCompleted}
        />
    ));

    return (
        <>
            {displayedList}
        </>
    );
}