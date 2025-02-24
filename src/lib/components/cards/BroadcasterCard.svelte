<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import { Badge } from "$lib/components/ui/badge/index.js";
  
  export let loading = true;
  export let broadcasters = [];
  export let pb;
</script>

<Card.Header>
  <Card.Title>Broadcasting Team</Card.Title>
  <Card.Description>Our professional broadcasting staff</Card.Description>
</Card.Header>
<Card.Content>
  {#if loading}
    <div class="flex items-center justify-center h-40">
      <span class="loading loading-spinner">Loading...</span>
    </div>
  {:else}
    <div class="space-y-4">
      {#each broadcasters as broadcaster}
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            {#if broadcaster.expand?.avatar}
              <Avatar.Root class="h-10 w-10">
                <Avatar.Image 
                  src={`${pb.baseUrl}/api/files/${broadcaster.expand.avatar.collectionId}/${broadcaster.expand.avatar.id}/${broadcaster.expand.avatar.image}`}
                  alt={broadcaster.name}
                />
              </Avatar.Root>
            {/if}
            <div>
              <p class="font-medium">{broadcaster.name}</p>
              <p class="text-sm text-muted-foreground">{broadcaster.bio}</p>
            </div>
          </div>
          <Badge variant="outline">{broadcaster.gender}</Badge>
        </div>
      {/each}
    </div>
  {/if}
</Card.Content>
