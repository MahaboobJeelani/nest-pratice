import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Developer, DeveloperSchema } from './schemas/developer.schema';
import { Project, ProjectSchema } from './schemas/project.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Developer.name, schema: DeveloperSchema },
      { name: Project.name, schema: ProjectSchema }
    ])
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService]
})
export class ProjectsModule { }
