<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Table from "$lib/components/ui/table";
  import * as Avatar from "$lib/components/ui/avatar";
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";
  import { Badge } from "$lib/components/ui/badge";

  export let loading: boolean;
  export let exe: any[];
  export let pb: any;
</script>

<Card.Header class="flex flex-row items-center justify-between">
  <div class="grid gap-2">
    <Card.Title>Executive Staff</Card.Title>
    <img src="/logos/fliGolf_rwb.png" alt="Exe Logo" class="w-32 h-35" />
    <Card.Description>Key Members of the Organization</Card.Description>
  </div>
</Card.Header>

<Card.Content>
  {#if loading}
    <div class="space-y-4">
      {#each Array(4) as _}
        <div class="flex items-center space-x-4">
          <div class="h-10 w-14 bg-muted rounded animate-pulse"></div>
          <div class="h-6 bg-muted rounded animate-pulse w-1/2"></div>
        </div>
      {/each}
    </div>
  {:else}
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
                </AlertDialog.Content>
              </AlertDialog.Root>
            </Table.Cell>
            <Table.Cell class="text-right">{executive.role}</Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  {/if}
</Card.Content>
