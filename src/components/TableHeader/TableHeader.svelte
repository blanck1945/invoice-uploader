<script lang="ts">
	import type { Invoice } from '../../validations/validateType';

	export let invoicesObj: Invoice[];
</script>

<div class="flex items-center justify-between mt-2">
	<h2 class="font-bold text-lg mr-12">Resultado de la carga</h2>
	<p class="font-bold">Cantidad de facturas: {invoicesObj.length}</p>
</div>
