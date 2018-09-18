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

  private todo: Todo;
  private editMode: boolean = false;

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
      this.editMode = true;
      this.todo = this.todoService.getTodo(+id);
    }    
  }

  saveTodo() {
    console.log(this.todo);

    if (this.editMode) {
      this.todoService.save(this.todo);
    } else {
      this.todoService.addTodo(this.todo);
    }
    //this.navController.goBack('/home');
  }
}
