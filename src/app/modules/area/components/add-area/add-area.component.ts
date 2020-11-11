import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AreaService} from '../../service/area.service';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../../shared/services/notifications/notification.service';
import {startWith} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.scss']
})
export class AddAreaComponent implements OnInit {
  public NewCategory: FormGroup;
  image: any;
  imagePreview: any;
  loading = false;
  categories: any;
  selectedCategory: string;

  constructor(private fg: FormBuilder,
              private areaService: AreaService,
              public dialogRef: MatDialogRef<AddAreaComponent>,
              private notification: NotificationService) {
  }

  ngOnInit() {
    this.NewCategory = this.fg.group({
      enName: [''],
      arName: [''],
    });
  }


  SaveCategory() {
    this.loading = true;

    const data = {
      name: this.NewCategory.controls.enName.value,
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
    this.areaService.AddNewArea(data).subscribe(Data => {
      this.dialogRef.close();
      this.notification.successNotification('Area Added');
      this.loading = false;
    }, error => {
      this.loading = false;
    });
  }

  close() {
    this.dialogRef.close();
  }
}
