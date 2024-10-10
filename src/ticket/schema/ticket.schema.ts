import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Status } from 'src/enums/status.enum';

@Schema()
export class Ticket extends Document {
  @Prop({ type: String, required: true })
  subject: string;

  @Prop({ type: String, required: true })
  body: string;

  @Prop({ type: String, required: true })
  senderEmail: string;

  @Prop({ type: String, enum: Status, default: Status.OPEN })
  status: Status;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
