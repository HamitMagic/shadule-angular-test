import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatIconModule,
    CommonModule,
    MatMenuModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
})
export class AddTaskComponent {
  @ViewChild('sideItem') sideItem!: MatSidenav;
  public newTask: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.newTask = this.formBuilder.group({
      name: [''],
      deadline: [''],
      created: [''],
      description: [''],
      tags: [''],
      status: [''],
    });
  }

  onClose() {
    this.sideItem.close();
  }
  onOpen() {
    this.sideItem.open();
  }
  send() {
    console.log(this.newTask);
  }
}
