import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { PrismaClient } from 'generated/prisma';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ReservationsService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  private readonly logger = new Logger('ReservationsService');

  async create(createReservationDto: CreateReservationDto) {
    await this.reservation.create({ data: createReservationDto });
  }

  async findAllReservations() {
    try {
      const reservation = await this.reservation.findMany({
        where: { isActive: true },
      });

      return reservation;
    } catch (error) {
      this.handleError(error);
    }
  }

  async findOneReservation(id: string) {
    try {
      const reservation = await this.reservation.findUnique({
        where: { isActive: true, id },
        omit: { isActive: true },
      });
      if (!reservation)
        throw new RpcException({
          status: HttpStatus.NOT_FOUND,
          message: 'No Reservation founded',
        });

      return reservation;
    } catch (error) {
      this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error instanceof RpcException) throw error;
    this.logger.error(error);
    throw new RpcException({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Please check logs',
    });
  }
}
