<script lang="ts">
  import Activity from "lucide-svelte/icons/activity";
  import ArrowUpRight from "lucide-svelte/icons/arrow-up-right";
  import CircleUser from "lucide-svelte/icons/circle-user";
  import CreditCard from "lucide-svelte/icons/credit-card";
  import BpIcon from "lucide-svelte/icons/layout-panel-top";
  import Menu from "lucide-svelte/icons/menu";
  import Package2 from "lucide-svelte/icons/package-2";
  import Search from "lucide-svelte/icons/search";
  import Users from "lucide-svelte/icons/users";
  import Home from "lucide-svelte/icons/home";
  import FileText from "lucide-svelte/icons/file-text";
  import Chart from "lucide-svelte/icons/chart-no-axes-combined";
  import Mail from "lucide-svelte/icons/mail";
  import Lock from "lucide-svelte/icons/lock";
  import Scale from "lucide-svelte/icons/scale";

  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import * as Table from "$lib/components/ui/table/index.js";
  import LightSwitch from "@/components/ui/light-switch/light-switch.svelte";
  import PocketBase from 'pocketbase';
  import { onMount } from 'svelte';

  const pb = new PocketBase('https://few-likely.pockethost.io');
  
  let partners = [];
  let pros = [];
  let exe = [];
  let loading = true;

  onMount(async () => {
    const recordsExe = await pb.collection('executiveStaff').getList(1, 50, {
      expand: 'avatar',
      sort: '-created' // Added sort parameter
    });
    exe = recordsExe.items;
    
    const recordsPartners = await pb.collection('partners').getList(1, 50, {
      expand: 'avatar'
    });
    partners = recordsPartners.items;

    const recordsPros = await pb.collection('pros').getList(1, 50, {
      expand: 'avatar, flag',
      sort: 'rank' // Added sort parameter to order by rank ascending
    });
    pros = recordsPros.items;
    loading = false;
  });
  </script>



