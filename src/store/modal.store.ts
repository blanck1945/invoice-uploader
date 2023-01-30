import { writable } from 'svelte/store';

export interface ModalsHandler {
	company: boolean;
	invoice: boolean;
	success: boolean;
}

export const ModalsKeys = {
	company: 'company',
	invoice: 'invoice',
	success: 'success'
} as const;

function modalInit() {
	const { subscribe, update } = writable<ModalsHandler>({
		invoice: false,
		company: false,
		success: false
	});

	return {
		subscribe,
		toogleModal: (modal: string) =>
			update((n: any) => {
				return {
					...n,
					[modal]: !n[modal]
				};
			})
	};
}

export const modals = modalInit();
