import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];

  constructor(private storage: Storage) {
    
  }

  load(): Promise<Boolean> {

    return new Promise(
      resolve => {
        this.storage.get('todos').then(
          data => {
            if(data != null) {
              this.todos = data;
            }

            resolve(true);
          }
        );
      }
    );
  }

  save() {
    this.storage.set('todos', this.todos);
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodo(id: number): Todo {
    return this.todos.find(t => t.id == id);
  }

  addTodo(t: Todo) {
    this.todos.push(t);
    this.save();
  }
}
