<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';
  const data = [
    { year: '2026', value: 238800 },
    { year: '2027', value: 597000 },
    { year: '2028', value: 1194000 }
  ];
  let chart: HTMLDivElement;

  onMount(() => {
    const margin = { top: 40, right: 30, bottom: 40, left: 80 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(chart)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const tooltip = d3.select(chart)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', '1px solid #ddd')
      .style('padding', '10px')
      .style('border-radius', '4px')
      .style('pointer-events', 'none');

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.year))
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('fill', 'white');

    svg.append('g')
      .call(d3.axisLeft(y)
        .tickFormat(d => `$${d3.format(',.0f')(d)}`))
      .selectAll('text')
      .style('fill', 'white');

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#4CAF50')
      .on('mouseover', function(event, d) {
        d3.select(this).style('opacity', 0.8);
        tooltip.transition()
          .duration(200)
          .style('opacity', 0.9);
        tooltip.html(`<div style="color: black">Year: ${d.year}<br/>Revenue: $${d3.format(',.0f')(d.value)}</div>`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 1);
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -10)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', 'white')
      .text('Membership Revenue Growth');
  });
</script>

<div class="chart-container" bind:this={chart}></div>

<style>
  .chart-container {
    width: 100%;
    height: 400px;
  }
</style>
