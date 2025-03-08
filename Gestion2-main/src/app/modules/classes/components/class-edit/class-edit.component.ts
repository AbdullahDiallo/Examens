import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ClassService } from '../../services/class.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-class-edit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './class-edit.component.html',
  styleUrls: ['./class-edit.component.css']
})
export class ClassEditComponent implements OnInit {
  classForm: FormGroup;
  classId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private classService: ClassService,
    private router: Router
  ) {
    this.classForm = this.fb.group({
      name: ['', Validators.required],
      capacity: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.classId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.classId) {
      this.classService.getClassById(this.classId).subscribe(data => {
        this.classForm.patchValue(data);
      });
    }
  }

  updateClass(): void {
    if (this.classId && this.classForm.valid) {
      this.classService.updateClass(this.classId, this.classForm.value).subscribe(() => {
        this.router.navigate(['/class-list']);
      });
    }
  }
}
