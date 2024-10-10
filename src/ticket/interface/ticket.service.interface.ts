import { CreateTicketDto } from '../dto/create-ticket.dto';
import { TicketDto } from '../entities/ticket.entity';

export interface ITicketService {
  createTicket(createTicketDto: CreateTicketDto): Promise<TicketDto>;
  fetchTickets(): Promise<TicketDto[]>;
  fetchTicket(id: string): Promise<TicketDto>;
}
