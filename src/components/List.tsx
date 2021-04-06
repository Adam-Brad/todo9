import React from "react";
import Todo from "../interfaces/Todo";
import Item from "./Item";

interface ListProps {
    list: Todo[];
    deleteFromList: (index: number) => void;
}

export default function List(props: ListProps) {

    const { list, deleteFromList } = props;

    const displayedList = list.map((todo: Todo, index: number) => (
        <Item
            todo={todo}
            index={index}
            deleteFromList={deleteFromList}
        />
    ));

    return (
        <>
            {displayedList}
        </>
    );
}