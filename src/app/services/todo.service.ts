import { Injectable } from '@angular/core';
import { Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todo[] = [];
  numberOfTodos = 2;

  constructor() {
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

  getTodos(): Todo[] {
    return this.todos;
  }

  getTodo(id: number): Todo {
    return this.todos.filter(t => t.id == id)[0];
  }

  saveTodo(t: any) {
    if (t.id) {
      this.todos[t.id].title = t.title; 
      this.todos[t.id].description = t.description; 
    } else {
      t.id = this.numberOfTodos;
      this.numberOfTodos++;
      this.todos.push(t);
    }
  }
}
