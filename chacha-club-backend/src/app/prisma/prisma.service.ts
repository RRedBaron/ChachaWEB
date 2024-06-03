import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ConfigService } from '../config/config.service';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor(configService: ConfigService) {
        const { db } = configService;
        super({ datasources: { db } });
    }
}
