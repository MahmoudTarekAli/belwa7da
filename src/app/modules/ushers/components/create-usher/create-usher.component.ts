import {
  Component,
  OnInit,
  Optional,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormArray} from '@angular/forms';
import {BoxAnimation} from '../../../../shared/animations/box-animation';
import {CategoriesService} from '../../../categories/service/categories.service';
import {NotificationService} from '../../../../shared/services/notifications/notification.service';
import {MatDialogRef} from '@angular/material';
import {HttpUshersService} from '../../service/usher.service';

@Component({
  selector: 'app-create-usher',
  templateUrl: './create-usher.component.html',
  styleUrls: ['./create-usher.component.scss'],
  animations: [BoxAnimation],
})
export class CreateUsherComponent implements OnInit, OnDestroy {
  usherForm: FormGroup;
  OptionsForm: FormGroup;
  loading = false;
  categories: any;
  selectedCategory: any;
  Images = [];
  PreviewImages = [];
  imagePreview: any;
  items = [];
  image: any;
  hideAddAnotherOptions = false;

  constructor(
    private fg: FormBuilder,
    private httpProductService: HttpUshersService,
    private notifcationService: NotificationService,
    private categoryService: CategoriesService,
    public dialogRef: MatDialogRef<CreateUsherComponent>
  ) {
  }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((data) => {
      if (data.status === 200) {
        this.categories = data.body;
      }
    });
    this.usherForm = this.fg.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      mobile: ['', Validators.required]
    });
  }

  ngOnDestroy() {
  }

  finalProductData() {
    const usherData = Object.assign({}, this.usherForm.value);
    return usherData;
  }

  submit() {
    console.log(this.usherForm.valid);
    this.loading = true;
    const usherData = this.finalProductData();
    this.httpProductService.sendUsherData(usherData).subscribe(
      (data) => {
        if (data.status === 200) {
          this.dialogRef.close();
          this.notifcationService.successNotification('The product created');
          this.loading = false;
        }
      },
      (err) => {
        this.loading = false;
        this.notifcationService.errorNotification(err.message);
      }
    );
  }
}
