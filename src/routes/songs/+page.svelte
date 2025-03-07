<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import Search from "lucide-svelte/icons/search";
  import { AudioLines } from 'lucide-svelte';
  import { Dialog, DialogContent, DialogTrigger } from "$lib/components/ui/dialog";
  import { Play } from "lucide-svelte";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";

  let isHonorMarchOpen = false;
  let isLiftOffOpen = false;
  let isMarchOpen = false;
  let isMobileMenuOpen = false;
  let showBackToTop = false;
  let searchQuery = "";

  const songs = [
    { id: 1, title: "Let's FLI Honor March" },
    { id: 2, title: "Let's FLI Lift Off" },
    { id: 3, title: "Let's FLI March" }
  ];

  function scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  onMount(() => {
    window.addEventListener('scroll', () => {
      showBackToTop = window.scrollY > 500;
    });
  });

  let honorMarchAudio: HTMLAudioElement;
  let liftOffAudio: HTMLAudioElement;
  let marchAudio: HTMLAudioElement;

  function playHonorMarch() {
    console.log("Playing Honor March");
    honorMarchAudio.play();
  }

  function playLiftOff() {
    console.log("Playing Lift Off");
    liftOffAudio.play();
  }

  function playMarch() {
    console.log("Playing March");
    marchAudio.play();
  }
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <div class="flex items-center gap-2">
        <AudioLines class="h-5 w-5" />
        <span class="font-semibold text-xl">Theme Songs</span>
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto p-4">
      <div class="space-y-2">
        {#each songs as song}
          <div class="space-y-1">
            <a
              href={`#section-${song.id}`}
              class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition"
            >
              {song.title}
            </a>
          </div>
        {/each}
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
              placeholder="Search songs..."
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

    <main class="flex flex-1 flex-col gap-8 p-4 lg:gap-6 lg:p-6">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/overview' },
          { label: 'Songs', href: '/songs' }
        ]}
      />

      <div class="space-y-8 max-w-4xl">
        <div id="section-1" class="space-y-4">
          <h2 class="text-2xl font-bold">Let's FLI Honor March</h2>
          <Button 
            variant="outline" 
            class="flex items-center gap-2"
            on:click={() => document.getElementById('honorMarch').play()}
          >
            <Play class="h-4 w-4" />
            Play Honor March
          </Button>
          <audio id="honorMarch" controls src="/audio/Lets Fly_ Honor March.m4a" />
        </div>

        <div id="section-2" class="space-y-4">
          <h2 class="text-2xl font-bold">Let's FLI Lift Off</h2>
          <Button 
            variant="outline" 
            class="flex items-center gap-2"
            on:click={() => document.getElementById('liftOff').play()}
          >
            <Play class="h-4 w-4" />
            Play Lift Off
          </Button>
          <audio id="liftOff" controls src="/audio/Lets Fly_ Lift Off.m4a" />
        </div>

        <div id="section-3" class="space-y-4">
          <h2 class="text-2xl font-bold">Let's FLI March</h2>
          <Button 
            variant="outline" 
            class="flex items-center gap-2"
            on:click={() => document.getElementById('march').play()}
          >
            <Play class="h-4 w-4" />
            Play March
          </Button>
          <audio id="march" controls src="/audio/Lets Fly_ March.m4a" />
        </div>
      </div>
    </main>  </div></div>

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
      <span class="font-semibold text-xl">Theme Songs</span>
      <button class="p-2" on:click={() => isMobileMenuOpen = false}>
        ✕
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#each songs as song}
        <a
          href={`#section-${song.id}`}
          class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
          on:click={() => isMobileMenuOpen = false}
        >
          {song.title}
        </a>
      {/each}
    </nav>
  </div>
{/if}
