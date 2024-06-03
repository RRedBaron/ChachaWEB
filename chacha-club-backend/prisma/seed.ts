import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function tryCatchWrapper<T>(fn: () => Promise<T>): Promise<T | undefined> {
    try {
        return await fn();
    } catch (e) {
        console.error(e);
    }
}

async function main() {
    const roleAdmin = await tryCatchWrapper(() =>
        prisma.role.create({
            data: {
                name: 'ADMIN'
            }
        })
    );

    const roleUser = await tryCatchWrapper(() =>
        prisma.role.create({
            data: {
                name: 'USER'
            }
        })
    );

    const chachaAdmin = await tryCatchWrapper(() =>
        prisma.user.create({
            data: {
                username: 'defaultAdmin',
                email: 'exampleAdmin@mail.com',
                isVerified: true,
                role: {
                    connect: {
                        name: 'ADMIN'
                    }
                },
                password: '$2a$12$tM.Dq.DnZAsA8qZv0TIER.crXsDu3VE9Q.VjoKhB0MtD7k7faT9Uq'
            }
        })
    );

    const chachaUser = await tryCatchWrapper(() =>
        prisma.user.create({
            data: {
                username: 'defaultUser',
                email: 'example@mail.com',
                isVerified: true,
                role: {
                    connect: {
                        name: 'USER'
                    }
                },
                password: '$2a$12$tM.Dq.DnZAsA8qZv0TIER.crXsDu3VE9Q.VjoKhB0MtD7k7faT9Uq'
            }
        })
    );

    const category1 = await tryCatchWrapper(() =>
        prisma.category.create({
            data: {
                name: 'Category 1'
            }
        })
    );
    const category2 = await tryCatchWrapper(() =>
        prisma.category.create({
            data: {
                name: 'Category 2'
            }
        })
    );

    const ingredient1 = await tryCatchWrapper(() =>
        prisma.ingredient.create({
            data: {
                name: 'Ingredient 1'
            }
        })
    );

    const ingredient2 = await tryCatchWrapper(() =>
        prisma.ingredient.create({
            data: {
                name: 'Ingredient 2'
            }
        })
    );

    const ingredient3 = await tryCatchWrapper(() =>
        prisma.ingredient.create({
            data: {
                name: 'Ingredient 3'
            }
        })
    );
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });
