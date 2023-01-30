import type { Invoice } from '../validations/validateType';

export interface InvoiceMapByProps {
	[T: string]: number;
}

const handleAccountNumberType = (accountNumber: string): number | null => {
	const converted = parseInt(accountNumber);

	if (isNaN(converted)) {
		return null;
	}

	return converted;
};

export const parseStringToDate = (date: string | null) => {
	if (date === null) return date;

	const convertedDate = new Date(date);

	return (
		convertedDate.getDate() +
		'/' +
		(convertedDate.getMonth() + 1) +
		'/' +
		convertedDate.getFullYear()
	);
};

const parseDate = (date: Date) =>
	date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear();

export const createInvoiceObject = (invoiceArr: any[]) => {
	let toObjInvoices: Invoice[] = [];

	invoiceArr.forEach((invoice) => {
		const emision = parseStringToDate(invoice[4]);
		const expiration = parseStringToDate(invoice[5]);

		toObjInvoices = [
			...toObjInvoices,
			{
				providerDoc: invoice[0],
				providerName: invoice[1],
				invoiceNumber: invoice[2],
				total: parseInt(invoice[3]),
				emisionDate: emision,
				expirationDate: expiration,
				providerTypeDoc: invoice[6],
				providerEmail: invoice[7],
				bank: invoice[8],
				accountType: invoice[9],
				accountNumber: handleAccountNumberType(invoice[10])
			}
		];
	});

	return toObjInvoices;
};

export const invoiceMapByProps: InvoiceMapByProps = {
	providerDoc: 0,
	providerName: 1,
	invoiceNumber: 2,
	total: 3,
	emisionDate: 4,
	expirationDate: 5,
	providerTypeDoc: 6,
	providerEmail: 7,
	bank: 8,
	accountType: 9,
	accountNumber: 10
};

export const filterInvoiceByInvoceNumber = (invoicesObj: Invoice[]): Invoice[] => {
	const invoiceNumberArr: string[] = [];
	const validInvoices: Invoice[] = [];

	invoicesObj.forEach((invoice) => {
		if (invoiceNumberArr.includes(invoice.invoiceNumber)) {
			return;
		} else {
			invoiceNumberArr.push(invoice.invoiceNumber);

			validInvoices.push(invoice);
		}
	});

	return validInvoices;
};
