<script lang="ts">
	import ModalHeader from '../../atoms/ModalHeader/ModalHeader.svelte';
	import ModalWrapper from '../../atoms/ModalWrapper/ModalWrapper.svelte';
	import { ModalsKeys } from '../../store/modal.store';

	export let invoicesCreadtedArray: number;
</script>

<ModalWrapper>
	<ModalHeader modalId={ModalsKeys.success}>
		<h2 class="text-2xl font-bold text-green-500">Facturas creadas con exito</h2>
	</ModalHeader>
	<div>
		<p>Se crearon {invoicesCreadtedArray} facturas con exito</p>
		<p>Deberias verlas en tu panel de Bubble</p>
	</div>
</ModalWrapper>
