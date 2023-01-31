<script>
	import '../styles/main.css';
</script>

<nav class="border-b h-16 flex items-center justify-between px-4">
	<p>Version: <span class="font-bold">Beta 0.0.2</span></p>
	<div>
		<a
			class="mr-2 border p-2 rounded-md transition-all hover:bg-slate-400 hover:text-white"
			href="/">Cargar</a
		>
		<a class="border p-2 rounded-md transition-all hover:bg-slate-400 hover:text-white" href="/docs"
			>Documentacion</a
		>
	</div>
</nav>
<main class="flex">
	<slot />
</main>
