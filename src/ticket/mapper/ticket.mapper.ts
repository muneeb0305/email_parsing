import { CreateTicketDto } from '../dto/create-ticket.dto';
import { Ticket } from '../schema/ticket.schema';
import { TicketDto } from '../entities/ticket.entity';
import { Status } from 'src/enums/status.enum';

export class TicketMapper {
  static toEntity = (entity: CreateTicketDto): Partial<Ticket> => {
    return {
      subject: entity.subject,
      body: entity.body,
      senderEmail: entity.senderEmail,
      status: Status.OPEN,
    };
  };

  static toDto(entity: Ticket): TicketDto {
    return {
      ticketId: entity._id.toString(),
      subject: entity.subject,
      body: entity.body,
      senderEmail: entity.senderEmail,
      status: entity.status,
    };
  }
}
