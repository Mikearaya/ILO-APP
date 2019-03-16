import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LessonTypeModel, LessonTypeViewModel } from './lesson-type.model';

@Injectable()
export class LessonTypeService {
  private httpBody: URLSearchParams;
  private controller = 'lesson_types';
  constructor(private httpClient: HttpClient) {
    this.httpBody = new URLSearchParams();
  }

  getLessonTypeById(id: number): Observable<LessonTypeViewModel> {
    return this.httpClient.get<LessonTypeViewModel>(`${this.controller}/${id}`);
  }

  getLessonTypeList(): Observable<LessonTypeViewModel[]> {
    return this.httpClient.get<LessonTypeViewModel[]>(`${this.controller}`);
  }

  createLessonType(lesson: LessonTypeModel): Observable<LessonTypeViewModel> {
    const lessonType = this.prepareRequestBody(lesson);
    return this.httpClient.post<LessonTypeViewModel>(
      `${this.controller}`,
      lessonType.toString()
    );
  }

  updateLessonType(lesson: LessonTypeModel): Observable<void> {
    const lessonType = this.prepareRequestBody(lesson);
    return this.httpClient.post<void>(
      `${this.controller}/update/${lesson.ID}`,
      lessonType.toString()
    );
  }

  deletelessonType(typeId: number[]): Observable<void> {
    typeId.forEach(id => this.httpBody.append('id[]', `${id}`));
    return this.httpClient.post<void>(
      `${this.controller}/delete/`,
      this.httpBody.toString()
    );
  }

  private prepareRequestBody(lesson: any): URLSearchParams {
    const dataModel = new URLSearchParams();
    for (const key in lesson) {
      if (lesson.hasOwnProperty(key)) {
        const value = lesson[key];
        dataModel.set(key, value);
      }
    }
    return dataModel;
  }
}
