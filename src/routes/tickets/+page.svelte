<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import Search from "lucide-svelte/icons/search";
  import Section from "$lib/components/ui/Section.svelte";
  import { Home, Ticket, Users, TrendingUp, PieChart, Wallet, Target, BarChart3, LineChart, Coins, CreditCard, Banknote } from "lucide-svelte";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import { pb } from '$lib/pocketbase';

  function getIconForSection(name: string) {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('revenue') || nameLower.includes('income') || nameLower.includes('earning')) return TrendingUp;
    if (nameLower.includes('market') || nameLower.includes('analysis') || nameLower.includes('breakdown')) return PieChart;
    if (nameLower.includes('funding') || nameLower.includes('capital') || nameLower.includes('investment')) return Wallet;
    if (nameLower.includes('goal') || nameLower.includes('objective') || nameLower.includes('target')) return Target;
    if (nameLower.includes('growth') || nameLower.includes('projection') || nameLower.includes('forecast')) return BarChart3;
    if (nameLower.includes('financial') || nameLower.includes('finance') || nameLower.includes('budget')) return LineChart;
    if (nameLower.includes('return') || nameLower.includes('roi') || nameLower.includes('profit')) return Coins;
    if (nameLower.includes('payment') || nameLower.includes('transaction')) return CreditCard;
    if (nameLower.includes('cost') || nameLower.includes('expense') || nameLower.includes('price')) return Banknote;
    if (nameLower.includes('attendee') || nameLower.includes('audience') || nameLower.includes('crowd')) return Users;
    return Ticket;
  }

  let ticketsRecords = [];
  let searchQuery = "";
  let currentHash = "";
  let showBackToTop = false;
  let isMobileMenuOpen = false;
  let isAuthenticated = pb.authStore.isValid;
  let userData = pb.authStore.model;

  async function fetchTicketsRecords() {
    try {
      const response = await fetch('/api/tickets', {
        headers: {
          'Authorization': `Bearer ${pb.authStore.token}`
        }
      });
      const data = await response.json();
      ticketsRecords = data.items;
      console.log("✅ Tickets Records Updated!");
    } catch (error) {
      console.error("❌ ERROR: Failed to fetch tickets records", error);
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
      fetchTicketsRecords();
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  $: filteredRecords = ticketsRecords.filter(record =>
    record.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <div class="flex items-center gap-2">
        <Ticket class="h-5 w-5" />
        <span class="font-semibold text-xl">Ticket Packages</span>
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto p-4">
      {#if ticketsRecords.length}
        <div class="space-y-2">
          {#each ticketsRecords as record}
            <div class="space-y-1">
              <a
                href={`#section-${record.id}`}
                class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition"
              >
                {record.name}
              </a>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-sm text-muted-foreground">No records available</p>
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
              placeholder="Search ticket packages..."
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
          { label: 'Tickets', href: '/tickets' }
        ]}
      />

      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-xl mb-4">
          <Ticket class="h-10 w-10 text-white" />
        </div>
        <h1 class="text-4xl font-bold mb-2">
          Conservative Ticket Packages & Pricing
        </h1>
        <div class="h-1 w-32 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
      </div>

      {#if filteredRecords.length}
        <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {#each filteredRecords as record}
            <div id={`section-${record.id}`} class="border-2 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all bg-card">
              <div class="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 border-b-2">
                <div class="flex items-center gap-4">
                  <div class="shrink-0">
                    <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-xl">
                      <svelte:component this={getIconForSection(record.name)} class="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 class="text-3xl font-bold text-blue-900 dark:text-blue-100">{record.name}</h2>
                    <div class="h-1 w-20 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-2"></div>
                  </div>
                </div>
              </div>
              
              <div class="p-8 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50">
                <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:text-blue-900 dark:prose-headings:text-blue-100 prose-a:text-blue-600 dark:prose-a:text-blue-400">
                  {@html record.description}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Ticket class="h-8 w-8 text-muted-foreground" />
          </div>
          <p class="text-muted-foreground text-lg">No ticket packages found</p>
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
      <span class="font-semibold text-xl">Ticket Packages</span>
      <button class="p-2" on:click={() => isMobileMenuOpen = false}>
        ✕
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#if ticketsRecords.length}
        {#each ticketsRecords as record}
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
