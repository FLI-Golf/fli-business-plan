<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import Search from "lucide-svelte/icons/search";
  import { Home } from "lucide-svelte";
  import SponsorshipChart from '$lib/components/charts/SponsorshipChart.svelte';
  import MembershipChart from '$lib/components/charts/MembershipChart.svelte';
  import RevenueChart from '$lib/components/charts/RevenueChart.svelte';

  const financialSections = [
    {
      id: 1,
      order: 1,
      title: "Sponsorship Tiers",
      component: SponsorshipChart,
      description: "Analysis of sponsorship revenue across different tiers"
    },
    {
      id: 2,
      order: 2,
      title: "Membership Growth",
      component: MembershipChart,
      description: "Tracking membership growth and revenue"
    },
    {
      id: 3,
      order: 3,
      title: "Revenue Streams",
      component: RevenueChart,
      description: "Overview of various revenue streams"
    }
  ];

  let searchQuery = "";
  let currentHash = "";
  let showBackToTop = false;
  let isMobileMenuOpen = false;

  function updateHash() {
    currentHash = window.location.hash.slice(1);
  }

  function handleScroll() {
    showBackToTop = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  $: filteredSections = financialSections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <h2 class="font-semibold text-xl">Financial Analysis</h2>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#each financialSections as section}
        <a
          href={`#section-${section.id}`}
          class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
        >
          {section.order}. {section.title}
        </a>
      {/each}
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
              placeholder="Search financials..."
              class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
              bind:value={searchQuery}
            />
          </div>
        </form>

        <a
          href="/overview"
          class="flex items-center gap-2 text-sm font-medium hover:text-primary"
        >
          <Home class="h-4 w-4" />
          <span>Overview</span>
        </a>
      </div>
    </header>

    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {#each filteredSections as section}
        <div id={`section-${section.id}`} class="space-y-4">
          <h2 class="text-2xl font-bold">{section.title}</h2>
          <div class="rounded-lg border bg-card p-6">
            <svelte:component this={section.component} />
            <p class="mt-4 text-sm text-muted-foreground">{section.description}</p>
          </div>
        </div>
      {/each}
    </main>
  </div>
</div>

{#if showBackToTop}
  <button
    class="fixed bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-md hover:bg-primary/90 transition"
    on:click={scrollToTop}
  >
    ⬆️ Top
  </button>
{/if}

{#if isMobileMenuOpen}
  <div class="fixed inset-0 z-50 bg-background md:hidden">
    <div class="h-14 border-b px-4 flex items-center justify-between">
      <span class="font-semibold text-xl">Financial Analysis</span>
      <button
        class="p-2"
        on:click={() => isMobileMenuOpen = false}
      >
        ✕
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#each financialSections as section}
        <a
          href={`#section-${section.id}`}
          class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
          on:click={() => isMobileMenuOpen = false}
        >
          {section.order}. {section.title}
        </a>
      {/each}
    </nav>
  </div>
{/if}
