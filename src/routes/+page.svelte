<script lang="ts">
	import readXlsxFile from 'read-excel-file';
	import type { Row } from 'read-excel-file';
	import { validateSchema, type Invoice } from '../validations/validateType';
	import { createInvoiceObject, filterInvoiceByInvoceNumber } from '../helpers/invoice.herlpers';
	import InvoiceModal from '../components/InvoiceModal/InvoiceModal.svelte';
	import TableHeader from '../components/TableHeader/TableHeader.svelte';
	import type { DataToSend, ExcelArrayData, ResultIndicator } from '../types/types';
	import CredentialsInputs from '../components/CredentialsInputs/CredentialsInputs.svelte';
	import UploadIntpus from '../components/UploadInputs/UploadIntpus.svelte';
	import type { BubbleCompany } from '../validations/compnayType';
	import { axiosSender, LambdaKeys } from '../actions/axios.sender';
	import CompanyModal from '../components/CompanyModal/CompanyModal.svelte';
	import Table from '../components/Table/Table.svelte';
	import SelectEntity from '../components/SelectEntity/SelectEntity.svelte';
	import SuccessModal from '../components/SuccessModal/SuccessModal.svelte';
	import { modals } from '../store/modal.store';
	import { ModalsKeys } from '../store/modal.store';
	import InvoiceActions from '../components/InvoiceActions/InvoiceActions.svelte';

	// Variables
	let file: Row[] = [];
	let tableData: ExcelArrayData[] = [];
	let invoicesObj: Invoice[] = [];
	let companyObj: BubbleCompany | undefined = undefined;
	let invoicesCreadtedArray: number = 0;
	let hasInvalidValues: ResultIndicator[] = [];
	let resultIndicator: any[] = [];
	let modalData: any = null;
	let filename: string = 'Subir un archivo';
	let validInvoices: boolean = false;
	let showCreatingInvoiceLoader: boolean = false;
	// HTML elements
	let uploadInput: HTMLInputElement;
	let credentialsForm: HTMLFormElement;

	const removeNullFiles = (arr: any[]) => {
		const validRows: any[] = [];
		arr.forEach((item) => {
			for (let i = 0; i < item?.length; i++) {
				if (item[i] !== null) {
					validRows.push(item);
					break;
				}
			}
		});
		return validRows;
	};

	const handleChange = async (e: any) => {
		validInvoices = false;
		try {
			file = await readXlsxFile(e.target.files[0]);
			filename = e.target.files[0].name;
			const validFile = removeNullFiles(file);
			await validateData(validFile);
		} catch (err) {
			console.error(err);
		}
	};

	const validateData = async (validFile: any[], trimData: boolean = true) => {
		if (trimData) {
			tableData = validFile.splice(3, validFile?.length);
		} else {
			tableData = validFile;
		}

		invoicesObj = createInvoiceObject(tableData);

		const { validationHasInvalidValues, result, hasErrors } = await validateSchema(invoicesObj);

		hasInvalidValues = validationHasInvalidValues;
		resultIndicator = result;
		validInvoices = hasErrors;
	};

	const showModal = (index: number) => {
		const hasNoError = resultIndicator[index].success;
		if (hasNoError) return;

		modals.toogleModal(ModalsKeys.invoice);
		modalData = {
			error: resultIndicator[index],
			invoiceData: invoicesObj[index],
			rowIndex: index
		};
	};

	const handleClick = () => uploadInput.click();

	const postInvoices = async () => {
		showCreatingInvoiceLoader = true;
		const dataToSend: DataToSend = {
			companyDoc: companyObj?.nit_empresa.toString(),
			companyId: companyObj?._id,
			invoices: filterInvoiceByInvoceNumber(invoicesObj)
		};

		await axiosSender(dataToSend, LambdaKeys['upload-invoice']);

		invoicesCreadtedArray = dataToSend.invoices.length;

		modals.toogleModal(ModalsKeys.success);
		showCreatingInvoiceLoader = false;
	};

	const updateInvoiceRow = async (formValues: any) => {
		await validateData(formValues.detail, false);
		modals.toogleModal(ModalsKeys.invoice);
	};
</script>

<div class="w-full px-2">
	{#if $modals.invoice}
		<InvoiceModal {modalData} {tableData} on:updateTableRow={updateInvoiceRow} />
	{/if}
	{#if $modals.company}
		<CompanyModal {companyObj} tailwindClass="w-1/3 h-1/2" />
	{/if}
	{#if $modals.success}
		<svelte:component this={SuccessModal} {invoicesCreadtedArray} />
	{/if}
	<div class="grid grid-cols-4 h-28 border-b w">
		<div class="flex items-center justify-center flex-col border-r">
			<UploadIntpus {filename} {handleClick} />
			<input
				on:change={handleChange}
				bind:value={file}
				bind:this={uploadInput}
				type="file"
				title="texto custom"
				class="text-sm"
			/>
		</div>
		<CredentialsInputs
			on:openCompanyModal={() => modals.toogleModal(ModalsKeys.company)}
			on:fetchingCompany={(props) => (companyObj = props.detail)}
			{credentialsForm}
			{companyObj}
		/>
		<InvoiceActions
			{companyObj}
			{hasInvalidValues}
			{invoicesObj}
			{postInvoices}
			{validInvoices}
			{showCreatingInvoiceLoader}
		/>
		<SelectEntity />
	</div>

	<TableHeader {invoicesObj} />
	<Table {resultIndicator} {showModal} {tableData} />
</div>

<style>
	input[type='file'] {
		opacity: 0;
	}

	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
</style>
