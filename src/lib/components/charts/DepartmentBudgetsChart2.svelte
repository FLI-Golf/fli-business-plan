<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  const data = [
    { department: 'Marketing', value: 1000000 },
    { department: 'Public Relations', value: 200000 },
    { department: 'Legal', value: 100000 },
    { department: 'Advertising', value: 200000 },
    { department: 'Tech/App Development', value: 50000 }
  ];

  let chart: HTMLDivElement;

  onMount(() => {
    const margin = { top: 50, right: 30, bottom: 50, left: 80 };
    const width = chart.clientWidth - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chart)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.department))
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y)
        .tickFormat(d => `$${d3.format(',')(d)}`));

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('Department Budgets 2026');

    // Add bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.department))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#4CAF50');

    // Add value labels on top of bars
    svg.selectAll('.value')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value')
      .attr('x', d => x(d.department) + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 5)
      .attr('text-anchor', 'middle')
      .text(d => `$${d3.format(',')(d.value)}`);
  });
</script>

<div class="w-full h-[400px]" bind:this={chart}></div>
