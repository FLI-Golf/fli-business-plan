<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { ArrowUpRight, Instagram, Facebook, Youtube, Mic, Trophy, Users, Globe } from 'lucide-svelte';

  interface Broadcaster {
    name: string;
    role?: string;
    bio?: string;
    gender?: string;
    expand?: {
      avatar?: {
        collectionId: string;
        id: string;
        image: string;
      };
    };
  }

  export let loading: boolean;
  export let broadcasters: Broadcaster[];
  export let pb: {
    baseUrl: string;
  };
</script>

<Card.Header class="flex flex-col items-center text-center gap-4 pb-6">
  <div class="p-4 rounded-full bg-gradient-to-br from-pink-500 to-pink-600 shadow-lg">
    <Mic class="h-12 w-12 text-white" />
  </div>
  <div class="grid gap-2">
    <Card.Title class="text-2xl font-bold">Broadcasters</Card.Title>
    <Card.Description class="text-base">Our media partners.</Card.Description>
  </div>

  <AlertDialog.Root>
    <AlertDialog.Trigger>
      <Button size="sm" class="gap-1">
        Social Media Reach
        <ArrowUpRight class="h-4 w-4" />
      </Button>
    </AlertDialog.Trigger>

    <AlertDialog.Content class="sm:max-w-[800px]">
      <AlertDialog.Header>
        <AlertDialog.Title>Social Media Reach</AlertDialog.Title>
        <AlertDialog.Description>
          Complete analysis of our media partners and their social reach.
        </AlertDialog.Description>
      </AlertDialog.Header>

      <div class="overflow-y-auto max-h-[70vh]">
        <div class="p-4">
          <div class="bg-muted p-6 rounded-lg mb-8">
            <h2 class="text-2xl font-bold mb-2 text-center">FLI Golf Social Media Reach</h2>
            <p class="text-lg mb-4 text-center font-semibold">
              TOTAL SOCIAL MEDIA REACH WITH PLAYERS, BROADCASTING STAFF & MEDIA PARTNER: 3.7+ MILLION FOLLOWERS/SUBSCRIBERS!!
            </p>
            <p class="text-sm text-muted-foreground mb-4 text-center">
              This is only considering Instagram, Facebook, YouTube, and Spotify. An estimated 250,000+ additional followers exist across other social platforms.
              These numbers represent the reach accessible to FLI Golf marketing efforts through players and employee contracts.
              This means FLI Golf will be immediately introduced to over 3.7 million active disc golf fans across the world.
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div class="bg-primary/10 p-4 rounded-lg text-center">
                <div class="flex justify-center mb-2">
                  <Instagram class="h-6 w-6 text-pink-500" />
                </div>
                <h3 class="font-bold">Instagram</h3>
                <p class="text-2xl font-bold">1.9M+</p>
                <p class="text-xs text-muted-foreground">Followers</p>
              </div>
              <div class="bg-primary/10 p-4 rounded-lg text-center">
                <div class="flex justify-center mb-2">
                  <Youtube class="h-6 w-6 text-red-500" />
                </div>
                <h3 class="font-bold">YouTube</h3>
                <p class="text-2xl font-bold">452K+</p>
                <p class="text-xs text-muted-foreground">Subscribers</p>
              </div>
              <div class="bg-primary/10 p-4 rounded-lg text-center">
                <div class="flex justify-center mb-2">
                  <Facebook class="h-6 w-6 text-blue-500" />
                </div>
                <h3 class="font-bold">Facebook</h3>
                <p class="text-2xl font-bold">604K+</p>
                <p class="text-xs text-muted-foreground">Followers</p>
              </div>
            </div>
          </div>
          
          <h3 class="text-lg font-medium mb-4 flex items-center gap-2">
            <Users class="h-5 w-5" />
            Player Social Media Totals
          </h3>
          <Table.Root class="w-full">
            <Table.Header>
              <Table.Row>
                <Table.Head>Division</Table.Head>
                <Table.Head class="text-right">Instagram</Table.Head>
                <Table.Head class="text-right">YouTube</Table.Head>
                <Table.Head class="text-right">Facebook</Table.Head>
                <Table.Head class="text-right">Total Followers</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>FPO</Table.Cell>
                <Table.Cell class="text-right">1,224,000</Table.Cell>
                <Table.Cell class="text-right">82,000</Table.Cell>
                <Table.Cell class="text-right">155,000</Table.Cell>
                <Table.Cell class="text-right">1,461,000</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>MPO</Table.Cell>
                <Table.Cell class="text-right">689,000</Table.Cell>
                <Table.Cell class="text-right">370,000</Table.Cell>
                <Table.Cell class="text-right">449,000</Table.Cell>
                <Table.Cell class="text-right">1,508,000</Table.Cell>
              </Table.Row>
              <Table.Row class="font-medium">
                <Table.Cell>Combined</Table.Cell>
                <Table.Cell class="text-right">1,913,000</Table.Cell>
                <Table.Cell class="text-right">452,000</Table.Cell>
                <Table.Cell class="text-right">604,000</Table.Cell>
                <Table.Cell class="text-right">2,969,000</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
          
          <h3 class="text-lg font-medium mt-8 mb-4 flex items-center gap-2">
            <Mic class="h-5 w-5" />
            Broadcast Team Social Media Totals
          </h3>
          <Table.Root class="w-full">
            <Table.Header>
              <Table.Row>
                <Table.Head>Name</Table.Head>
                <Table.Head class="text-right">Instagram</Table.Head>
                <Table.Head class="text-right">YouTube</Table.Head>
                <Table.Head class="text-right">Facebook</Table.Head>
                <Table.Head class="text-right">Podcast Platform</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell>Paul Ulibarri</Table.Cell>
                <Table.Cell class="text-right">102K</Table.Cell>
                <Table.Cell class="text-right">~10K est.</Table.Cell>
                <Table.Cell class="text-right">14K</Table.Cell>
                <Table.Cell class="text-right">38K (Tour Life)</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Kona Star Montgomery</Table.Cell>
                <Table.Cell class="text-right">101K</Table.Cell>
                <Table.Cell class="text-right">~5K est.</Table.Cell>
                <Table.Cell class="text-right">14K</Table.Cell>
                <Table.Cell class="text-right">—</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Kevin Barnett</Table.Cell>
                <Table.Cell class="text-right">2.4K</Table.Cell>
                <Table.Cell class="text-right">~1K est.</Table.Cell>
                <Table.Cell class="text-right">229</Table.Cell>
                <Table.Cell class="text-right">—</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>Disc Golf World (team)</Table.Cell>
                <Table.Cell class="text-right">~2K est.</Table.Cell>
                <Table.Cell class="text-right">~3K est.</Table.Cell>
                <Table.Cell class="text-right">—</Table.Cell>
                <Table.Cell class="text-right">~2K Spotify</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table.Root>
          
          <div class="mt-6">
            <p class="text-sm font-medium">Cumulative Estimated Reach: ~330,000 followers/subscribers across listed platforms</p>
          </div>
          
          <h3 class="text-lg font-medium mt-8 mb-4 flex items-center gap-2">
            <Globe class="h-5 w-5" />
            Go Throw League (League Marketing Partner) Social Media Totals
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div class="border rounded-lg p-4 shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <Youtube class="h-5 w-5 text-red-500" />
                <h4 class="font-bold">YouTube</h4>
              </div>
              <p class="text-xl font-bold">147,000</p>
              <p class="text-sm text-muted-foreground">Subscribers</p>
              <p class="text-sm mt-2">~54 million views across 1,539 videos</p>
            </div>
            <div class="border rounded-lg p-4 shadow-sm">
              <div class="flex items-center gap-2 mb-2">
                <Instagram class="h-5 w-5 text-pink-500" />
                <h4 class="font-bold">Instagram</h4>
              </div>
              <p class="text-xl font-bold">39,000</p>
              <p class="text-sm text-muted-foreground">Followers</p>
            </div>
            <div class="border rounded-lg p-4 shadow-sm">
              <h4 class="font-bold mb-2">Popular Content</h4>
              <p class="text-sm">The "OTB Skins Series" featuring professional players like Kevin Jones has garnered significant attention, with some videos reaching over 500,000 views.</p>
            </div>
          </div>
          
          <h3 class="text-xl font-bold mt-8 mb-4 flex items-center gap-2">
            <Trophy class="h-6 w-6 text-yellow-500" />
            FLI Golf Broadcast Team Summary
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="border rounded-lg p-4 shadow-sm">
              <h4 class="font-bold mb-2 flex items-center gap-2">
                <Mic class="h-4 w-4" />
                1. Paul Ulibarri – Analyst / Co-Anchor
              </h4>
              <p class="mb-2">Role: Color commentary, player insights, host of Tour Life Podcast</p>
              <ul class="list-disc pl-5 mb-2">
                <li>Instagram: 102K</li>
                <li>Facebook: 14K</li>
                <li>YouTube: ~Tour Life Podcast</li>
                <li>Tour Life Podcast YouTube: 38K subscribers, 15K–35K avg views/ep</li>
              </ul>
              <p class="font-semibold mt-2">Strengths:</p>
              <ul class="list-disc pl-5">
                <li>Most recognized analyst in disc golf</li>
                <li>Insightful, experienced, engaging</li>
                <li>Highly connected with both fans and players</li>
              </ul>
              <p class="text-sm mt-2">Engagement: Strong podcast interaction, especially during controversy or player interviews</p>
            </div>

            <div class="border rounded-lg p-4 shadow-sm">
              <h4 class="font-bold mb-2 flex items-center gap-2">
                <Mic class="h-4 w-4" />
                2. Kona Star Montgomery – Co-Anchor / Analyst
              </h4>
              <ul class="list-disc pl-5 mb-2">
                <li>Instagram: 101K</li>
                <li>Facebook: 14K</li>
                <li>YouTube: Occasionally active</li>
              </ul>
              <p class="font-semibold mt-2">Strengths:</p>
              <ul class="list-disc pl-5">
                <li>Player-fan favorite with high relatability</li>
                <li>Knowledgeable and well-spoken on the mic</li>
                <li>Brings balance and representation to the booth</li>
              </ul>
              <p class="text-sm mt-2">Engagement: High comment and like volume per post, especially around live coverage and personal stories</p>
            </div>
            
            <div class="border rounded-lg p-4 shadow-sm">
              <h4 class="font-bold mb-2 flex items-center gap-2">
                <Mic class="h-4 w-4" />
                3. Kevin Barnett – Play-by-Play / Anchor
              </h4>
              <ul class="list-disc pl-5 mb-2">
                <li>Instagram: 2.4K</li>
                <li>Twitter: 1.3K</li>
                <li>Facebook: 229</li>
              </ul>
              <p class="mb-2">Background: Former Olympic volleyball player, experienced sports broadcaster</p>
              <p class="font-semibold mt-2">Strengths:</p>
              <ul class="list-disc pl-5">
                <li>Brings high-end professional broadcasting energy</li>
                <li>Strong storytelling and pacing</li>
                <li>Great at simplifying the technical for casual fans</li>
              </ul>
              <p class="text-sm mt-2">Engagement: Low follower count but high credibility; connects well during live shows</p>
            </div>

            <div class="border rounded-lg p-4 shadow-sm">
                           <h4 class="font-bold mb-2 flex items-center gap-2">
                <Mic class="h-4 w-4" />
                4. Swiss & Jefferson ("Disc Golf World") – Podcast Analysts
              </h4>
              <p class="mb-2">Platform: Disc Golf World Podcast</p>
              <p class="mb-2">YouTube / Spotify: Likely 1K–4K average views per episode</p>
              <p class="mb-2">Style: Informal, comedic, culturally tuned-in</p>
              <p class="font-semibold mt-2">Strengths:</p>
              <ul class="list-disc pl-5">
                <li>Inject humor and authenticity into coverage</li>
                <li>Fan-first voice in media</li>
                <li>Perfect for pre-show, in-game, and post game betting coverage</li>
              </ul>
              <p class="text-sm mt-2">Engagement: Small but loyal and rapidly growing base; ideal for betting fans and younger audience segments</p>
            </div>
          </div>
          
          <div class="mt-6">
            <p class="text-sm text-muted-foreground">
              This data represents the total social media following across different platforms for our broadcasters and players.
              Through these channels, FLI Golf will be immediately introduced to over 3.7 million active disc golf fans across the world.
            </p>
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
</Card.Header>

