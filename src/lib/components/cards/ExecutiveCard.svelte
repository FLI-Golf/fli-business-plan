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
<Card.Header class="bg-gradient-to-br from-emerald-600 to-teal-600 text-white flex flex-col items-center text-center gap-4 pb-6 pt-6 rounded-t-lg">
  <div class="p-4 rounded-full bg-white shadow-lg">
    <img src="/logos/fliGolf_rwb.png" alt="Exe Logo" class="w-20 h-20 object-contain" />
  </div>
  <div class="grid gap-2">
    <Card.Title class="text-2xl font-bold text-white">Executive Staff</Card.Title>
    <Card.Description class="text-base text-emerald-50">Key Members of the Organization</Card.Description>
  </div>
</Card.Header>
<Card.Content>
  {#if loading}
    <div class="space-y-3">
      {#each Array(4) as _}
        <div class="flex items-center space-x-4 p-3 border rounded-lg">
          <div class="h-12 w-12 bg-muted rounded-full animate-pulse"></div>
          <div class="h-6 bg-muted rounded animate-pulse w-1/2"></div>
        </div>
      {/each}
    </div>
  {:else}
    <div class="space-y-3">
      {#each exe as executive}
        <AlertDialog.Root>
          <AlertDialog.Trigger class="w-full">
            <div class="flex items-center justify-between p-4 border rounded-lg hover:bg-muted transition-colors cursor-pointer group">
              <div class="flex items-center gap-4">
                {#if executive.avatar}
                  <Avatar.Root class="h-12 w-12 rounded-full shadow-sm">
                    <Avatar.Image
                      src={`${pb.baseUrl}/api/files/${executive.expand.avatar.collectionId}/${executive.expand.avatar.id}/${executive.expand.avatar.image}`}
                      alt={executive.name}
                    />
                  </Avatar.Root>
                {:else}
                  <Avatar.Root class="h-12 w-12">
                    <Avatar.Fallback>{executive.name?.charAt(0)}</Avatar.Fallback>
                  </Avatar.Root>
                {/if}
                <div class="text-left">
                  <div class="font-semibold text-base">{executive.name}</div>
                  <div class="text-sm text-muted-foreground">{executive.role}</div>
                </div>
              </div>
              <Badge variant="outline" class="shrink-0">{executive.role}</Badge>
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
      {/each}
    </div>
  {/if}
</Card.Content>
