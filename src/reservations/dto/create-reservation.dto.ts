import { IsDate, IsString } from 'class-validator';

export class CreateReservationDto {
  @IsString()
  name: string;
  @IsDate()
  appointment: Date;
  @IsString()
  description: string;
}
