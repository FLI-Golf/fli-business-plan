<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import Search from "lucide-svelte/icons/search";
  import { Home, Triangle } from "lucide-svelte";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import * as Card from "$lib/components/ui/card";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import * as Carousel from "$lib/components/ui/carousel";

  let obstacles = [];
  let searchQuery = "";
  let isMobileMenuOpen = false;

  async function fetchObstacles() {
    try {
      const response = await fetch("/api/obstacles");
      const data = await response.json();
      obstacles = data;
    } catch (error) {
      console.error("Failed to fetch obstacles data", error);
    }
  }

  onMount(fetchObstacles);

  $: filteredObstacles = obstacles?.filter(obstacle =>
    obstacle?.description?.toLowerCase().includes(searchQuery?.toLowerCase() || '') ||
    obstacle?.expand?.category?.name?.toLowerCase().includes(searchQuery?.toLowerCase() || '')
  ) || [];

  $: getImageUrl = (obstacle) => 
    `https://few-likely.pockethost.io/api/files/${obstacle.collectionId}/${obstacle.id}/${obstacle.avatar}`;
</script>
<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <!-- Sidebar -->
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <h2 class="font-semibold text-xl">Categories</h2>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-4">
      {#if obstacles.length}
        {#each [...new Set(obstacles.map(o => o.expand?.category?.name))] as categoryName}
          <div class="category-group">
            <h3 class="font-medium text-lg mb-2">{categoryName}</h3>
          </div>
        {/each}
      {:else}
        <p class="text-gray-500 text-sm">No categories available.</p>
      {/if}
    </nav>
  </aside>
  <!-- Main Content -->
  <div class="flex flex-col">
    <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <button 
        class="md:hidden p-2"
        on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
      >
        <Triangle class="h-6 w-6" />
      </button>

      <div class="w-full flex-1 flex items-center gap-4">
        <form class="flex-1">
          <div class="relative">
            <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search obstacles..."
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
      <Breadcrumb 
        items={[
          { label: 'Home', href: '/overview' },
          { label: 'Obstacles', href: '/obstacles' }
        ]} 
      />

      <div class="w-full p-4">
        <Carousel.Root class="w-full">
          <Carousel.Content>
            {#each obstacles as obstacle}
              <Carousel.Item class="md:basis-1/2 lg:basis-1/3">
                <div class="p-1">
                  <Card.Root>
                    <Card.Header>
                      <Card.Title>{obstacle.expand?.category?.name || 'Uncategorized'}</Card.Title>
                      <Card.Description>
                        Created: {new Date(obstacle.created).toLocaleDateString()}
                      </Card.Description>
                    </Card.Header>
                    <Card.Content>
                      {@html obstacle.description}
                      {#if obstacle.avatar}
                        <img
                          src={`https://few-likely.pockethost.io/api/files/${obstacle.collectionId}/${obstacle.id}/${obstacle.avatar}`}
                          alt={obstacle.expand?.category?.name}
                          class="w-full h-48 object-cover rounded-md"
                        />
                      {/if}
                    </Card.Content>
                  </Card.Root>
                </div>
              </Carousel.Item>
            {/each}
          </Carousel.Content>
          <div class="flex justify-center gap-2 mt-4">
            <Carousel.Previous />
            <Carousel.Next />
          </div>
        </Carousel.Root>
      </div>
    </main>
  </div>
</div>
<!-- Mobile Menu -->
{#if isMobileMenuOpen}
  <div class="fixed inset-0 z-50 bg-background md:hidden">
    <div class="h-14 border-b px-4 flex items-center justify-between">
      <h2 class="font-semibold text-xl">Obstacles</h2>
      <button class="p-2" on:click={() => isMobileMenuOpen = false}>✕</button>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#if obstacles.length}
        {#each obstacles as obstacle}
          <a
            href={`#obstacle-${obstacle.id}`}
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            on:click={() => isMobileMenuOpen = false}
          >
            {obstacle.expand?.category?.name || 'Uncategorized'}
          </a>
        {/each}
      {:else}
        <p class="text-gray-500 text-sm">No obstacles available.</p>
      {/if}
    </nav>
  </div>
{/if}
