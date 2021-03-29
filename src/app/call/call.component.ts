import { Component, OnInit } from '@angular/core';
import {
  Medias,
  PermissionService,
} from '../store/permission/permission.service';

@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.css'],
})
export class CallComponent implements OnInit {
  devices!: Medias;
  hasInfo = false;

  deviceIds = {
    audioId: '',
    videoId: ''
  }

  constructor(private permissionService: PermissionService) {
    this.permissionService.getDevices().subscribe((devices) => {
      if (this.hasVideoAndAudio(devices) === 'videoaudio') {
        this.hasInfo = true;
        this.deviceIds = {
          audioId: devices.audio?.device?.id || '',
          videoId: devices.video?.device?.id || ''
        }
      }
      
      this.devices = devices;
    });
  }

  hasVideoAndAudio(medias: Medias) {
    let permission = '';

    if (medias.video?.device?.active && medias.video?.device?.id) {
      permission += 'video'
    }

    if (medias.audio?.device?.active && medias.audio?.device?.id) {
      permission += 'audio'
    }
    
    return permission;
  }

  returnGrantedPermissions(permission: string) {
    const Permissions = {
      video: 'video',
      audio: 'audio',
      videoaudio: 'videoaudio',
      default: ''
    }
    return Permissions[permission] || Permissions.default
  }
  
  
  ngOnInit(): void {}
}
