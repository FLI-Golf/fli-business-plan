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
    <Card.Title>Broadcasting Team</Card.Title>
    <img src="/logos/fli_logo.png" alt="FLI Logo" class="w-68 h-32" />
    <Card.Description class="-mt-7">Our professional broadcasting staff</Card.Description>
  </div>

  <AlertDialog.Root>
    <AlertDialog.Content class="sm:max-w-[800px]">
      <AlertDialog.Header>
        <AlertDialog.Title>Our Broadcasting Team</AlertDialog.Title>
        <AlertDialog.Description>
          Complete list of our professional broadcasters.
        </AlertDialog.Description>
      </AlertDialog.Header>

      <div class="overflow-y-auto max-h-[60vh]">
        <div class="grid grid-cols-2 gap-4 p-4">
          {#each broadcasters as broadcaster}
            <AlertDialog.Root>
              <AlertDialog.Trigger class="w-full">
                <div class="flex items-center gap-4 p-3 hover:bg-muted rounded border w-full h-full">
                  {#if broadcaster.expand?.avatar}
                    <Avatar.Root class="h-10 w-10">
                      <Avatar.Image
                        src={`${pb.baseUrl}/api/files/${broadcaster.expand.avatar.collectionId}/${broadcaster.expand.avatar.id}/${broadcaster.expand.avatar.image}`}
                        alt={broadcaster.name}
                      />
                    </Avatar.Root>
                  {/if}
                  <div class="text-left">
                    <div class="font-medium">{broadcaster.name}</div>
                    <div class="text-sm text-muted-foreground">{broadcaster.role || 'Broadcaster'}</div>
                  </div>
                </div>
              </AlertDialog.Trigger>

              <AlertDialog.Content>
                <AlertDialog.Header class="flex justify-between items-start">
                  <div>
                    <AlertDialog.Title>{broadcaster.name}</AlertDialog.Title>
                    <AlertDialog.Description>
                      Professional Broadcaster
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
                      <p class="text-sm text-muted-foreground">{broadcaster.bio || 'Professional Broadcaster'}</p>
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
