<script lang="ts">
  import Activity from "lucide-svelte/icons/activity";
  import ArrowUpRight from "lucide-svelte/icons/arrow-up-right";
  import CircleUser from "lucide-svelte/icons/circle-user";
  import CreditCard from "lucide-svelte/icons/credit-card";
  import DollarSign from "lucide-svelte/icons/dollar-sign";
  import Menu from "lucide-svelte/icons/menu";
  import Package2 from "lucide-svelte/icons/package-2";
  import Search from "lucide-svelte/icons/search";
  import Users from "lucide-svelte/icons/users";
  import Home from "lucide-svelte/icons/home";
  import FileText from "lucide-svelte/icons/file-text";
  import Calculator from "lucide-svelte/icons/calculator";
  import Mail from "lucide-svelte/icons/mail";
  import Lock from "lucide-svelte/icons/lock";

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

  const pb = new PocketBase('https://8090-fligolf-flibusinessplan-3t70ta2c7qs.ws-us117.gitpod.io');
  
  let partners = [];

  onMount(async () => {
    const records = await pb.collection('partners').getList(1, 50, {
      expand: 'avatar'
    });
    partners = records.items;
    console.log('Partners loaded:', partners);
  });

</script>
<!-- In the AlertDialog.Content section -->
<div class="grid gap-4 py-4">
  <div class="grid grid-cols-2 items-center gap-4">
    {#each partners as partner}
      <div class="flex items-center space-x-4">
        <Avatar.Root>
          <Avatar.Image 
            src={`${pb.baseUrl}/api/files/partners/${partner.id}/${partner.avatar}`} 
            alt={partner.name} 
          />
          <Avatar.Fallback>{partner.name?.charAt(0)}</Avatar.Fallback>
        </Avatar.Root>
        <div class="space-y-1">
          <p class="text-sm font-medium leading-none">{partner.name}</p>
          <p class="text-sm text-muted-foreground">
            {partner.expand?.relField1?.name}
            {partner.expand?.relField2?.subRelField?.name}
          </p>
        </div>
      </div>
    {/each}
  </div>
</div>


<div class="flex min-h-screen w-full flex-col">
  <header class="bg-background sticky top-0 flex h-16 items-center gap-4 border-b px-4 md:px-6">
  <nav class="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
    <a href="##" class="text-foreground hover:text-foreground transition-colors flex items-center gap-2">
      <Home class="h-4 w-4" />
      Dashboard
    </a>
    <a href="##" class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
      <Lock class="h-4 w-4" />
      Legal
    </a>
    <a href="##" class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
      <FileText class="h-4 w-4" />
      Plan
    </a>
    <a href="##" class="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2">
      <Calculator class="h-4 w-4" />
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
            <Calculator class="h-5 w-5" />
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
    <div class="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
      <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
          <Card.Title class="text-sm font-medium">Sponsor Potential</Card.Title>
          <DollarSign class="text-muted-foreground h-4 w-4" />
        </Card.Header>
        <Card.Content>
          <div class="text-2xl font-bold">$45,231.89</div>
          <p class="text-muted-foreground text-xs">+20.1% from last month</p>
        </Card.Content>
      </Card.Root>
      <script lang="ts">
        import PocketBase from 'pocketbase';
        const pb = new PocketBase('https://8090-fligolf-flibusinessplan-3t70ta2c7qs.ws-us117.gitpod.io');
  
        let partners = [];
      </script>

      <Card.Root>
        <AlertDialog.Root>
          <AlertDialog.Trigger>
            <Button variant="ghost" class="w-full">
              <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
                <Card.Title class="text-sm font-medium">Partners</Card.Title>
                <Users class="text-muted-foreground h-4 w-4" />
              </Card.Header>
            </Button>
          </AlertDialog.Trigger>
    
          <AlertDialog.Content>
            <AlertDialog.Header>
              <AlertDialog.Title>Our Partners</AlertDialog.Title>
              <AlertDialog.Description>
                Current active partnerships and collaborations.
              </AlertDialog.Description>
            </AlertDialog.Header>
      
            <div class="grid gap-4 py-4">
              <div class="grid grid-cols-2 items-center gap-4">
                {#each partners as partner}
                  <div class="flex items-center space-x-4">
                    <Avatar.Root>
                      <Avatar.Fallback>{partner.name?.charAt(0)}</Avatar.Fallback>
                    </Avatar.Root>
                    <div class="space-y-1">
                      <p class="text-sm font-medium leading-none">{partner.name}</p>
                      <p class="text-sm text-muted-foreground">{partner.type}</p>
                    </div>
                  </div>
                {/each}
              </div>
            </div>
      
            <AlertDialog.Footer>
              <AlertDialog.Cancel>
                <Button variant="outline">Close</Button>
              </AlertDialog.Cancel>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog.Root>
        <Card.Content>
          <div class="text-2xl font-bold">+2350</div>
          <p class="text-muted-foreground text-xs">+180.1% from last month</p>
        </Card.Content>
      </Card.Root>
      <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
          <Card.Title class="text-sm font-medium">Ticket Sales</Card.Title>
          <CreditCard class="text-muted-foreground h-4 w-4" />
        </Card.Header>
        <Card.Content>
          <div class="text-2xl font-bold">+12,234</div>
          <p class="text-muted-foreground text-xs">+19% from last month</p>
        </Card.Content>
      </Card.Root>
      <Card.Root>
        <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
          <Card.Title class="text-sm font-medium">Subscriptions & Ecommerce</Card.Title>
          <Activity class="text-muted-foreground h-4 w-4" />
        </Card.Header>
        <Card.Content>
          <div class="text-2xl font-bold">+573</div>
          <p class="text-muted-foreground text-xs">+201 since last hour</p>
        </Card.Content>
      </Card.Root>
    </div>
    <div class="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
      <Card.Root class="xl:col-span-2">
        <Card.Header class="flex flex-row items-center">
          <div class="grid gap-2">
            <Card.Title>Pros</Card.Title>
            <Card.Description>Top Ranked Disc Golfers</Card.Description>
          </div>
          <Button href="##" size="sm" class="ml-auto gap-1">
            View All
            <ArrowUpRight class="h-4 w-4" />
          </Button>
        </Card.Header>
        <Card.Content>
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head class="xl:table.-column hidden">Type</Table.Head>
                <Table.Head class="xl:table.-column hidden">Status</Table.Head>
                <Table.Head class="xl:table.-column hidden">Date</Table.Head>
                <Table.Head class="text-right">Ranked</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>
                  <div class="font-medium">Liam Johnson</div>
                  <div class="text-muted-foreground hidden text-sm md:inline">
                    liam@example.com
                  </div>
                </Table.Cell>
                <Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
                <Table.Cell class="xl:table.-column hidden">
                  <Badge class="text-xs" variant="outline">Approved</Badge>
                </Table.Cell>
                <Table.Cell
                  class="md:table.-cell xl:table.-column hidden lg:hidden"
                >
                  2023-06-23
                </Table.Cell>
                <Table.Cell class="text-right">$250.00</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <div class="font-medium">Olivia Smith</div>
                  <div class="text-muted-foreground hidden text-sm md:inline">
                    olivia@example.com
                  </div>
                </Table.Cell>
                <Table.Cell class="xl:table.-column hidden">Refund</Table.Cell>
                <Table.Cell class="xl:table.-column hidden">
                  <Badge class="text-xs" variant="outline">Declined</Badge>
                </Table.Cell>
                <Table.Cell
                  class="md:table.-cell xl:table.-column hidden lg:hidden"
                >
                  2023-06-24
                </Table.Cell>
                <Table.Cell class="text-right">$150.00</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <div class="font-medium">Noah Williams</div>
                  <div class="text-muted-foreground hidden text-sm md:inline">
                    noah@example.com
                  </div>
                </Table.Cell>
                <Table.Cell class="xl:table.-column hidden">
                  Subscription
                </Table.Cell>
                <Table.Cell class="xl:table.-column hidden">
                  <Badge class="text-xs" variant="outline">Approved</Badge>
                </Table.Cell>
                <Table.Cell
                  class="md:table.-cell xl:table.-column hidden lg:hidden"
                >
                  2023-06-25
                </Table.Cell>
                <Table.Cell class="text-right">$350.00</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <div class="font-medium">Emma Brown</div>
                  <div class="text-muted-foreground hidden text-sm md:inline">
                    emma@example.com
                  </div>
                </Table.Cell>
                <Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
                <Table.Cell class="xl:table.-column hidden">
                  <Badge class="text-xs" variant="outline">Approved</Badge>
                </Table.Cell>
                <Table.Cell
                  class="md:table.-cell xl:table.-column hidden lg:hidden"
                >
                  2023-06-26
                </Table.Cell>
                <Table.Cell class="text-right">$450.00</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>
                  <div class="font-medium">Liam Johnson</div>
                  <div class="text-muted-foreground hidden text-sm md:inline">
                    liam@example.com
                  </div>
                </Table.Cell>
                <Table.Cell class="xl:table.-column hidden">Sale</Table.Cell>
                <Table.Cell class="xl:table.-column hidden">
                  <Badge class="text-xs" variant="outline">Approved</Badge>
                </Table.Cell>
                <Table.Cell
                  class="md:table.-cell xl:table.-column hidden lg:hidden"
                >
                  2023-06-27
                </Table.Cell>
                <Table.Cell class="text-right">$550.00</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
        </Card.Content>
      </Card.Root>
      <Card.Root>
        <Card.Header>
          <Card.Title>Executive Staff</Card.Title>
        </Card.Header>
        <Card.Content class="grid gap-8">
          <div class="flex items-center gap-4">
            <Avatar.Root class="hidden h-9 w-9 sm:flex">
              <Avatar.Fallback>OM</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid gap-1">
              <p class="text-sm font-medium leading-none">Andrew Panza</p>
              <p class="text-muted-foreground text-sm">andrew@fligolf.com</p>
            </div>
            <div class="ml-auto font-medium">CEO</div>
          </div>
          <div class="flex items-center gap-4">
            <Avatar.Root class="hidden h-9 w-9 sm:flex">
              <Avatar.Image src="/avatars/02.png" alt="Avatar" />
              <Avatar.Fallback>JL</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid gap-1">
              <p class="text-sm font-medium leading-none">Dustin Dinsmore</p>
              <p class="text-muted-foreground text-sm">dustin@fligolf.com</p>
            </div>
            <div class="ml-auto font-medium">CTO</div>
          </div>
          <div class="flex items-center gap-4">
            <Avatar.Root class="hidden h-9 w-9 sm:flex">
              <Avatar.Image src="/avatars/Pure-Logo_1.png" alt="Avatar" />
              <Avatar.Fallback>IN</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid gap-1">
              <p class="text-sm font-medium leading-none">Corey La Russo</p>
              <p class="text-muted-foreground text-sm">corey@fligolf.com</p>
            </div>
            <div class="ml-auto font-medium">CMO</div>
          </div>
          <div class="flex items-center gap-4">
            <Avatar.Root class="hidden h-9 w-9 sm:flex">
              <Avatar.Image src="/avatars/04.png" alt="Avatar" />
              <Avatar.Fallback>WK</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid gap-1">
              <p class="text-sm font-medium leading-none">Alaxander Smart</p>
              <p class="text-muted-foreground text-sm">alexander@fligolf.com</p>
            </div>
            <div class="ml-auto font-medium">CFO</div>
          </div>
          <div class="flex items-center gap-4">
            <Avatar.Root class="hidden h-9 w-9 sm:flex">
              <Avatar.Image src="/avatars/05.png" alt="Avatar" />
              <Avatar.Fallback>SD</Avatar.Fallback>
            </Avatar.Root>
            <div class="grid gap-1">
              <p class="text-sm font-medium leading-none">Mark Colman</p>
              <p class="text-muted-foreground text-sm">mark@fligolf.com</p>
            </div>
            <div class="ml-auto font-medium">CPO</div>
          </div>
        </Card.Content>
      </Card.Root>
    </div>
  </main> 
</div>
