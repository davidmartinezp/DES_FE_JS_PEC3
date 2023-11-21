/**
 * @class TodoService
 *
 * Manages the data of the application.
 */
import { Todo } from '../models/todo.model';

export class TodoService {
    public todos: Todo[];
  
    constructor() {
        const storedTodos = localStorage.getItem("todos");
        this.todos = (storedTodos ? JSON.parse(storedTodos) : []).map(
            (todo: any) => new Todo(todo)
        );
    }
  
    private onTodoListChanged: ((todos: Todo[]) => void) | undefined;
  
    bindTodoListChanged(callback: (todos: Todo[]) => void) {
      this.onTodoListChanged = callback;
    }
  
    private _commit(todos: Todo[]) {
      if (this.onTodoListChanged) {
        this.onTodoListChanged(todos);
      }
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  
    addTodo(text: string) {
      this.todos.push(new Todo({ text }));
  
      this._commit(this.todos);
    }
  
    editTodo(id: string, updatedText: string) {
      this.todos = this.todos.map(todo =>
        todo.id === id
          ? new Todo({
              ...todo,
              text: updatedText
            })
          : todo
      );
  
      this._commit(this.todos);
    }
  
    deleteTodo(id: string) {
      this.todos = this.todos.filter(({ id: todoId }) => todoId !== id);
  
      this._commit(this.todos);
    }
  
    toggleTodo(id: string) {
      this.todos = this.todos.map(todo =>
        todo.id === id ? new Todo({ ...todo, complete: !todo.complete }) : todo
      );
  
      this._commit(this.todos);
    }
  }
  