import type { UserCredentials } from '../validations/compnayType';
import type { Invoice } from '../validations/validateType';

export type ResultIndicator = 'success' | 'error' | 'warning' | 'info';

export interface Credentials {
	company: string;
}

export type Modals = 'company' | 'invoice';

export interface DataToSend extends UserCredentials {
	invoices: Invoice[];
}

export type ExcelArrayData = (string | number | null)[];
