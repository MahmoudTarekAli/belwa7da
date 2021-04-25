import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegionService } from '../../service/region.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { NotificationService } from '../../../../shared/services/notifications/notification.service';
import { startWith } from 'rxjs/operators';
import { of } from 'rxjs';
import { AddRegionComponent } from '../add-region/add-region.component';
import { UpdateRegionComponent } from '../update-region/update-region.component';

@Component({
  selector: 'app-add-area',
  templateUrl: './all-region.component.html',
  styleUrls: ['./all-region.component.scss'],
})
export class AllRegionComponent implements OnInit {
  public NewCategory: FormGroup;
  image: any;
  loading = false;
  categories: any;
  regions: any;

  constructor(
    private fg: FormBuilder,
    private areaService: RegionService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AllRegionComponent>,
    @Inject(MAT_DIALOG_DATA) public area: any,
    private notification: NotificationService
  ) {}

  ngOnInit() {
    this.NewCategory = this.fg.group({
      enName: [''],
      arName: [''],
      deliveryFees: [''],
    });
    this.areaService.getAllRegions(this.area._id).subscribe((data) => {
      this.regions = data.body;
      console.log(this.regions);
    });
  }

  SaveCategory() {
    this.loading = true;
    const data = {
      name: this.NewCategory.controls.enName.value,
      deliveryFees: this.NewCategory.controls.deliveryFees.value,
      translation: {
        ar: {
          name: this.NewCategory.controls.arName.value,
        },
      },
    };
    if (this.NewCategory.invalid) {
      this.notification.errorNotification('please enter correct data');
      this.loading = false;
      return;
    }
    this.areaService.AddNewArea(data, this.area._id).subscribe(
      (Data) => {
        this.dialogRef.close();
        this.notification.successNotification('Region Added');
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  editRegion(element) {
    const dialogRef = this.dialog.open(UpdateRegionComponent, {
      width: '60%',
      data: element,
      disableClose: true,
      autoFocus: true,
      position: {
        left: '30%',
      },
    });
    dialogRef.afterClosed().subscribe((next) => {});
  }

  close() {
    this.dialogRef.close();
  }
}
