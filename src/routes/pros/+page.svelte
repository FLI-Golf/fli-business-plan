<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Avatar from "$lib/components/ui/avatar";
  import { Badge } from "$lib/components/ui/badge";
  import { Button } from "$lib/components/ui/button";
  import { ArrowLeft } from 'lucide-svelte';
  import LightSwitch from "@/components/ui/light-switch/light-switch.svelte";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
  import { pb } from '$lib/pocketbase';
  import { onMount } from 'svelte';
  import { goto } from "$app/navigation";

  let pros: any[] = [];
  let loading = true;
  let selectedPro: any = null;

  function getEmbedUrl(url: string): string {
    if (!url) return '';
    const youtubeRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(youtubeRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  }

  // Derive unique countries with flag images from pros data
  $: countries = (() => {
    const seen = new Map();
    for (const pro of pros) {
      const nat = pro.nationality;
      if (nat && !seen.has(nat) && pro.expand?.flag) {
        const flag = pro.expand.flag;
        seen.set(nat, `${pb.baseUrl}/api/files/${flag.collectionId}/${flag.id}/${flag.flag_image}`);
      }
    }
    return Array.from(seen.entries()).map(([name, flagUrl]) => ({ name, flagUrl }));
  })();

  onMount(async () => {
    try {
      const records = await pb.collection('pros').getList(1, 50, {
        expand: 'avatar, flag',
        sort: 'rank'
      });
      pros = records.items;
      loading = false;
    } catch (error) {
      console.error(error);
      loading = false;
    }
  });
</script>

<div class="flex min-h-screen w-full flex-col">
  <header class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6 z-10">
    <nav class="flex items-center gap-4 flex-1">
      <Button variant="ghost" size="icon" on:click={() => goto('/overview')}>
        <ArrowLeft class="h-5 w-5" />
      </Button>
      <a href="/overview" class="text-foreground hover:text-foreground transition-colors inline-flex items-center gap-3 whitespace-nowrap">
        <img src="/logos/fli_logo.png" alt="FLI Logo" class="h-24 w-24 mt-2" />
        Committed Pros
      </a>
    </nav>
    <LightSwitch />
  </header>

  <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <Breadcrumb 
      items={[
        { label: 'Home', href: '/overview' },
        { label: 'Committed Pros', href: '/pros' }
      ]} />

    {#if selectedPro}
      <!-- Pro Detail View -->
      <div class="max-w-4xl mx-auto w-full space-y-6">
        <Button variant="outline" on:click={() => selectedPro = null}>
          <ArrowLeft class="h-4 w-4 mr-2" />
          Back to All Pros
        </Button>

        <!-- Header Card -->
        <Card.Root>
          <Card.Header class="bg-gradient-to-br from-blue-600 to-cyan-600 text-white rounded-t-lg">
            <div class="flex items-start justify-between">
              <div>
                <Card.Title class="text-2xl font-bold text-white">{selectedPro.name}</Card.Title>
                <Card.Description class="text-blue-50">Professional Disc Golfer</Card.Description>
              </div>
              {#if selectedPro.expand?.avatar}
                <Avatar.Root class="h-24 w-24 rounded-lg shadow-lg">
                  <Avatar.Image
                    src={`${pb.baseUrl}/api/files/${selectedPro.expand.avatar.collectionId}/${selectedPro.expand.avatar.id}/${selectedPro.expand.avatar.image}`}
                    alt={selectedPro.name}
                  />
                </Avatar.Root>
              {/if}
            </div>
          </Card.Header>
          <Card.Content class="p-6">
            <div class="space-y-4">
              <!-- Badges row: flag, nationality, division, rank -->
              <div class="flex flex-wrap items-center gap-2">
                {#if selectedPro.expand?.flag}
                  <Avatar.Root class="h-6 w-8 rounded-none">
                    <Avatar.Image
                      src={`${pb.baseUrl}/api/files/${selectedPro.expand.flag.collectionId}/${selectedPro.expand.flag.id}/${selectedPro.expand.flag.flag_image}`}
                      alt={`${selectedPro.name}'s country flag`}
                    />
                  </Avatar.Root>
                {/if}
                {#if selectedPro.nationality}
                  <Badge variant="outline">{selectedPro.nationality}</Badge>
                {/if}
                {#if selectedPro.division}
                  <Badge class="bg-blue-600">{selectedPro.division}</Badge>
                {/if}
                <Badge>Rank #{selectedPro.rank}</Badge>
              </div>

              <!-- Profile one-liner -->
              {#if selectedPro.profile}
                <p class="text-base font-medium italic border-l-4 border-blue-500 pl-4">{selectedPro.profile}</p>
              {/if}

              <!-- Bio -->
              <p class="text-muted-foreground">{selectedPro.bio || 'Professional Disc Golfer'}</p>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Image Gallery -->
        {#if selectedPro.images?.length}
          <Card.Root>
            <Card.Header>
              <Card.Title class="text-lg font-semibold">Gallery</Card.Title>
            </Card.Header>
            <Card.Content class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                {#each selectedPro.images as image}
                  <div class="rounded-lg overflow-hidden border shadow-sm">
                    <img
                      src={`${pb.baseUrl}/api/files/${selectedPro.collectionId}/${selectedPro.id}/${image}`}
                      alt={`${selectedPro.name} photo`}
                      class="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                {/each}
              </div>
            </Card.Content>
          </Card.Root>
        {/if}

        <!-- Why She/He Matters to FGL -->
        {#if selectedPro.why_matters}
          <Card.Root>
            <Card.Header class="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-t-lg">
              <Card.Title class="text-lg font-bold text-white">Why {selectedPro.name} Matters to FGL</Card.Title>
            </Card.Header>
            <Card.Content class="p-6">
              <div class="prose dark:prose-invert max-w-none">
                {@html selectedPro.why_matters}
              </div>
            </Card.Content>
          </Card.Root>
        {/if}

        <!-- Major Achievements -->
        {#if selectedPro.achievements}
          <Card.Root>
            <Card.Header class="bg-gradient-to-br from-yellow-500 to-amber-600 text-white rounded-t-lg">
              <Card.Title class="text-lg font-bold text-white flex items-center gap-2">
                <span>🏆</span> Major Achievements
              </Card.Title>
            </Card.Header>
            <Card.Content class="p-6">
              <div class="prose dark:prose-invert max-w-none">
                {@html selectedPro.achievements}
              </div>
            </Card.Content>
          </Card.Root>
        {/if}

        <!-- Investor Relevance -->
        {#if selectedPro.investor_relevance}
          <Card.Root class="border-2 border-primary">
            <Card.Header class="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-t-lg">
              <Card.Title class="text-lg font-bold text-white flex items-center gap-2">
                <span>💼</span> Investor Relevance
              </Card.Title>
            </Card.Header>
            <Card.Content class="p-6">
              <div class="prose dark:prose-invert max-w-none">
                {@html selectedPro.investor_relevance}
              </div>
            </Card.Content>
          </Card.Root>
        {/if}

        <!-- Video Clip -->
        {#if selectedPro.clip}
          <Card.Root>
            <Card.Header>
              <Card.Title class="text-lg font-semibold flex items-center gap-2">
                <span>🎥</span> Highlight Clip
              </Card.Title>
            </Card.Header>
            <Card.Content class="p-6">
              <div class="aspect-video w-full rounded-lg overflow-hidden">
                <iframe
                  src={getEmbedUrl(selectedPro.clip)}
                  title="{selectedPro.name} highlight clip"
                  class="w-full h-full"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
            </Card.Content>
          </Card.Root>
        {/if}
      </div>
    {:else}
      <!-- Global Star Power & Championship Density Overview -->
      <div class="mt-12 space-y-8">
        <h2 class="text-3xl font-bold text-center">Global Star Power & Championship Density Overview</h2>

        <!-- Championship Equity -->
        <Card.Root>
          <Card.Header class="bg-gradient-to-br from-yellow-500 to-amber-600 text-white rounded-t-lg">
            <Card.Title class="text-xl font-bold text-white flex items-center gap-2">
              <span class="text-2xl">🏆</span> Championship Equity Represented
            </Card.Title>
          </Card.Header>
          <Card.Content class="p-6">
            <p class="text-muted-foreground mb-4">Across the featured roster presented:</p>
            <ul class="space-y-2">
              <li class="flex items-start gap-2">
                <Badge class="shrink-0 mt-0.5">Titles</Badge>
                <span>Multiple 5x, 2x, and 1x PDGA World Champions</span>
              </li>
              <li class="flex items-start gap-2">
                <Badge class="shrink-0 mt-0.5">Majors</Badge>
                <span>Multiple Major Champions (U.S. & International)</span>
              </li>
              <li class="flex items-start gap-2">
                <Badge class="shrink-0 mt-0.5">DGPT</Badge>
                <span>Dozens of DGPT Elite Series victories</span>
              </li>
              <li class="flex items-start gap-2">
                <Badge class="shrink-0 mt-0.5">Rankings</Badge>
                <span>Consistent multi-year Top 5 - Top 10 world rankings</span>
              </li>
              <li class="flex items-start gap-2">
                <Badge class="shrink-0 mt-0.5">Pedigree</Badge>
                <span>European, Nordic, Asian, and U.S. championship pedigree</span>
              </li>
            </ul>
            <div class="mt-6 p-4 bg-muted rounded-lg">
              <p class="text-sm font-medium">This concentration of titles and podium finishes positions FGL with one of the highest "championship densities" ever assembled in a single professional disc golf property.</p>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Countries Represented -->
        <Card.Root>
          <Card.Header class="bg-gradient-to-br from-emerald-500 to-teal-600 text-white rounded-t-lg">
            <Card.Title class="text-xl font-bold text-white flex items-center gap-2">
              <span class="text-2xl">🌎</span> Countries Represented
            </Card.Title>
          </Card.Header>
          <Card.Content class="p-6">
            <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
              {#each countries as country}
                <div class="flex items-center gap-3 p-3 border rounded-lg">
                  <img
                    src={country.flagUrl}
                    alt={`${country.name} flag`}
                    class="h-8 w-12 object-cover rounded shadow-sm"
                  />
                  <span class="font-medium">{country.name}</span>
                </div>
              {/each}
            </div>
            <div class="mt-6 p-4 bg-muted rounded-lg">
              <p class="text-sm font-medium">These countries represent the strongest participation and viewership markets in professional disc golf globally, giving FGL immediate international media positioning.</p>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Competitive Structure Balance -->
        <Card.Root>
          <Card.Header class="bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <Card.Title class="text-xl font-bold text-white flex items-center gap-2">
              <span class="text-2xl">📈</span> Competitive Structure Balance
            </Card.Title>
          </Card.Header>
          <Card.Content class="p-6">
            <p class="text-muted-foreground mb-4">The roster currently includes:</p>
            <div class="grid md:grid-cols-2 gap-6">
              <div>
                <h4 class="font-semibold mb-3">Roster Composition</h4>
                <ul class="space-y-2">
                  <li class="flex items-center gap-2">
                    <Badge variant="outline" class="shrink-0">FPO & MPO</Badge>
                    <span class="text-sm">Multi-time World Champions</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Badge variant="outline" class="shrink-0">Majors</Badge>
                    <span class="text-sm">Established Major winners</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Badge variant="outline" class="shrink-0">DGPT</Badge>
                    <span class="text-sm">Elite Series champions</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Badge variant="outline" class="shrink-0">Rising</Badge>
                    <span class="text-sm">Young breakout talents with long-term ceiling</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Badge variant="outline" class="shrink-0">Veterans</Badge>
                    <span class="text-sm">Stars with 10-15+ years of fan equity</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Badge variant="outline" class="shrink-0">Nordic</Badge>
                    <span class="text-sm">Scandinavian market anchors</span>
                  </li>
                  <li class="flex items-center gap-2">
                    <Badge variant="outline" class="shrink-0">U.S.</Badge>
                    <span class="text-sm">Franchise-style personalities</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 class="font-semibold mb-3">This Creates</h4>
                <div class="space-y-3">
                  <div class="p-3 border rounded-lg">
                    <p class="text-sm font-medium">Head-to-head narrative rivalries</p>
                  </div>
                  <div class="p-3 border rounded-lg">
                    <p class="text-sm font-medium">Cross-generational storytelling</p>
                  </div>
                  <div class="p-3 border rounded-lg">
                    <p class="text-sm font-medium">Strong betting and analytics integrations</p>
                  </div>
                  <div class="p-3 border rounded-lg">
                    <p class="text-sm font-medium">Sustained championship credibility</p>
                  </div>
                </div>
              </div>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Broadcast & Media Strength -->
        <Card.Root>
          <Card.Header class="bg-gradient-to-br from-purple-500 to-pink-600 text-white rounded-t-lg">
            <Card.Title class="text-xl font-bold text-white flex items-center gap-2">
              <span class="text-2xl">🎥</span> Broadcast & Media Strength
            </Card.Title>
          </Card.Header>
          <Card.Content class="p-6">
            <p class="text-muted-foreground mb-4">The combined roster offers:</p>
            <div class="grid md:grid-cols-2 gap-4">
              <div class="flex items-start gap-3 p-4 border rounded-lg">
                <Badge class="shrink-0 mt-0.5 bg-purple-600">Drama</Badge>
                <span class="text-sm">Proven closers for playoff drama</span>
              </div>
              <div class="flex items-start gap-3 p-4 border rounded-lg">
                <Badge class="shrink-0 mt-0.5 bg-pink-600">Highlights</Badge>
                <span class="text-sm">Aggressive power throwers for highlight moments</span>
              </div>
              <div class="flex items-start gap-3 p-4 border rounded-lg">
                <Badge class="shrink-0 mt-0.5 bg-purple-600">Global</Badge>
                <span class="text-sm">International stars for global streaming expansion</span>
              </div>
              <div class="flex items-start gap-3 p-4 border rounded-lg">
                <Badge class="shrink-0 mt-0.5 bg-pink-600">Content</Badge>
                <span class="text-sm">Personalities suitable for documentary, trading cards, gaming, and sponsorship storytelling</span>
              </div>
            </div>
            <div class="mt-6 p-4 bg-muted rounded-lg">
              <p class="text-sm font-medium">In FGL's stadium-style, artificial-obstacle format, consistency, composure, and scoring separation are amplified — favoring championship-level athletes and creating predictable broadcast intensity.</p>
            </div>
          </Card.Content>
        </Card.Root>

        <!-- Committed Pros Header + Grid -->
        <div class="flex items-center gap-4 mb-2">
          <div class="p-3 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
            <img src="/logos/wdr.png" alt="Pros Logo" class="w-12 h-12 object-contain" />
          </div>
          <div>
            <h1 class="text-3xl font-bold">Committed Pros</h1>
            <p class="text-muted-foreground">{pros.length} professional disc golfers</p>
          </div>
        </div>

        {#if loading}
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {#each Array(6) as _}
              <div class="flex items-center space-x-4 p-4 border rounded-lg">
                <div class="h-12 w-16 bg-muted rounded animate-pulse"></div>
                <div class="space-y-2 flex-1">
                  <div class="h-5 bg-muted rounded animate-pulse w-2/3"></div>
                  <div class="h-4 bg-muted rounded animate-pulse w-1/3"></div>
                </div>
              </div>
            {/each}
          </div>
        {:else}
          <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {#each pros as pro}
              <button
                class="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer group text-left w-full"
                on:click={() => selectedPro = pro}
              >
                <div class="flex items-center gap-4">
                  {#if pro.expand?.flag}
                    <Avatar.Root class="h-12 w-16 rounded-lg shadow-sm">
                      <Avatar.Image
                        src={`${pb.baseUrl}/api/files/${pro.expand.flag.collectionId}/${pro.expand.flag.id}/${pro.expand.flag.flag_image}`}
                        alt={`${pro.name}'s country flag`}
                      />
                    </Avatar.Root>
                  {/if}
                  <div>
                    <div class="font-semibold text-base">{pro.name}</div>
                    <div class="text-sm text-muted-foreground">{pro.bio ? pro.bio.substring(0, 50) + (pro.bio.length > 50 ? '...' : '') : 'Professional Disc Golfer'}</div>
                  </div>
                </div>
                <Badge class="shrink-0">#{pro.rank}</Badge>
              </button>
            {/each}
          </div>
        {/if}

        <!-- Investor Takeaway -->
        <Card.Root class="border-2 border-primary">
          <Card.Header class="bg-gradient-to-br from-slate-800 to-slate-900 text-white rounded-t-lg">
            <Card.Title class="text-xl font-bold text-white flex items-center gap-2">
              <span class="text-2xl">💼</span> Investor Takeaway
            </Card.Title>
          </Card.Header>
          <Card.Content class="p-6">
            <p class="text-lg font-semibold mb-4">The FLI Golf League is not launching with "developing talent."</p>
            <p class="text-muted-foreground mb-6">It is launching with:</p>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
              <div class="text-center p-4 border rounded-lg bg-gradient-to-b from-yellow-50 to-amber-50 dark:from-yellow-950 dark:to-amber-950">
                <span class="text-2xl block mb-1">🏆</span>
                <span class="text-sm font-semibold">World Champions</span>
              </div>
              <div class="text-center p-4 border rounded-lg bg-gradient-to-b from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
                <span class="text-2xl block mb-1">🥇</span>
                <span class="text-sm font-semibold">Major Champions</span>
              </div>
              <div class="text-center p-4 border rounded-lg bg-gradient-to-b from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950">
                <span class="text-2xl block mb-1">🌍</span>
                <span class="text-sm font-semibold">International Stars</span>
              </div>
              <div class="text-center p-4 border rounded-lg bg-gradient-to-b from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950">
                <span class="text-2xl block mb-1">🔥</span>
                <span class="text-sm font-semibold">Prime-Age Contenders</span>
              </div>
              <div class="text-center p-4 border rounded-lg bg-gradient-to-b from-rose-50 to-red-50 dark:from-rose-950 dark:to-red-950 col-span-2 md:col-span-1">
                <span class="text-2xl block mb-1">⭐</span>
                <span class="text-sm font-semibold">Marketable Personalities</span>
              </div>
            </div>
            <p class="text-muted-foreground mb-4">This gives FGL:</p>
            <div class="grid md:grid-cols-2 gap-3">
              <div class="flex items-center gap-3 p-3 border rounded-lg">
                <div class="h-2 w-2 rounded-full bg-green-500 shrink-0"></div>
                <span class="font-medium text-sm">Immediate credibility</span>
              </div>
              <div class="flex items-center gap-3 p-3 border rounded-lg">
                <div class="h-2 w-2 rounded-full bg-green-500 shrink-0"></div>
                <span class="font-medium text-sm">Sponsorship leverage</span>
              </div>
              <div class="flex items-center gap-3 p-3 border rounded-lg">
                <div class="h-2 w-2 rounded-full bg-green-500 shrink-0"></div>
                <span class="font-medium text-sm">Media negotiation power</span>
              </div>
              <div class="flex items-center gap-3 p-3 border rounded-lg">
                <div class="h-2 w-2 rounded-full bg-green-500 shrink-0"></div>
                <span class="font-medium text-sm">Long-term franchise asset stability</span>
              </div>
            </div>
          </Card.Content>
        </Card.Root>
      </div>
    {/if}
  </main>
</div>
