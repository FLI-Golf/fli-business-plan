<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import Search from "lucide-svelte/icons/search";
    import Section from "$lib/components/ui/Section.svelte";
    import { Home, MessageCircle } from "lucide-svelte";
    import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
    import { pb } from '$lib/pocketbase';
  
    let discordRecords = [];
    let searchQuery = "";
    let currentHash = "";
    let showBackToTop = false;
    let isMobileMenuOpen = false;
    let isAuthenticated = pb.authStore.isValid;
    let userData = pb.authStore.model;
  
    async function fetchDiscordRecords() {
      try {
        const records = await pb.collection('discord').getList(1, 50, {
          sort: 'order'
        });
        discordRecords = records.items;
        console.log("✅ Discord Records Updated!");
      } catch (error) {
        console.error("❌ ERROR: Failed to fetch discord records", error);
      }
    }
  
    function handleScroll() {
      showBackToTop = window.scrollY > 300;
    }
  
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  
    onMount(() => {
      fetchDiscordRecords();
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    });
  
    $: filteredRecords = discordRecords.filter(record =>
      record.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.body?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  </script>
  
  <div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
    <aside class="bg-muted/40 border-r hidden md:flex flex-col">
      <div class="h-14 border-b px-4 flex items-center lg:px-6">
        <div class="flex items-center gap-2">
          <MessageCircle class="h-5 w-5" />
          <span class="font-semibold text-xl">Discord</span>
        </div>
      </div>
      <nav class="flex-1 overflow-y-auto p-4">
        {#if discordRecords.length}
          <div class="space-y-2">
            {#each discordRecords as record}
              <div class="space-y-1">
                <a
                  href={`#section-${record.id}`}
                  class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition"
                >
                  {record.title}
                </a>
              </div>
            {/each}
          </div>
        {:else}
          <p class="text-sm text-muted-foreground">No discord records available</p>
        {/if}
      </nav>
    </aside>
    <div class="flex flex-col">
      <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
        <button
          class="md:hidden p-2"
          on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        
        <div class="w-full flex-1 flex items-center gap-4">
          <form class="flex-1">
            <div class="relative">
              <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
              <Input
                type="search"
                placeholder="Search discord content..."
                class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
                bind:value={searchQuery}
              />
            </div>
          </form>
          
          <a
            href="/overview"
            class="text-foreground hover:text-foreground transition-colors flex items-center gap-3"
          >
            <img src="/logos/fli_logo.png" alt="FLI Logo" class="h-12 w-12" />
            Overview
          </a>
        </div>
      </header>
      <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/overview' },
            { label: 'Discord', href: '/discord' }
          ]}
        />
        <div class="text-center mb-6">
          <h1 class="text-4xl font-bold flex items-center justify-center gap-2">
            <span>💬 Discord Community</span>
          </h1>
          <p class="text-xl mt-2 italic">"Connect, communicate, and collaborate with our community."</p>
          <div class="max-w-3xl mx-auto mt-4 text-muted-foreground">
            <p>Join our Discord community to stay connected with fellow members, participate in discussions, and get the latest updates. Our Discord server is the hub for real-time communication and community engagement.</p>
          </div>
        </div>
        
        {#if filteredRecords.length}
          {#each filteredRecords as record}
            <div id={`section-${record.id}`} class="space-y-4 max-w-4xl">
              <h2 class="text-2xl font-bold">{record.title}</h2>
              <div class="prose max-w-none">
                {@html record.body}
              </div>
            </div>
          {/each}
        {:else}
          <p class="text-gray-600">No discord content found</p>
        {/if}
      </main>
    </div>
  </div>
  
  {#if showBackToTop}
    <button
      class="fixed bottom-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background/90 transition-all flex flex-col items-center gap-2"
      on:click={scrollToTop}
    >
      <div class="flex items-center gap-1 text-sm font-medium">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m18 15-6-6-6 6"/></svg>
        Back to top
      </div>
      <img src="/logos/fli_logo.png" alt="Back to top" class="h-14 w-14" />
    </button>
  {/if}
  
  {#if isMobileMenuOpen}
    <div class="fixed inset-0 z-50 bg-background md:hidden">
      <div class="h-14 border-b px-4 flex items-center justify-between">
        <span class="font-semibold text-xl">Discord</span>
        <button class="p-2" on:click={() => isMobileMenuOpen = false}>
          ✕
        </button>
      </div>
      <nav class="flex-1 overflow-y-auto p-4 space-y-2">
        {#if discordRecords.length}
          {#each discordRecords as record}
            <a
              href={`#section-${record.id}`}
              class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
              on:click={() => isMobileMenuOpen = false}
            >
              {record.title}
            </a>
          {/each}
        {:else}
          <p class="text-gray-500 text-sm">No records available.</p>
        {/if}
      </nav>
    </div>
  {/if}
  