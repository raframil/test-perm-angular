import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface MediaData {
  device?: MediaStream;
}

export interface Medias {
  audio?: MediaData;
  video?: MediaData;
}

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private mediaDevicesSubject = new BehaviorSubject<Medias>({
    audio: { device: undefined },
    video: { device: undefined },
  });

  getDevices(): Observable<Medias> {
    return this.mediaDevicesSubject.asObservable();
  }

  private _setPermission(type: string, media: MediaStream): void {
    const currentMedia = this.mediaDevicesSubject.value;
    currentMedia[type].device = media;
    this.mediaDevicesSubject.next(currentMedia);
  }

  async getAudioPermission() {
    console.warn('SETTING AUDIO PERM');

    const audioMedia = await navigator.mediaDevices.getUserMedia({
      audio: true,
    });
    this._setPermission('audio', audioMedia);
  }

  async getVideoPermission() {
    console.warn('SETTING VIDEO PERM');

    const videoMedia = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    this._setPermission('video', videoMedia);
  }
}
