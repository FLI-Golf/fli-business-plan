<script lang="ts">
  import { onMount } from 'svelte';
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import Search from "lucide-svelte/icons/search";
  import Section from "$lib/components/ui/Section.svelte";
  import type { BusinessPlan, Section as SectionType } from '$lib/types';

  let businessPlan: BusinessPlan | null = null;
  let sections: SectionType[] = [];
  let searchQuery = "";
  let currentHash = "";

  // Fetch Business Plan Data
  async function fetchBusinessPlan() {
      try {
          const response = await fetch('/api/business-plan');
          const data = await response.json();

          if (data.error) {
              console.error("❌ ERROR: ", data.error);
              return;
          }

          businessPlan = data.businessPlan;
          sections = data.sections;
      } catch (error) {
          console.error("❌ ERROR: Failed to fetch business plan data", error);
      }
  }

  // Update the hash when URL changes
  function updateHash() {
      currentHash = window.location.hash.slice(1);
  }

  onMount(() => {
      fetchBusinessPlan();
      updateHash(); // Initialize hash value
      window.addEventListener("hashchange", updateHash);
      return () => window.removeEventListener("hashchange", updateHash);
  });

  // Compute Filtered Sections Reactively
  $: filteredSections = sections
      .filter(section => !currentHash || `section-${section.id}` === currentHash) // Filter by section hash
      .map(section => ({
          ...section,
          subsections: section.subsections.filter(sub =>
              sub.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
      }))
      .filter(section => section.subsections.length > 0 || !searchQuery);
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <!-- Sidebar with Sections -->
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <h2 class="font-semibold text-xl">Business Plan</h2>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#if sections.length}
        {#each sections as section}
          <a
            href={`#section-${section.id}`}
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
          >
            {section.order}. {section.title}
          </a>
        {/each}
      {:else}
        <p class="text-gray-500 text-sm">No sections available.</p>
      {/if}
    </nav>
  </aside>

  <!-- Main Content -->
  <div class="flex flex-col">
    <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <!-- Search Bar -->
      <div class="w-full flex-1">
        <form>
          <div class="relative">
            <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search business plan..."
              class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
              bind:value={searchQuery}
            />
          </div>
        </form>
      </div>
    </header>

    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      {#if businessPlan}
        <h1 class="text-2xl font-bold">{businessPlan.name}</h1>
        <p class="text-sm text-gray-500">Version {businessPlan.version} | Updated: {new Date(businessPlan.updated).toLocaleDateString()}</p>

        {#each filteredSections as section}
          <Section id={`section-${section.id}`} {section} />
        {/each}
      {:else}
        <p class="text-gray-600">Loading business plan...</p>
      {/if}
    </main>
  </div>
</div>

