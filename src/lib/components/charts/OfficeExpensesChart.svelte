<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  const data = [
    {
      category: 'San Diego',
      value: 24000,
      explanation: 'Costs for maintaining the corporate office in San Diego, strategically located near other sports brand offices'
    },
    {
      category: 'Production',
      value: 19800,
      explanation: 'Studio in San Diego for producing content and managing broadcasting needs'
    },
    {
      category: 'Scottsdale',
      value: 48000,
      explanation: 'Office overseeing course buildout and local sponsor acquisition'
    },
    {
      category: 'Warehouse',
      value: 36000,
      explanation: 'Storage facility for equipment and materials'
    },
    {
      category: 'Utilities',
      value: 48000,
      explanation: 'Based on current costs across all facilities'
    }
  ];

  let chart: HTMLDivElement;

  onMount(() => {
    const margin = { top: 50, right: 30, bottom: 70, left: 80 };
    const width = chart.clientWidth - margin.left - margin.right;
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
      .style('pointer-events', 'none')
      .style('color', 'black');  // Added black text color for tooltip
    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.category))
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.category))
      .range(['#4CAF50', '#2196F3', '#FF5722', '#9C27B0', '#FFC107']);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('fill', 'white');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y)
        .tickFormat(d => `$${d3.format(',')(d)}`))
      .selectAll('text')
      .style('fill', 'white');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -20)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', 'white')
      .text('Office Expenses - Annual Cost: $175,800');

    // Add bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.category))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', d => color(d.category))
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', 0.8);
        
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        
        tooltip.html(`${d.category}<br/>$${d3.format(',')(d.value)}<br/><small>${d.explanation}</small>`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(500)
          .style('opacity', 1);
        
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Add value labels
    svg.selectAll('.value')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value')
      .attr('x', d => x(d.category) + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 5)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .text(d => `$${d3.format(',')(d.value)}`);
  });
</script>

<div class="w-full h-[400px]" bind:this={chart}></div>
