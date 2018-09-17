import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];
  numberOfTodos = 2;

  constructor(private storage: Storage) {
    this.todos = [
      {
        id: 0,
        title: 'Ordenar cajones',
        description: 'Sacar todas las cosas y tirar lo que no sirva.'
      },
      {
        id: 1,
        title: 'Aprender Ionic',
        description: 'Aprender a programar aplicaciones móviles híbridas.'
      }
    ]
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
    //return this.todos.filter(t => t.id == id)[0];
    return this.todos.find(t => t.id == id);
  }

  saveTodo(t: Todo) {
    /*
    if (t.id) {
      this.todos[t.id].title = t.title; 
      this.todos[t.id].description = t.description; 
    } else {
      t.id = this.numberOfTodos;
      this.numberOfTodos++;
      this.todos.push(t);
    }
    */
    this.todos.push(t);
    this.save();
  }
}
