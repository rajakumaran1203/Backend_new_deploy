import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CsvRecordDocument = CsvRecord & Document;

@Schema()
export class CsvRecord {
  @Prop()
  name: string;

  @Prop({ unique: true })
  email: string;
}

export const CsvRecordSchema = SchemaFactory.createForClass(CsvRecord);
