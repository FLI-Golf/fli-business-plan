<script lang="ts">
  import { onMount } from "svelte";
  import { Input } from "$lib/components/ui/input";
  import Search from "lucide-svelte/icons/search";
  import { ChartColumnStacked, Pyramid, AlertTriangle, Target, Zap, Shield, TrendingUp, Award, Flag } from 'lucide-svelte';
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import * as Card from "$lib/components/ui/card";
  import { pb } from '$lib/pocketbase';

  // Icon mapping function for obstacles/advertising
  function getIconForSlide(name: string, type: string) {
    const nameLower = name.toLowerCase();
    if (type === "Advertising") {
      if (nameLower.includes('target') || nameLower.includes('audience')) return Target;
      if (nameLower.includes('growth') || nameLower.includes('reach')) return TrendingUp;
      if (nameLower.includes('brand') || nameLower.includes('logo')) return Award;
      return Flag;
    }
    // Obstacles
    if (nameLower.includes('challenge') || nameLower.includes('issue') || nameLower.includes('problem')) return AlertTriangle;
    if (nameLower.includes('solution') || nameLower.includes('fix') || nameLower.includes('resolve')) return Shield;
    if (nameLower.includes('performance') || nameLower.includes('speed')) return Zap;
    if (nameLower.includes('goal') || nameLower.includes('target')) return Target;
    return Pyramid; // Default icon
  }

  let slides = [];
  let searchQuery = "";
  let isMobileMenuOpen = false;
  let showBackToTop = false;

  function handleScroll() {
    showBackToTop = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }


async function fetchSlides() {
  try {
    console.log("🔄 Fetching slides...");
    const response = await fetch("/api/slides", {
      headers: {
        'Authorization': `Bearer ${pb.authStore.token}`
      }
    });
    const data = await response.json();
    slides = data.slides;
  } catch (error) {
    console.error("❌ Fetch error:", error);
    if (error.status === 401) {
      goto('/login');
    }
  }
}

  onMount(() => {
    fetchSlides();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  $: filteredSlides = slides?.filter(slide =>
    slide?.description?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    slide?.expand?.category?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  $: getImageUrl = (slide: any) => {
    if (slide?.expand?.slide_ref) {
      return `https://few-likely.pockethost.io/api/files/${slide.expand.slide_ref.collectionId}/${slide.expand.slide_ref.id}/${slide.expand.slide_ref.slideImage}`;
    }
    return null;
  };
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6 gap-2">
      <ChartColumnStacked class="h-5 w-5" />
      <h2 class="font-semibold text-xl">Navigation</h2>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-6">
      <!-- Overview Link -->
  {#if slides.length}
        <!-- Advertising Section -->
        <div class="type-group">
          <h3 class="font-medium text-lg mb-3">Advertising</h3>
          <ul class="space-y-2 ml-4">
            {#each slides.filter(s => s.type === "Advertising").sort((a, b) => a.name.localeCompare(b.name)) as slide}
              <li>
                <button
                  class="text-sm hover:text-primary text-left w-full truncate"
                  on:click={() => {
                    document.getElementById(`slide-${slide.id}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {slide.name}
                </button>
              </li>
            {/each}
          </ul>
        </div>

        <!-- Obstacles Section -->
        <div class="type-group">
          <h3 class="font-medium text-lg mb-3">Obstacles</h3>
          <ul class="space-y-2 ml-4">
            {#each slides.filter(s => s.type === "Obstacles").sort((a, b) => a.name.localeCompare(b.name)) as slide}
              <li>
                <button
                  class="text-sm hover:text-primary text-left w-full truncate"
                  on:click={() => {
                    document.getElementById(`slide-${slide.id}`)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {slide.name}
                </button>
              </li>
            {/each}
          </ul>
        </div>
      {:else}
        <p class="text-gray-500 text-sm">No slides available.</p>
      {/if}
    </nav>
  </aside>

  <div class="flex flex-col">
    <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <div class="w-full flex-1 flex items-center gap-4">
        <form class="flex-1">
          <div class="relative">
            <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search slides..."
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
          { label: 'Course Details', href: '/obstacles' }
        ]}
      />

      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 shadow-xl mb-4">
          <Pyramid class="h-10 w-10 text-white" />
        </div>
        <h1 class="text-4xl font-bold mb-2">
          Course Details & Features
        </h1>
        <div class="h-1 w-32 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mx-auto"></div>
      </div>

      {#if filteredSlides.length}
        <!-- Advertising Section -->
        {#if filteredSlides.some(s => s.type === "Advertising")}
          <div class="mb-8">
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
              <Flag class="h-6 w-6 text-amber-600" />
              Advertising Opportunities
            </h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {#each filteredSlides.filter(s => s.type === "Advertising") as slide}
                <div id="slide-{slide.id}" class="border-2 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all bg-card">
                  <!-- Card Header -->
                  <div class="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-4 border-b-2">
                    <div class="flex items-center gap-3">
                      <div class="shrink-0">
                        <div class="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center shadow-lg">
                          <svelte:component this={getIconForSlide(slide.name, slide.type)} class="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div class="flex-1">
                        <h3 class="text-lg font-bold text-blue-900 dark:text-blue-100">{slide.name}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Card Content -->
                  <div class="p-4">
                    {#if slide.slide_ref}
                      <img
                        src={getImageUrl(slide)}
                        alt={slide.name}
                        class="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                      />
                    {/if}
                    <div class="prose prose-sm dark:prose-invert max-w-none">
                      {@html slide.description}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}

        <!-- Obstacles Section -->
        {#if filteredSlides.some(s => s.type === "Obstacles")}
          <div>
            <h2 class="text-2xl font-bold mb-4 flex items-center gap-2">
              <Pyramid class="h-6 w-6 text-amber-600" />
              Course Obstacles
            </h2>
            <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {#each filteredSlides.filter(s => s.type === "Obstacles") as slide}
                <div id="slide-{slide.id}" class="border-2 rounded-2xl overflow-hidden hover:shadow-2xl hover:scale-[1.02] transition-all bg-card">
                  <!-- Card Header -->
                  <div class="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 p-4 border-b-2">
                    <div class="flex items-center gap-3">
                      <div class="shrink-0">
                        <div class="h-12 w-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg">
                          <svelte:component this={getIconForSlide(slide.name, slide.type)} class="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div class="flex-1">
                        <h3 class="text-lg font-bold text-amber-900 dark:text-amber-100">{slide.name}</h3>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Card Content -->
                  <div class="p-4">
                    {#if slide.slide_ref}
                      <img
                        src={getImageUrl(slide)}
                        alt={slide.name}
                        class="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                      />
                    {/if}
                    <div class="prose prose-sm dark:prose-invert max-w-none">
                      {@html slide.description}
                    </div>
                  </div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      {:else}
        <div class="text-center py-12">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Pyramid class="h-8 w-8 text-muted-foreground" />
          </div>
          <p class="text-muted-foreground text-lg">No content found</p>
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
