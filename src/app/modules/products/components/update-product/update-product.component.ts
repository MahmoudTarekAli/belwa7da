import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material';
import {NotificationService} from '../../../../shared/services/notifications/notification.service';
import {CategoriesService} from '../../../categories/service/categories.service';
import {BoxAnimation} from '../../../../shared/animations/box-animation';
import {HttpProductsService} from '../../service/products.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss'],
  animations: [
    BoxAnimation
  ]
})
export class UpdateProductComponent implements OnInit {
  public updateProduct: FormGroup;
  image: any;
  loading = false;
  Images = [];
  PreviewImages = [];
  items = [];
  categoriesArr: any;
  selectedCategory: any;

  constructor(private fg: FormBuilder,
              private dialogRef: MatDialog,
              @Inject(MAT_DIALOG_DATA) public product: any,
              private notificationService: NotificationService,
              private httpProductService: HttpProductsService,
              private categoryService: CategoriesService,
  ) {
  }

  ngOnInit() {
    this.categoryService.getAllCategory().subscribe(data => {
      if (data.status === 200) {
        this.categoriesArr = data.body;
      }
    });
    this.updateProduct = this.fg.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      inventory: ['', Validators.required],
      price: ['', Validators.required],
    });
    this.setCategoryValues();
    const cat = this.product.categories.map(m => m._id);
    this.selectedCategory = cat[0];
    console.log(this.selectedCategory);
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

  setCategoryValues() {
    this.updateProduct.controls.name.setValue(this.product.name);
    this.updateProduct.controls.description.setValue(this.product.description);
    this.updateProduct.controls.inventory.setValue(this.product.inventory);
    this.updateProduct.controls.price.setValue(this.product.price);
  }

  close() {
    this.dialogRef.closeAll();
  }

  submit() {
    this.loading = true;
    const data = {
      name: this.updateProduct.controls.name.value,
      description: this.updateProduct.controls.description.value,
      price: this.updateProduct.controls.price.value,
      inventory: this.updateProduct.controls.inventory.value,
      category: this.selectedCategory,
    };
    console.log(data);
    const formData = new FormData();
    formData.append('image', this.image);
    formData.append('data', JSON.stringify(data));
    this.httpProductService.UpdateProductData(formData, this.product._id).subscribe(data => {
      if (data.status === 200) {
        this.dialogRef.closeAll();
        this.notificationService.successNotification('The product updated');
        this.loading = false;
      }
    }, err => {
      this.loading = false;
      this.notificationService.errorNotification(err.message);
    });
  }

}
