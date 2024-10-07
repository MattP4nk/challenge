export class PlantModel{
    id!: number;
    name!: string;
    country!: string;
    sensorsList!: Array<SensorModel>;
    totalReadings!: number;
    totalWarnings!: number;
    totalRedAlerts!: number;
}

export class SensorModel{
    name!: string;
    type!: string;
    value!: string;
    plantId!: number;
    totalReadings: number = 0;
    totalWarnings: number = 0;
    totalRedAlerts: number = 0;
}

export class UserModel{
    email!: string;
    username!: string;
    role!: string;
}

export class Records{
    temperatureReadings: number = 0;
    temperatureWarnings: number = 0;
    temperatureRedAlerts: number = 0;
    presionReadings: number = 0;
    presionWarnings: number = 0;
    presionRedAlerts: number = 0;
    vientoReadings: number = 0;
    vientoWarnings: number = 0;
    vientoRedAlerts: number = 0;
    nivelesReadings: number = 0;
    nivelesWarnings: number = 0;
    nivelesRedAlerts: number = 0;
    energiaReadings: number = 0;
    energiaWarnings: number = 0;
    energiaRedAlerts: number = 0;
    tensionReadings: number = 0;
    tensionWarnings: number = 0;
    tensionRedAlerts: number = 0;
    monoxidoReadings: number = 0;
    monoxidoWarnings: number = 0;
    monoxidoRedAlerts: number = 0;
    gasesReadings: number = 0;
    gasesWarnings: number = 0;
    gasesRedAlerts: number = 0;

    totalReadings(): number{
        return this.temperatureReadings + this.presionReadings + this.vientoReadings + this.nivelesReadings + this.energiaReadings + this.tensionReadings + this.monoxidoReadings + this.gasesReadings;
    }
    totalWarnings(): number{
        return this.temperatureWarnings + this.presionWarnings + this.vientoWarnings + this.nivelesWarnings + this.energiaWarnings + this.tensionWarnings + this.monoxidoWarnings + this.gasesWarnings;
    }
    totalRedAlerts(): number{
        return this.temperatureRedAlerts + this.presionRedAlerts + this.vientoRedAlerts + this.nivelesRedAlerts + this.energiaRedAlerts + this.tensionRedAlerts + this.monoxidoRedAlerts + this.gasesRedAlerts;
    }
}