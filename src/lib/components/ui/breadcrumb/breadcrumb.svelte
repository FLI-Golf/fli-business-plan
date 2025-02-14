<script lang="ts">
  import { ChevronRight } from 'lucide-svelte';
  export let items: { label: string; href: string }[] = [];
</script>

<nav class="flex" aria-label="Breadcrumb">
  <ol class="inline-flex items-center space-x-1 md:space-x-3">
    {#each items as item, index}
      <li class="inline-flex items-center">
        {#if index > 0}
          <ChevronRight class="h-4 w-4 text-muted-foreground mx-2" />
        {/if}
        <a
          href={item.href}
          class="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          {item.label}
        </a>
      </li>
    {/each}
  </ol>
</nav>
