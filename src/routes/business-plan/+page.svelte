<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import Search from "lucide-svelte/icons/search";
  import Section from "$lib/components/ui/Section.svelte";
  import { Home, Scale } from "lucide-svelte";

  let businessDocs = null;
  let sections = [];
  let searchQuery = "";
  let currentHash = "";
  let showBackToTop = false;
  let isMobileMenuOpen = false;

  async function fetchBusinessPlanDocs() {
    console.log("Fetching business-plan documents...");
    try {
      const response = await fetch('/api/business-plan');
      const data = await response.json();
      
      // Update to match the API response structure
      businessDocs = {
        name: data.businessPlan.name,
        version: data.businessPlan.version || "1.0",
        updated: data.businessPlan.updated,
        id: data.businessPlan.id
      };
      
      // Map sections with their subsections
      sections = data.sections.map(section => ({
        id: section.id,
        order: section.order,
        title: section.title,
        subsections: section.subsections.map(sub => ({
          id: sub.id,
          title: sub.title,
          content: sub.content,
          order: sub.order
        }))
      }));

      console.log("✅ Business Plan Documents Updated!");
    } catch (error) {
      console.error("❌ ERROR: Failed to fetch business-plan documents", error);
    }
  }
  function updateHash() {
    currentHash = window.location.hash.slice(1);
  }

  async function refreshPage(event: Event) {
    event.preventDefault();
    await goto("/business-plan");
    setTimeout(() => {
      window.location.reload();
    }, 200);
  }

  function handleScroll() {
    showBackToTop = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    fetchBusinessPlanDocs();
    updateHash();
    window.addEventListener("hashchange", updateHash);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("hashchange", updateHash);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  $: filteredSections = sections
    .filter(section => !currentHash || `section-${section.id}` === currentHash)
    .map(section => ({
      ...section,
      subsections: section.subsections.filter(sub =>
        sub.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }))
    .filter(section => section.subsections.length > 0 || !searchQuery);
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      {#if businessDocs}
        <div class="flex items-center gap-2">
          <Scale class="h-5 w-5" />
          <a
            href="/business-plan"
            class="font-semibold text-xl hover:underline"
            on:click={refreshPage}
          >
            {businessDocs.name}
          </a>
        </div>
      {:else}
        <h2 class="font-semibold text-xl">Loading...</h2>
      {/if}
    </div>

    <nav class="flex-1 overflow-y-auto p-4">
      {#if sections.length}
        <div class="space-y-2">
          {#each sections as section}
            <div class="space-y-1">
              <a
                href={`#section-${section.id}`}
                class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition"
              >
                {section.order}. {section.title}
              </a>
              {#if section.subsections?.length}
                <div class="ml-4 space-y-1">
                  {#each section.subsections as subsection}
                    <a
                      href={`#section-${section.id}-${subsection.id}`}
                      class="block px-2 py-1 text-sm text-muted-foreground hover:text-foreground transition"
                    >
                      {subsection.title}
                    </a>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-sm text-muted-foreground">No sections available</p>
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
              placeholder="Search business plan..."
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
      {#if businessDocs}
        <h1 class="text-2xl font-bold">{businessDocs.name}</h1>
        <p class="text-sm text-gray-500">
          Version {businessDocs.version} | Updated: {new Date(businessDocs.updated).toLocaleDateString()}
        </p>

        {#each filteredSections as section}
          <Section id={`section-${section.id}`} {section} />
        {/each}
      {:else}
        <p class="text-gray-600">Loading business-plan documents...</p>
      {/if}
    </main>
  </div>
</div>

{#if showBackToTop}
  <button
    class="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-md hover:bg-blue-700 transition"
    on:click={scrollToTop}
  >
    ⬆️ Top
  </button>
{/if}

{#if isMobileMenuOpen}
  <div class="fixed inset-0 z-50 bg-background md:hidden">
    <div class="h-14 border-b px-4 flex items-center justify-between">
      {#if businessDocs}
        <span class="font-semibold text-xl">{businessDocs.name}</span>
      {:else}
        <span class="font-semibold text-xl">Loading...</span>
      {/if}
      
      <button class="p-2" on:click={() => isMobileMenuOpen = false}>
        ✕
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#if sections.length}
        {#each sections as section}
          <a
            href={`#section-${section.id}`}
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            on:click={() => isMobileMenuOpen = false}
          >
            {section.order}. {section.title}
          </a>
        {/each}
      {:else}
        <p class="text-gray-500 text-sm">No sections available.</p>
      {/if}
    </nav>
  </div>
{/if}
