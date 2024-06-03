export type Config = {
    get db(): DatabaseConfig;
};

export type DatabaseConfig = {
    url: string;
};