<div class="flex min-h-screen w-full flex-col">
  <header class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
  <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
    <a href="##" class="text-foreground hover:text-foreground transition-colors flex items-center gap-2">
      <Home class="h-4 w-4" />
      Dashboard
    </a>
    <a href="##" class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
      <Scale class="h-4 w-4" />
      Legal
    </a>
    <a href="##" class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
      <FileText class="h-4 w-4" />
      Plan
    </a>
    <a href="##" class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
      <Chart class="h-4 w-4" />
      Financials
    </a>
    <a href="##" class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
      <Mail class="h-4 w-4" />
      Contact
    </a>
  </nav>
  <Avatar.Root class="hidden h-9 w-9 sm:flex">
    <Avatar.Image src="/avatars/FGL_logo_CMYK-01.png" alt="Pure Logo" />
    <Avatar.Fallback>PL</Avatar.Fallback>
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
        <nav class="grid gap-6 text-lg font-medium">
          <a href="##" class="flex items-center gap-2 text-lg font-semibold">
            <Package2 class="h-6 w-6" />
            <span>FLI Golf</span>
          </a>
          <a href="##" class="hover:text-foreground flex items-center gap-2">
            <Home class="h-5 w-5" />
            Dashboard
          </a>
          <a href="##" class="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <Lock class="h-5 w-5" />
            Confidentiality
          </a>
          <a href="##" class="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <FileText class="h-5 w-5" />
            Business Plan
          </a>
          <a href="##" class="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <Chart class="h-5 w-5" />
            Financials
          </a>
          <a href="##" class="text-muted-foreground hover:text-foreground flex items-center gap-2">
            <Mail class="h-5 w-5" />
            Contact Us
          </a>
        </nav>
      </Sheet.Content>
    </Sheet.Root>
    <div class="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
      <form class="ml-auto flex-1 sm:flex-initial">
        <div class="relative">
          <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search products..."
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
            <CircleUser class="h-5 w-5" />
            <span class="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="end">
          <DropdownMenu.Label>My Account</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Settings</DropdownMenu.Item>
          <DropdownMenu.Item>Support</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>Logout</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  </header>
  <main class="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
      <!-- Business Plan Card -->
      <a 
        href="/business-plan"
        class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground"
      >
        <div class="flex items-center gap-4">
          <BpIcon class="h-6 w-6" />
          <div>
            <h2 class="text-xl font-semibold">Business Plan</h2>
            <p class="text-muted-foreground">8 Sections</p>
          </div>
        </div>
      </a>

      <!-- Financials Card -->
      <a 
        href="/financials"
        class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground"
      >
        <div class="flex items-center gap-4">
          <Chart class="h-6 w-6" />
          <div>
            <h2 class="text-xl font-semibold">Financials</h2>
            <p class="text-muted-foreground">View financial projections and metrics</p>
          </div>
        </div>
      </a>

      <!-- Partners Card -->
      <a 
        href="/partners"
        class="group rounded-lg border p-4 transition-colors hover:bg-muted text-foreground dark:text-foreground"
      >
        <div class="flex items-center gap-4">
          <Users class="h-6 w-6" />
          <div>
            <h2 class="text-xl font-semibold">Partners</h2>
            <p class="text-muted-foreground">{partners.length} Current active partnerships</p>
          </div>
        </div>
      </a>
    </div>
    <div class="grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
  <Card.Root>
    <Card.Header class="flex flex-row items-center justify-between">
      <div class="grid gap-2">
        <Card.Title>Pros</Card.Title>
        <Card.Description>Top Ranked Disc Golfers</Card.Description>
      </div>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button size="sm" class="gap-1">
            View All
            <ArrowUpRight class="h-4 w-4" />
          </Button>
        </AlertDialog.Trigger>

        <AlertDialog.Content class="sm:max-w-[800px]">
          <AlertDialog.Header>
            <AlertDialog.Title>Our Professional Players</AlertDialog.Title>
            <AlertDialog.Description>
              Complete list of professional disc golfers.
            </AlertDialog.Description>
          </AlertDialog.Header>

          <div class="overflow-y-auto max-h-[60vh]">
            <div class="grid grid-cols-2 gap-4 p-4">
              {#each pros.sort((a, b) => a.rank - b.rank) as pro}
                <AlertDialog.Root>
                  <AlertDialog.Trigger class="w-full">
                    <div class="flex items-center gap-4 p-3 hover:bg-muted rounded border w-full">
                      {#if pro.expand.flag}
                        <Avatar.Root class="h-10 w-14 rounded-none shrink-0">
                          <Avatar.Image 
                            src={`${pb.baseUrl}/api/files/${pro.expand.flag.collectionId}/${pro.expand.flag.id}/${pro.expand.flag.flag_image}`}
                            alt={`${pro.name}'s country flag`}
                          />
                        </Avatar.Root>
                      {/if}
                      <div class="text-left">
                        <div class="font-medium">{pro.name}</div>
                        <div class="text-sm text-muted-foreground">Rank #{pro.rank}</div>
                      </div>
                    </div>
                  </AlertDialog.Trigger>
                  <AlertDialog.Content>
                    <AlertDialog.Header class="flex justify-between items-start">
                      <div>
                        <AlertDialog.Title>{pro.name}</AlertDialog.Title>
                        <AlertDialog.Description>
                          Professional Disc Golfer
                        </AlertDialog.Description>
                      </div>
                      {#if pro.expand.avatar}
                        <Avatar.Root class="h-24 w-24 rounded-none">
                          <Avatar.Image
                            src={`${pb.baseUrl}/api/files/${pro.expand.avatar.collectionId}/${pro.expand.avatar.id}/${pro.expand.avatar.image}`}
                            alt={pro.name}
                          />
                        </Avatar.Root>
                      {/if}
                    </AlertDialog.Header>

                    <div class="overflow-y-auto max-h-[60vh]">
                      <div class="grid gap-4 py-4">
                        <div class="space-y-2">
                          <div class="flex items-center gap-2">
                            <Badge>Rank #{pro.rank}</Badge>
                            <Badge variant="outline">{pro.country}</Badge>
                          </div>
                          <p class="text-sm text-muted-foreground">{pro.bio || 'Professional Disc Golfer'}</p>
                        </div>
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
          </div>

          <AlertDialog.Footer>
            <AlertDialog.Cancel>
              <Button variant="outline">Close</Button>
            </AlertDialog.Cancel>
          </AlertDialog.Footer>
        </AlertDialog.Content>      </AlertDialog.Root>    </Card.Header>    <Card.Content>
      <Table.Root class="w-full">
        <Table.Header>
          <Table.Row>
            <Table.Head class="w-[70%]">Name</Table.Head>
            <Table.Head class="w-[30%] text-right">Ranked</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {#each pros.sort((a, b) => a.rank - b.rank).slice(0, 5) as pro}
        <Table.Row class="cursor-pointer hover:bg-muted">
          <Table.Cell class="w-[70%]">
            <AlertDialog.Root>
              <AlertDialog.Trigger class="w-full">
                <div class="flex items-center space-x-4">
                  {#if pro.expand.flag}
                    <Avatar.Root class="h-10 w-14 rounded-lg">
                      <Avatar.Image
                        src={`${pb.baseUrl}/api/files/${pro.expand.flag.collectionId}/${pro.expand.flag.id}/${pro.expand.flag.flag_image}`}
                        alt={`${pro.name}'s country flag`}
                      />
                    </Avatar.Root>
                  {/if}
                  <div class="font-medium">{pro.name}</div>
                </div>
              </AlertDialog.Trigger>
              
              <AlertDialog.Content>
                <AlertDialog.Header class="flex justify-between items-start">
                  <div>
                    <AlertDialog.Title>{pro.name}</AlertDialog.Title>
                    <AlertDialog.Description>
                      Detailed information about {pro.name}
                    </AlertDialog.Description>
                  </div>
                  {#if pro.expand.avatar}
                    <Avatar.Root class="h-24 w-24 rounded-none">
                      <Avatar.Image
                        src={`${pb.baseUrl}/api/files/${pro.expand.avatar.collectionId}/${pro.expand.avatar.id}/${pro.expand.avatar.image}`}
                        alt={pro.name}
                      />
                    </Avatar.Root>
                  {/if}
                </AlertDialog.Header>

                <div class="overflow-y-auto max-h-[60vh]">
                  <div class="grid gap-4 py-4">
                    <div class="space-y-2">
                      <div class="flex items-center gap-2">
                        {#if pro.expand.flag}
                          <Avatar.Root class="h-4 w-4 rounded-none">
                            <Avatar.Image
                              src={`${pb.baseUrl}/api/files/${pro.expand.flag.collectionId}/${pro.expand.flag.id}/${pro.expand.flag.flag_image}`}
                              alt={`${pro.name}'s country flag`}
                            />
                          </Avatar.Root>
                        {/if}
                        <Badge>Rank #{pro.rank}</Badge>
                        <Badge variant="outline">{pro.country}</Badge>
                      </div>
                      <p class="text-sm text-muted-foreground">{pro.bio || 'Professional Disc Golfer'}</p>
                    </div>
                  </div>
                </div>

                <AlertDialog.Footer>
                  <AlertDialog.Cancel>
                    <Button variant="outline">Close</Button>
                  </AlertDialog.Cancel>
                </AlertDialog.Footer>
              </AlertDialog.Content>
            </AlertDialog.Root>
          </Table.Cell>
          <Table.Cell class="w-[30%] text-right">#{pro.rank}</Table.Cell>
        </Table.Row>
          {/each}        </Table.Body>      </Table.Root>    </Card.Content>  </Card.Root>
      <Card.Root>
        <Card.Header class="flex flex-row items-center">
          <div class="grid gap-2">
            <Card.Title>Executive Staff</Card.Title>
            <Card.Description>Key Members of the Organization</Card.Description>
          </div>
        </Card.Header>
        <Card.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head class="xl:table.-column hidden">Type</Table.Head>
                <Table.Head class="xl:table.-column hidden">Status</Table.Head>
                <Table.Head class="xl:table.-column hidden">Date</Table.Head>
                <Table.Head class="text-right">Role</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {#each exe as executive}
              <Table.Row>
                <Table.Cell>
                  <AlertDialog.Root>
                    <AlertDialog.Trigger class="w-full">
                      <div class="flex items-center space-x-4">
                        {#if executive.avatar}
                          <Avatar.Root class="h-10 w-14 rounded-lg">
                            <Avatar.Image 
                              src={`${pb.baseUrl}/api/files/${executive.expand.avatar.collectionId}/${executive.expand.avatar.id}/${executive.expand.avatar.image}`}
                              alt={executive.name}
                            />
                          </Avatar.Root>
                        {:else}
                          <Avatar.Fallback>{executive.name?.charAt(0)}</Avatar.Fallback>
                        {/if}
                        <div class="font-medium">{executive.name}</div>
                      </div>
                    </AlertDialog.Trigger>

                    <AlertDialog.Content>
                      <AlertDialog.Header class="flex justify-between items-start">
                        <div>
                          <AlertDialog.Title>{executive.name}</AlertDialog.Title>
                          <AlertDialog.Description>
                            {executive.title}
                          </AlertDialog.Description>
                        </div>
                        {#if executive.avatar}
                          <Avatar.Root class="h-24 w-32 rounded-none">
                            <Avatar.Image 
                              src={`${pb.baseUrl}/api/files/${executive.expand.avatar.collectionId}/${executive.expand.avatar.id}/${executive.expand.avatar.image}`}
                              alt={executive.name}
                            />
                          </Avatar.Root>
                        {/if}
                      </AlertDialog.Header>

                      <div class="overflow-y-auto max-h-[60vh]">
                        <div class="grid gap-4 py-4">
                          <div class="space-y-2">
                            <div class="flex items-center gap-2">
                              <Badge variant="outline">{executive.role}</Badge>
                              <span class="text-sm text-muted-foreground">{executive.email}</span>
                            </div>
                            <p class="text-sm text-muted-foreground">{executive.bio || 'Executive Staff Member'}</p>
                          </div>
                        </div>
                      </div>

                      <AlertDialog.Footer>
                        <AlertDialog.Cancel>
                          <Button variant="outline">Close</Button>
                        </AlertDialog.Cancel>
                      </AlertDialog.Footer>
                    </AlertDialog.Content>                  </AlertDialog.Root>                </Table.Cell>
                <Table.Cell class="text-right">{executive.role}</Table.Cell>
              </Table.Row>              {/each}
            </Table.Body>
          </Table.Root>
        </Card.Content>
      </Card.Root>
    </div>
  </main>  
</div>