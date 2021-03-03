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
import { Component, NgZone, OnInit } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser'
import { ActivatedRoute, Router } from '@angular/router'
import { CanvasService } from '../canvas.service'
import { courseware } from '../courseware'

@Component({
  selector: 'app-lecture',
  templateUrl: './lecture.component.html',
  styleUrls: []
})
export class LectureComponent implements OnInit {
  courses = courseware
  course
  courseId
  lecture
  videoUrl
  constructor(
    private route: ActivatedRoute,
    private canvasService: CanvasService,
    private sanitizer: DomSanitizer,
    private ngZone: NgZone,
    private router: Router,
  ) {
    this.canvasService.getUpdateDataSubject()
    .subscribe((data: any[]) => {
      const id = Number(data[0]?.id)
      if (id === -1) {
        this.ngZone.run(() => {
          this.router.navigate(['/course', this.courseId])
        })
      }
    })
  }

  ngOnInit() {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap
    this.courseId = Number(routeParams.get('courseId'))
    const lectureId = Number(routeParams.get('lectureId'))

    // Find the product that correspond with the id provided in route.
    this.course = courseware[this.courseId]
    this.lecture = this.course.lectures[lectureId]
    const dangerous = `https://youtube.com/embed/${this.lecture.video}?autoplay=1&mute=1`
    this.videoUrl  = this.sanitizer.bypassSecurityTrustResourceUrl(dangerous)
  }
}
