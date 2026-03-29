<script lang="ts">
  import { onMount } from "svelte";
  import { Input } from "$lib/components/ui/input/index.js";
  import Search from "lucide-svelte/icons/search";
  import { FileText, TrendingUp, DollarSign, Users, Globe, BarChart2, Shield, Lightbulb, Target, Briefcase, Award, ArrowUpRight, Shirt } from "lucide-svelte";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import { pb } from '$lib/pocketbase';

  function getIconForSection(title: string) {
    const t = title.toLowerCase();
    if (t.includes('overview')) return Shirt;
    if (t.includes('objective')) return Target;
    if (t.includes('audience')) return Users;
    if (t.includes('pre-launch') || t.includes('launch')) return ArrowUpRight;
    if (t.includes('growth') || t.includes('sustained')) return TrendingUp;
    if (t.includes('budget') || t.includes('allocation')) return DollarSign;
    if (t.includes('kpi') || t.includes('metric') || t.includes('success')) return BarChart2;
    if (t.includes('jersey') || t.includes('sample')) return Shirt;
    return FileText;
  }

  let records: any[] = [];
  let searchQuery = "";
  let showBackToTop = false;
  let isMobileMenuOpen = false;

  async function fetchRecords() {
    try {
      const result = await pb.collection('apparel').getList(1, 100, {
        sort: 'order',
        filter: 'title = "Jersey Samples"'
      });
      records = result.items;
    } catch (error) {
      console.error("Failed to fetch apparel records", error);
    }
  }

  function handleScroll() {
    showBackToTop = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    fetchRecords();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  $: filteredRecords = records.filter(r =>
    r.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.body?.toLowerCase().includes(searchQuery.toLowerCase())
  );
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <div class="flex items-center gap-2">
        <Shirt class="h-5 w-5" />
        <span class="font-semibold text-xl">Team Jerseys</span>
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
              {record.title}
            </a>
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
              placeholder="Search jerseys..."
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
          { label: 'Team Jerseys', href: '/apparel' }
        ]}
      />

      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 shadow-xl mb-4">
          <Shirt class="h-10 w-10 text-white" />
        </div>
        <h1 class="text-4xl font-bold mb-2">Team Jerseys</h1>
        <p class="text-xl italic text-muted-foreground mb-4">"Wear the league. Represent the future."</p>
        <div class="max-w-3xl mx-auto text-muted-foreground">
          <p>A first look at the official FLI Golf team jersey designs — built for performance on the course and style off it. Each kit reflects the identity of the league: bold, inclusive, and built to stand out.</p>
        </div>
        <div class="h-1 w-32 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mx-auto mt-4"></div>
      </div>

      {#if filteredRecords.length}
        <div class="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
          {#each filteredRecords as record}
            <div id={`section-${record.id}`} class="border-2 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all bg-card">
              <!-- Card Header -->
              <div class="bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30 p-6 border-b-2">
                <div class="flex items-center gap-4">
                  <div class="shrink-0">
                    <div class="h-16 w-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-xl">
                      <svelte:component this={getIconForSection(record.title)} class="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div>
                    <h2 class="text-3xl font-bold text-violet-900 dark:text-violet-100">{record.title}</h2>
                    <div class="h-1 w-20 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mt-2"></div>
                  </div>
                </div>
              </div>

              <!-- Images (above body if present) -->
              {#if record.images?.length}
                <div class="px-8 pt-8 {record.images.length > 1 ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}">
                  {#each record.images as img}
                    <img
                      src={`${pb.baseUrl}/api/files/${record.collectionId}/${record.id}/${img}?thumb=1200x0`}
                      alt={record.title}
                      class="w-full rounded-xl shadow-md object-contain max-h-[480px]"
                    />
                  {/each}
                </div>
              {/if}

              <!-- Card Content -->
              <div class="p-8 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-900 dark:to-gray-950/50">
                <div class="prose prose-lg dark:prose-invert max-w-none prose-headings:text-violet-900 dark:prose-headings:text-violet-100 prose-a:text-violet-600 dark:prose-a:text-violet-400">
                  {@html record.body}
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <div class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Shirt class="h-8 w-8 text-muted-foreground" />
          </div>
          <p class="text-muted-foreground text-lg">No jersey designs found</p>
          <p class="text-sm text-muted-foreground mt-2">Add a "Jersey Samples" record via the PocketBase admin panel under the <code>apparel</code> collection.</p>
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
      <span class="font-semibold text-xl">Team Jerseys</span>
      <button class="p-2" on:click={() => isMobileMenuOpen = false}>✕</button>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#if records.length}
        {#each records as record}
          <a
            href={`#section-${record.id}`}
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            on:click={() => isMobileMenuOpen = false}
          >
            {record.title}
          </a>
        {/each}
      {:else}
        <p class="text-gray-500 text-sm">No sections available.</p>
      {/if}
    </nav>
  </div>
{/if}
