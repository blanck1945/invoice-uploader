import zod from 'zod';
import type { ResultIndicator } from '../types/types';

export interface Tablekeys {
	[T: string]: string;
}

export type Invoice = {
	providerDoc: string;
	providerName: string;
	invoiceNumber: string;
	total: number;
	emisionDate: string | Date | 'null' | null;
	expirationDate: string | Date | 'null' | null;
	providerTypeDoc?: 'NIT' | 'CC' | null;
	providerEmail?: string | null;
	bank?: string | null;
	accountType?: 'Caja de ahorro' | 'Cuenta corriente' | null;
	accountNumber?: number | null;
};

export interface ValidateSchemaResponse {
	validationHasInvalidValues: ResultIndicator[];
	result: any[];
	hasErrors: boolean;
}

export const invoiceSchema: zod.ZodSchema<Invoice> = zod.object({
	providerDoc: zod.string({
		invalid_type_error: 'El campo ID del proveedor (N° NIT/CC) debe tener un valor valido (string)',
		required_error: 'El campo NIT de ID del proveedor (N° NIT/CC) es requerido'
	}),
	providerName: zod
		.string({
			invalid_type_error: 'El campo Nombre del proveedor debe tener un valor valido (string)',
			required_error: 'El campo Nombre del proveedor es requerido'
		})
		.trim(),
	invoiceNumber: zod.string().trim(),
	total: zod.number({
		invalid_type_error: 'El campo Monto debe ser un numero',
		required_error: 'El campo Monto es requerido'
	}),
	emisionDate: zod.string().nullable(),
	expirationDate: zod.string().nullable(),
	providerTypeDoc: zod.enum(['NIT', 'CC']).nullable(),
	providerEmail: zod
		.string()
		.email({
			message: 'El campo Correo electronico del proveedor debe tener formato de correo electronico'
		})
		.nullable(),
	bank: zod.string().nullable(),
	accountType: zod.enum(['Caja de ahorro', 'Cuenta corriente']).nullable(),
	accountNumber: zod.number().nullable()
});

const errorsFieldsMap: Tablekeys = {
	providerDoc: 'ID del proveedor (N° NIT/CC)',
	total: 'Monto',
	providerEmail: 'Mail Proveedor',
	providerName: 'Nombre Proveedor'
};

export const validateSchema = async (data: Invoice[]): Promise<ValidateSchemaResponse> => {
	const validationHasInvalidValues: ResultIndicator[] = [];
	const result: any = [];
	const invoceNumberArr: string[] = [];

	await data.forEach((invoice) => {
		const validatedElement: any = invoiceSchema.safeParse(invoice);

		const invoiceNumberIsDuplicate = invoceNumberArr.includes(invoice.invoiceNumber);

		invoceNumberArr.push(invoice.invoiceNumber);

		if (invoiceNumberIsDuplicate) validationHasInvalidValues.push('warning');

		if (validatedElement.success) {
			result.push({
				...validatedElement.data,
				shouldSend: invoiceNumberIsDuplicate ? false : true,
				success: true,
				styles: invoiceNumberIsDuplicate ? 'bg-orange-500 text-white' : 'bg-green-500 text-white'
			});
		} else {
			validationHasInvalidValues.push('error');
			result.push({
				...validatedElement.error,
				success: false,
				styles: 'bg-red-500 text-white',
				excelField: validatedElement.error.issues.map((el: any) => {
					return errorsFieldsMap[el.path[0]];
				})
			});
		}
	});

	return {
		validationHasInvalidValues,
		result,
		hasErrors: !validationHasInvalidValues.includes('error')
	};
};
