/**
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {YouTubePlayerModule} from '@angular/youtube-player';

import {AppComponent} from './app.component';
import {TopBarComponent} from './top-bar/top-bar.component';
import {CourseListComponent} from './course-list/course-list.component';
import {CourseDetailsComponent} from './course-details/course-details.component';
import {LectureComponent} from './lecture/lecture.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    RouterModule.forRoot([
      {path: '', component: CourseListComponent},
      {path: 'course/:courseId', component: CourseDetailsComponent},
      {path: 'course/:courseId/:lectureId', component: LectureComponent},
    ]),
  ],
  declarations: [
    AppComponent,
    TopBarComponent,
    CourseListComponent,
    CourseDetailsComponent,
    LectureComponent,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
