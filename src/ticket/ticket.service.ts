import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { Ticket } from './schema/ticket.schema';
import { TicketDto } from './entities/ticket.entity';
import { TicketMapper } from './mapper/ticket.mapper';
import { ITicketService } from './interface/ticket.service.interface';

@Injectable()
export class TicketService implements ITicketService {
  private readonly logger = new Logger(TicketService.name);

  constructor(@InjectModel(Ticket.name) private ticketModel: Model<Ticket>) {}

  // Create Ticket
  async createTicket(createTicketDto: CreateTicketDto): Promise<TicketDto> {
    try {
      this.logger.log('Request for creating ticket');
      const entity = TicketMapper.toEntity(createTicketDto);
      const newTicket = await this.ticketModel.create(entity);
      const savedEntity = await newTicket.save();
      const ticketDto = TicketMapper.toDto(savedEntity);
      this.logger.log('Ticket Created');

      return ticketDto;
    } catch (error) {
      this.logger.error(
        `Failed to create ticket: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to screate ticket: ${error.message}`);
    }
  }

  // Fetch All Tickets
  async fetchTickets(): Promise<TicketDto[]> {
    try {
      this.logger.log('Request for fetching tickets');
      const tickets = await this.ticketModel.find().exec();
      this.logger.log('Tickets Fetched');

      return tickets.map((ticket) => TicketMapper.toDto(ticket));
    } catch (error) {
      this.logger.error(
        `Failed to fetch tickets: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to fetch tickets: ${error.message}`);
    }
  }

  // Fetch Ticket by ID
  async fetchTicket(id: string): Promise<TicketDto> {
    try {
      this.logger.log(`Request for fetching ticket: ${id}`);
      const ticket = await this.ticketModel.findById(id).exec();
      this.logger.log(`Ticket Fetched: ${id}`);

      return TicketMapper.toDto(ticket);
    } catch (error) {
      this.logger.error(
        `Failed to fetch ticket: ${error.message}`,
        error.stack,
      );
      throw new Error(`Failed to fetch ticket: ${error.message}`);
    }
  }
}
