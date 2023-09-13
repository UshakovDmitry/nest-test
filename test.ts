import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Number: string;

  @Column()
  Date: string;

  @Column()
  Organization: string;

  // ... (все остальные поля сообщения)

  @Column('json')
  ArrayStrings: Array<any>;

  @Column('json')
  ContactInformation: any;
}
