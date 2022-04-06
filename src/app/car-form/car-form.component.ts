import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';


@Component({
  selector: 'app-car-form',
  templateUrl: './car-form.component.html',
  styleUrls: ['./car-form.component.css']
})
export class CarFormComponent implements OnInit {

  carForm!: FormGroup; 
  carExistList: Car[] = []

  constructor(
    private formBuilder : FormBuilder,
    private carService : CarService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
    

  get f(): { [key: string]: AbstractControl } {
    return this.carForm.controls;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.carExistList = await this.carService.getAll();
    this.carForm = this.formBuilder.group({
      id:[],
      rendszam:['---', Validators.compose([Validators.pattern('[a-zA-Z]{3}-[0-9]{3}'), Validators.required])],
      tipus:['---',Validators.compose([Validators.minLength(3), Validators.required])],
      uzemanyag:['---',Validators.required],
      fogyasztas:[1, Validators.compose([Validators.min(0.1),Validators.required])],
      kmoraallas:[0,Validators.compose([Validators.min(0),Validators.required])]
    });

    if(id) {      
      const car = await this.carService.getCarByID(id);
      this.carForm.controls['id'].setValue(car?.id);
      this.carForm.controls['rendszam'].setValue(car?.rendszam);
      this.carForm.controls['tipus'].setValue(car?.tipus);
      this.carForm.controls['uzemanyag'].setValue(car?.uzemanyag);
      this.carForm.controls['fogyasztas'].setValue(car?.fogyasztas);
      this.carForm.controls['kmoraallas'].setValue(car?.kmoraallas);
    }
    else
    {
      this.carForm.controls['rendszam'].addValidators(this.isrendszamAlreadyExist(this.carExistList))
    }
  }

  private isrendszamAlreadyExist(list : Car[]) : ValidatorFn {
    return(control : AbstractControl) : ValidationErrors | null => {
      const index = list.find(x => x.rendszam === control.value)

        if(index === undefined)
        {
          return null
        }
        else {
          return {rendszamAlreadyExist : true}
        }
    }
  } 

  async addCar() {
      const car = this.carForm.value;
      this.carService.addCar(car);
      this.router.navigateByUrl('/car-list');
  }  
}
