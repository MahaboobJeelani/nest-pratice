import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { StudentService } from '../student/student.service'
import { Student } from './student.schema';

@Controller('student')
export class StudentController {
    constructor(private readonly studentService: StudentService) { }

    @Get()
    getStudent() {
        return this.studentService.getAllStudents();
    }

        
    @Get('details')
    async getStudentData() {
        return this.studentService.getStudent()
    }


    @Get(":id")
    getStudentById(@Param('id') id: string) {
        return this.studentService.getStudentById(Number(id))
    }

    @Post()
    createStudent(@Body() body: { name: string, age: number }) {
        return this.studentService.createStudent(body)
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() body: { name: string, age: number }) {
        return this.studentService.updateStudent(Number(id), body)
    }

    @Patch(":id")
    patch(@Param("id") id: string, @Body() body: Partial<{ name: string, age: number }>) {
        return this.studentService.patchStudent(Number(id), body)
    }

    @Delete(":id")
    deleteStudent(@Param('id') id: string) {
        return this.studentService.deleteStudent(Number(id))
    }

    @Post('addstudent')
    async addStudent(@Body() data: Partial<Student>) {
        return this.studentService.createStudentDB(data)
    }



}


