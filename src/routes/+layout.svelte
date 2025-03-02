<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { onMount } from 'svelte';
	import '../app.css';
	import { ModeWatcher } from "mode-watcher";
	
	let currentUser = pb.authStore.model;
	
	onMount(() => {
		console.log("✅ DEBUG: Current User:", currentUser);
		// Set dark mode as default
		document.documentElement.classList.add('dark');
		localStorage.setItem('theme', 'dark');
	});
</script>
<ModeWatcher />
<slot />
