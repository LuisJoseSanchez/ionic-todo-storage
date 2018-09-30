import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];
  todosCounter = 0;

  constructor(private storage: Storage) {
    this.getTodos().then(
      data => {
        this.todos = data;
        this.todos.forEach(
          t => {
            if (t.id > this.todosCounter) {
              this.todosCounter++;
            }
          });
        this.todosCounter++;
      }
    );
  }

  getTodos(): Promise<Todo[]> {
    return this.storage.get('todos');
  }

  getTodo(id: number): Todo {
    return this.todos.find(t => t.id == id);
  }

  saveTodo(t: any): Promise<boolean> {
    if (t.id) {
      let index = this.todos.findIndex(todo => todo.id === t.id);
      this.todos[index] = {
        id: t.id,
        title: t.title,
        description: t.description
      }
    } else {
      t.id = this.todosCounter;
      this.todos.push(t);
      this.todosCounter++;
    }
    
    return this.storage.set('todos', this.todos);
  }

  deleteTodo(id: number): Promise<boolean> {
    this.todos = this.todos.filter(t => t.id != id);
    return this.storage.set('todos', this.todos);
  }
}
