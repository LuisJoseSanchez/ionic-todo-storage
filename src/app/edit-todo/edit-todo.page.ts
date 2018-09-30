import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../services/todo.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.page.html',
  styleUrls: ['./edit-todo.page.scss'],
})
export class EditTodoPage implements OnInit {

  private todo: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private todoService: TodoService,
    private navController: NavController
  ) {
    this.todo = {
      id: this.todoService.todos.length,
      title : '',
      description : ''
    };
  }

  ngOnInit() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.todo = this.todoService.getTodo(+id);
    } else {
      this.todo = {};
      this.todo.title = '';
      this.todo.description = '';
    }    
  }

  saveTodo() {
    this.todoService.saveTodo(this.todo).then(
      () => this.navController.goBack(true)
    );
  }
}
