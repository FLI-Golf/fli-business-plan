<script lang="ts">
  export let section;
</script>

<Card.Root class="p-4 border rounded-lg shadow-sm mt-4">
  <Card.Header>
    <Card.Title class="text-xl font-semibold">{section.title}</Card.Title>
  </Card.Header>
  <Card.Content>
    {#each section.subsections as subsection}
      <p class="text-gray-700 mt-2">{subsection.content}</p>
    {/each}
  </Card.Content>
</Card.Root>
