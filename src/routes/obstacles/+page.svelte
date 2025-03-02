<script lang="ts">
  import { onMount } from "svelte";
  import { Input } from "$lib/components/ui/input";
  import Search from "lucide-svelte/icons/search";
  import { ChartColumnStacked } from 'lucide-svelte';
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import * as Card from "$lib/components/ui/card";
  import * as Carousel from "$lib/components/ui/carousel";
  import { pb } from '$lib/pocketbase';

  let slides = [];
  let searchQuery = "";
  let isMobileMenuOpen = false;


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

  onMount(fetchSlides);

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
          { label: 'Slides', href: '/slides' }
        ]}
      />

      <div class="w-full p-4 relative max-w-3xl mx-auto">
        <Carousel.Root class="w-full">
          <div class="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <Carousel.Previous />
          </div>
          <Carousel.Content>
            {#each slides as slide (slide.id)}
              <Carousel.Item id="slide-{slide.id}">
                <div class="p-1">
                  <Card.Root>
                    <Card.Header>
                      <Card.Title>{slide.type}</Card.Title>
                      <Card.Description>{slide.name}</Card.Description>
                    </Card.Header>
                    <Card.Content>
                      {#if slide.slide_ref}
                        <img
                          src={getImageUrl(slide)}
                          alt={slide.name}
                          class="w-full h-72 object-cover rounded-md mb-4"
                        />
                      {/if}
                      {@html slide.description}
                    </Card.Content>
                  </Card.Root>
                </div>
              </Carousel.Item>
            {/each}
          </Carousel.Content>          <div class="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <Carousel.Next />
          </div>
        </Carousel.Root>
      </div>
    </main>
  </div>
</div>