<Card.Content>
  {#if loading}
    <div class="space-y-3">
      {#each Array(5) as _}
        <div class="flex items-center space-x-4 p-3 border rounded-lg">
          <div class="h-12 w-12 bg-muted rounded-full animate-pulse"></div>
          <div class="h-6 bg-muted rounded animate-pulse w-1/3"></div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="space-y-3">
      {#each broadcasters as broadcaster}
        <AlertDialog.Root>
          <AlertDialog.Trigger class="w-full">
            <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer group">
              <div class="flex items-center gap-4">
                {#if broadcaster.expand?.avatar}
                  <Avatar.Root class="h-12 w-12 rounded-full shadow-sm">
                    <Avatar.Image
                      src={`${pb.baseUrl}/api/files/${broadcaster.expand.avatar.collectionId}/${broadcaster.expand.avatar.id}/${broadcaster.expand.avatar.image}`}
                      alt={broadcaster.name}
                    />
                  </Avatar.Root>
                {:else}
                  <Avatar.Root class="h-12 w-12">
                    <Avatar.Fallback>{broadcaster.name?.charAt(0)}</Avatar.Fallback>
                  </Avatar.Root>
                {/if}
                <div class="text-left">
                  <div class="font-semibold text-base">{broadcaster.name}</div>
                  <div class="text-sm text-muted-foreground">{broadcaster.role || 'Broadcaster'}</div>
                </div>
              </div>
              <Badge variant="outline" class="shrink-0">{broadcaster.role || 'Broadcaster'}</Badge>
            </div>
          </AlertDialog.Trigger>

          <AlertDialog.Content>
            <AlertDialog.Header class="flex justify-between items-start">
              <div>
                <AlertDialog.Title>{broadcaster.name}</AlertDialog.Title>
                <AlertDialog.Description>
                  Detailed information about {broadcaster.name}
                </AlertDialog.Description>
              </div>
              {#if broadcaster.expand?.avatar}
                <Avatar.Root class="h-24 w-24">
                  <Avatar.Image
                    src={`${pb.baseUrl}/api/files/${broadcaster.expand.avatar.collectionId}/${broadcaster.expand.avatar.id}/${broadcaster.expand.avatar.image}`}
                    alt={broadcaster.name}
                  />
                </Avatar.Root>
              {/if}
            </AlertDialog.Header>

            <div class="overflow-y-auto max-h-[60vh]">
              <div class="grid gap-4 py-4">
                <div class="space-y-2">
                  <div class="flex items-center gap-2">
                    <Badge variant="outline">{broadcaster.role || 'Broadcaster'}</Badge>
                    <Badge>{broadcaster.gender}</Badge>
                  </div>
                  <p class="text-sm text-muted-foreground">
                    {@html broadcaster.bio || 'Professional Broadcaster'}
                  </p>
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
  {/if}
</Card.Content>
