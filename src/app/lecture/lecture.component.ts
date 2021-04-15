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
import {Component, NgZone, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CanvasService} from '../canvas.service';
import {Course, courseware, Lecture} from '../courseware';
import {CanvasData, parseId} from '../myapp.utils';

let youtubeApiLoaded = false;

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: [],
})
export class LectureComponent implements OnInit {
  courses = courseware;
  course!: Course;
  courseId!: number;
  lecture!: Lecture;
  videoId!: string;
  constructor(
    private route: ActivatedRoute,
    private canvasService: CanvasService,
    private ngZone: NgZone,
    private router: Router
  ) {
    this.canvasService
      .getUpdateDataSubject()
      .subscribe((data: CanvasData[]) => {
        const id = parseId(data[0]);
        if (id === -1) {
          this.ngZone.run(() => {
            this.router.navigate(['/course', this.courseId]);
          });
        }
      });
  }

  ngOnInit() {
    // Load the YouTube IFrame Player API.
    // The player component does not take care of this.
    if (!youtubeApiLoaded) {
      // This code loads the IFrame Player API code asynchronously, according to the instructions at
      // https://developers.google.com/youtube/iframe_api_reference#Getting_Started
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      youtubeApiLoaded = true;
    }

    // Get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    this.courseId = Number(routeParams.get('courseId'));
    const lectureId = Number(routeParams.get('lectureId'));

    // Find the product that correspond with the id provided in route.
    this.course = courseware[this.courseId];
    this.lecture = this.course.lectures[lectureId];
    this.videoId = this.lecture.video;
  }
}
