import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  todos: Todo[] = [];

  constructor(private todoService: TodoService) {
    
  }

  ngOnInit() {
    this.todoService.getTodos();
  }
}
