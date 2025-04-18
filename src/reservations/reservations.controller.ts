import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { ReservationsService } from './reservations.service';
import { CreateReservationDto } from './dto/create-reservation.dto';

@Controller()
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  @EventPattern('create.reservation')
  create(@Payload() createReservationDto: CreateReservationDto) {
    return this.reservationsService.create(createReservationDto);
  }

  @MessagePattern({ cmd: 'get.reservations' })
  findAll() {
    return this.reservationsService.findAllReservations();
  }

  @MessagePattern({ cmd: 'get.one.reservations' })
  findOne(@Payload('id', ParseUUIDPipe) id: string) {
    return this.reservationsService.findOneReservation(id);
  }
}
