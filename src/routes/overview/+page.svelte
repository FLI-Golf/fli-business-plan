<script lang="ts">
  // Core icons for navigation and functionality
  import Menu from "lucide-svelte/icons/menu";
 
  // Icons for main cards
  import Chart from "lucide-svelte/icons/chart-no-axes-combined";
  import { Handshake } from 'lucide-svelte';
  import { Disc3, DollarSign } from 'lucide-svelte';
  import FileText from "lucide-svelte/icons/file-text";
  import { Globe } from 'lucide-svelte';
  import Box from "lucide-svelte/icons/box";
  import { Pyramid } from 'lucide-svelte';
  import Scale from "lucide-svelte/icons/scale";
  import HelpCircle from "lucide-svelte/icons/help-circle";
  import { AudioLines, MapPin, Users, Eye, Layers } from 'lucide-svelte';

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
        sort: 'order'
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
    <nav class="hidden flex-col gap-6 text-xl font-medium md:flex md:flex-row md:items-center md:gap-6 md:text-base lg:gap-7 flex-1">
      <a href="##" class="text-foreground hover:text-foreground transition-colors inline-flex items-center gap-3 whitespace-nowrap">
        <img src="/logos/fli_logo.png" alt="FLI Logo" class="h-24 w-24 mt-2" />
        Welcome to The FLI Golf Business Plan
      </a>
    </nav>
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
          <div class="text-muted-foreground hover:text-foreground flex items-center gap-4">
            <Handshake class="h-6 w-6" />
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

          <a href="https://fli-golf-sports-pptx.tiiny.site/">
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
              <h2 class="text-xl font-semibold">Course Details</h2>
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
    </Sheet.Root>
    <div class="flex items-center gap-4">
      <LightSwitch />
      <DropdownMenu.Root>
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

    <!-- Unified Symmetrical Grid: All Cards (4 columns) -->
    <div class="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mt-4">
      <!-- Partners -->
      <a href="/partners" class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-blue-500 text-white">
            <Handshake class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Partners & Venues</h2>
            <p class="text-sm text-muted-foreground">Partners & Potential Venues</p>
          </div>
        </div>
      </a>

      <!-- Teams -->
      <a href="/teams" class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-purple-500 text-white">
            <Disc3 class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Teams</h2>
            <p class="text-sm text-muted-foreground">View team structure and roles</p>
          </div>
        </div>
      </a>

      <!-- Worldwide Growth -->
      <a href="https://udisc.com/disc-golf-growth-report" class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950 dark:to-green-900 border-green-200 dark:border-green-800">
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-green-500 text-white">
            <Chart class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Worldwide Growth</h2>
            <p class="text-sm text-muted-foreground">View 2024 Growth Report</p>
          </div>
        </div>
      </a>

      <!-- Compact Par-3 Disc Golf Facilities -->
      <a href="/compact" class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-950 dark:to-orange-900 border-orange-200 dark:border-orange-800">
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-orange-500 text-white">
            <MapPin class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Compact Facilities</h2>
            <p class="text-sm text-muted-foreground">Scalable Model for Urban Spaces</p>
          </div>
        </div>
      </a>

      <!-- Gambling Breakdown PDF -->
      <a href="https://few-likely.pockethost.io/api/files/pbc_3332084752/55smu1wvcn40q3s/betting_breakdown_dmqb1jf6xg.pdf" class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-red-50 to-red-100 dark:from-red-950 dark:to-red-900 border-red-200 dark:border-red-800" target="_blank">
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-red-500 text-white">
            <DollarSign class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Gambling Breakdown</h2>
            <p class="text-sm text-muted-foreground">Click to download PDF</p>
          </div>
        </div>
      </a>

      <!-- Team Franchising PDF -->
      <a href="https://few-likely.pockethost.io/api/files/pbc_3332084752/gf4h7738sl0n5o0/fgl_league_1_f68pj8fdbo.pdf" class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-950 dark:to-indigo-900 border-indigo-200 dark:border-indigo-800" target="_blank">
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-indigo-500 text-white">
            <FileText class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Team Franchising</h2>
            <p class="text-sm text-muted-foreground">Click to download PDF</p>
          </div>
        </div>
      </a>

      <!-- Broadcasting & Production PDF -->
      <a href="https://fli-golf-sports-pptx.tiiny.site/" class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950 dark:to-pink-900 border-pink-200 dark:border-pink-800" target="_blank">
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-pink-500 text-white">
            <AudioLines class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Broadcasting & Production</h2>
            <p class="text-sm text-muted-foreground">Click to download PDF</p>
          </div>
        </div>
      </a>

      <!-- Video Card -->
      <a
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground cursor-pointer bg-gradient-to-br from-cyan-50 to-cyan-100 dark:from-cyan-950 dark:to-cyan-900 border-cyan-200 dark:border-cyan-800"
        on:click={() => $showVideo = true}
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-cyan-500 text-white">
            <Box class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Watch Presentation</h2>
            <p class="text-sm text-muted-foreground">3D Video Overview</p>
          </div>
        </div>
      </a>

      <!-- Obstacle Course Card -->
      <a
        href="/obstacles"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-950 dark:to-amber-900 border-amber-200 dark:border-amber-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-amber-500 text-white">
            <Pyramid class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Course Details</h2>
            <p class="text-sm text-muted-foreground">Course layout and features</p>
          </div>
        </div>
      </a>

      <!-- Legal Card -->
      <a
        href="/legal"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 border-slate-200 dark:border-slate-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-slate-500 text-white">
            <Scale class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Legal Documents</h2>
            <p class="text-sm text-muted-foreground">View legal information</p>
          </div>
        </div>
      </a>

      <!-- FAQ Card -->
      <a
        href="/faqs"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-950 dark:to-teal-900 border-teal-200 dark:border-teal-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-teal-500 text-white">
            <HelpCircle class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">FAQ Guide</h2>
            <p class="text-sm text-muted-foreground">Detailed answers and support</p>
          </div>
        </div>
      </a>

      <!-- Audience Projections Card -->
      <a
        href="/audience-projections"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-950 dark:to-fuchsia-900 border-fuchsia-200 dark:border-fuchsia-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-fuchsia-500 text-white">
            <Users class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Audience Projections</h2>
            <p class="text-sm text-muted-foreground">Fan attendance & market analysis</p>
          </div>
        </div>
      </a>

      <!-- Global Viewer Card -->
      <a
        href="/global-viewer"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-950 dark:to-emerald-900 border-emerald-200 dark:border-emerald-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-emerald-500 text-white">
            <Eye class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Global Viewer</h2>
            <p class="text-sm text-muted-foreground">International viewership data</p>
          </div>
        </div>
      </a>

      <!-- Global Overview Card -->
      <a
        href="/global"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-950 dark:to-lime-900 border-lime-200 dark:border-lime-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-lime-500 text-white">
            <Globe class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Global Overview</h2>
            <p class="text-sm text-muted-foreground">International expansion plans</p>
          </div>
        </div>
      </a>

      <!-- Investment Card -->
      <a
        href="/investment"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-950 dark:to-yellow-900 border-yellow-200 dark:border-yellow-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-yellow-500 text-white">
            <DollarSign class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Investment</h2>
            <p class="text-sm text-muted-foreground">11 Sections</p>
          </div>
        </div>
      </a>

      <!-- Technology & Digital Innovation Card -->
      <a
        href="/tech"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-violet-50 to-violet-100 dark:from-violet-950 dark:to-violet-900 border-violet-200 dark:border-violet-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-violet-500 text-white text-3xl">
            🚀
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Technology & Innovation</h2>
            <p class="text-sm text-muted-foreground">Digital ecosystem & platforms</p>
          </div>
        </div>
      </a>

      <!-- Theme Songs Card -->
      <a
        href="/songs"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-fuchsia-50 to-fuchsia-100 dark:from-fuchsia-950 dark:to-fuchsia-900 border-fuchsia-200 dark:border-fuchsia-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-fuchsia-500 text-white">
            <AudioLines class="h-12 w-12" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Theme Songs</h2>
            <p class="text-sm text-muted-foreground">Listen to FLI's official music</p>
          </div>
        </div>
      </a>

      <!-- 7-Part Documentary Card -->
      <a
        href="/series"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-950 dark:to-rose-900 border-rose-200 dark:border-rose-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-rose-500 text-white text-3xl">
            🎬
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">7-Part Documentary</h2>
            <p class="text-sm text-muted-foreground">Behind the scenes series</p>
          </div>
        </div>
      </a>

      <!-- FLI Golf Membership Card -->
      <a
        href="/membership"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-lime-50 to-lime-100 dark:from-lime-950 dark:to-lime-900 border-lime-200 dark:border-lime-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-lime-500 text-white text-3xl">
            🏆
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Membership Program</h2>
            <p class="text-sm text-muted-foreground">Exclusive benefits and access</p>
          </div>
        </div>
      </a>

      <!-- Discord Community Card -->
      <a
        href="/discord"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-sky-50 to-sky-100 dark:from-sky-950 dark:to-sky-900 border-sky-200 dark:border-sky-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-sky-500 text-white text-3xl">
            💬
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Discord Community</h2>
            <p class="text-sm text-muted-foreground">Connect and collaborate</p>
          </div>
        </div>
      </a>

      <!-- Emerging Sports Trend Card -->
      <a
        href="/trend"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-950 dark:to-stone-900 border-stone-200 dark:border-stone-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-stone-500 text-white text-3xl">
            📈
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Emerging Sports Boom</h2>
            <p class="text-sm text-muted-foreground">Growth of emerging markets</p>
          </div>
        </div>
      </a>

      <!-- Committed Pros Card -->
      <a
        href="/pros"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950 dark:to-cyan-900 border-blue-200 dark:border-cyan-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 shadow-lg">
            <img src="/logos/wdr.png" alt="Pros Logo" class="w-12 h-12 object-contain" />
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Committed Pros</h2>
            <p class="text-sm text-muted-foreground">{pros.length} Professional Disc Golfers</p>
          </div>
        </div>
      </a>

      <!-- Apparel Marketing Plan Card -->
      <a
        href="/apparel"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-950 dark:to-purple-900 border-violet-200 dark:border-purple-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-gradient-to-br from-violet-500 to-purple-600 text-white text-3xl shadow-lg">
            👕
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Team Jerseys</h2>
            <p class="text-sm text-muted-foreground">Official FLI Golf team jersey designs</p>
          </div>
        </div>
      </a>

      <!-- Humanitarian Prospectus Card -->
      <a
        href="/prospectus"
        class="group rounded-xl border p-6 transition-all hover:shadow-lg hover:scale-105 text-foreground dark:text-foreground bg-gradient-to-br from-emerald-50 to-green-100 dark:from-emerald-950 dark:to-green-900 border-emerald-200 dark:border-green-800"
      >
        <div class="flex flex-col items-center text-center gap-4">
          <div class="p-4 rounded-full bg-gradient-to-br from-emerald-500 to-green-600 text-white text-3xl shadow-lg">
            🌍
          </div>
          <div>
            <h2 class="text-xl font-bold mb-2">Humanitarian Prospectus</h2>
            <p class="text-sm text-muted-foreground">Equality, accessibility & global impact</p>
          </div>
        </div>
      </a>



    </div>
      
          <!-- Team Cards Section -->
          <div class="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2 mt-4">
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
      
