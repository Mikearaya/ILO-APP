import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SchoolApiService } from '../school-api.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
  FormArray
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SystemApiService } from '../../../system-api.service';
import {
  SchoolViewModel,
  SchoolModel,
  School,
  SchoolLocaleModel
} from '../school-type.model';
import { HttpErrorResponse } from '@angular/common/http';
import { LessonTypeService } from '../lesson-type.service';
import { LessonTypeViewModel } from '../lesson-type.model';

@Component({
  selector: 'bionic-school-form',
  templateUrl: './school-form.component.html',
  styleUrls: ['./school-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SchoolFormComponent implements OnInit {
  public headerText: Object = [
    { text: 'Enlish Language (default)' },
    { text: 'Other Languages' }
  ];

  public fields: Object = { text: 'type', value: 'ID' };
  public data: LessonTypeViewModel[] = [];
  public schoolForm: FormGroup;
  public schoolLocaleForm: FormGroup;
  private schoolId: number;
  public languages: any[];
  public isUpdate: Boolean;

  constructor(
    private schoolApi: SchoolApiService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private systemConf: SystemApiService,
    private lessonTypeApi: LessonTypeService
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.schoolId = +this.activatedRoute.snapshot.paramMap.get('schoolId');
    this.lessonTypeApi
      .getLessonTypeList()
      .subscribe((data: LessonTypeViewModel[]) => (this.data = data));

    if (this.schoolId) {
      this.isUpdate = true;
      this.schoolApi
        .getSchoolById(this.schoolId)
        .subscribe((data: School) => this.initializeForm(data));
    }

    this.systemConf
      .getLanguagesList()
      .subscribe((data: any) => (this.languages = data));
  }

  private createForm(): void {
    this.schoolForm = this.formBuilder.group({
      name: ['', Validators.required],
      lessons: ['', Validators.required],
      region: ['', Validators.required],
      address: [''],
      fax: [''],
      email: [''],
      phoneNumber: ['', Validators.required],
      schoolLocales: this.formBuilder.array([])
    });
  }

  private initializeForm(data: School): void {
    this.schoolForm = this.formBuilder.group({
      name: [data.school.name, Validators.required],
      lessons: [data.school_lessons.map(l => l.LESSON_ID), Validators.required],
      region: [data.school.region, Validators.required],
      address: [data.school.address],
      fax: [data.school.fax],
      email: [data.school.email],
      phoneNumber: [data.school.phone_number, Validators.required],
      schoolLocales: this.formBuilder.array([])
    });

    data.school_locale.map(l =>
      this.schoolLocales.controls.push(this.initializeLocalesForm(l))
    );
  }

  get name(): FormControl {
    return this.schoolForm.get('name') as FormControl;
  }

  get region(): FormControl {
    return this.schoolForm.get('region') as FormControl;
  }

  get lessons(): FormControl {
    return this.schoolForm.get('lessons') as FormControl;
  }

  get phoneNumber(): FormControl {
    return this.schoolForm.get('phoneNumber') as FormControl;
  }

  get fax(): FormControl {
    return this.schoolForm.get('fax') as FormControl;
  }

  get email(): FormControl {
    return this.schoolForm.get('email') as FormControl;
  }

  get address(): FormControl {
    return this.schoolForm.get('address') as FormControl;
  }

  get schoolLocales(): FormArray {
    return this.schoolForm.get('schoolLocales') as FormArray;
  }

  addLocale(): void {
    this.schoolLocales.controls.push(this.generateLocalesForm());
  }

  deleteLocale(index: number): void {
    this.schoolLocales.removeAt(index);
  }

  private generateLocalesForm(): FormGroup {
    return this.formBuilder.group({
      locale: ['', Validators.required],
      name: ['', Validators.required],
      address: ['']
    });
  }

  private initializeLocalesForm(locale: SchoolLocaleModel): FormGroup {
    return this.formBuilder.group({
      locale: [locale.locale, Validators.required],
      name: [locale.name, Validators.required],
      address: [locale.address]
    });
  }

  onSubmit(): void {
    const formData = this.prepareFormData();
    if (formData) {
      if (this.isUpdate) {
        this.schoolApi
          .updateSchool(formData)
          .subscribe(
            () => alert('School updated successfuly'),
            (error: HttpErrorResponse) => alert(error.message)
          );
      } else {
        this.schoolApi.createSchool(formData).subscribe(
          (data: any) => {
            this.isUpdate = true;
            this.schoolId = data;
            alert('School created successfuly');
          },
          (error: HttpErrorResponse) => alert(error.message)
        );
      }
    } else {
      return null;
    }
  }

  private prepareFormData(): School | null {
    const schoolData = new School();
    if (this.schoolForm.valid) {
      if (this.isUpdate && this.schoolId) {
        schoolData.school = {
          ID: this.schoolId,
          address: this.address.value,
          name: this.name.value,
          phone_number: this.phoneNumber.value,
          region: this.region.value,
          fax: this.fax.value,
          email: this.email.value
        };
      } else {
        schoolData.school = {
          address: this.address.value,
          name: this.name.value,
          phone_number: this.phoneNumber.value,
          region: this.region.value,
          fax: this.fax.value,
          email: this.email.value
        };
      }

      this.lessons.value.forEach(element => {
        schoolData.school_lessons.push({
          LESSON_ID: element
        });
      });

      this.schoolLocales.controls.forEach(element => {
        schoolData.school_locale.push({
          address: element.value.address,
          name: element.value.name,
          locale: element.value.locale
        });
      });
      return schoolData;
    } else {
      return null;
    }
  }
}
