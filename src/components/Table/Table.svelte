<script lang="ts">
	import { parseStringToDate } from '../../helpers/invoice.herlpers';

	export let tableData: any;
	export let showModal: any;
	export let resultIndicator: any;
</script>

<table class="mt-2 ">
	<thead>
		<tr class="font-normal border-t border-b">
			<th class="border-r border-l">ID del proveedor (N° NIT/CC)</th>
			<th class="border-r">Nombre Proveedor</th>
			<th class="border-r">N° Factura/Documento</th>
			<th class="border-r">Monto</th>
			<th class="border-r">Fecha emisión</th>
			<th class="border-r">Fecha Vencimiento</th>
			<th class="border-r">Tipo ID (NIT/Cédula)</th>
			<th class="border-r">Mail Proveedor</th>
			<th class="border-r">Nombre del Banco</th>
			<th class="border-r">Tipo Cuenta (Ahorros/Corriente)</th>
			<th class="border-r">N° de Cuenta</th>
		</tr>
	</thead>
	<tbody>
		{#each tableData as row, index}
			<tr
				on:click={() => showModal(index)}
				class={`border border-black ${resultIndicator[index]?.styles}`}
			>
				<td class="border-r border-black">{row[0]}</td>
				<td class="border-r border-black ">{row[1]}</td>
				<td class="border-r border-black">{row[2]}</td>
				<td class="border-r border-black">{row[3]}</td>
				<td class="border-r border-black">{parseStringToDate(row[4])}</td>
				<td class="border-r border-black">{parseStringToDate(row[5])}</td>
				<td class="border-r border-black">{row[6]}</td>
				<td class="border-r border-black">{row[7]}</td>
				<td class="border-r border-black">{row[8]}</td>
				<td class="border-r border-black">{row[9]}</td>
				<td class="border-r border-black">{row[10]}</td>
			</tr>
		{/each}
	</tbody>
</table>
