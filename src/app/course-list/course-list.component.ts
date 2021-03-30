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
import { Component, NgZone } from '@angular/core';
import { courseware } from '../courseware'
import { CanvasService } from '../canvas.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: []
})
export class CourseListComponent {
  courses = courseware
  constructor(
    private canvasService: CanvasService,
    private router: Router,
    private ngZone: NgZone,
  ) {
    this.canvasService.getUpdateDataSubject()
      .subscribe((data: any[]) => {
        const id = Number(data[0]?.id)
        if (id > -1) {
          // https://stackoverflow.com/questions/53645534/navigation-triggered-outside-angular-zone-did-you-forget-to-call-ngzone-run
          this.ngZone.run(() => {
            this.router.navigate(['/course', id])
          })
        }
      })
  }
}
