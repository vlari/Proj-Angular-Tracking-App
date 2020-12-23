import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  totalRate: string = '0';
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
      merchValue: ['', [Validators.required, Validators.min(1), this.validateNumberInput]  ],
      weight: ['', [Validators.required, Validators.min(1), this.validateNumberInput]],
      dimensions: this.fb.group({
        length: ['', [Validators.required, Validators.min(1), this.validateNumberInput]],
        width: ['', [Validators.required, Validators.min(1), this.validateNumberInput]],
        height: ['', [Validators.required, Validators.min(1), this.validateNumberInput]],
      }),
      destination: [1, Validators.required],
    });

    this.columns = [
      { field: 'product', header: 'Product' },
      { field: 'gross', header: 'Gross' },
      { field: 'tax', header: 'Tax' },
      { field: 'net', header: 'Net' },
    ];
  }

  onCalculate() {
    if (this.rateForm.valid) {
      const merchValue = parseFloat(this.rateForm.get('merchValue').value);
      const weight = parseFloat(this.rateForm.get('weight').value);
      const dimensions = this.rateForm.get('dimensions');
      const destination = this.rateForm.get('destination').value;

      const dimensionValue =
        dimensions.get('length').value *
        dimensions.get('width').value *
        dimensions.get('height').value;

      const destinationPrice = parseFloat(
        this.systemService.getDestinationPrice(destination)
      );

      const gross = merchValue + weight + dimensionValue + destinationPrice;

      const products = this.systemService.getProducts();

      let total: number = 0;

      products.forEach((p) => {
        p.gross = gross;
        p.net = gross + parseFloat(p.tax);
        total += p.net;
      });

      this.rateResult = products;
      this.totalRate = total.toFixed(2).toString();
    }
  }

  validateNumberInput(c: AbstractControl): { [key: string]: boolean } | null {
    let regex = /^[1-9]+[0-9]*$/;

    if (regex.test(c.value)) {
      return null;
    }

    return { match: true };
  }
}
