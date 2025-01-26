import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Student } from '../../Models/student';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  studentForm: FormGroup;

  isInserting: boolean = false;
  isEditing: boolean = false;
  stdIdToEdit: number | undefined;
  filterText: string = 'All';
  allStudents: Student[] = [];

  // fb = inject(FormBuilder);

  students: Student[] = [
    new Student(1, 'John Smith', 'Male', new Date('11-12-1997'), 'MBA', 520, 1899),
    new Student(2, 'Ariprakash', 'Male', new Date('10-06-1998'), "MCA", 570, 2899),
    new Student(3, "Mythili", 'Female', new Date('10-12-1999'), "B.Tech", 590, 1899),
    new Student(4, "Pavithra", 'Female', new Date('11-11-2000'), "BCA", 450, 799),
    new Student(5, "Geetha", 'Female', new Date('7-08-1995'), "M.Sc", 490, 2899),
    new Student(6, "Grace", 'Female', new Date('06-12-1996'), "B.Tech", 320, 799),
  ];

  constructor(private fb: FormBuilder){
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      gender: ['', Validators.required],
      dob: ['', Validators.required],
      course: ['', Validators.required],
      marks: [0, [Validators.required, Validators.min(0), Validators.max(600)]],
      fee: [0, [Validators.required, Validators.min(0)]]
    })
  }
  ngOnInit(){
    this.allStudents = [...this.students];
  }

  filterStudentByGender(filterBy: string){
    if(filterBy.toLowerCase() === 'all' || filterBy === '' || this.allStudents.length === 0){
      console.log("caling if block");
      return this.allStudents;
    }else{
      return this.allStudents.filter(
        (std) => {
          console.log("cAlling else block");
          return std.gender.toLowerCase() === filterBy.toLowerCase();
        }
      )
    }
  }

  OnFilterValueChanged(event: any){
    console.log("event:", event);
    let selectedValue = event.target.value;
    console.log("selectedValue:", selectedValue);
    this.filterText = selectedValue;
    this.students = this.filterStudentByGender(selectedValue);
    console.log("this.students:", this.students);
  }

  OnInsertClicked(){
    this.isInserting = true;
    this.studentForm.reset();
  }

  OnInsertSaved(){
    const newStudent = {
      id: this.students.length + 1, 
      ...this.studentForm.value
    };
    console.log("newStudent:", newStudent);
    this.students.push(newStudent);
    this.isInserting = false;
    this.students = this.filterStudentByGender(this.filterText);
  }

  OnInsertCancelled(){
    this.isInserting = false;
  }

  OnEditClicked(stdId: any){
    console.log("stdId:", stdId);
    this.isEditing = true;
    this.stdIdToEdit = stdId.id;

    const formattedDob = new Date(stdId.dob).toISOString().split('T')[0];
    console.log("new Date(stdId.dob).toISOString():", new Date(stdId.dob).toISOString());
    console.log("new Date(stdId.dob).toISOString().split('T'):", new Date(stdId.dob).toISOString().split('T'));
    
    this.studentForm.setValue({
      name: stdId.name,
      gender: stdId.gender,
      dob: formattedDob,
      course: stdId.course,
      marks: stdId.marks,
      fee: stdId.fee
    });
  }

  OnEditSaved(){
    const updatedStudent = { id: this.stdIdToEdit, ...this.studentForm.value };
    console.log("updatedStudent:", updatedStudent);
    const index = this.students.findIndex(s => s.id === this.stdIdToEdit);
    console.log("s.id === this.stdIdToEdit:", this.students.findIndex(s =>s.id === this.stdIdToEdit));
    console.log("index:", index);
    if (index !== -1) {
      this.students[index] = updatedStudent;
    }
    this.isEditing = false;
    this.students = this.filterStudentByGender(this.filterText);
  }

  OnEditCancelled(){
    this.isEditing = false;
  }
  
  
}
