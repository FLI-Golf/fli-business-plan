<script lang="ts">
  import { onMount } from "svelte";
  import { Search, Home } from 'lucide-svelte';
  import SponsorshipChart from '$lib/components/charts/SponsorshipChart.svelte';
  import MembershipChart from '$lib/components/charts/MembershipChart.svelte';
  import EventRevenueChart from '$lib/components/charts/EventRevenueChart.svelte';
  import FantasyLeagueChart from '$lib/components/charts/FantasyLeagueChart.svelte';
  import BroadcastingChart from '$lib/components/charts/BroadcastingChart.svelte';
  import LicensingChart from '$lib/components/charts/LicensingChart.svelte';
  import TotalRevenueChart from '$lib/components/charts/TotalRevenueChart.svelte';
  import StaffExpensesChart from '$lib/components/charts/StaffExpensesChart.svelte';
  import DepartmentBudgetsChart1 from '$lib/components/charts/DepartmentBudgetsChart1.svelte';
  import DepartmentBudgetsChart2 from '$lib/components/charts/DepartmentBudgetsChart2.svelte';
  import DepartmentBudgetsChart3 from '$lib/components/charts/DepartmentBudgetsChart3.svelte';
  import OfficeExpensesChart from '$lib/components/charts/OfficeExpensesChart.svelte';
  import CourseBuildoutChart from '$lib/components/charts/CourseBuildoutChart.svelte';
  import TechExpensesChart from '$lib/components/charts/TechExpensesChart.svelte';
  import PlayerSponsorshipChart from '$lib/components/charts/PlayerSponsorshipChart.svelte';
  import TravelExpensesChart from '$lib/components/charts/TravelExpensesChart.svelte';
  import EcommerceExpensesChart from '$lib/components/charts/EcommerceExpensesChart.svelte';
  import DocumentaryExpensesChart from '$lib/components/charts/DocumentaryExpensesChart.svelte';
  import OfficeUpgradesChart from '$lib/components/charts/OfficeUpgradesChart.svelte';
  import MiscExpensesChart from '$lib/components/charts/MiscExpensesChart.svelte';
  import PrizePursesChart from '$lib/components/charts/PrizePursesChart.svelte';
  import PocketBase from 'pocketbase';

  const pb = new PocketBase('https://few-likely.pockethost.io');
  
  let sections = [];
  let searchQuery = "";
  let showBackToTop = false;
  let isMobileMenuOpen = false;

  async function loadFinancialData() {
    const resultList = await pb.collection('financial_sections').getList(1, 50, {
      sort: 'order',
      expand: 'financial_data'
    });
    sections = resultList.items;
  }

  function handleScroll() {
    showBackToTop = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    loadFinancialData();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  $: filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchQuery.toLowerCase())
  );
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <h2 class="font-semibold text-xl">Financial Analysis</h2>
    </div>
    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#each filteredSections as section}
        <a
          href={`#section-${section.id}`}
          class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
        >
          {section.order}. {section.title}
        </a>
      {/each}
    </nav>
  </aside>

  <div class="flex flex-col">
    <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <button
        class="md:hidden"
        on:click={() => isMobileMenuOpen = !isMobileMenuOpen}
        aria-label="Toggle menu"
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
            <input
              type="search"
              placeholder="Search financials..."
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
      {#each filteredSections as section}
        <div id={`section-${section.id}`} class="space-y-4">
          <h2 class="text-2xl font-bold">{@html section.title}</h2>
          <div class="rounded-lg border bg-card p-6">
            <svelte:component
              this={section.id === 'g30r0dwsk234w7z' ? SponsorshipChart :
                   section.id === 'l6d5rl330g6r20j' ? MembershipChart :
                   section.id === '60c8je1a2hmo4g2' ? EventRevenueChart :
                   section.id === '88s1d09a770342h' ? FantasyLeagueChart :
                   section.id === '8q8iyv73rk7hjto' ? BroadcastingChart :
                   section.id === 'ei7hrivk64swq5o' ? LicensingChart :
                   section.id === 'm31ey9k40prxd6f' ? TotalRevenueChart :
                   section.id === '6klhosg2k6z681i' ? StaffExpensesChart :
                   section.id === '85zfk723vv78fq6' ? DepartmentBudgetsChart1 :
                   section.id === '394758883500d17' ? DepartmentBudgetsChart2 :
                   section.id === 'a7ma004736p20b1' ? DepartmentBudgetsChart3 :
                   section.id === 'qhdex88djzqmk65' ? OfficeExpensesChart :
                   section.id === '01kgik5v84ujour' ? CourseBuildoutChart :
                   section.id === 'm6omh18f3o5t682' ? TechExpensesChart :
                   section.id === '56623xceqzqq20k' ? PlayerSponsorshipChart :
                   section.id === '4r0o176h168tgvy' ? TravelExpensesChart :
                   section.id === 'sbcqpw3y3xfb258' ? EcommerceExpensesChart :
                   section.id === '39y05pwmp336b1f' ? DocumentaryExpensesChart :
                   section.id === 'h2j70j28pj2bq21' ? OfficeUpgradesChart :
                   section.id === '965qfx4q93i45ro' ? MiscExpensesChart :
                   section.id === '6q2137mu62l2irz' ? PrizePursesChart :
                   null}
              {section}
            />
            <p class="mt-4 text-sm text-muted-foreground">{@html section.description}</p>
          </div>
        </div>
      {/each}    </main>  </div>
</div>

{#if showBackToTop}
  <button
    class="fixed bottom-4 right-4 bg-primary text-primary-foreground p-3 rounded-full shadow-md hover:bg-primary/90 transition"
    on:click={scrollToTop}
    aria-label="Scroll to top"
  >
    ⬆️ Top
  </button>
{/if}

{#if isMobileMenuOpen}
  <div class="fixed inset-0 z-50 bg-background md:hidden">
    <div class="h-14 border-b px-4 flex items-center justify-between">
      <span class="font-semibold text-xl">Financial Analysis</span>
      <button
        class="p-2"
        on:click={() => isMobileMenuOpen = false}
        aria-label="Close menu"
      >
        ✕
      </button>
    </div>

    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#each filteredSections as section}
        <a
          href={`#section-${section.id}`}
          class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
          on:click={() => isMobileMenuOpen = false}
        >
          {section.order}. {section.title}
        </a>
      {/each}
    </nav>
  </div>
{/if}
