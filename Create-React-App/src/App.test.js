import * as React from 'react';
import {render, fireEvent} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import App from './App';

test('todo', () => {
  const {getByText,getByPlaceholderText,getByLabelText} = render(<App/>);
  getByText('ToDo List');
  getByLabelText('Completed');
  getByPlaceholderText('Add Todo...');
});

test('fire-event add items to list', () => {
  const {getByDisplayValue,getByPlaceholderText} = render(<App/>);
  const input = getByPlaceholderText('Add Todo...');
  fireEvent.change(input, {target:{value:'wash car'}});
  getByDisplayValue('wash car');
});

test("user-events allows users to add to list", () => {
  const {getByDisplayValue,getByPlaceholderText} = render(<App />);
  const input = getByPlaceholderText('Add Todo...');
  userEvent.type(input, "Learn spanish");
  getByDisplayValue("Learn spanish");
});