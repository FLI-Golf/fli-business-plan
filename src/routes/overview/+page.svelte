<script lang="ts">
  // Core icons for navigation and functionality
  import Menu from "lucide-svelte/icons/menu";
  import Search from "lucide-svelte/icons/search";
 
  // Icons for main cards
  import BpIcon from "lucide-svelte/icons/layout-panel-top";
  import Chart from "lucide-svelte/icons/chart-no-axes-combined";
  import { Handshake } from 'lucide-svelte';
  import { Disc3, DollarSign } from 'lucide-svelte';
  import FileText from "lucide-svelte/icons/file-text";
  import { Globe } from 'lucide-svelte';
  import Box from "lucide-svelte/icons/box";
  import { Pyramid } from 'lucide-svelte';
  import Scale from "lucide-svelte/icons/scale";
  import HelpCircle from "lucide-svelte/icons/help-circle";
  import { AudioLines } from 'lucide-svelte';

  // UI Components
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import LightSwitch from "@/components/ui/light-switch/light-switch.svelte";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";

  // Card Components
  import ExecutiveCard from "$lib/components/cards/ExecutiveCard.svelte";
  import ProsCard from "$lib/components/cards/ProsCard.svelte";
  import BroadcasterCard from "$lib/components/cards/BroadcasterCard.svelte";

  // Utilities and Services
  import { pb } from '$lib/pocketbase';
  import { onMount } from 'svelte';
  import { goto } from "$app/navigation";
  import { writable } from 'svelte/store';

  // State Management
  const showVideo = writable(false);
  let currentUser = pb.authStore.model;
  let partners = [];
  let pros = [];
  let exe = [];
  let broadcasters = [];
  let loading = true;

  onMount(async () => {
    try {
      console.log('Current User:', currentUser);

      const recordsExe = await pb.collection('executiveStaff').getList(1, 50, {
        expand: 'avatar',
        sort: '-created'
      });
      exe = recordsExe.items;
     
      const recordsPartners = await pb.collection('partners').getList(1, 50, {
        expand: 'avatar'
      });
      partners = recordsPartners.items;

      const recordsPros = await pb.collection('pros').getList(1, 50, {
        expand: 'avatar, flag',
        sort: 'rank'
      });
      pros = recordsPros.items;

      const recordsBroadcasters = await pb.collection('broadcaster').getList(1, 50, {
        expand: 'avatar',
        sort: '-created'
      });
      broadcasters = recordsBroadcasters.items;

      loading = false;
    } catch (error) {
      console.error(error);
      loading = false;
    }
  });

  async function handleLogout() {
    pb.authStore.clear();
    await goto('/login');
  }
</script>


