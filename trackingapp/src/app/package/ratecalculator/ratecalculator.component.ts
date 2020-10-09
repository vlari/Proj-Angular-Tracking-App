import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SystemService } from 'src/app/core/services/system.service';

@Component({
  selector: 'app-ratecalculator',
  templateUrl: './ratecalculator.component.html',
  styleUrls: ['./ratecalculator.component.scss'],
})
export class RatecalculatorComponent implements OnInit {
  rateForm: FormGroup;
  facilities: any;
  rateResult = null;
  totalRate = 0;
  columns;

  constructor(private fb: FormBuilder, private systemService: SystemService) {}

  ngOnInit(): void {
    this.systemService.getFacilities().subscribe(
      (response: any) => {
        this.facilities = response.data;
      },
      (error) => console.log(error)
    );

    this.rateForm = this.fb.group({
      merchValue: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      dimensions: this.fb.group({
        length: [0, [Validators.required, Validators.min(1)]],
        width: [0, [Validators.required, Validators.min(1)]],
        height: [0, [Validators.required, Validators.min(1)]],
      }),
      destination: [1, Validators.required],
    });

    this.columns = [
      { field: 'product', header: 'Product' },
      { field: 'gross', header: 'Gross' },
      { field: 'tax', header: 'Tax' },
      { field: 'net', header: 'Net' }
    ];
  }

  onCalculate() {
    if (this.rateForm.valid) {
      const merchValue = parseFloat(this.rateForm.get('merchValue').value);
      const weight = parseFloat(this.rateForm.get('weight').value);
      const dimensions = this.rateForm.get('dimensions');
      const destination = this.rateForm.get('destination').value;

      const dimensionValue = dimensions.get('length').value * dimensions.get('width').value * dimensions.get('height').value;

      const destinationPrice = parseFloat(this.systemService.getDestinationPrice(destination));

      const gross = merchValue + weight + dimensionValue + destinationPrice;

      const products = this.systemService.getProducts();

      let total = 0;

      products.forEach(p => {
        p.gross = gross;
        p.net = gross + parseFloat(p.tax);
        total += p.net;
      });

      this.rateResult = products;
      this.totalRate = total;
    }
  }
}
