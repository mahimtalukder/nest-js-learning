import { Controller, Get } from '@nestjs/common';

@Controller('/app')
export class AppController {

    @Get('/allhamdulillah')
    getRootRoute(){
        return "Allhamdulillah";
    }

    @Get('/developer')
    getDeveloperName(){
        return { name: "MD Mahim Talukder" };
    }
}