<div class="flex min-h-screen w-full flex-col">
  <header class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
    <nav class="hidden flex-col gap-6 text-xl font-medium md:flex md:flex-row md:items-center md:gap-6 md:text-base lg:gap-7">
      <a href="##" class="text-foreground hover:text-foreground transition-colors inline-flex items-center gap-3 whitespace-nowrap">
        <img src="/logos/fli_logo.png" alt="FLI Logo" class="h-24 w-24 mt-2" />
        Welcome to The FLI Golf Business Plan
      </a>
    </nav>
    <Avatar.Root class="hidden h-9 w-9 sm:flex">
    </Avatar.Root>
    <Sheet.Root>
      <Sheet.Trigger asChild let:builder>
        <Button
          variant="outline"
          size="icon"
          class="shrink-0 md:hidden"
          builders={[builder]}
        >
          <Menu class="h-5 w-5" />
          <span class="sr-only">Toggle navigation menu</span>
        </Button>
      </Sheet.Trigger>
      <Sheet.Content side="left">
        <nav class="grid gap-6 text-lg font-medium p-6">
          <a href="/business-plan" class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <BpIcon class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Business Plan</h2>
              <p class="text-muted-foreground">8 Sections</p>
            </div>
          </a>

          <a href="/financials" class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <Chart class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Financials</h2>
              <p class="text-muted-foreground">View financial projections and metrics</p>
            </div>
          </a>

          <div class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <Users class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Partners & Venues</h2>
              <p class="text-muted-foreground">{partners.length} Current & Pending Partners & Venues</p>
            </div>
          </div>

          <a href="/teams" class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <Disc3 class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Teams</h2>
              <p class="text-muted-foreground">View team structure and roles</p>
            </div>
          </a>

          <a href="https://udisc.com/disc-golf-growth-report" class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <Chart class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Worldwide Growth</h2>
              <p class="text-muted-foreground">View 2024 Growth Report</p>
            </div>
          </a>

          <a href="https://few-likely.pockethost.io/api/files/pbc_3332084752/55smu1wvcn40q3s/betting_breakdown_dmqb1jf6xg.pdf" class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <FileText class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Gambling Breakdown PDF</h2>
              <p class="text-muted-foreground">Click to download</p>
            </div>
          </a>

          <a href="https://few-likely.pockethost.io/api/files/pbc_3332084752/gf4h7738sl0n5o0/fgl_league_1_f68pj8fdbo.pdf" class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <FileText class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Team Franchising PDF</h2>
              <p class="text-muted-foreground">Click to download</p>
            </div>
          </a>

          <a href="https://www.dropbox.com/scl/fi/yunchs9z5i70pelvwlogs/FLI-Golf-Sports.pdf" class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <FileText class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Broadcasting & Production PDF</h2>
              <p class="text-muted-foreground">Click to download</p>
            </div>
          </a>

          <div class="text-muted-foreground hover:text-foreground flex items-center gap-4 cursor-pointer" on:click={() => $showVideo = true}>
            <Box class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Watch Presentation</h2>
              <p class="text-muted-foreground">3D Video Overview</p>
            </div>
          </div>

          <a href="/obstacles" class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <Pyramid class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Course Detials</h2>
              <p class="text-muted-foreground">Course layout and features</p>
            </div>
          </a>

          <a href="/legal" class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <Scale class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">Legal Documents</h2>
              <p class="text-muted-foreground">View legal information</p>
            </div>
          </a>

          <a href="/faqs" class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <HelpCircle class="h-6 w-6" />
            <div>
              <h2 class="text-xl font-semibold">FAQ Guide</h2>
              <p class="text-muted-foreground">Detailed answers and support</p>
            </div>
          </a>
        </nav>
      </Sheet.Content>
    </Sheet.Root>    <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form class="ml-auto flex-1 sm:flex-initial">
        <div class="relative">
          <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search this plan..."
            class="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
          />
        </div>
      </form>
      <DropdownMenu.Root>
        <LightSwitch />
        <DropdownMenu.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="secondary"
            size="icon"
            class="rounded-full"
          >
            <div class="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
              {currentUser?.email[0].toUpperCase()}
            </div>
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>{currentUser?.email}</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Item>Support</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item on:click={handleLogout}>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
</header>
<main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
  <Breadcrumb 
    items={[
      { label: 'Home', href: '/overview' },
      { label: 'Overview', href: '/overview' }
    ]} />
    

<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
  <!-- Business Plan -->
  <a href="/business-plan" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground">
    <div class="flex items-center gap-4">
      <BpIcon class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Business Plan</h2>
        <p class="text-muted-foreground">8 Sections</p>
      </div>

    </div>
  </a>


  <!-- Financials -->
  <a href="/financials" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground">
    <div class="flex items-center gap-4">
      <Chart class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Financials</h2>
        <p class="text-muted-foreground">View financial projections and metrics</p>
      </div>

    </div>
  </a>


  <!-- Partners -->
  <a href="/partners" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground">
    <div class="flex items-center gap-4">
      <Handshake class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Partners & Venues</h2>
        <p class="text-muted-foreground">Partners & Potential Venues</p>
      </div>
    </div>
  </a>  <!-- Teams -->
  <a href="/teams" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground">
    <div class="flex items-center gap-4">
      <Disc3 class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Teams</h2>
        <p class="text-muted-foreground">View team structure and roles</p>
      </div>

    </div>
  </a>
  <!-- Worldwide Growth -->
  <a href="https://udisc.com/disc-golf-growth-report" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground">
    <div class="flex items-center gap-4">
      <Chart class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Worldwide Growth</h2>
        <p class="text-muted-foreground">View 2024 Growth Report</p>
      </div>
    </div>
  </a>

  <!-- Gambling Breakdown PDF -->
  <a href="https://few-likely.pockethost.io/api/files/pbc_3332084752/55smu1wvcn40q3s/betting_breakdown_dmqb1jf6xg.pdf" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground" target="_blank">
    <div class="flex items-center gap-4">
      <FileText class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Gambling Breakdown PDF</h2>
        <p class="text-muted-foreground">Click to download</p>
      </div>
    </div>
  </a>

  <!-- Team Franchising PDF -->
  <a href="https://few-likely.pockethost.io/api/files/pbc_3332084752/gf4h7738sl0n5o0/fgl_league_1_f68pj8fdbo.pdf" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground" target="_blank">
    <div class="flex items-center gap-4">
      <FileText class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Team Franchising PDF</h2>
        <p class="text-muted-foreground">Click to download</p>
      </div>
    </div>
  </a>

  <!-- Broadcasting & Production PDF -->
  <a href="https://www.dropbox.com/scl/fi/yunchs9z5i70pelvwlogs/FLI-Golf-Sports.pdf?rlkey=ih81zfm4ntcfj8cv5r523givi&st=difjk1ja&dl=1" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground" target="_blank">
    <div class="flex items-center gap-4">
      <FileText class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Broadcasting & Production PDF</h2>
        <p class="text-muted-foreground">Click to download</p>
      </div>
    </div>
  </a>
