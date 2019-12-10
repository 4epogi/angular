import { Component, OnInit } from "@angular/core";
import { TodoDataService } from "../service/data/todo-data.service";
import { Router } from '@angular/router';

export class Todo {
  constructor(
    public id: number,
    public description: string,
    public targetDate: Date,
    public done: boolean
  ) {}
}
@Component({
  selector: "app-list-todos",
  templateUrl: "./list-todos.component.html",
  styleUrls: ["./list-todos.component.css"]
})
export class ListTodosComponent implements OnInit {
  username: String;
  todos: Todo[];
  message: String;
  //   new Todo(1, 'Learn to dance', false, new Date()),
  //   new Todo(2, 'Become a programmer', false, new Date()),
  //   new Todo(3, 'Leave Ukraine', false, new Date())

  // ];
  constructor(private todoDataService: TodoDataService, private router: Router) {}

  ngOnInit() {
    // this.username = this.route.snapshot.params['name'];
    this.getAllTodos();
  }

  private getAllTodos() {
    this.todoDataService.retrieveAlTodos("chepogi").subscribe(response => {
      console.log(response);
      this.todos = response;
    });
  }

  deleteTodo(id){
    this.todoDataService.deleteTodo("chepogi", id).subscribe(
      response =>{
        console.log(response);
        this.message = "Delete successful";
        this.getAllTodos();
      }
    );
  }

  updateTodo(id){
    this.router.navigate(['todos', id]);
  }

  addTodo(){
    this.router.navigate(['todos', -1]);
  }
}
