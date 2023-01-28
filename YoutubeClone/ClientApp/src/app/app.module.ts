import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { TestVideoStreamComponent } from './test-video-stream/test-video-stream.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { ApiAuthorizationModule } from 'src/api-authorization/api-authorization.module';
import { AuthorizeGuard } from 'src/api-authorization/authorize.guard';
import { AuthorizeInterceptor } from 'src/api-authorization/authorize.interceptor';
import { EditMovieComponent } from './edit-movie/edit-movie.component';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieAddComponent } from './movie-add/movie-add.component';
import { TagListComponent } from './tag-list/tag-list.component';
import { TagAddComponent } from './tag-add/tag-add.component';
import { TagEditComponent } from './tag-edit/tag-edit.component';
import { RatingListComponent } from './rating-list/rating-list.component';
import { RatingAddComponent } from './rating-add/rating-add.component';
import { RatingEditComponent } from './rating-edit/rating-edit.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    TestVideoStreamComponent,
    FetchDataComponent,
    EditMovieComponent,
    MovieListComponent,
    MovieAddComponent,
    TagListComponent,
    TagAddComponent,
    TagEditComponent,
    RatingAddComponent,
    RatingEditComponent,
    RatingListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    CommonModule,
    FormsModule,
    ApiAuthorizationModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'movie-list/movie-details/:id', component: TestVideoStreamComponent },
      { path: 'movie-list', component: MovieListComponent},
      { path: 'movie-add', component: MovieAddComponent},
      { path: 'movie-list/movie-details/:id', component: MovieDetailsComponent},
      { path: 'movie-list/movie-edit/:id', component: EditMovieComponent},
      { path: 'tag-list', component: TagListComponent},
      { path: 'tag-add', component: TagAddComponent},
      { path: 'tag-list/tag-edit/:id', component: TagEditComponent},
      { path: 'rating-list', component: RatingListComponent},
      { path: 'rating-add', component: RatingAddComponent},
      { path: 'rating-list/rating-edit/:id', component: RatingEditComponent}
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizeInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
