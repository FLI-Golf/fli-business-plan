<script lang="ts">
  // Core imports
  import { onMount } from "svelte";
  import { Search, Home } from 'lucide-svelte';
  import { pb } from '$lib/pocketbase';
  import { Disc3 } from "lucide-svelte";

  // UI Components
  import { Input } from "$lib/components/ui/input";
  import { Button } from "$lib/components/ui/button";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";

  // State management
  let teams = [];
  let searchQuery = "";
  let showBackToTop = false;
  let isMobileMenuOpen = false;

  // Functions
  async function fetchTeams() {
    try {
      const response = await pb.collection('teams').getList(1, 50, {
        expand: 'avatar,mini_logo',
        fields: '*,expand.avatar.*,expand.mini_logo.*'
      });
      teams = response.items;
    } catch (error) {
      console.error("Failed to fetch teams data", error);
    }
  }

  function handleScroll() {
    showBackToTop = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    fetchTeams();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  $: filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <div class="flex items-center gap-2">
        <Disc3 class="h-5 w-5" />
        <h2 class="font-semibold text-xl">Teams</h2>
      </div>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#if teams.length}
        {#each teams as team}
          <AlertDialog.Root>
            <AlertDialog.Trigger class="block w-full px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition text-left">
              {team.name}
            </AlertDialog.Trigger>

            <AlertDialog.Content class="max-w-3xl max-h-[90vh] overflow-y-auto">
              <AlertDialog.Header>
                <div class="flex items-center justify-between">
                  <AlertDialog.Title class="text-2xl">{team.name}</AlertDialog.Title>
                  <div class="flex items-center gap-4">
                    <div class="flex flex-col items-center gap-1">
                      <span class="text-xs text-muted-foreground">Powered by</span>
                      <img
                        src="/logos/hyzer_heros_mini.png"
                        alt="Hyzer Heros Mini Logo"
                        class="h-8 w-auto"
                        on:error={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                  </div>
                </div>
              </AlertDialog.Header>

              <div class="space-y-6 py-4">
                <!-- Team Logos Section -->
                <div class="flex justify-center gap-8 pb-6 border-b">
                  {#if team.expand?.mini_logo}
                    <div class="flex flex-col items-center gap-3">
                      <span class="text-sm text-muted-foreground font-medium">Mini Logo</span>
                      <img
                        src={`https://few-likely.pockethost.io/api/files/${team.expand.mini_logo.collectionId}/${team.expand.mini_logo.id}/${team.expand.mini_logo.mini_logo}`}
                        alt={`${team.name} mini logo`}
                        class="w-32 h-auto"
                      />
                    </div>
                  {/if}
                  {#if team.expand?.avatar}
                    <div class="flex flex-col items-center gap-3">
                      <span class="text-sm text-muted-foreground font-medium">Full Logo</span>
                      <img
                        src={`https://few-likely.pockethost.io/api/files/${team.expand.avatar.collectionId}/${team.expand.avatar.id}/${team.expand.avatar.image}`}
                        alt={team.name}
                        class="w-32 h-auto"
                      />
                    </div>
                  {/if}
                </div>

                <!-- Team Bio Section -->
                {#if team.team_bio}
                  <div class="space-y-3">
                    <h3 class="text-lg font-semibold flex items-center gap-2">
                      <Disc3 class="h-5 w-5 text-primary" />
                      Team Biography
                    </h3>
                    <div class="prose prose-sm max-w-none text-white [&_p]:text-white [&_li]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white bg-muted/30 p-4 rounded-lg">
                      {@html team.team_bio}
                    </div>
                  </div>
                {/if}

                <!-- Hyzer Heros Full Logo Footer -->
                <div class="flex justify-center pt-4 border-t">
                  <img
                    src="/logos/hyzer_heros_full.png"
                    alt="Hyzer Heros"
                    class="h-12 w-auto opacity-70"
                    on:error={(e) => e.target.style.display = 'none'}
                  />
                </div>
              </div>

              <AlertDialog.Footer>
                <AlertDialog.Cancel>
                  <Button variant="outline">Close</Button>
                </AlertDialog.Cancel>
              </AlertDialog.Footer>
            </AlertDialog.Content>
          </AlertDialog.Root>
        {/each}
      {:else}
        <p class="text-gray-500 text-sm">No teams available.</p>
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
              placeholder="Search teams..."
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
          { label: 'Teams', href: '/teams' }
        ]} 
      />
      {#if teams.length}
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {#each filteredTeams as team}
            <AlertDialog.Root>
              <AlertDialog.Trigger class="w-full">
                <div class="border rounded-xl p-6 hover:shadow-lg hover:scale-105 transition-all cursor-pointer bg-card">
                  <div class="flex flex-col items-center gap-4">
                    <h2 class="text-xl font-bold text-center">{team.name}</h2>
                    
                    <div class="flex gap-6 items-center justify-center w-full">
                      {#if team.expand?.mini_logo}
                        <div class="flex flex-col items-center gap-2">
                          <span class="text-xs text-muted-foreground font-medium">Mini Logo</span>
                          <div class="p-3 bg-muted rounded-lg">
                            <img
                              src={`https://few-likely.pockethost.io/api/files/${team.expand.mini_logo.collectionId}/${team.expand.mini_logo.id}/${team.expand.mini_logo.mini_logo}`}
                              alt={`${team.name} mini logo`}
                              class="h-16 w-16 lg:h-32 lg:w-32 object-contain"
                            />
                          </div>
                        </div>
                      {/if}
                      
                      {#if team.expand?.avatar}
                        <div class="flex flex-col items-center gap-2">
                          <span class="text-xs text-muted-foreground font-medium">Full Logo</span>
                          <div class="p-3 bg-muted rounded-lg">
                            <img
                              src={`https://few-likely.pockethost.io/api/files/${team.expand.avatar.collectionId}/${team.expand.avatar.id}/${team.expand.avatar.image}`}
                              alt={team.name}
                              class="h-16 w-16 lg:h-32 lg:w-32 object-contain"
                            />
                          </div>
                        </div>
                      {/if}
                    </div>
                  </div>
                </div>
              </AlertDialog.Trigger>

              <AlertDialog.Content class="max-w-3xl max-h-[90vh] overflow-y-auto">
                <AlertDialog.Header>
                  <div class="flex items-center justify-between">
                    <AlertDialog.Title class="text-2xl">{team.name}</AlertDialog.Title>
                    <div class="flex items-center gap-4">
                      <div class="flex flex-col items-center gap-1">
                        <span class="text-xs text-muted-foreground">Powered by</span>
                        <img
                          src="/logos/hyzer_heros_mini.png"
                          alt="Hyzer Heros Mini Logo"
                          class="h-8 w-auto"
                          on:error={(e) => e.target.style.display = 'none'}
                        />
                      </div>
                    </div>
                  </div>
                </AlertDialog.Header>

                <div class="space-y-6 py-4">
                  <!-- Team Logos Section -->
                  <div class="flex justify-center gap-8 pb-6 border-b">
                    {#if team.expand?.mini_logo}
                      <div class="flex flex-col items-center gap-3">
                        <span class="text-sm text-muted-foreground font-medium">Mini Logo</span>
                        <img
                          src={`https://few-likely.pockethost.io/api/files/${team.expand.mini_logo.collectionId}/${team.expand.mini_logo.id}/${team.expand.mini_logo.mini_logo}`}
                          alt={`${team.name} mini logo`}
                          class="w-32 h-auto"
                        />
                      </div>
                    {/if}
                    {#if team.expand?.avatar}
                      <div class="flex flex-col items-center gap-3">
                        <span class="text-sm text-muted-foreground font-medium">Full Logo</span>
                        <img
                          src={`https://few-likely.pockethost.io/api/files/${team.expand.avatar.collectionId}/${team.expand.avatar.id}/${team.expand.avatar.image}`}
                          alt={team.name}
                          class="w-32 h-auto"
                        />
                      </div>
                    {/if}
                  </div>

                  <!-- Team Bio Section -->
                  {#if team.team_bio}
                    <div class="space-y-3">
                      <h3 class="text-lg font-semibold flex items-center gap-2">
                        <Disc3 class="h-5 w-5 text-primary" />
                        Team Biography
                      </h3>
                      <div class="prose prose-sm max-w-none text-white [&_p]:text-white [&_li]:text-white [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_strong]:text-white bg-muted/30 p-4 rounded-lg">
                        {@html team.team_bio}
                      </div>
                    </div>
                  {/if}

                  <!-- Hyzer Heros Full Logo Footer -->
                  <div class="flex justify-center pt-4 border-t">
                    <img
                      src="/logos/hyzer_heros_full.png"
                      alt="Hyzer Heros"
                      class="h-12 w-auto opacity-70"
                      on:error={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                </div>

                <AlertDialog.Footer>
                  <AlertDialog.Cancel>
                    <Button variant="outline">Close</Button>
                  </AlertDialog.Cancel>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog.Root>
          {/each}
        </div>
      {:else}
        <p class="text-muted-foreground">Loading teams...</p>
      {/if}
    </main>
  </div>
</div>

{#if isMobileMenuOpen}
  <div class="fixed inset-0 z-50 bg-background md:hidden">
    <div class="h-14 border-b px-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Disc3 class="h-5 w-5" />
        <h2 class="font-semibold text-xl">Teams</h2>
      </div>
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
