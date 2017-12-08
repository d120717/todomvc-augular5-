import { Component , OnInit } from '@angular/core';


import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  inputHint = 'What nees to be done?';
  todos: any[] = [];
  todo = '';
  filterType = 'All';
  toggleAll = false;


  constructor ( private dataSvc: DataService) {

  }

  ngOnInit() {
    this.dataSvc.getTodos().subscribe(data => {
      this.todos = data;
    });
  }


  addTodo() {
    const newTodos = [...this.todos];
    newTodos.push({
      text: this.todo,
      done: false
    });
    this.dataSvc.saveTodos(newTodos).subscribe(data => {
      this.todos = data;
      this.todo = '';
    });
  }

  clearCompleted () {
    // tslint:disable-next-line:arrow-return-shorthand
    const newTodos = this.todos.filter(item => { return !item.done; });
    this.dataSvc.saveTodos(newTodos).subscribe(data => {
      this.todos = data;
    });
  }
  filterTypeChanged(filterType: string) {
     this.filterType = filterType;
  }

  toggleAllChange (value: boolean)  {
    const newTodos = [...this.todos];
    newTodos.forEach(item => {
    item.done = value;
  });
  this.dataSvc.saveTodos(newTodos).subscribe(data => {
    this.todos = data;
  });
}
  updateToggleAllStage () {
    this.toggleAll = this.todos.filter(i => {
      return !i.done;
    }).length === 0;
    this.dataSvc.saveTodos(this.todos).subscribe(data => {
      this.todos = data;
    });
  }

  removeTodo (todo) {
    const newTodos = [...this.todos];
    this.todos.splice (this.todos.indexOf (todo), 1);
    this.dataSvc.saveTodos(newTodos).subscribe(data => {
      this.todos = data;
    });
  }
}

