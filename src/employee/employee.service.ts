import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class EmployeeService {
    constructor(
        @InjectModel(Employee.name) private employeeModel: Model<Employee>,
        @InjectModel(Profile.name) private profileModel: Model<Profile>
    ) { }

    async createEmployee(): Promise<Employee> {
        const profile = new this.profileModel({
            age: 20,
            qualification: "B.Tech"
        }).save()

        const employee = new this.employeeModel({
            name: "Mahaboob",
            profile: (await profile)._id
        }).save()

        return employee
    }

    async findAll(): Promise<Employee[]> {
        return await this.employeeModel.find().populate("profile").exec()
    }
}
