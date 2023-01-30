<script lang="ts">
	export let filename: string;
	export let handleClick: any;
	// export let uploadInput: any;
	// export let handleChange: any;
	// export let file: any;
</script>

<button class="btn btn-upload" on:click={handleClick}>Subir Archivo</button>
<p>{filename}</p>
