<script lang="ts">
  import { onMount } from "svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import Search from "lucide-svelte/icons/search";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import { pb } from '$lib/pocketbase';
  import {
    Layers,
    TrendingUp,
    DollarSign,
    ShieldCheck,
    BarChart3,
    RefreshCw,
    CircleDollarSign,
    PieChart,
    Landmark,
    ArrowUpRight
  } from "lucide-svelte";

  function getIconForSection(name: string) {
    const n = name.toLowerCase();
    if (n.includes('how') || n.includes('works') || n.includes('stack')) return Layers;
    if (n.includes('need') || n.includes('capital') || n.includes('after')) return CircleDollarSign;
    if (n.includes('dilution') || n.includes('why')) return ShieldCheck;
    if (n.includes('messaging') || n.includes('future') || n.includes('key')) return ArrowUpRight;
    if (n.includes('loan') || n.includes('repayment') || n.includes('strategy')) return Landmark;
    if (n.includes('option')) return RefreshCw;
    if (n.includes('summary')) return PieChart;
    if (n.includes('trend') || n.includes('growth')) return TrendingUp;
    if (n.includes('revenue') || n.includes('profit')) return BarChart3;
    return DollarSign;
  }

  let records: any[] = [];
  let searchQuery = "";
  let showBackToTop = false;
  let isMobileMenuOpen = false;
  let isAuthenticated = pb.authStore.isValid;

  async function fetchRecords() {
    try {
      const response = await fetch('/api/capital-stack', {
        headers: {
          'Authorization': `Bearer ${pb.authStore.token}`
        }
      });
      const data = await response.json();
      records = data.items;
      console.log("✅ Capital Stack Records Loaded");
    } catch (error) {
      console.error("❌ ERROR: Failed to fetch capital stack records", error);
    }
  }

  function handleScroll() {
    showBackToTop = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    if (isAuthenticated) {
      fetchRecords();
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  $: filteredRecords = records.filter(record =>
    record.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <!-- Sidebar -->
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <div class="flex items-center gap-2">
        <Layers class="h-5 w-5" />
        <span class="font-semibold text-xl">Capital Stack</span>
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto p-4">
      {#if records.length}
        <div class="space-y-2">
          {#each records as record}
            <a
              href={`#section-${record.id}`}
              class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition"
            >
              {record.name}
            </a>
          {/each}
        </div>
      {:else}
        <p class="text-sm text-muted-foreground">No records available</p>
      {/if}
    </nav>
  </aside>

  <!-- Main content -->
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
              placeholder="Search capital stack..."
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
          { label: 'Capital Stack', href: '/capital-stack' }
        ]}
      />

      <!-- Page header -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 shadow-xl mb-4">
          <Layers class="h-10 w-10 text-white" />
        </div>
        <h1 class="text-4xl font-bold mb-2">
          Capital Structure & No-Dilution Strategy
        </h1>
        <div class="h-1 w-32 bg-gradient-to-r from-emerald-500 to-green-500 rounded-full mx-auto"></div>
      </div>

      {#if filteredRecords.length}
        <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {#each filteredRecords as record}
            <div id={`section-${record.id}`} class="border-2 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all bg-card">
              <!-- Card header -->
              <div class="bg-gradient-to-r from-emerald-600 via-emerald-400 to-green-200 dark:from-emerald-950/30 dark:to-green-950/30 p-6 border-b-2">
                <div class="flex items-center gap-4">
                  <div class="shrink-0">
                    <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-green-500 flex items-center justify-center shadow-xl">
                      <svelte:component this={getIconForSection(record.name)} class="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 class="text-3xl font-bold text-white dark:text-emerald-100">{record.name}</h2>
                    <div class="h-1 w-20 bg-gradient-to-r from-white to-green-200 rounded-full mt-2"></div>
                  </div>
                </div>
              </div>

              <!-- Card body -->
              <div class="p-8 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50">
                <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:text-black dark:prose-headings:text-emerald-100 prose-a:text-emerald-600 dark:prose-a:text-emerald-400">
                  {@html record.description}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Layers class="h-8 w-8 text-muted-foreground" />
          </div>
          <p class="text-muted-foreground text-lg">No capital stack records found</p>
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
      <span class="font-semibold text-xl">Capital Stack</span>
      <button class="p-2" on:click={() => isMobileMenuOpen = false}>
        ✕
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#if records.length}
        {#each records as record}
          <a
            href={`#section-${record.id}`}
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            on:click={() => isMobileMenuOpen = false}
          >
            {record.name}
          </a>
        {/each}
      {:else}
        <p class="text-gray-500 text-sm">No records available.</p>
      {/if}
    </nav>
  </div>
{/if}
