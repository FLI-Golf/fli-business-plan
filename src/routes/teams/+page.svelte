<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import Search from "lucide-svelte/icons/search";
  import { Home } from "lucide-svelte";

  let teams = [];
  let searchQuery = "";
  let isMobileMenuOpen = false;

async function fetchTeams() {
  try {
    const response = await fetch("/api/teams?expand=avatar,mini_logo");
    const data = await response.json();
    console.log("Full response data:", JSON.stringify(data, null, 2));
    
    if (data.error) {
      console.error("Error:", data.error);
      return;
    }

    teams = data.teams;
  } catch (error) {
    console.error("Failed to fetch teams data", error);
  }
}

  onMount(fetchTeams);

  $: filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <!-- Sidebar -->
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <h2 class="font-semibold text-xl">Teams</h2>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#if teams.length}
        {#each teams as team}
          <a
            href={`#team-${team.id}`}
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
          >
            {team.name}
          </a>
        {/each}
      {:else}
        <p class="text-gray-500 text-sm">No teams available.</p>
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
        <!-- Hamburger Icon -->
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
              placeholder="Search teams..."
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
    {#if teams.length}
        <div class="grid gap-4">
        {#each filteredTeams as team}
      <div id={`team-${team.id}`} class="border rounded-lg p-4 hover:bg-muted/40 transition-colors">
          <div class="flex items-center gap-4">
              <div class="flex flex-col items-center">
                  {#if team.mini_logo}
                  <span class="text-xs text-muted-foreground mb-2">Mini</span>
                  <img
                      src={`https://few-likely.pockethost.io/api/files/pbc_1192491016/${team.mini_logo}/hyzer_heroes_mini_o02iyinjze.png`}
                      alt={`${team.name} mini logo`}
                      class="h-12 w-12 object-cover"
                  />
                  {/if}
              </div>
              <div class="flex flex-col items-center">
                  {#if team.expand?.avatar}
                  <span class="text-xs text-muted-foreground mb-2">Regular</span>
                  <img
                      src={`https://few-likely.pockethost.io/api/files/${team.expand.avatar.collectionId}/${team.expand.avatar.id}/${team.expand.avatar.image}`}
                      alt={team.name}
                      class="h-12 w-12 object-cover rounded-full border-2 border-primary"
                  />
                  {/if}
              </div>
              <h2 class="text-xl font-semibold">{team.name}</h2>
          </div>
      </div>
        {/each}
        </div>
    {:else}
        <p class="text-gray-600">Loading teams...</p>
    {/if}
</main>
  </div>
</div>

<!-- Mobile Menu -->
{#if isMobileMenuOpen}
  <div class="fixed inset-0 z-50 bg-background md:hidden">
    <div class="h-14 border-b px-4 flex items-center justify-between">
      <h2 class="font-semibold text-xl">Teams</h2>
      <button class="p-2" on:click={() => isMobileMenuOpen = false}>✕</button>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#if teams.length}
        {#each teams as team}
          <a
            href={`#team-${team.id}`}
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            on:click={() => isMobileMenuOpen = false}
          >
            {team.name}
          </a>
        {/each}
      {:else}
        <p class="text-gray-500 text-sm">No teams available.</p>
      {/if}
    </nav>
  </div>
{/if}
