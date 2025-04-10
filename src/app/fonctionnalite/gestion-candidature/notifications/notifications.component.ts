import { Component, Input, OnInit } from '@angular/core';
import { NotificationsService } from '../../../services/notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  notifications: any[] = [];
  // @Input() message: string = "Default notification message.";

  constructor(private notificationsService : NotificationsService){}

  ngOnInit() {
    this.chargerNotifications();
  }

  chargerNotifications() {
    this.notificationsService.getNotifications().subscribe((data: any) => {
      this.notifications = data;
    });
  }

  marquerCommeLue(id: number) {
    this.notificationsService.marquerCommeLue(id).subscribe(() => {
      this.chargerNotifications();
    });
  }

}
