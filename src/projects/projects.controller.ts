import { Controller, Get, Post } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly service: ProjectsService) {

    }
    @Post('seed')
    async seedData(){
        return this.service.seed()
    }

    @Get('developers')
    async getDevelopers(){
        return this.service.getDeveloper()
    }

    @Get()
    async getProjects(){
        return this.service.getProjects()
    }
}
