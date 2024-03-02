import { FilterUnitsService } from './../../services/filter-units.service';
import { UnitsResponse } from './../../types/units-response.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GetUnitsService } from 'src/app/services/get-units.service';
import { Location } from 'src/app/types/location.interface';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  results: Location[] = [];
  filteredResults: Location[] = [];
  formGroup!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private unitService: GetUnitsService,
    private filterService: FilterUnitsService) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      hour: '',
      showClosed: true
    });
    this.unitService.getAllUnits().subscribe(data => {
      this.results = data;
      this.filteredResults = data;
    });
  }

  onSubmit(): void{
    let {showClosed, hour} = this.formGroup.value;
    this.filteredResults = this.filterService.filter(this.results, showClosed, hour);
    this.unitService.setFilteredUnits(this.filteredResults);
  }

  onClean(): void{
    this.formGroup.reset();
  }
} 
