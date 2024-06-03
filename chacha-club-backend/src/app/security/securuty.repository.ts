import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { VerificationToken } from './typedefs';

@Injectable()
export class SecurityRepository {
    constructor(private readonly prismaService: PrismaService) {}

    async findToken(token: string): Promise<VerificationToken | null> {
        return this.prismaService.emailToken.findUnique({
            where: {
                token: token
            }
        });
    }

    async createToken(token: string, userId: number): Promise<VerificationToken> {
        return this.prismaService.$transaction(async (prisma) => {
            await prisma.emailToken.updateMany({
                where: {
                    userId: userId,
                    isActive: true
                },
                data: {
                    isActive: false
                }
            });

            return prisma.emailToken.create({
                data: {
                    userId: userId,
                    token: token,
                    isActive: true
                }
            });
        });
    }

    async disableToken(tokenId: number): Promise<VerificationToken> {
        return this.prismaService.emailToken.update({
            where: {
                id: tokenId,
                isActive: true
            },
            data: {
                isActive: false
            }
        });
    }
}
