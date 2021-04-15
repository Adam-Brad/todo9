import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import App from './App';

const addAToDo = (input: HTMLElement, text: string, button: HTMLElement) => {
    fireEvent.change(input, { target: { value: text }});
    fireEvent.click(button);
};

test('adding new todos to the list and input clears', () => {
    const { getByText, getByLabelText, queryByText } = render(<App />);
    const input = getByLabelText("Add a new todo");
    const addButton = getByText("Click to Add");
    const inputValue = input.innerHTML;

    addAToDo(input, "get bread", addButton);
    const getBreadText = queryByText("get bread");

    expect(getBreadText).toBeInTheDocument();
    expect(inputValue).toBe("");
});

test('clicking delete button removes correct todo', () => {
    const { getByText, getByLabelText, queryByText, getByTestId } = render(<App />);
    const input = getByLabelText("Add a new todo");
    const addButton = getByText("Click to Add");

    addAToDo(input, "get bread", addButton);
    const getBreadText = queryByText("get bread");
    expect(getBreadText).toBeInTheDocument();

    const getBreadDeleteButton = getByTestId("get bread-delete");
    fireEvent.click(getBreadDeleteButton);

    expect(getBreadText).not.toBeInTheDocument();
});

test('marking a todo changes the button text', () => {
    const { getByText, getByLabelText, getByTestId } = render(<App />);
    const input = getByLabelText("Add a new todo");
    const addButton = getByText("Click to Add");

    addAToDo(input, "get bread", addButton);

    const getBreadMarkButton = getByTestId("get bread-mark");
    expect(getBreadMarkButton.innerHTML).toBe("Mark");
    fireEvent.click(getBreadMarkButton);

    expect(getBreadMarkButton.innerHTML).toBe("Unmark");
});

test('edit/save button toggles text', () => {
    const { getByText, getByLabelText, getByTestId } = render(<App />);
    const input = getByLabelText("Add a new todo");
    const addButton = getByText("Click to Add");

    addAToDo(input, "get bread", addButton);
    const getBreadEditButton = getByTestId("get bread-edit");
    expect(getBreadEditButton.innerHTML).toBe("Edit");
    fireEvent.click(getBreadEditButton);

    expect(getBreadEditButton.innerHTML).toBe("Save");
});

test('editing and saving a todo changes the text', () => {
    const { getByText, getByLabelText, queryByText, getByTestId } = render(<App />);
    const input = getByLabelText("Add a new todo");
    const addButton = getByText("Click to Add");

    addAToDo(input, "get bread", addButton);
    const getBreadEditButton = getByTestId("get bread-edit");
    fireEvent.click(getBreadEditButton);

    const getBreadEditInput = getByTestId("get bread-input");
    addAToDo(getBreadEditInput, "get milk", getBreadEditButton);
    const getMilkText = getByText("get milk");
    const getBreadText = queryByText("get bread");

    expect(getMilkText).toBeInTheDocument();
    expect(getBreadText).not.toBeInTheDocument();
});

test('adding a blank todo throws error', () => {
    const { getByText, getByLabelText } = render(<App />);
    const input = getByLabelText("Add a new todo");
    const addButton = getByText("Click to Add");
    window.alert = jest.fn();

    addAToDo(input, "", addButton);

    expect(window.alert).toHaveBeenCalledTimes(1);
});

test('adding a duplicate todo throws error', () => {
    const { getByText, getByLabelText } = render(<App />);
    const input = getByLabelText("Add a new todo");
    const addButton = getByText("Click to Add");
    window.alert = jest.fn();

    addAToDo(input, "get bread", addButton);
    addAToDo(input, "get bread", addButton);

    expect(window.alert).toHaveBeenCalledTimes(1);
});
