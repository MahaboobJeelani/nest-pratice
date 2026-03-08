import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Developer } from './schemas/developer.schema';
import { Model } from 'mongoose';
import { Project } from './schemas/project.schema';

@Injectable()
export class ProjectsService {
    constructor(
        @InjectModel(Developer.name) private developersModel: Model<Developer>,
        @InjectModel(Project.name) private projectModel: Model<Project>,
    ) { }

    async seed(): Promise<{ dev1: Developer, dev2: Developer }> {
        const [project1, project2] = await Promise.all([
            this.projectModel.create({ title: "NEST CRM" }),
            this.projectModel.create({ title: "MongoDB analytics" })
        ]);

        const [dev1, dev2] = await Promise.all([
            this.developersModel.create({ name: "Mahaboob", projects: [(await project1)._id, (await project2)._id] }),
            this.developersModel.create({ name: "Nayeem", projects: [(await project1)._id, (await project2)._id] })
        ])

        await Promise.all([
            this.projectModel.findByIdAndUpdate(project1._id, { $set: { developers: [dev1._id, dev2._id] } }),
            this.projectModel.findByIdAndUpdate(project1._id, { $set: { developers: [dev1._id] } })
        ])

        return { dev1, dev2 }
    }

    async getDeveloper():Promise<Developer[]>{
        return this.developersModel.find().populate('projects').lean()
    }

    async getProjects():Promise<Project[]>{
        return this.projectModel.find().populate('developers').lean()
    }
}
