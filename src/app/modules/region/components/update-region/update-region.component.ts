import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RegionService} from '../../service/region.service';
import {NotificationService} from '../../../../shared/services/notifications/notification.service';

@Component({
  selector: 'app-update-area',
  templateUrl: './update-region.component.html',
  styleUrls: ['./update-region.component.scss']
})
export class UpdateRegionComponent implements OnInit {
  public updateCategory: FormGroup;
  image: any;
  imagePreview: any;
  loading = false;
  categories: any;
  selectedCategory: [];

  constructor(private fg: FormBuilder,
              private dialogRef: MatDialog,
              @Inject(MAT_DIALOG_DATA) public category: any,
              private notificationService: NotificationService,
              private regionService: RegionService
  ) {
  }

  ngOnInit() {
    this.updateCategory = this.fg.group({
      enName: [''],
      arName: [''],
      deliveryFees: [''],
    });
    this.setCategoryValues();
    console.log(this.category);
  }

  setCategoryValues() {
    this.updateCategory.controls.enName.setValue(this.category.name);
    this.updateCategory.controls.arName.setValue(this.category.translation.ar.name);
    this.updateCategory.controls.deliveryFees.setValue(this.category.deliveryFees);
  }

  UpdatedCategory() {
    this.loading = true;
    const data = {
      name: this.updateCategory.controls.enName.value,
      deliveryFees: this.updateCategory.controls.deliveryFees.value,
      translation: {
        ar: {
          name: this.updateCategory.controls.arName.value
        }
      }
    };
    if (this.updateCategory.invalid) {
      this.notificationService.errorNotification('please enter correct data');
      this.loading = false;
      return;
    }
    this.regionService.updateRegion(data, this.category.area, this.category._id).subscribe(Data => {
      if (Data.status === 200) {
        this.notificationService.successNotification(`Region ${Data.body['name']} Updated`);
        this.loading = false;
        this.dialogRef.closeAll();
      }
    }, err => {
      this.loading = false;
      this.notificationService.errorNotification(err.error.message);
    });

  }

  close() {
    this.dialogRef.closeAll();
  }
}
