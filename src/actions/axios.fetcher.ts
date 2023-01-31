import { PUBLIC_BUBBLE_TOKEN } from '$env/static/public';
import axios from 'axios';

export const axiosFetcher = async (bubbleModel: string, data?: any) => {
	try {
		const constraints = [
			{
				key: 'nit_empresa',
				constraint_type: 'equals',
				value: data.companyDoc
			}
		];
		const constraintQuery = `?constraints=${JSON.stringify(constraints)}`;
		const path = `https://co.payana.la/api/1.1/obj/${bubbleModel}${constraintQuery}`;
		const response = await axios({
			method: 'GET',
			url: path,
			headers: {
				Authorization: `Bearer ${PUBLIC_BUBBLE_TOKEN}`
			}
		});

		return response.data.response.results[0];
	} catch (err) {
		console.warn(err);
		throw new Error('Error al cargar la factura');
	}
};
