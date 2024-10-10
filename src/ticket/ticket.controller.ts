import { Controller, Post, Body, Get, Inject, Param } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { TicketDto } from './entities/ticket.entity';
import { ITicketService } from './interface/ticket.service.interface';

@ApiTags('Tickets')
@Controller({
  path: 'tickets',
  version: '1',
})
export class TicketController {
  constructor(
    @Inject('ITicketService') private readonly ticketService: ITicketService,
  ) {}

  @ApiOperation({ summary: 'Use for creating ticket' })
  @Post()
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
  ): Promise<TicketDto> {
    try {
      const ticket = await this.ticketService.createTicket(createTicketDto);
      return ticket;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Use for fetching ticket' })
  @Get()
  async fetchTickets(): Promise<TicketDto[]> {
    try {
      const tickets = await this.ticketService.fetchTickets();
      return tickets;
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({ summary: 'Use to fetch ticket by id' })
  @Get(':id')
  async fetchTicket(@Param('id') id: string): Promise<TicketDto> {
    try {
      const ticket = await this.ticketService.fetchTicket(id);
      return ticket;
    } catch (error) {
      throw error;
    }
  }
}
