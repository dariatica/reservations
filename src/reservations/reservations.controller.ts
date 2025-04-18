import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @EventPattern('create.reservation')
  create(@Payload() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }
}
