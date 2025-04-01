<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { ArrowUpRight } from 'lucide-svelte';


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

<Card.Header class="flex flex-row items-center justify-between">
  <div class="grid gap-2">
    <Card.Title>Broadcasters</Card.Title>
    <Card.Description>Our media partners.</Card.Description>
  </div>

  <AlertDialog.Root>
    <AlertDialog.Trigger>
      <Button size="sm" class="gap-1">
        Social Media
        <ArrowUpRight class="h-4 w-4" />
      </Button>
    </AlertDialog.Trigger>

    <AlertDialog.Content class="sm:max-w-[800px]">
      <AlertDialog.Header>
        <AlertDialog.Title>Social Media</AlertDialog.Title>
        <AlertDialog.Description>
          Complete list of our media partners.
        </AlertDialog.Description>
      </AlertDialog.Header>

      <div class="overflow-y-auto max-h-[60vh]">
        <div class="p-4">
          <h3 class="text-lg font-medium mb-4">Player Social Media Totals</h3>
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
          
          <h3 class="text-lg font-medium mt-8 mb-4">Estimated Total Social Media Reach</h3>
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
            <p class="text-sm text-muted-foreground mt-2">
              This data represents the total social media following across different platforms for our broadcasters and players.
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
    <div class="space-y-4">
      {#each Array(5) as _}
        <div class="flex items-center space-x-4">
          <div class="h-10 w-10 bg-muted rounded-full animate-pulse"></div>
          <div class="h-6 bg-muted rounded animate-pulse w-1/3"></div>
        </div>
      {/each}
    </div>
  {:else}
    <Table.Root class="w-full">
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[70%]">Name</Table.Head>
          <Table.Head class="w-[30%] text-right">Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {#each broadcasters as broadcaster}
          <Table.Row class="cursor-pointer hover:bg-muted">
            <Table.Cell class="w-[70%]">
              <AlertDialog.Root>
                <AlertDialog.Trigger class="w-full">
                  <div class="flex items-center space-x-4">
                    {#if broadcaster.expand?.avatar}
                      <Avatar.Root class="h-10 w-10">
                        <Avatar.Image
                          src={`${pb.baseUrl}/api/files/${broadcaster.expand.avatar.collectionId}/${broadcaster.expand.avatar.id}/${broadcaster.expand.avatar.image}`}
                          alt={broadcaster.name}
                        />
                      </Avatar.Root>
                    {/if}
                    <div class="font-medium">{broadcaster.name}</div>
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
            </Table.Cell>
            <Table.Cell class="w-[30%] text-right">{broadcaster.role || 'Broadcaster'}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  {/if}
</Card.Content>
