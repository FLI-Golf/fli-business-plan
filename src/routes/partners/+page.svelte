<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Input } from "$lib/components/ui/input";
  import Search from "lucide-svelte/icons/search";
  import { Handshake } from "lucide-svelte";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import { pb } from '$lib/pocketbase';
  import { Badge } from "$lib/components/ui/badge";

  let partners: any[] = [];
  let selectedCategory = "Partner";
  let searchQuery = "";
  let showBackToTop = false;
  let isMobileMenuOpen = false;
  $: getImageUrl = (partner) => {
    if (partner?.expand?.avatar) {
      return `https://few-likely.pockethost.io/api/files/${partner.expand.avatar.collectionId}/${partner.expand.avatar.id}/${partner.expand.avatar.image}`;
    }
    return null;
  };

  async function fetchPartners() {
    try {
      const response = await pb.collection('partners').getList(1, 50, {
        expand: 'avatar',
        sort: '-created'
      });
      partners = response.items;
      console.log("Partners loaded:", partners);
    } catch (error) {
      console.error("Failed to fetch partners data", error);
    }
  }
  

  function handleScroll() {
    showBackToTop = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    fetchPartners();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  $: filteredPartners = partners.filter(partner =>
    partner.name?.toLowerCase().includes(searchQuery.toLowerCase()) &&
    partner.categories === selectedCategory
  );
</script>


<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <div class="flex items-center gap-2">
        <Handshake class="h-5 w-5" />
        <h2 class="font-semibold text-xl">Partners</h2>
      </div>
    </div>
    <nav class="flex-1 overflow-y-auto p-4">
      <div class="space-y-2">
        <button 
          class={`block w-full px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition ${selectedCategory === 'Partner' ? 'bg-muted' : ''}`}
          on:click={() => selectedCategory = 'Partner'}
        >
          Partners
        </button>
        <button 
          class={`block w-full px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition ${selectedCategory === 'Pendending Partner' ? 'bg-muted' : ''}`}
          on:click={() => selectedCategory = 'Pendending Partner'}
        >
          Pending Partners
        </button>
      </div>
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
              placeholder="Search partners..."
              class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
              bind:value={searchQuery}
            />
          </div>
        </form>

        <a href="/overview" class="text-foreground hover:text-foreground transition-colors flex items-center gap-3">
          <img src="/logos/fli_logo.png" alt="FLI Logo" class="h-12 w-12" />
          Overview
        </a>
      </div>
    </header>

    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/overview' },
          { label: 'Partners', href: '/partners' }
        ]}
      />
      {#if partners.length}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {#each filteredPartners as partner}
            <div class="bg-card border-2 border-primary rounded-lg p-6 shadow-lg">
              <div class="flex flex-col items-center gap-6">
                {#if partner.expand?.avatar}
                  <img
                    src={`${pb.baseUrl}/api/files/${partner.expand.avatar.collectionId}/${partner.expand.avatar.id}/${partner.expand.avatar.image}`}
                    alt={partner.name}
                    class="w-38 h-24 object-cover"
                  />
                {/if}
                <div class="text-center space-y-3">
                  <h2 class="text-2xl font-bold">{partner.name}</h2>
                  <Badge variant="outline">{partner.type}</Badge>
                  <a 
                    href={partner.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="text-primary hover:underline"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>
          {/each}
        </div>
      {:else}
        <p class="text-gray-600">Loading partners...</p>
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
      <div class="flex items-center gap-2">
        <Handshake class="h-5 w-5" />
        <h2 class="font-semibold text-xl">Partners</h2>
      </div>
      <button class="p-2" on:click={() => isMobileMenuOpen = false}>✕</button>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      <button 
        class="block w-full px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition text-left"
        on:click={() => {
          selectedCategory = 'Partner';
          isMobileMenuOpen = false;
        }}
      >
        Partners
      </button>
      <button 
        class="block w-full px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition text-left"
        on:click={() => {
          selectedCategory = 'Pendending Partner';
          isMobileMenuOpen = false;
        }}
      >
        Pending Partners
      </button>
    </nav>
  </div>
{/if}