</div>
  <!-- Single grid for all cards -->
  <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
    <!-- Business Plan Card -->
    <!-- Financials Card -->
    <!-- Partners Card -->
    <!-- Teams Card -->
    <!-- Growth Report Card -->
    <!-- PDF Cards -->
      
    <!-- Video Card -->
    <a
      class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground -mt-6"
      on:click={() => $showVideo = true}
    >
      <div class="flex items-center gap-4">
        <Box class="h-6 w-6" />
        <div>
          <h2 class="text-xl font-semibold">Watch Presentation</h2>
          <p class="text-muted-foreground">3D Video Overview</p>
        </div>
      </div>
    </a>

    <!-- Obstacle Course Card -->
    <a
      href="/obstacles"
      class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground -mt-6"
    >
      <div class="flex items-center gap-4">
        <Pyramid class="h-6 w-6" />
        <div>
          <h2 class="text-xl font-semibold">Course Detials</h2>
          <p class="text-muted-foreground">Course layout and features</p>
        </div>
      </div>
    </a>

    <!-- Legal Card -->
    <a
      href="/legal"
      class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground -mt-6"
    >
      <div class="flex items-center gap-4">
        <Scale class="h-6 w-6" />
        <div>
          <h2 class="text-xl font-semibold">Legal Documents</h2>
          <p class="text-muted-foreground">View legal information</p>
        </div>
      </div>
    </a>

    <!-- FAQ Card -->
    <a
      href="/faqs"
      class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground -mt-6"
    >
      <div class="flex items-center gap-4">
        <HelpCircle class="h-6 w-6" />
        <div>
          <h2 class="text-xl font-semibold">FAQ Guide</h2>
          <p class="text-muted-foreground">Detailed answers and support</p>
        </div>
      </div>
    </a>
  </div>
<!-- Global, Investment and Theme Songs (Full Width) -->
<div class="mt-4 grid gap-4 grid-cols-1 md:grid-cols-3">
  <a href="/global" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground flex justify-center text-center">
    <div class="flex items-center gap-4">
      <Globe class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Global Overview</h2>
        <p class="text-muted-foreground">International expansion and growth</p>
      </div>
    </div>
  </a>

  <a href="/investment" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground flex justify-center text-center">
    <div class="flex items-center gap-4">
      <DollarSign class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Investment</h2>
        <p class="text-muted-foreground">10 Sections</p>
      </div>
    </div>
  </a>

  <a href="/songs" class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground flex justify-center text-center">
    <div class="flex items-center gap-4">
      <AudioLines class="h-6 w-6" />
      <div>
        <h2 class="text-xl font-semibold">Theme Songs</h2>
        <p class="text-muted-foreground">Listen to FLI's official music</p>
      </div>
    </div>
  </a>
</div>
  <!-- Three-column layout for team cards -->
  <div class="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-3 mt-4">
    <!-- Team cards -->
  </div>
  <!-- Three-column layout for team cards -->
  <div class="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-3 mt-4">
    <Card.Root>
      <ProsCard {loading} {pros} {pb} />
    </Card.Root>
    <Card.Root>
      <ExecutiveCard {loading} {exe} {pb} />
    </Card.Root>
    <Card.Root>
      <BroadcasterCard {loading} {broadcasters} {pb} />
    </Card.Root>
  </div>
</main>
</div>
{#if $showVideo}
  <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div class="bg-background p-4 rounded-lg max-w-4xl w-full">
      <div class="flex justify-end mb-2">
        <button
          on:click={() => $showVideo = false}
          class="text-muted-foreground hover:text-foreground"
        >
          Close
        </button>
      </div>
      <div class="video-container" style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
        <iframe
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          src="https://drive.google.com/file/d/1C895DZEMAJ4vuY77iiRkc-ikS8p5hHeM/preview"
          allow="autoplay"
          allowfullscreen
        ></iframe>
      </div>
    </div>      
  </div>
{/if}
