// TODO refactor this, maybe move it to utils function and do more generic
export const toBusiness = (dbUser) => ({
    id: dbUser.id,
    username: dbUser.username,
    email: dbUser.email,
    role: dbUser.role.name,
    isVerified: dbUser.isVerified,
    createdAt: dbUser.createdAt,
    updatedAt: dbUser.updatedAt
});

export const toBusinessWithPassword = (dbUser) => ({
    ...toBusiness(dbUser),
    password: dbUser.password
});
