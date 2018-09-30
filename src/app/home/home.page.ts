import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../interfaces/todo';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  todos: Todo[] = [];

  constructor(
    private todoService: TodoService,
    private navControler: NavController,
    private alertController: AlertController) { }

  ngOnInit() {
    this.todoService.getTodos().then(
      data => this.todos = data
    );
  }

  goEditTodo(id: number) {
    this.navControler.navigateForward('/edit/' + id);
  }

  async deleteDialog(id: number, title: string) {

      const alert = await this.alertController.create({
        header: 'Borrar tarea',
        message: '¿Estás seguro que quieres borrar la tarea <b>"' + title + '"</b>?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'secondary',
            /*handler: (blah) => {
              console.log('Confirm Cancel: blah');
            }*/
          }, {
            text: 'Aceptar',
            handler: () => {
              this.todoService.deleteTodo(id).then(
                () => this.todoService.getTodos().then(
                  data => this.todos = data
                )
              );
            }
          }
        ]
      });
  
      await alert.present();
  }

}
