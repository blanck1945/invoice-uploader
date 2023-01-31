<script lang="ts">
	import type { ResultIndicator } from '../../types/types';
	import type { BubbleCompany } from '../../validations/compnayType';
	import type { Invoice } from '../../validations/validateType';
	import { Circle } from 'svelte-loading-spinners';

	export let companyObj: BubbleCompany | undefined;
	export let invoicesObj: Invoice[];
	export let hasInvalidValues: ResultIndicator[];
	export let validInvoices: boolean;
	export let postInvoices: () => Promise<void>;
	export let showCreatingInvoiceLoader: boolean;

	// Computed Props
	$: canSaveInvoices = companyObj === undefined || invoicesObj.length === 0 || !validInvoices;
	$: credentialsState = companyObj === undefined ? 'No hay empresa validada' : 'Empresa valida';
	$: invoiceStateText =
		invoicesObj.length === 0
			? 'No hay facturas cargadas'
			: hasInvalidValues.includes('error')
			? 'ERROR - no se puede cargar'
			: 'OK - Se puede cargar';
</script>

<div class="flex flex-col justify-start px-2">
	<div class="h-1/2">
		<p class={validInvoices ? 'text-green-600' : 'text-red-600'}>
			Facturas: {invoiceStateText}
		</p>
		<p class={companyObj === undefined ? 'text-red-600' : 'text-green-600'}>
			Credenciales: {credentialsState}
		</p>
	</div>
	<div class="mt-1">
		<button
			disabled={canSaveInvoices}
			on:click={postInvoices}
			class={`btn ${Boolean(canSaveInvoices) ? 'btn-disabled' : 'btn-save'} `}
		>
			{#if showCreatingInvoiceLoader}
				<Circle color="#006200" size="25" unit="px" />
			{:else}
				Crear Facturas
			{/if}
		</button>
	</div>
</div>
