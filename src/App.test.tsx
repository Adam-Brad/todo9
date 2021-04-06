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
    const { getByText, getByLabelText, queryByText, getByTestId } = render(<App />);
    const input = getByLabelText("Add a new todo");
    const addButton = getByText("Click to Add");

    addAToDo(input, "get bread", addButton);

    const getBreadMarkButton = getByTestId("get bread-mark");
    expect(getBreadMarkButton.innerHTML).toBe("Mark");
    fireEvent.click(getBreadMarkButton);

    expect(getBreadMarkButton.innerHTML).toBe("Unmark");
});
