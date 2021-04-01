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

export interface Course {
  title: string;
  semester: string;
  lectures: Lecture[];
}

export interface Lecture {
  title: string;
  video: string;
}

// See https://www.youtube.com/user/MIT
export const courseware: Course[] = [
  {
    title: 'MIT 14.01 Principles of Microeconomics',
    semester: 'Fall 2018',
    lectures: [
      {
        title: 'Introduction and Supply & Demand',
        video: '_OkTw766oCs',
      },
      {
        title: 'Preferences and Utility Functions',
        video: 'tCKk22kaZi4',
      },
      {
        title: 'Budget Constraints and Constrained Choice',
        video: 'jHEPQpSKdbg',
      },
    ],
  },
  {
    title: 'MIT 7.016 Introductory Biology',
    semester: 'Fall 2018',
    lectures: [
      {
        title: 'Introduction, Course Organization',
        video: 'KlVHqq38KJU',
      },
      {
        title:
          'Chemical Bombing and Molecular Interactions; Lipids and Membranes',
        video: 'aKTOS0Nrlug',
      },
    ],
  },
];
