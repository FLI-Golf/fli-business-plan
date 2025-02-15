<script lang="ts">
	import { onMount } from 'svelte';
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";

	let { children } = $props();
	
	onMount(() => {
		// Set dark mode as default
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	});
</script>
<ModeWatcher />
{@render children()}
