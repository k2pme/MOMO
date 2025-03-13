// index.d.ts

import { AxiosResponse } from 'axios';

// Types pour les fonctions utilitaires
export interface WichtigFunctions {
  bas64Encode: (apiUser: string, apiKey: string) => string;
  bearerFormat: (token: string) => string;
  basicFormat: (token: string) => string;
  generateUUID: () => string;
}

// Types pour le module Collection
export interface Collection {
  createAccessToken: (params: {
    auth: { apiUser: string; apiKey: string };
    subscriptionKey: string;
    cache?: string;
    root?: string;
  }) => Promise<AxiosResponse<any>>;

  requestToPay: (params: {
    accessToken: string;
    subscriptionKey: string;
    env?: string;
    body?: {
      amount: string;
      currency: string;
      externalId: string;
      payer: { partyIdType: string; partyId: string };
      payerMessage?: string;
      payeeNote?: string;
    };
    cache?: string;
    root?: string;
    XReferenceId?: string;
    XCallbackUrl?: string;
  }) => Promise<AxiosResponse<any>>;

  // Ajoutez les autres méthodes de Collection ici...
}

// Types pour le module Disbursement
export interface Disbursement {
  createAccessToken: (params: {
    auth: { apiUser: string; apiKey: string };
    subscriptionKey: string;
    cache?: string;
    root?: string;
  }) => Promise<AxiosResponse<any>>;

  depositV2: (params: {
    accessToken: string;
    subscriptionKey: string;
    env?: string;
    body?: {
      amount: string;
      currency: string;
      externalId: string;
      payee: { partyIdType: string; partyId: string };
      payerMessage?: string;
      payeeNote?: string;
    };
    cache?: string;
    root?: string;
    XReferenceId?: string;
    XCallbackUrl?: string;
  }) => Promise<AxiosResponse<any>>;

  // Ajoutez les autres méthodes de Disbursement ici...
}

// Types pour le module UserProvisioning
export interface UserProvisioning {
  postUser: (
    uuid: string,
    subscriptionKey: string,
    cache?: string,
    body?: { providerCallbackHost: string },
    root?: string
  ) => Promise<string | undefined>;

  getUser: (
    uuid: string,
    subscriptionKey: string,
    cache?: string,
    root?: string
  ) => Promise<void>;

  postApiKey: (
    uuid: string,
    subscriptionKey: string,
    cache?: string,
    root?: string
  ) => Promise<void>;
}

// Exporter les types pour le module principal
export const collection: Collection;
export const disbursement: Disbursement;
export const userProvisioning: UserProvisioning;
export const wichtig: WichtigFunctions;