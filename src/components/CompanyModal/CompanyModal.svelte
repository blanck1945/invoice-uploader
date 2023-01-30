<script lang="ts">
	import ModalHeader from '../../atoms/ModalHeader/ModalHeader.svelte';
	import ModalWrapper from '../../atoms/ModalWrapper/ModalWrapper.svelte';
	import { ModalsKeys } from '../../store/modal.store';
	import type { BubbleCompany } from '../../validations/compnayType';

	export let companyObj: BubbleCompany | undefined;
	export let tailwindClass: string = '';
</script>

<ModalWrapper {tailwindClass}>
	<ModalHeader modalId={ModalsKeys.company}>
		<h2>
			Empresa - ${companyObj?.nombre_empresa} - ${companyObj?.nit_empresa.toString()}
		</h2>
	</ModalHeader>
	<div class="mt-2">
		<p><span class="font-bold">ID:</span> {companyObj?._id}</p>
		<p><span class="font-bold">Slug:</span> {companyObj?.Slug}</p>
		<p><span class="font-bold">Nombre empresa:</span> {companyObj?.nombre_empresa}</p>
		<p><span class="font-bold">NIT empresa:</span> {companyObj?.nit_empresa}</p>
	</div>
</ModalWrapper>

<!-- const company = {
    "Modified Date": "2023-01-14T17:39:59.640Z",
    "Created Date": "2023-01-06T03:26:00.097Z",
    "Created By": "1672975502823x730151389631432600",
    "Modified Date": "2023-01-14T17:39:59.640Z",
    Slug: "apastrana-test",
    _id: "1672975556882x821486776895668200",
    contraseña_sc: "Juanmilo123",
    factura_subida: "no",
    nit_empresa: 1111998877,
    nombre_empresa: "apastrana-test",
    primer_pago: "no",
    proveedor_editado: "yes",
    sc_empresa: "Alegra",
    usuario_sc: "ospina1930@gmail.com",
  }; -->
