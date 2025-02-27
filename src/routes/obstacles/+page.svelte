<script lang="ts">
  import { onMount } from "svelte";
  import { Input } from "$lib/components/ui/input";
  import Search from "lucide-svelte/icons/search";
  import { ChartColumnStacked } from 'lucide-svelte';
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import * as Card from "$lib/components/ui/card";
  import * as Carousel from "$lib/components/ui/carousel";

  let slides = [];
  let searchQuery = "";
  let isMobileMenuOpen = false;

  async function fetchSlides() {
    try {
      const response = await fetch("/api/obstacles");
      const data = await response.json();
      slides = data.sort((a: any, b: any) => {
        return new Date(b.created).getTime() - new Date(a.created).getTime();
      });
    } catch (error) {
      console.error("Failed to fetch slides data", error);
    }
}
  onMount(fetchSlides);

  $: filteredSlides = slides?.filter(slide =>
    slide?.description?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    slide?.expand?.category?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  );

  $: getImageUrl = (slide: any) => {
    if (slide?.expand?.avatar) {
      return `https://few-likely.pockethost.io/api/files/${slide.expand.avatar.collectionId}/${slide.expand.avatar.id}/${slide.expand.avatar.image}`;
    }
    return null;
  };
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6 gap-2">
      <ChartColumnStacked class="h-5 w-5" />
      <h2 class="font-semibold text-xl">Categories</h2>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-4">
      {#if slides.length}
        {#each [...new Set(slides.map(s => s.expand?.category?.name))] as categoryName}
          <div class="category-group">
            <button
              class="font-medium text-lg mb-2 hover:text-primary"
              on:click={() => {
                const categoryId = slides.find(s => s.expand?.category?.name === categoryName)?.expand?.category?.id;
                document.getElementById(`slide-category-${categoryId}`)?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              {categoryName}
            </button>
          </div>
        {/each}
      {:else}
        <p class="text-gray-500 text-sm">No categories available.</p>
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
      </div>
    </header>

    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/overview' },
          { label: 'Slides', href: '/slides' }
        ]}
      />

      <div class="w-full p-4 relative max-w-2xl mx-auto">
        <Carousel.Root class="w-full">
          <div class="absolute top-1/2 -translate-y-1/2 left-4 z-10">
            <Carousel.Previous />
          </div>
          
          <Carousel.Content>
            {#each slides as slide (slide.id)}
              <Carousel.Item id="slide-category-{slide.expand?.category?.id}">
                <div class="p-1">
                  <Card.Root>
                    <Card.Header>
                      <Card.Title>{slide.expand?.category?.name || 'Uncategorized'}</Card.Title>
                    </Card.Header>
                    <Card.Content>
                      {#if slide.expand?.avatar}
                        <img
                          src={getImageUrl(slide)}
                          alt={slide.expand?.category?.name}
                          class="w-full h-48 object-cover rounded-md mb-4"
                        />
                      {/if}
                      {@html slide.description}
                    </Card.Content>
                  </Card.Root>
                </div>
              </Carousel.Item>
            {/each}
          </Carousel.Content>
          
          <div class="absolute top-1/2 -translate-y-1/2 right-4 z-10">
            <Carousel.Next />
          </div>
        </Carousel.Root>
      </div>
    </main>
  </div>
</div>
