import { Body, Controller, Post, Get } from '@nestjs/common';
import { StoreRoomRequestDto } from '../store-room-request/store-room-request.dto';
import { CreateEmailUserDto } from './create-email-user.dto';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
    constructor(private emailService: EmailService) { }
    @Post('/special-request')
    sendGeneralSRequestEmail(@Body('User') User: CreateEmailUserDto, @Body('Items') Items: StoreRoomRequestDto[], @Body('Type') Type: string) {
        this.emailService.sendGeneralSpecialRequest(User, Items, Type)
        
    }
    @Post('/special-request-sr')
    sendStoreRoomSRequestEmail(@Body('User') User: CreateEmailUserDto, @Body('Items') Items: StoreRoomRequestDto[], @Body('Type') Type: string) {
        this.emailService.sendStoreRoomSpecialRequest(User, Items, Type)
    }
}
