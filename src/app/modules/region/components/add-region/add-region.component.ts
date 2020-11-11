import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegionService} from '../../service/region.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../../shared/services/notifications/notification.service';
import {startWith} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-region.component.html',
  styleUrls: ['./add-region.component.scss']
})
export class AddRegionComponent implements OnInit {
  public NewCategory: FormGroup;
  image: any;
  loading = false;
  categories: any;

  constructor(private fg: FormBuilder,
              private areaService: RegionService,
              public dialogRef: MatDialogRef<AddRegionComponent>,
              @Inject(MAT_DIALOG_DATA) public area: any,
              private notification: NotificationService) {
  }

  ngOnInit() {
    this.NewCategory = this.fg.group({
      enName: [''],
      arName: [''],
      deliveryFees: [''],
    });
  }


  SaveCategory() {
    this.loading = true;
    const data = {
      name: this.NewCategory.controls.enName.value,
      deliveryFees: this.NewCategory.controls.deliveryFees.value,
      translation: {
        ar: {
          name: this.NewCategory.controls.arName.value
        }
      }
    };
    if (this.NewCategory.invalid) {
      this.notification.errorNotification('please enter correct data');
      this.loading = false;
      return;
    }
    this.areaService.AddNewArea(data, this.area._id).subscribe(Data => {
      this.dialogRef.close();
      this.notification.successNotification('Region Added');
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
