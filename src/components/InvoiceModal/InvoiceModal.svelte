<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import ModalHeader from '../../atoms/ModalHeader/ModalHeader.svelte';
	import { invoiceMapByProps } from '../../helpers/invoice.herlpers';
	import { modals, ModalsKeys } from '../../store/modal.store';

	export let modalData: any = null;
	export let tableData: any;

	// Variables
	const dispatch = createEventDispatcher();

	console.warn(tableData);

	let editMode: boolean = true;

	const getInvoiceIndexByProp = (path: string) => {
		return invoiceMapByProps[path];
	};

	const formValues: any = tableData;

	const updateInvoiceRow = () => {};

	const toogleEditMode = () => {
		editMode = !editMode;
		inputStyles();
	};

	const inputStyles = () => (editMode ? 'bg-gray-200' : 'bg-white');
</script>

<div class="fixed left-0 top-0 bg-opacity-70 w-full h-screen z-50 bg-black flex justify-center">
	<div class="flex flex-col flex-1 mx-8 px-4 rounded-md bg-white my-8 ">
		<ModalHeader modalId={ModalsKeys.invoice}>
			<p>Numero de Factura: {modalData?.invoiceData?.invoiceNumber}</p>
		</ModalHeader>
		<div class="flex flex-1">
			<div class="  w-1/4 border-r pt-2 h-full">
				<p class="font-bold">Informacion de la factura</p>
				<p>Nit Proveedor: {modalData?.invoiceData?.providerDoc}</p>
				<p>Nombre Proveedor: {modalData?.invoiceData?.providerName}</p>
				<p>Numero de Factura: {modalData?.invoiceData?.invoiceNumber}</p>
				<p>Total: {modalData?.invoiceData?.total}</p>
				<p>Fecha de Emision: {modalData?.invoiceData?.emisionDate}</p>
				<p>Fecha de Vencimiento: {modalData?.invoiceData?.expirationDate}</p>
				<p>Tipo de Documento Proveedor: {modalData?.invoiceData?.providerTypeDoc}</p>
				<p>Email Proveedor: {modalData?.invoiceData?.providerEmail}</p>
				<p>Banco: {modalData?.invoiceData?.bank}</p>
				<p>Tipo de Cuenta: {modalData?.invoiceData?.accountType}</p>
				<p>Numero de Cuenta: {modalData?.invoiceData?.accountNumber}</p>
			</div>
			<form class="ml-4 mt-2">
				<p class="font-bold">Informacion de los errores</p>
				{#each modalData?.error?.issues as error, index (index)}
					<div class="mb-4">
						<p class="font-bold text-red-500">
							{modalData?.error?.excelField[index]} - {error?.path[0]}
						</p>
						<p>{error.message}</p>
						<input
							disabled={editMode}
							class={`border border-gray-300 rounded-md p-1 w-full my-1 ${
								editMode ? 'bg-gray-200' : 'bg-white'
							}`}
							type="text"
							bind:value={formValues[modalData.rowIndex][invoiceMapByProps[error?.path[0]]]}
						/>
					</div>
				{/each}
				<div>
					{#if editMode}
						<button on:click={toogleEditMode} class="btn btn-fix my-1">Corregir</button>
					{:else}
						<button on:click={toogleEditMode} class="btn btn-cancel my-1">Cancelar</button>
					{/if}
					{#if !editMode}
						<button
							on:click={() => dispatch('updateTableRow', formValues)}
							class="btn btn-save my-1">Guardar</button
						>
					{/if}
				</div>
			</form>
		</div>
	</div>
</div>

<!-- bind:value={tableData[modalData.rowIndex][invoiceMapByProps[error?.path[0]]]} -->
