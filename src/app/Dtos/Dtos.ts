import { PlantModel, SensorModel, UserModel } from "../models/Models";

export class SensorDto{
    type!: string;
    plantId!: number;
}

export class LoginDto{
    username!: string;
    password!: string;
}

export class PlantDto{
    name!: string;
    country!: string;
}

export class RegistrationDto{
    email!: string;
    username!: string;
    password!: string;
}

export class ChangePasswordDto{
    username!: string;
    oldPassword!: string;
    newPassword!: string;
}

export class CommsDto {
    area!: string;
    command!: string;
    target?: string;
    key?: string;
    regInfo?: RegistrationDto;
    plant?:PlantDto;
    sensor?: SensorDto;
    credentials?: LoginDto;
    newCredentials?: ChangePasswordDto;
}

export class AnswerDto{
    status!: string;
    pack!: PlantModel | SensorModel | UserModel | any | PlantModel[];
    token?: string;
}