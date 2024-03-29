import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService } from '../../service/categories.service';
import { NotificationService } from '../../../../shared/services/notifications/notification.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent implements OnInit {
  public updateCategory: FormGroup;
  image: any;
  imagePreview: any;
  loading = false;
  categories: any;
  selectedCategory: [];

  constructor(
    private fg: FormBuilder,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public category: any,
    private notificationService: NotificationService,
    private httpCategoryService: CategoriesService
  ) {}

  ngOnInit() {
    this.updateCategory = this.fg.group({
      enName: ['', Validators.required],
      arName: ['', Validators.required],
    });
    this.setCategoryValues();
  }

  setCategoryValues() {
    this.updateCategory.controls.enName.setValue(this.category.name);
    this.updateCategory.controls.arName.setValue(
      this.category.translation.ar.name
    );
  }

  UpdatedCategory() {
    this.loading = true;
    const data = {
      name: this.updateCategory.controls.enName.value,
      translation: {
        ar: {
          name: this.updateCategory.controls.arName.value,
        },
      },
    };
    if (this.updateCategory.invalid) {
      this.notificationService.errorNotification('please enter correct data');
      this.loading = false;
      return;
    }
    this.httpCategoryService.updateCategory(data, this.category._id).subscribe(
      (Data) => {
        if (Data.status === 200) {
          this.notificationService.successNotification(
            `Category ${Data.body['name']} Updated`
          );
          this.loading = false;
          this.dialogRef.closeAll();
        }
      },
      (err) => {
        this.loading = false;
        this.notificationService.errorNotification(err.error.message);
      }
    );
  }

  close() {
    this.dialogRef.closeAll();
  }
}
