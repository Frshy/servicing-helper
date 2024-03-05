export interface UserModel {
    id: string;
    username: string;
    email: string;
    admin: boolean;
    updatedAt: string;
    createdAt: string;
    sales: SaleModel[];
}

export interface SaleModel {
    id: string;
    document: DocumentModel;
    service: string;
    price: number;
    orderedBy: number;
    user: UserModel;
    editedAt: string;
    createdAt: string;
}

export interface DocumentModel {
    id: string;
    saleId: number;
    emailId: number;
    documentUrl: string;
    sale: SaleModel;
    email: EmailModel;
    updatedAt: string;
    createdAt: string;
}

export interface EmailModel {
    id: string;
    document: DocumentModel;
    sentFrom: string;
    sentTo: string;
    subject: string;
    text: string;
    html: string;
    trackingImageUrl: string;
    EmailEvent: EmailEventModel[];
    updatedAt: string;
    createdAt: string;
}

export interface EmailEventModel {
    id: string;
    emailId: number;
    type: EmailEventTypes;
    email: EmailModel;
    updatedAt: string;
    createdAt: string;
}

export enum EmailEventTypes {
    OPENED
}