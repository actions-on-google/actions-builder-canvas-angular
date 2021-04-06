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

import {Course, courseware} from '../courseware';
import {CanvasData, parseId} from '../myapp.utils';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: [],
})
export class CourseDetailsComponent implements OnInit {
  course!: Course;
  courseId!: number;
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
        if (id > -1) {
          // https://stackoverflow.com/questions/53645534/navigation-triggered-outside-angular-zone-did-you-forget-to-call-ngzone-run
          this.ngZone.run(() => {
            this.router.navigate(['/course', this.courseId, id]);
          });
        } else if (id === -1) {
          this.ngZone.run(() => {
            this.router.navigate(['/course']);
          });
        }
      });
  }

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    this.courseId = Number(routeParams.get('courseId'));

    // Find the product that correspond with the id provided in route.
    this.course = courseware[this.courseId];
  }
}
