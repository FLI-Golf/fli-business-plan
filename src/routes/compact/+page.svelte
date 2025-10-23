<script lang="ts">
  import { onMount } from "svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import Search from "lucide-svelte/icons/search";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import { List, Disc3, FileText, ChevronUp } from "lucide-svelte";
  import { pb } from '$lib/pocketbase';

  let compactRecords = [];
  let searchQuery = "";
  let showBackToTop = false;
  let isMobileMenuOpen = false;
  let isAuthenticated = pb.authStore.isValid;
  let userData = pb.authStore.model;

  async function fetchCompactRecords() {
    try {
      const records = await pb.collection('compact').getList(1, 50, {
        sort: 'order'
      });
      compactRecords = records.items;
      console.log("✅ Compact Records Updated!");
    } catch (error) {
      console.error("❌ ERROR: Failed to fetch compact records", error);
    }
  }

  function handleScroll() {
    showBackToTop = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    fetchCompactRecords();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  $: filteredRecords = compactRecords.filter(record =>
    record.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.body?.toLowerCase().includes(searchQuery.toLowerCase())
  );
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <div class="flex items-center gap-2">
        <List class="h-5 w-5" />
        <span class="font-semibold text-xl">Compact</span>
      </div>
    </div>
    <nav class="flex-1 overflow-y-auto p-4">
      {#if compactRecords.length}
        <div class="space-y-2">
          {#each compactRecords as record}
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
        <p class="text-sm text-muted-foreground">No compact records available</p>
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
              placeholder="Search compact content..."
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
          { label: 'Compact', href: '/compact' }
        ]}
      />
      <div class="text-center mb-6">
        <h1 class="text-4xl font-bold flex items-center justify-center gap-2">
          <Disc3 class="h-8 w-8 text-orange-500" />
          <span>Growth Potential of Compact Par-3 Disc Golf Facilities</span>
        </h1>
        <div class="max-w-3xl mx-auto mt-4 text-muted-foreground text-sm">
          <p>A Scalable Model for Schools, Gyms, and Urban Spaces</p>
        </div>
      </div>
      
      {#if filteredRecords.length}
        <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
          {#each filteredRecords as record, index}
            <div 
              id={`section-${record.id}`} 
              class="border-2 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all bg-card"
            >
              <div class="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 border-b-2">
                <div class="flex items-center gap-4">
                  <div class="h-14 w-14 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 text-white flex items-center justify-center shadow-lg">
                    <FileText class="h-7 w-7" />
                  </div>
                  <h2 class="text-2xl font-bold text-gray-900">{record.title}</h2>
                </div>
              </div>
              <div class="p-6 bg-white">
                <div class="prose prose-sm max-w-none text-gray-900 [&_p]:text-gray-900 [&_li]:text-gray-900 [&_h1]:text-gray-900 [&_h2]:text-gray-900 [&_h3]:text-gray-900 [&_strong]:text-gray-900">
                  {@html record.body}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-12">
          <p class="text-muted-foreground text-lg">No compact content found</p>
        </div>
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
      <span class="font-semibold text-xl">Compact</span>
      <button class="p-2" on:click={() => isMobileMenuOpen = false}>
        ✕
      </button>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#if compactRecords.length}
        {#each compactRecords as record}
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
