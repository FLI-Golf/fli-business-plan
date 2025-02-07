<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  export let section;
</script>

<Card class="p-4 border rounded-lg shadow-sm mt-4">
  <CardHeader>
    <CardTitle class="text-xl font-semibold">{section.title}</CardTitle>
  </CardHeader>
  <CardContent>
    {#each section.subsections as subsection}
      <p class="text-gray-700 mt-2">{@html subsection.content}</p>    {/each}
  </CardContent>
</Card>
