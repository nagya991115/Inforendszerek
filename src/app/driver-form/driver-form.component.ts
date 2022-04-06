import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Driver } from '../models/driver';
import { DriverService } from '../services/driver.service';

@Component({
  selector: 'app-driver-form',
  templateUrl: './driver-form.component.html',
  styleUrls: ['./driver-form.component.css']
})
export class DriverFormComponent implements OnInit {


  driverExistList: Driver[] = []

  driverForm!: FormGroup;

  constructor(
    private formBuilder : FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private driverService : DriverService,
  ) { }

  get f(): { [key: string]: AbstractControl } {
    return this.driverForm.controls;
  }

  async ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams['id'];
    this.driverExistList = await this.driverService.getAll();
    
    this.driverForm = this.formBuilder.group({
      id:[],
      nev:['---',Validators.compose([Validators.required])],
      szulido:['---', Validators.compose([Validators.required, this.isDriverOlderThan()])],
      lakcim:['---', Validators.compose([Validators.required])],
      jogositvany_szama:['---',Validators.compose([Validators.required])],
      jogositvany_ervenyesseg:['---',Validators.compose([Validators.required])]
    });

    if(id) {  
      const driver = await this.driverService.getDriverByID(id);
      this.driverForm.controls['id'].setValue(driver?.id);
      this.driverForm.controls['nev'].setValue(driver?.nev);
      this.driverForm.controls['szulido'].setValue(driver?.szulido);
      this.driverForm.controls['lakcim'].setValue(driver?.lakcim);
      this.driverForm.controls['jogositvany_szama'].setValue(driver?.jogositvany_szama);
      this.driverForm.controls['jogositvany_ervenyesseg'].setValue(driver?.jogositvany_ervenyesseg);
    }
    else
    {
        this.driverForm.controls['jogositvany_szama'].addValidators(this.isLicenseAlreadyExist(this.driverExistList))
    }
  }

  private isDriverOlderThan() : ValidatorFn {
    return(control : AbstractControl) : ValidationErrors | null => {
      const currentDate = new Date().getFullYear()
      const controlValue = new Date(control.value).getFullYear()
      const difference = (currentDate - controlValue)
      if(difference >= 17)
      {      
          return null
        }
        else {
          return {rendszamAlreadyExist : true}
        }
    }
  }

  private isLicenseAlreadyExist(list : Driver[]) : ValidatorFn {
    return(control : AbstractControl) : ValidationErrors | null => {
      const index = list.find(x => x.jogositvany_szama === control.value)

        if(index === undefined)
        {
          return null
        }
        else {
          return {licenseAlreadyExist : true}
        }
    }
  } 

  async addDriver() {
    const driver = this.driverForm.value;
    this.driverService.addDriver(driver);
    this.router.navigateByUrl('/driver-list');
  }
}
