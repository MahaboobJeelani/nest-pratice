import { Injectable } from '@nestjs/common';
import {ConfigService } from "@nestjs/config"

@Injectable()
export class EvService {
    constructor(private configureService: ConfigService){}

    getEnv(){
        return this.configureService.get<string>("SCRETE_KET")
    }

}
