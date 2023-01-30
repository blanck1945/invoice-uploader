<script lang="ts">
	import type { Modals } from '../../types/types';
	import { modals } from '../../store/modal.store';

	export let modalId: string;
</script>

<div class="w-full flex justify-between border-b mt-2 pb-2">
	<slot />
	<button on:click={() => modals.toogleModal(modalId)}>X</button>
</div>
