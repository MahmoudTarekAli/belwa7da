import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CategoriesService} from '../../service/categories.service';
import {MatDialogRef} from '@angular/material';
import {NotificationService} from '../../../../shared/services/notifications/notification.service';
import {startWith} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public NewCategory: FormGroup;
  image: any;
  imagePreview: any;
  loading = false;
  categories: any;
  selectedCategory: string;

  constructor(private fg: FormBuilder,
              private categoryService: CategoriesService,
              public dialogRef: MatDialogRef<AddCategoryComponent>,
              private notification: NotificationService) {
  }

  ngOnInit() {
    this.NewCategory = this.fg.group({
      enName: [''],
      arName: ['']
    });
    this.categoryService.getAllCategory().subscribe(resp => {
      this.categories = resp.body;
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
    this.categoryService.AddNewCategory(data).subscribe(Data => {
      this.dialogRef.close();
      this.notification.successNotification('Category Added');
      this.loading = false;
    }, error => {
      this.loading = false;
      this.notification.errorNotification('please upload photo');
    });
  }

  close() {
    this.dialogRef.close();
  }
}
