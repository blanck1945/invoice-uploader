<script lang="ts">
	import { axiosFetcher } from '../../actions/axios.fetcher';
	import { createEventDispatcher } from 'svelte';
	import { Circle } from 'svelte-loading-spinners';
	import type { BubbleCompany, UserCredentials } from '../../validations/compnayType';

	// Props
	export let credentialsForm: HTMLFormElement;
	export let companyObj: BubbleCompany | undefined;

	// Variables
	let buttonRef: HTMLButtonElement;
	let showValidatingCompanyLoader: boolean = false;
	const dispatch = createEventDispatcher();

	// User credentials
	let credentialsValues: UserCredentials = {
		companyDoc: '',
		companyId: ''
	};

	const getCompany = async (): Promise<void> => {
		showValidatingCompanyLoader = true;
		const companyRsponse = await axiosFetcher('Empresas', credentialsValues);
		dispatch('fetchingCompany', companyRsponse);
		dispatch('openCompanyModal');
		showValidatingCompanyLoader = false;
	};
</script>

<div class="border-r border-l flex flex-col px-4">
	<form on:submit|preventDefault={getCompany} bind:this={credentialsForm} id={'credentialsForm'}>
		<div class="flex flex-col">
			<label for="companyDoc">NIT de la empresa</label>
			<input id="companyDoc" class="border" bind:value={credentialsValues.companyDoc} />
		</div>
		<button bind:this={buttonRef} class="hidden" />
	</form>
	<div class="flex items-center justify-between mt-3">
		<button on:click={() => buttonRef.click()} class="btn btn-save">
			{#if showValidatingCompanyLoader}
				<Circle size="25" unit="px" color="#006200" />
			{:else}
				Validar NIT
			{/if}
		</button>
		{#if companyObj}
			<button on:click={() => dispatch('openCompanyModal')} class="btn btn-open">Ver empresa</button
			>
		{/if}
	</div>
</div>
