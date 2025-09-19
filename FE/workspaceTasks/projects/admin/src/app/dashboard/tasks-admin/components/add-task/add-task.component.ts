import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { TasksService } from '../../services/tasks.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
// import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,

    private fb: FormBuilder,
    public dialog: MatDialogRef<AddTaskComponent>,
    public matDialog: MatDialog,
    private tasksService: TasksService,
    private toaster: ToastrService,
    // private spinner: NgxSpinnerService
  ) {}

  users: any = [
    { name: 'Moahmed', id: '68c83d679065078cfee51192' },
    { name: 'Ali', id: '68c8407d9065078cfee51195' },
        { name: 'Test', id: '68cd7c15bbb934061fbe43ba' },

  ];

  newTaskForm!: FormGroup;
  fileName = '';

  formValues: any;

  ngOnInit(): void {
    this.createForm();
    console.log(this.data);
  }
  // ==================================
  // createForm() {
  //   this.newTaskForm = this.fb.group({
  //     title: [this.data?.title || '', [Validators.required, Validators.minLength(5)]],
  //     userId: [this.data.userId?._id ||'', Validators.required],
  //     image: [ this.data?.image ||'', Validators.required],
  //     description: [this.data?.description ||'', Validators.required],
  //     // deadline: [moment(this.data?.deadline.split('-').reverse().join('-')).format(`DD/MM/YYYY`) ||'', Validators.required],
  //     deadline: [this.data ?  new Date(this.data?.deadline.split('-').reverse().join('-')).toISOString() : '', Validators.required],
  //   });

  // }
  // END createForm

  createForm() {
    this.newTaskForm = this.fb.group({
      title: [
        this.data?.title || '',
        [Validators.required, Validators.minLength(5)],
      ],
      userId: [
        this.data?.userId?._id || '', // لو جاية من التعديل
        Validators.required,
      ],
      image: ['', this.data ? [] : [Validators.required]],
      description: [this.data?.description || '', Validators.required],
      deadline: [
        this.data?.deadline
          ? new Date(this.data.deadline.split('-').reverse().join('-'))
          : '',
        Validators.required,
      ],
    });

    this.formValues = this.newTaskForm.value;
  }

  // ==================================
  createTask() {
    // this.spinner.show();
    let model = this.prepareFormData();

    // صار بدالها فنكشن ال prepareFormData()

    // console.log(this.newTaskForm.value);
    // let formData = new FormData();
    // formData.append('title', this.newTaskForm.value['title']);
    // formData.append('userId', this.newTaskForm.value['userId']);
    // formData.append('image', this.newTaskForm.value['image']);
    // formData.append('description', this.newTaskForm.value['description']);
    // formData.append('deadline', this.newTaskForm.value['deadline']);

    this.tasksService.createTask(model).subscribe(
      (res) => {
        this.toaster.success('Success', 'Task Created Successfully!');
        // this.spinner.hide();
        this.dialog.close(true);
      },
      (error) => {
        // this.spinner.hide();
        this.toaster.error(error.error.message);
      }
    );
  }
  // ==================================

  updateTask() {
    // this.spinner.show();
    let model = this.prepareFormData();
    this.tasksService.updateTask(model, this.data._id).subscribe(
      (res) => {
        this.toaster.success('Success', 'Task Updated Successfully!');
        // this.spinner.hide();
        this.dialog.close(true);
      },
      (error) => {
        // this.spinner.hide();
        this.toaster.error(error.error.message);
      }
    );
  }
  // ==================================

  selectImage(event: any) {
    // console.log(event);
    this.fileName = event.target.value;
    this.newTaskForm.get('image')?.setValue(event.target.files[0]);
  }

  // ==================================
  prepareFormData() {
    let newData = moment(this.newTaskForm.value['deadline']).format(
      'DD-MM-YYYY'
    );
    // this.newTaskForm.get('deadline')?.setValue(newData);

    let formData = new FormData();
    Object.entries(this.newTaskForm.value).forEach(([key, value]: any) => {
      if (key == 'deadline') {
        formData.append(key, newData);
      } else if (key === 'image') {
        if (value) {
          formData.append(key, value);
        } else if (this.data?.image) {
          formData.append(key, this.data.image); // لو المستخدم ما غير الصورة
        }
      } else {
        formData.append(key, value);
      }
    });

    return formData;
  } //END prepareFormData
  // ==================================

  close() {
    let hasChanges = false;
    Object.keys(this.formValues).forEach((item) => {
      if (this.formValues[item] !== this.newTaskForm.value[item]) {
        console.log(item, true);
        hasChanges = true;
      }
      //  else {
      //   console.log(item, false);
      // }
    });


    if(hasChanges){

        const dialogRef = this.matDialog.open(ConfirmationComponent, {
      width: '750px',

    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {

      }
    });
    }else{
      this.dialog.close()
    }

  }
}
