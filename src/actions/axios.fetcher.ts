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
			//url: `https://co.payana.la/api/1.1/obj/${bubbleModel}/${data.companyId}`
			url: path,
			headers: {
				Authorization: `Bearer ebc9f16c80d03af5c2e5936bf41372c6`
			}
		});

		return response.data.response.results[0];
	} catch (err) {
		console.warn(err);
		throw new Error('Error al cargar la factura');
	}
};
