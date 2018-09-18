import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];

  constructor(private storage: Storage) {
    /*console.log('hola');
    this.storage.get('todos').then(
      data => {
        if(data != null) {
          this.todos = data;
          console.log('Datos: ' + data);
        }
      }
    );*/
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
  

  save(t: Todo) {
    console.log('Saving...');
    console.log(t);
    this.todos[t.id] = t;
    this.storage.set('todos', this.todos);
    console.log(this.todos);
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodo(id: number): Todo {
    return this.todos.find(t => t.id == id);
  }

  addTodo(t: Todo) {
    console.log('Adding todo...');
    console.log(t);
    this.todos.push(t);
    console.log(this.todos);
    this.storage.set('todos', this.todos);
  }
}
