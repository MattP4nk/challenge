import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommsDto } from '../Dtos/Dtos';
import { PlantModel, Records, SensorModel } from '../models/Models';
import { CommunicationsService } from '../services/communications.service';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HttpClientModule, CommonModule, ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {

  plantForm: FormGroup;
  sensorForm: FormGroup;
  constructor(
    private commService: CommunicationsService,
    private Storage: LocalStorageService) {
    this.plantForm = new FormGroup({
      name: new FormControl(),
      country: new FormControl()
    });
    this.sensorForm = new FormGroup({
      type: new FormControl(),
      plant_id: new FormControl()
    });
  }

  plants: Array<PlantModel> = [];
  sensors: Array<SensorModel> = [];
  records: Records = new Records();
  totalReadings: number = 0;
  totalWarnings: number = 0;
  totalRedAlerts: number = 0;
  userName: string = this.Storage.get("user")!

  displayPlantCreator = "none";
  displaySensorCreator = "none";
  plantName = "";
  country = "";
  plantId = 0;

  request: CommsDto = {
    area: 'plants_sensors',
    command: 'getPlants'
  };
  request2: CommsDto = {
    area: 'plants_sensors',
    command: 'getSensors'
  };
  requestNewPlant: CommsDto ={
    area: 'plants_sensors',
    command: 'createPlant'
  }
  requestNewSensor: CommsDto ={
    area: 'plants_sensors',
    command: 'addSensor'
  }
  requestReadings: CommsDto = {
    area: 'plants_sensors',
    command: "updateValues"
  }


  async ngOnInit() {
    this.getPlants(this.request);
    this.getSensors(this.request2);
  }

  async getPlants(request: CommsDto) {
    await this.commService.commsManager(request).subscribe((data) => {
      for (let item of data.pack) {
        let plant: PlantModel = item;
        this.totalReadings += plant.totalReadings;
        this.totalWarnings += plant.totalWarnings;
        this.totalRedAlerts += plant.totalRedAlerts;
        this.plants.push(plant);
      }
    });
  }

  openPlantCreator() {
    this.displayPlantCreator= "block";
  }
  closePlantCreator() {
    this.displayPlantCreator = "none";
  }
  openSensorCreator(plant: PlantModel) {
    console.log(plant.id);
    this.plantName = plant.name;
    this.country = plant.country;
    this.plantId = plant.id;
    this.displaySensorCreator= "block";
  }
  closeSensorCreator() {
    this.displaySensorCreator = "none";
  }

  async createSensor() {
    this.requestNewSensor.sensor= this.sensorForm.value
    this.requestNewSensor.sensor!.plantId = Number((document.getElementById("IdField") as HTMLInputElement).value)
    console.log((document.getElementById("IdField") as HTMLInputElement).value);
    await this.commService.commsManager(this.requestNewSensor).subscribe((data) =>{
      let output: HTMLParagraphElement = document.createElement('p');
      output.setAttribute(
        'style',
        'background: #FFF; color:	darkseagreen; width: 95%; margin-bot: 10px; border-style: solid; border-radius: 1rem; padding: 5px;'
      );
      var content = document.createTextNode('');
      output.appendChild(content);
      content.nodeValue = data.status;
      console.log(output)
      document.getElementById("response_area")!.appendChild(output)
      if(data.status == "OK"){
        location.reload();
      }
      
    });
  }

  async createPlant() {
    this.requestNewPlant.plant = this.plantForm.value
    console.log(this.requestNewPlant)
    await this.commService.commsManager(this.requestNewPlant).subscribe((data) =>{
      console.log(data)
      let output: HTMLParagraphElement = document.createElement('p');
      output.setAttribute(
        'style',
        'background: #FFF; color:	darkseagreen; width: 95%; margin-bot: 10px; border-style: solid; border-radius: 1rem; padding: 5px;'
      );
      var content = document.createTextNode('');
      output.appendChild(content);
      content.nodeValue = data.status;
      console.log(output)
      document.getElementById("response_area")!.appendChild(output)
      if(data.status == "OK"){
        location.reload();
      }
      
    });
  }


  async getReadings() {
    await this.commService.commsManager(this.requestReadings).subscribe((data) => {
      if(data.status == "OK"){
        location.reload();
      }else{
        console.log(data.status)
      }
    })
    }

  async getSensors(request: CommsDto){
    await this.commService.commsManager(request).subscribe((data) => {
      for (let sensor of data.pack) {
        console.log(sensor);
        switch (sensor.type) {
          case "temperature":
            this.records.temperatureReadings += sensor.totalReadings;
            this.records.temperatureWarnings += sensor.totalWarnings;
            this.records.temperatureRedAlerts += sensor.totalRedAlerts;
            break;
          case "presion":
            this.records.presionReadings += sensor.totalReadings;
            this.records.presionWarnings += sensor.totalWarnings;
            this.records.presionRedAlerts += sensor.totalRedAlerts;
            break;
          case "viento":
            this.records.vientoReadings += sensor.totalReadings;
            this.records.vientoWarnings += sensor.totalWarnings;
            this.records.vientoRedAlerts += sensor.totalRedAlerts;
            break;
          case "niveles":
            this.records.nivelesReadings += sensor.totalReadings;
            this.records.nivelesWarnings += sensor.totalWarnings;
            this.records.nivelesRedAlerts += sensor.totalRedAlerts;
            break;
          case "energia":
            this.records.energiaReadings += sensor.totalReadings;
            this.records.energiaWarnings += sensor.totalWarnings;
            this.records.energiaRedAlerts += sensor.totalRedAlerts;
            break;
          case "tension":
            this.records.tensionReadings += sensor.totalReadings;
            this.records.tensionWarnings += sensor.totalWarnings;
            this.records.tensionRedAlerts += sensor.totalRedAlerts;
            break;
          case "monoxido":
            this.records.monoxidoReadings += sensor.totalReadings;
            this.records.monoxidoWarnings += sensor.totalWarnings;
            this.records.monoxidoRedAlerts += sensor.totalRedAlerts;
            break;
          case "gas":
            this.records.gasesReadings += sensor.totalReadings;
            this.records.gasesWarnings += sensor.totalWarnings;
            this.records.gasesRedAlerts += sensor.totalRedAlerts;
            break;
        }
      }
    });
  }
}
