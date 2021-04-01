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
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

interface CanvasWindow {
  interactiveCanvas: InteractiveCanvas;
}

interface InteractiveCanvas {
  ready: (callbacks: InteractiveCanvasCallbacks) => void;
  sendTextQuery: (textQuery: string) => Promise<State>;
  getHeaderHeightPx: () => Promise<number>;
  setCanvasState: (state: Object) => Promise<void>;
}

interface InteractiveCanvasCallbacks {
  onUpdate: (data: Object[]) => Promise<void> | undefined;
  onTtsMark: (markName: string) => void;
}

type State = 'READY' | 'BLOCKED' | 'UNKNOWN';

@Injectable({
  providedIn: 'root',
})
export class CanvasService implements InteractiveCanvasCallbacks {
  interactiveCanvas: InteractiveCanvas;
  private readonly data: Subject<Object[]>;
  private readonly markName: Subject<string>;
  constructor() {
    const appWindow = (window as unknown) as CanvasWindow;
    this.interactiveCanvas = appWindow.interactiveCanvas;
    this.data = new Subject<Object[]>();
    this.markName = new Subject<string>();
    this.interactiveCanvas.ready({
      onUpdate: this.onUpdate.bind(this),
      onTtsMark: this.onTtsMark.bind(this),
    });
  }

  getUpdateDataSubject(): Subject<Object[]> {
    return this.data;
  }

  onUpdate(data: Object[]) {
    this.data.next(data);
    return undefined;
  }

  getMarkNameSubject(): Subject<string> {
    return this.markName;
  }

  onTtsMark(markName: string) {
    this.markName.next(markName);
  }
}
