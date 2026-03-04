import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
    private students = [
        { id: 1, name: "Mahaboob", age: 23 },
        { id: 2, name: "sunil", age: 18 },
    ]

    constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) { }

    async createStudentDB(data: Partial<Student>) {
        const newStudent = new this.studentModel(data)
        return newStudent.save();
    }

    // retrive the data from the mongodb atlas
    async getStudent(): Promise<Student[]> {
        return this.studentModel.find().exec()
    }

    async getSingleById(id: string): Promise<Student | null> {
        return this.studentModel.findById(id).exec()
    }

    async updateStudentById(id: string, data: Partial<Student>): Promise<Student | null> {
        return this.studentModel.findByIdAndUpdate(id, data, { new: true }).exec()
    }

    async deleteStudentById(id: string):Promise<Student | null> {
        return this.studentModel.findByIdAndDelete(id).exec()
    }


    // retriving the content data the variable name is "students" from the service

    getAllStudents() {
        return this.students;
    }

    getStudentById(id: number) {
        const findStudent = this.students.find((s) => s.id === id)
        if (!findStudent) {
            throw new NotFoundException("Student not found")
        }
        return findStudent
    }

    // create student
    createStudent(data: { name: string, age: number }) {
        const newStudent = {
            id: Date.now(),
            ...data
        }

        this.students.push(newStudent);
        return newStudent;
    }

    //put
    updateStudent(id: number, data: { name: string, age: number }) {
        const index = this.students.findIndex((s) => s.id === id)
        if (index === -1) {
            throw new NotFoundException("Student not found")
        }

        this.students[index] = {
            // id:Date.now(),
            ...this.students[index],
            ...data
        }
        return this.students[index]
    }


    //patch
    patchStudent(id: number, data: Partial<{ name: string, age: number }>) {
        let student = this.getStudentById(id);

        Object.assign(student, data);
        return student
    }

    // detele
    deleteStudent(id: number) {
        const index = this.students.findIndex((s) => s.id === id)
        if (index === -1) {
            throw new NotFoundException("Student not found")
        }

        const deleted = this.students.splice(index, 1);
        return { message: "Student deleted", student: deleted[0] }
    }
}
