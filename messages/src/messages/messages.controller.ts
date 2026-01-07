import { Body, Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages') //This is class decorator
export class MessagesController {
    constructor(public messagesService: MessagesService){}

    @Get() //This is method decorator
    getAllMessages() {
        return this.messagesService.findAll();
    }

    @Post()
    storeMessage(@Body() body: CreateMessageDto) { // @Body() is parameter decorator
        return this.messagesService.store(body.content);
    }

    @Get(":id")
    async getMessageById(@Param('id') id: string) {
        const message = await this.messagesService.findOne(id);
        if(!message){
            throw new NotFoundException("Message not found");
        }
        return message;
    }
}
