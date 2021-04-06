import React, {ChangeEvent} from "react";
import Todo from "../../interfaces/Todo";
import Item from "../Item/Item";

interface ListProps {
    list: Todo[];
    deleteFromList: (index: number) => void;
    markCompleted: (index: number) => void;
    handleEditChange: (event: ChangeEvent<HTMLInputElement>) => void;
    currentTask: Todo;
    handleSave: (currentTask: Todo, index: number) => void;
}

export default function List(props: ListProps) {

    const { list, deleteFromList, markCompleted, handleEditChange, currentTask, handleSave } = props;

    const displayedList = list.map((todo: Todo, index: number) => (
        <Item
            todo={todo}
            index={index}
            deleteFromList={deleteFromList}
            markCompleted={markCompleted}
            handleEditChange={handleEditChange}
            currentTask={currentTask}
            handleSave={handleSave}
        />
    ));

    return (
        <>
            {displayedList}
        </>
    );
}