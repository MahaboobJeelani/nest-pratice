import { Controller, Get, Post } from '@nestjs/common';
import { EmployeeService } from './employee.service';

@Controller('employee')
export class EmployeeController {
    constructor(private readonly employeeService: EmployeeService){}

    @Post()
    async createEmploy(){
        return this.employeeService.createEmployee()
    }

    @Get()
    async findEmployees(){
        return this.employeeService.findAll()
    }

}
