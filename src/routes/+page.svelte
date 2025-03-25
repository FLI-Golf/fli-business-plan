<script lang="ts">
  import { goto } from '$app/navigation';
  import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "$lib/components/ui/menubar";
  import { pb } from '$lib/pocketbase';
  import { Copyright, LogOut, UserPlus, LogIn } from 'lucide-svelte';

  const isLoggedIn = pb.authStore.isValid;

  function handleLogout() {
    pb.authStore.clear();
    goto('/login');
  }
</script>

<div class="flex flex-col min-h-screen bg-gray-900">
  <Menubar class="border-b border-gray-600 flex justify-between">
    <div class="flex">
      <MenubarMenu>
        <MenubarTrigger class="font-bold">FLI Golf Business Plan</MenubarTrigger>
      </MenubarMenu>
    </div>

    <div class="flex items-center gap-4">
      {#if !isLoggedIn}
        <a href="/login" class="hover:text-primary px-4 py-2 flex items-center gap-2">
          <LogIn class="h-4 w-4" />
          Login
        </a>
        <a href="/register" class="hover:text-primary px-4 py-2 flex items-center gap-2">
          <UserPlus class="h-4 w-4" />
          Register
        </a>
      {:else}
        <a href="/overview" class="hover:text-primary px-4 py-2 flex items-center gap-2">
          Overview
        </a>
        <button on:click={handleLogout} class="hover:text-primary px-4 py-2 flex items-center gap-2">
          <LogOut class="h-4 w-4" />
          Logout
        </button>
      {/if}
    </div>
  </Menubar>

  <div class="flex-grow flex flex-col items-center justify-center">
    <img
      src="/logos/fli_logo.png"
      alt="FLI Logo"
      class="w-48 h-auto mb-8"
    />
   
    <div class="text-center space-y-6">
      <h1 class="text-4xl font-bold text-white">Welcome To The FLI Golf Business Plan</h1>
    </div>
  </div>

  <footer class="bg-gray-800 text-gray-400 py-4 border-t border-gray-700">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-sm">
      <Copyright class="h-4 w-4" />
      <span>2025 FLI Golf. All rights reserved.</span>
    </div>
  </footer>
</div>
