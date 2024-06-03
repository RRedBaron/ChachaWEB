export const METHOD_ROLES_METADATA = 'METHOD_ROLES_METADATA';
export const METHOD_NAME_METADATA = 'METHOD_NAME_METADATA';

export const ROLES = {
    USER: 'USER',
    ADMIN: 'ADMIN'
} as const;

// TODO move to envs and read from config
export const jwtConstants = {
    secret: 'secretKey'
};

export const hashingSaltRounds = 12;
