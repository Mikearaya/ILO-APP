import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  ArticleCatagoryViewModel,
  ArticleCatagoryModel
} from './articles-data.model';
import { Observable } from 'rxjs';

@Injectable()
export class ArticlesApiService {
  private httpBody: URLSearchParams;
  constructor(private httpClient: HttpClient) {
    this.httpBody = new URLSearchParams();
  }

  getArticleCatagories(): Observable<ArticleCatagoryViewModel[]> {
    return this.httpClient.get<ArticleCatagoryViewModel[]>(`article_catagory`);
  }

  getArticleCatagoryById(id: number): Observable<ArticleCatagoryViewModel> {
    return this.httpClient.get<ArticleCatagoryViewModel>(
      `article_catagory/${id}`
    );
  }

  createArticleCatagory(
    articleCatagory: ArticleCatagoryModel
  ): Observable<ArticleCatagoryViewModel> {
    const catagory = this.prepareRequestBody(articleCatagory);
    return this.httpClient.post<ArticleCatagoryViewModel>(
      `article_catagory`,
      catagory.toString()
    );
  }

  updateArticleCatagory(
    articleCatagory: ArticleCatagoryModel
  ): Observable<ArticleCatagoryViewModel> {
    const catagory = this.prepareRequestBody(articleCatagory);
    return this.httpClient.post<ArticleCatagoryViewModel>(
      `article_catagory/update/${articleCatagory.id}`,
      catagory.toString()
    );
  }

  deleteArticleCatagory(
    catagoryId: number[]
  ): Observable<ArticleCatagoryViewModel> {
    catagoryId.forEach(id => this.httpBody.append('id[]', `${id}`));
    return this.httpClient.post<ArticleCatagoryViewModel>(
      `article_catagory/delete`,
      this.httpBody.toString()
    );
  }

  private prepareRequestBody(customer: any): URLSearchParams {
    const dataModel = new URLSearchParams();
    for (const key in customer) {
      if (customer.hasOwnProperty(key)) {
        const value = customer[key];
        dataModel.set(key, value);
      }
    }
    return dataModel;
  }
}