import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { PrismaClient } from 'generated/prisma';

@Injectable()
export class ReservationsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  private readonly logger = new Logger('ReservationsService');

  async create(createReservationDto: CreateReservationDto) {
    this.logger.log(createReservationDto);
    await this.reservation.create({ data: createReservationDto });
  }
}
