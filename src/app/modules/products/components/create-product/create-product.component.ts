import {
  Component,
  OnInit,
  Optional,
  OnDestroy,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BoxAnimation } from '../../../../shared/animations/box-animation';
import { CategoriesService } from '../../../categories/service/categories.service';
import { NotificationService } from '../../../../shared/services/notifications/notification.service';
import { MatDialogRef } from '@angular/material';
import { HttpProductsService } from '../../service/products.service';

@Component({
  selector: 'app-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  animations: [BoxAnimation],
})
export class CreateProductComponent implements OnInit, OnDestroy {
  productForm: FormGroup;
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
    private httpProductService: HttpProductsService,
    private notifcationService: NotificationService,
    private categoryService: CategoriesService,
    public dialogRef: MatDialogRef<CreateProductComponent>
  ) {}

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe((data) => {
      if (data.status === 200) {
        this.categories = data.body;
      }
    });
    this.productForm = this.fg.group({
      category: ['', Validators.required],
      active: [true],
      options: this.fg.array([]),
    });
    this.OptionsForm = this.fg.group({
      Options: this.fg.array([]),
    });
    this.addAnotherOption();
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

  getOptions() {
    return (<FormArray>this.OptionsForm.get('Options')).controls;
  }

  isActive(isChecked, option, index) {
    option.controls.active.setValue(isChecked);
  }

  isProductActive(isChecked) {
    this.productForm.controls.active.setValue(isChecked);
  }

  ngOnDestroy() {}

  // helper function that check if options does not exist
  isOptionsEmpty(options) {
    for (let i = 0; i < options.length; i++) {
      if (options[i] === null) {
        return true;
      }
    }

    return false;
  }

  finalProductData() {
    const productData = Object.assign({}, this.productForm.value);
    console.log(productData);
    return productData;
  }

  onSelectedCategory() {}

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
    const productData = this.finalProductData();
    const formTwo = Object.assign({}, this.OptionsForm.value);
    productData.options = [...formTwo.Options];
    const formData = new FormData();
    formData.append('image', this.image);
    formData.append('data', JSON.stringify(productData));
    this.isOptionsEmpty(productData.options);
    this.httpProductService.sendProductData(formData).subscribe(
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
