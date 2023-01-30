<script lang="ts">
	export let tailwindClass: string = '';
</script>

<div class={`fixed left-0 top-0 bg-opacity-70 w-full h-screen z-50 bg-black flex justify-center`}>
	<div class={`flex flex-col  mx-8 px-4 rounded-md bg-white my-8 ${tailwindClass}`}>
		<slot />
	</div>
</div>
