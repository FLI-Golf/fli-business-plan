<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";
  import { ArrowUpRight } from 'lucide-svelte';

  export let loading: boolean;
  export let pros: any[];
  export let pb: any;
</script>

<Card.Header class="flex flex-row items-center justify-between">
  <div class="grid gap-2">
    <Card.Title>Committed Pros</Card.Title>
    <img src="/logos/wdr.png" alt="Pros Logo" class="w-68 h-32" />
    <Card.Description>Complete list of professional disc golfers.</Card.Description>
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
                <div class="flex items-center gap-4 p-3 hover:bg-muted rounded border w-full h-full">
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
    </AlertDialog.Content>
  </AlertDialog.Root>
</Card.Header>

<Card.Content>
  {#if loading}
    <div class="space-y-4">
      {#each Array(5) as _}
        <div class="flex items-center space-x-4">
          <div class="h-10 w-14 bg-muted rounded animate-pulse"></div>
          <div class="h-6 bg-muted rounded animate-pulse w-1/3"></div>
        </div>
      {/each}
    </div>
  {:else}
    <Table.Root class="w-full">
      <Table.Header>
        <Table.Row>
          <Table.Head class="w-[70%]">Name</Table.Head>
          <Table.Head class="w-[30%] text-right">World Rankings</Table.Head>
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
        {/each}
      </Table.Body>
    </Table.Root>
  {/if}
</Card.Content>
