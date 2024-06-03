export type VerificationToken = {
    id: number;
    token: string;
    userId: number;
    isActive: boolean;
    createdAt: Date;
};
