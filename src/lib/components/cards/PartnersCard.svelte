Dialog avatarselectedPartner<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  export let loading: boolean;
  export let partners: any[];
  export let pb: any;

  let showPartnerDetails = false;
  let selectedPartner: any = null;

  function viewPartnerDetails(partner: any) {
    selectedPartner = partner;
    showPartnerDetails = true;
  }
</script>

<div class="p-6">
  <div class="flex items-center justify-between">
    <div class="space-y-1">
      <h2 class="text-2xl font-semibold tracking-tight">Partners</h2>
      <p class="text-sm text-muted-foreground">
        Current active partnerships and collaborations
      </p>
    </div>
  </div>
  <div class="mt-6">
    {#if loading}
      <div class="flex items-center justify-center h-[200px]">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    {:else if partners.length === 0}
      <div class="flex items-center justify-center h-[200px]">
        <p class="text-muted-foreground">No partners found</p>
      </div>
    {:else}
      <div class="space-y-4">
        {#each partners as partner}
          <button
            class="flex items-center gap-4 w-full hover:bg-muted p-2 rounded-lg transition-colors"
            on:click={() => viewPartnerDetails(partner)}
          >
            <!-- List view avatar -->
            <img
              src={partner.expand?.avatar ? pb.files.getUrl(partner.expand.avatar, partner.expand.avatar.avatar) : '/placeholder-avatar.png'}
              alt={partner.name}
              class="h-3 w-3 rounded-full object-cover"
            />
            <div class="text-left">
              <p class="font-medium leading-none">{partner.name}</p>
              <p class="text-sm text-muted-foreground">{partner.role}</p>
            </div>
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <AlertDialog.Root bind:open={showPartnerDetails}>
    <AlertDialog.Content>
      <AlertDialog.Header>
        <AlertDialog.Title>Partner Details</AlertDialog.Title>
        <AlertDialog.Description>
          {#if selectedPartner}
            <div class="space-y-4">
              <img
                src={selectedPartner.expand?.avatar ? pb.files.getUrl(selectedPartner.expand.avatar, selectedPartner.expand.avatar.avatar) : '/placeholder-avatar.png'}
                alt={selectedPartner.name}
                class="h14 w-28 lg:h-12 lg:w-12 object-cover mx-auto"
              />
              <div class="text-center">
                <h3 class="text-lg font-semibold">{selectedPartner.name}</h3>
                <p class="text-muted-foreground">{selectedPartner.role}</p>
              </div>
              <div class="prose dark:prose-invert max-w-none">
                <p>{selectedPartner.description || 'No description available.'}</p>
              </div>
            </div>
          {/if}
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel>Close</AlertDialog.Cancel>
      </AlertDialog.Footer>
    </AlertDialog.Content>
  </AlertDialog.Root>
</div>
