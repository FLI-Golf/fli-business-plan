<script lang="ts">
    import { onMount } from "svelte";
    import { page } from "$app/stores";
    import { goto } from "$app/navigation";
    import { Badge } from "$lib/components/ui/badge/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import Search from "lucide-svelte/icons/search";
    import Section from "$lib/components/ui/Section.svelte";
    import { Home, TrendingUp } from "lucide-svelte";
    import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";
    import { pb } from '$lib/pocketbase';
  
    let trendRecords = [];
    let searchQuery = "";
    let currentHash = "";
    let showBackToTop = false;
    let isMobileMenuOpen = false;
    let isAuthenticated = pb.authStore.isValid;
    let userData = pb.authStore.model;
  
    async function fetchTrendRecords() {
      try {
        const records = await pb.collection('trends').getList(1, 50, {
          sort: 'order'
        });
        trendRecords = records.items;
        console.log("✅ Trend Records Updated!");
      } catch (error) {
        console.error("❌ ERROR: Failed to fetch trend records", error);
      }
    }
  
    function handleScroll() {
      showBackToTop = window.scrollY > 300;
    }
  
    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  
    onMount(() => {
      fetchTrendRecords();
      window.addEventListener("scroll", handleScroll);
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    });
  
    $: filteredRecords = trendRecords.filter(record =>
      record.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.body?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  </script>
  
  <div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
    <aside class="bg-muted/40 border-r hidden md:flex flex-col">
      <div class="h-14 border-b px-4 flex items-center lg:px-6">
        <div class="flex items-center gap-2">
          <TrendingUp class="h-5 w-5" />
          <span class="font-semibold text-xl">Emerging Sports</span>
        </div>
      </div>
      <nav class="flex-1 overflow-y-auto p-4">
        {#if trendRecords.length}
          <div class="space-y-2">
            {#each trendRecords as record}
              <div class="space-y-1">
                <a
                  href={`#section-${record.id}`}
                  class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition"
                >
                  {record.title}
                </a>
              </div>
            {/each}
          </div>
        {:else}
          <div class="space-y-2">
            <a href="#market-overview" class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition">
              Market Overview
            </a>
            <a href="#growth-statistics" class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition">
              Growth Statistics
            </a>
            <a href="#trending-sports" class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition">
              Trending Sports
            </a>
            <a href="#investment-opportunities" class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition">
              Investment Opportunities
            </a>
            <a href="#fli-position" class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition">
              FLI Golf Position
            </a>
            <a href="#industry-reports" class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition">
              Industry Reports
            </a>
          </div>
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
                placeholder="Search emerging sports trends..."
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
            { label: 'Emerging Sports Trends', href: '/trend' }
          ]}
        />
        <div class="text-center mb-6">
          <h1 class="text-4xl font-bold flex items-center justify-center gap-2">
            <span>📈 Emerging Sports Are Booming</span>
          </h1>
          <p class="text-xl mt-2 italic">"The future of sports is being written today."</p>
          <div class="max-w-3xl mx-auto mt-4 text-muted-foreground">
            <p>The sports industry is experiencing unprecedented growth in emerging and alternative sports. From disc golf to pickleball, these new markets represent massive opportunities for investors and entrepreneurs.</p>
          </div>
        </div>
  
        {#if filteredRecords.length}
          {#each filteredRecords as record}
            <div id={`section-${record.id}`} class="space-y-4 max-w-4xl">
              <h2 class="text-2xl font-bold">{record.title}</h2>
              <div class="prose max-w-none">
                {@html record.body}
              </div>
            </div>
          {/each}
        {:else}
          <!-- Default content when no records are found -->
          <div id="market-overview" class="space-y-4 max-w-4xl">
            <h2 class="text-2xl font-bold">Market Overview</h2>
            <div class="prose max-w-none">
              <p>The emerging sports market has experienced explosive growth over the past decade. Traditional sports are being challenged by innovative, accessible alternatives that appeal to younger demographics and offer unique entertainment value.</p>
              
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 my-6">
                <div class="p-4 border rounded-lg text-center">
                  <div class="text-2xl font-bold text-green-600">+47%</div>
                  <div class="text-sm text-muted-foreground">Annual growth in participation</div>
                </div>
                <div class="p-4 border rounded-lg text-center">
                  <div class="text-2xl font-bold text-blue-600">12.3M</div>
                  <div class="text-sm text-muted-foreground">New participants in 2024</div>
                </div>
                <div class="p-4 border rounded-lg text-center">
                  <div class="text-2xl font-bold text-purple-600">$2.8B</div>
                  <div class="text-sm text-muted-foreground">Investment in startups</div>
                </div>
                <div class="p-4 border rounded-lg text-center">
                  <div class="text-2xl font-bold text-orange-600">85+</div>
                  <div class="text-sm text-muted-foreground">Countries with leagues</div>
                </div>
              </div>
            </div>
          </div>
  
          <div id="trending-sports" class="space-y-4 max-w-4xl">
            <h2 class="text-2xl font-bold">Top Emerging Sports by Growth</h2>
            <div class="prose max-w-none">
              <div class="space-y-4">
                <div class="flex items-center justify-between p-4 border rounded-lg">
                  <div class="flex items-center gap-4">
                    <div class="text-2xl">🥏</div>
                    <div>
                      <h3 class="font-semibold">Disc Golf</h3>
                      <p class="text-sm text-muted-foreground">Professional leagues, courses, and tournaments</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-green-600">+89%</div>
                    <div class="text-sm text-muted-foreground">Growth rate</div>
                  </div>
                </div>
  
                <div class="flex items-center justify-between p-4 border rounded-lg">
                  <div class="flex items-center gap-4">
                    <div class="text-2xl">🏓</div>
                    <div>
                      <h3 class="font-semibold">Pickleball</h3>
                      <p class="text-sm text-muted-foreground">Fastest growing sport in America</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-green-600">+158%</div>
                    <div class="text-sm text-muted-foreground">Growth rate</div>
                  </div>
                </div>
  
                <div class="flex items-center justify-between p-4 border rounded-lg">
                  <div class="flex items-center gap-4">
                    <div class="text-2xl">🏹</div>
                    <div>
                      <h3 class="font-semibold">Archery Tag</h3>
                      <p class="text-sm text-muted-foreground">Combat archery and team-based competitions</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-green-600">+73%</div>
                    <div class="text-sm text-muted-foreground">Growth rate</div>
                  </div>
                </div>
  
                <div class="flex items-center justify-between p-4 border rounded-lg">
                  <div class="flex items-center gap-4">
                    <div class="text-2xl">🧗</div>
                    <div>
                      <h3 class="font-semibold">Sport Climbing</h3>
                      <p class="text-sm text-muted-foreground">Olympic sport with growing indoor facilities</p>
                    </div>
                  </div>
                  <div class="text-right">
                    <div class="text-lg font-bold text-green-600">+64%</div>
                    <div class="text-sm text-muted-foreground">Growth rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div id="investment-opportunities" class="space-y-4 max-w-4xl">
            <h2 class="text-2xl font-bold">Investment Opportunities</h2>
            <div class="prose max-w-none">
              <div class="grid gap-6 md:grid-cols-2">
                <div class="space-y-4">
                  <h4 class="font-semibold">Why Emerging Sports Are Thriving</h4>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-2">
                      <div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div><strong>Accessibility:</strong> Lower barriers to entry than traditional sports</div>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div><strong>Social Media:</strong> Viral content and community building</div>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div><strong>Innovation:</strong> Modern equipment and technology integration</div>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div><strong>Demographics:</strong> Appeal to younger, diverse audiences</div>
                    </li>
                  </ul>
                </div>
                <div class="space-y-4">
                  <h4 class="font-semibold">Investment Areas</h4>
                  <ul class="space-y-3">
                    <li class="flex items-start gap-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div><strong>Facility Development:</strong> Specialized venues and courses</div>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div><strong>Equipment Manufacturing:</strong> Innovative gear and technology</div>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div><strong>Media & Broadcasting:</strong> Content creation and streaming</div>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div><strong>League Formation:</strong> Professional and amateur competitions</div>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                      <div><strong>Digital Platforms:</strong> Apps, analytics, and fan engagement</div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
  
          <div id="fli-position" class="space-y-4 max-w-4xl">
            <h2 class="text-2xl font-bold">🏌️ FLI Golf's Strategic Position</h2>
            <div class="prose max-w-none">
              <p class="text-lg mb-6">How FLI Golf capitalizes on the emerging sports boom</p>
              
              <div class="grid gap-4 md:grid-cols-2 p-6 border-2 border-primary/20 bg-primary/5 rounded-lg">
                <div class="space-y-4">
                  <h4 class="font-semibold">Market Advantages</h4>
                  <ul class="space-y-2 text-sm">
                    <li class="flex items-start gap-2">
                      <div class="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>First-mover advantage in professional disc golf leagues</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>Innovative course design and obstacle integration</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>Technology-driven fan engagement and analytics</span>
                    </li>
                    <li class="flex items-start gap-2">
                      <div class="w-1.5 h-1.5 bg-primary rounded-full mt-2"></div>
                      <span>Multi-platform content and broadcasting strategy</span>
                    </li>
                  </ul>
                </div>
                <div class="space-y-4">
                  <h4 class="font-semibold">Growth Projections</h4>
                  <div class="space-y-3">
                    <div class="flex justify-between items-center">
                      <span class="text-sm">Year 1 Participation</span>
                      <span class="font-semibold">50K+ players</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm">Year 3 Market Share</span>
                      <span class="font-semibold">15% of disc golf</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm">Year 5 Revenue Target</span>
                      <span class="font-semibold">$100M+</span>
                    </div>
                    <div class="flex justify-between items-center">
                      <span class="text-sm">Global Expansion</span>
                      <span class="font-semibold">25+ countries</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <div id="industry-reports" class="space-y-4 max-w-4xl">
            <h2 class="text-2xl font-bold">📊 Industry Reports & Resources</h2>
            <div class="prose max-w-none">
              <p class="mb-6">External research and data supporting emerging sports growth</p>
              
              <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <a 
                  href="https://udisc.com/disc-golf-growth-report" 
                  target="_blank"
                  class="p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-xl">📊</span>
                    <h4 class="font-semibold">UDisc Growth Report</h4>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    Comprehensive analysis of disc golf participation and growth trends
                  </p>
                </a>
  
                <a 
                  href="https://www.sportsbusinessjournal.com" 
                  target="_blank"
                  class="p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-xl">💼</span>
                    <h4 class="font-semibold">Sports Business Journal</h4>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    Investment trends in emerging and alternative sports markets
                  </p>
                </a>
  
                <a 
                  href="https://www.statista.com/outlook/amo/sports/alternative-sports/worldwide" 
                  target="_blank"
                  class="p-4 border rounded-lg hover:bg-muted transition-colors"
                >
                  <div class="flex items-center gap-3 mb-2">
                    <span class="text-xl">📈</span>
                    <h4 class="font-semibold">Statista Market Outlook</h4>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    Global alternative sports market size and projections
                  </p>
                </a>
              </div>
            </div>
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
        <span class="font-semibold text-xl">Emerging Sports</span>
        <button class="p-2" on:click={() => isMobileMenuOpen = false}>
          ✕
        </button>
      </div>
      <nav class="flex-1 overflow-y-auto p-4 space-y-2">
        {#if trendRecords.length}
          {#each trendRecords as record}
            <a
              href={`#section-${record.id}`}
              class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
              on:click={() => isMobileMenuOpen = false}
            >
              {record.title}
            </a>
          {/each}
        {:else}
          <a
            href="#market-overview"
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            on:click={() => isMobileMenuOpen = false}
          >
            Market Overview
          </a>
          <a
            href="#trending-sports"
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            on:click={() => isMobileMenuOpen = false}
          >
            Trending Sports
          </a>
          <a
            href="#investment-opportunities"
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            on:click={() => isMobileMenuOpen = false}
          >
            Investment Opportunities
          </a>
          <a
            href="#fli-position"
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            on:click={() => isMobileMenuOpen = false}
          >
            FLI Golf Position
          </a>
          <a
            href="#industry-reports"
            class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
            on:click={() => isMobileMenuOpen = false}
          >
            Industry Reports
          </a>
        {/if}
      </nav>
    </div>
  {/if}
  