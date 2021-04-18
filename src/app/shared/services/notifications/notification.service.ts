import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}

  successNotification(message): void {
    this.toastr.success(
      `<span class="now-ui-icons ui-1_bell-53"></span><b>${message}</b> - Successfully.`,
      '',
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-success alert-with-icon',
        positionClass: 'toast-' + 'top' + '-' + 'right',
      }
    );
  }

  UploadNotification(message): void {
    this.toastr.success(
      `<span class="now-ui-icons ui-1_bell-53"></span><b>${message}</b>`,
      '',
      {
        timeOut: 10000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-info alert-with-icon',
        positionClass: 'toast-' + 'top' + '-' + 'right',
      }
    );
  }
  warningNotification(message): void {
    this.toastr.warning(
      `<span class="now-ui-icons ui-1_bell-53"></span><b>${message}</b> - Successfully.`,
      '',
      {
        timeOut: 3000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-warning alert-with-icon',
        positionClass: 'toast-' + 'top' + '-' + 'right',
      }
    );
  }

  errorNotification(message): void {
    this.toastr.error(
      `<span class="now-ui-icons ui-1_bell-53"></span><b>${message}</b>`,
      '',
      {
        timeOut: 8000,
        closeButton: true,
        enableHtml: true,
        toastClass: 'alert alert-danger alert-with-icon',
        positionClass: 'toast-' + 'top' + '-' + `right`,
      }
    );
  }
}
