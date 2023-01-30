import axios from 'axios';
import type { UserCredentials } from '../validations/compnayType';
import type { Invoice } from '../validations/validateType';

export type SenderData = Invoice | Invoice[] | UserCredentials;

export const LambdaKeys = {
	'upload-invoice': 'upload-invoice'
} as const;

export type LambdaKeys = 'upload-invoice';

export interface LambdaUrls {
	'upload-invoice': string;
	'local-url': string;
}

export const lambdasUrls: LambdaUrls = {
	'upload-invoice': 'https://995bar79g7.execute-api.us-east-1.amazonaws.com/prod/alegra',
	'local-url': ''
};

export const axiosSender = async (data: SenderData, lambda: LambdaKeys) => {
	console.warn('axiosSender', data, lambda);

	try {
		const response = await axios({
			method: 'POST',
			url: lambdasUrls[lambda],
			data
		});

		console.warn(response.data);

		return response.data;
	} catch (err: any) {
		//console.log(err);
		console.log(err);
		throw new Error('Error al cargar la factura');
	}
};
