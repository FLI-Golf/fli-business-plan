<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let data: number[] = [];
  export let width = 640;
  export let height = 400;
  export let marginTop = 20;
  export let marginRight = 30;
  export let marginBottom = 30;
  export let marginLeft = 40;

  let svg: SVGSVGElement;

  $: x = d3.scaleLinear()
    .domain([0, data.length - 1])
    .range([marginLeft, width - marginRight]);

  $: y = d3.scaleLinear()
    .domain(d3.extent(data) as [number, number])
    .range([height - marginBottom, marginTop]);

  $: line = d3.line<number>()
    .x((d, i) => x(i))
    .y(d => y(d));

  onMount(() => {
    const svgElement = d3.select(svg);
    
    // Add X axis
    svgElement.append('g')
      .attr('transform', `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x));

    // Add Y axis
    svgElement.append('g')
      .attr('transform', `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y));
  });
</script>

<div class="chart-container">
  <svg 
    bind:this={svg}
    {width} 
    {height}
  >
    <!-- Line -->
    <path
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      d={line(data)}
    />

    <!-- Data points -->
    <g fill="white" stroke="currentColor" stroke-width="1.5">
      {#each data as d, i}
        <circle
          cx={x(i)}
          cy={y(d)}
          r="2.5"
        />
      {/each}
    </g>
  </svg>
</div>

<style>
  .chart-container {
    background: var(--background);
    border-radius: 8px;
    padding: 1rem;
  }

  :global(.tick text) {
    color: var(--muted-foreground);
    font-size: 12px;
  }

  :global(.tick line),
  :global(.domain) {
    stroke: var(--border);
  }
</style>
