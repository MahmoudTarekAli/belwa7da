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
  PreviewImages = [];
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
    this.PreviewImages.push(this.product.image);

    this.dataSource = new MatTableDataSource<any>(this.product.options);
  }

  onSelectFile(event) {
    if (event.target.files.length > 0) {
      const filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        const Image = event.target.files[i];
        this.Images.push(Image);
      }
      const snapImages = [];
      for (const file of this.Images) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          snapImages.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      this.PreviewImages = snapImages;
    }
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
