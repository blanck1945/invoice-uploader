export interface UserCredentials {
	companyId: string | undefined;
	companyDoc: string | undefined;
}

export interface BubbleCompany {
	'Modified Date': Date;
	'Created Date': Date;
	'Created By': string;
	Slug: string;
	nit_empresa: number;
	nombre_empresa: string;
	sc_empresa: string;
	contraseña_sc: string;
	usuario_sc: string;
	factura_subida: string;
	primer_pago: string;
	proveedor_editado: string;
	_id: string;
}
