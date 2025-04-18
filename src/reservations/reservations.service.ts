import { Injectable, Logger } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Injectable()
export class ReservationsService {
  private readonly logger = new Logger('ReservationsService');

  create(createReservationDto: CreateReservationDto) {
    this.logger.log(createReservationDto);
    return createReservationDto;
  }
}
