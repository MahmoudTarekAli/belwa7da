import {AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatTableDataSource} from '@angular/material';
import {NotificationService} from '../../../../shared/services/notifications/notification.service';
import {CategoriesService} from '../../../categories/service/categories.service';
import {BoxAnimation} from '../../../../shared/animations/box-animation';
import {HttpProductsService} from '../../service/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  animations: [BoxAnimation],
})
export class UpdateProductComponent implements OnInit, AfterViewInit {
  public updateProduct: FormGroup;
  displayedColumns = ['name', 'unit', 'pricePerUnit', 'increasingAmount', 'Actions'];
  image: any;
  loading = false;
  Images = [];
  imagePreview: any;
  items = [];
  categoriesArr: any;
  OptionsForm: FormGroup;
  hideAddAnotherOptions = false;
  options: [];
  dataSource: MatTableDataSource<any>;

  constructor(
    private fg: FormBuilder,
    private dialogRef: MatDialog,
    @Inject(MAT_DIALOG_DATA) public product: any,
    private notificationService: NotificationService,
    private httpProductService: HttpProductsService,
    private changeDetectorRefs: ChangeDetectorRef,
    private categoryService: CategoriesService
  ) {
  }

  ngAfterViewInit() {
    this.changeDetectorRefs.detectChanges();
  }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((data) => {
      if (data.status === 200) {
        this.categoriesArr = data.body;
      }
    });
    this.updateProduct = this.fg.group({
      category: ['', Validators.required],
      active: [true],
      options: this.fg.array([]),
    });
    this.OptionsForm = this.fg.group({
      Options: this.fg.array([]),
    });
    this.updateProduct.controls.category.setValue(this.product.category._id);
    this.updateProduct.controls.active.setValue(this.product.active);
    this.imagePreview = this.product.image;

    this.dataSource = new MatTableDataSource<any>(this.product.options);
  }

  isActive(isChecked, option, index) {
    option.controls.active.setValue(isChecked);
  }

  getOptions() {
    return (<FormArray>this.OptionsForm.get('Options')).controls;
  }

  addAnotherOption() {
    const control = <FormArray>this.OptionsForm.controls['Options'];
    control.push(
      this.fg.group({
        name: ['', Validators.required],
        unit: ['', Validators.required],
        translation: this.fg.group({
          ar: this.fg.group({
            name: ['', Validators.required],
            unit: ['', Validators.required],
          }),
        }),
        pricePerUnit: ['', Validators.required],
        increasingAmount: ['', Validators.required],
        active: [true],
      })
    );
  }

  deleteOption(i) {
    this.dataSource.data.splice(i, 1);
    this.dataSource._updateChangeSubscription();
  }

  close() {
    this.dialogRef.closeAll();
  }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    if (!file) {
      return;
    }
    const mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
    }
    this.image = file;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    this.loading = true;
    const data = {
      category: this.updateProduct.controls.category.value,
      active: this.updateProduct.controls.active.value,
      options: this.product.options,
    };
    for (let i = 0; i < data.options.length; i++) {
      delete data.options[i]._id;
      delete data.options[i].updated_at;
      delete data.options[i].created_at;
    }
    const formTwo = Object.assign({}, this.OptionsForm.value);
    data.options = data.options.concat(formTwo.Options);
    const formData = new FormData();
    formData.append('image', this.image);
    formData.append('data', JSON.stringify(data));
    this.httpProductService
      .UpdateProductData(formData, this.product._id)
      .subscribe(
        (res) => {
          if (res.status === 200) {
            this.dialogRef.closeAll();
            this.notificationService.successNotification('The product updated');
            this.loading = false;
          }
        },
        (err) => {
          console.log(err);
          this.loading = false;
          this.notificationService.errorNotification(err.message);
        }
      );
  }
}
