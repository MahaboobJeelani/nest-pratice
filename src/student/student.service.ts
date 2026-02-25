import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StudentService {
    private students = [
        { id: 1, name: "Mahaboob", age: 23 },
        { id: 2, name: "sunil", age: 18 },
    ]

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
        return {message:"Student deleted", student: deleted[0]}
    }
}
