import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Todo } from '../list-todos/list-todos.component';
import { ActivatedRoute, Router } from '@angular/router';
import { VirtualTimeScheduler } from 'rxjs';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo: Todo;
  id: number;

  constructor(private todoDataService: TodoDataService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    console.log(this.id);
    this.todo = new Todo(this.id, '', new Date(), false);
    if(this.id != -1){
    this.todoDataService.retrieveTodo("chepogi", this.id).subscribe(
      data => this.todo = data
    )
    }
  }

  saveTodo(){
    if(this.id === -1){
      console.log(this.todo);
      this.todoDataService.createTodo('chepogi', this.todo)
      .subscribe(
        data => {
          console.log(data);
        this.router.navigate(['todos']);
        }
      )
    }else {
    this.todoDataService.updateTodo('chepogi', this.id, this.todo)
      .subscribe(
        data => {
          console.log(data);
        this.router.navigate(['todos']);
        }
      )
    }
  }
}
