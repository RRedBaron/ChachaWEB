import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserParams, GetUserParams } from './typedefs';
import { toBusiness, toBusinessWithPassword } from './formats';
@Injectable()
export class UserRepository {
    constructor(private readonly prismaService: PrismaService) {}
    async create(params: CreateUserParams) {
        const { role: roleName, ...userParams } = params;
        const user = await this.prismaService.user.create({
            data: {
                ...userParams,
                role: {
                    connect: {
                        name: roleName
                    }
                }
            },
            include: {
                role: true
            }
        });

        return toBusiness(user);
    }

    async findByUsernameWithPassword(username: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                username
            },
            include: {
                role: true
            }
        });

        return user && toBusinessWithPassword(user);
    }

    async findMany(params: GetUserParams) {
        const users = await this.prismaService.user.findMany({
            where: params,
            orderBy: {
                username: 'asc' // maybe should sort by email or createdAt
            },
            include: {
                role: true
            }
        });

        return users.map(toBusiness);
    }

    async findById(id: number) {
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            },
            include: {
                role: true
            }
        });

        return user && toBusiness(user);
    }

    async findManyOr(params: GetUserParams) {
        const users = await this.prismaService.user.findMany({
            where: {
                OR: [{ username: params.username }, { email: params.email }]
            },
            orderBy: {
                username: 'asc' // maybe should sort by email or createdAt
            },
            include: {
                role: true
            }
        });

        return users.map(toBusiness);
    }

    async verifyEmail(userId: number) {
        return this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                isVerified: true
            }
        });
    }

    async unverifyEmail(userId: number) {
        return this.prismaService.user.update({
            where: {
                id: userId
            },
            data: {
                isVerified: false
            }
        });
    }
}
