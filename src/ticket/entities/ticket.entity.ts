import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Status } from 'src/enums/status.enum';

export class TicketDto {
  @IsString()
  @IsNotEmpty()
  ticketId: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  senderEmail: string;

  @IsEnum(Status)
  @IsNotEmpty()
  status: Status;
}
