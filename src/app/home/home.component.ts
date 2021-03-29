import { Component, OnInit } from '@angular/core';
import { PermissionService } from '../store/permission/permission.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private permissionService: PermissionService) { }

  ngOnInit(): void {
    this.permissionService.getAudioPermission();
    this.permissionService.getVideoPermission();
  }

}
