<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button";

  export let teamName: string;
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger class="w-full">
    {teamName}
  </AlertDialog.Trigger>

  <AlertDialog.Content>
    <AlertDialog.Header class="flex justify-between items-start">
      <AlertDialog.Title>{teamName}</AlertDialog.Title>
    </AlertDialog.Header>

    <div class="flex justify-center gap-8 py-6">
      <img src="/logos/fli_logo.png" alt="FLI Logo" class="w-32 h-auto"/>
      <img src="/logos/fliGolf_rwb.png" alt="FLI Golf Logo" class="w-32 h-auto"/>
    </div>

    <AlertDialog.Footer>
      <AlertDialog.Cancel>
        <Button variant="outline">Close</Button>
      </AlertDialog.Cancel>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
