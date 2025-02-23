<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  const data = [
    {
      year: '2025 / 2026',
      value: 8500000,
      categories: [
        'Staff Expenses',
        'Department Budgets',
        'Buildout Costs',
        'Tech Budgets',
        'Player Sponsorships',
        'Documentary Production',
        'Prize Purses',
        'Player Expenses'
      ]
    },
    {
      year: '2027',
      value: 7200000,
      categories: [
        'Staff Expenses',
        'Department Budgets',
        'Maintenance Costs',
        'Tech Budgets',
        'Player Sponsorships',
        'Prize Purses',
        'Reduced Player Expenses'
      ]
    },
    {
      year: '2028',
      value: 7800000,
      categories: [
        'Staff Expenses',
        'Department Budgets',
        'Maintenance Costs',
        'Tech Budgets',
        'Player Sponsorships',
        'Prize Purses',
        'Expanded Player Expenses'
      ]
    }
  ];

  let chart: HTMLDivElement;

  onMount(() => {
    const margin = { top: 60, right: 30, bottom: 50, left: 90 };
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
      .style('pointer-events', 'none');

    const x = d3.scaleBand()
      .range([0, width])
      .domain(data.map(d => d.year))
      .padding(0.3);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('fill', 'white');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y)
        .tickFormat(d => `$${d3.format(',.0f')(d)}`))
      .selectAll('text')
      .style('fill', 'white');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', 'white')
      .text('Total Yearly Expenses');

    // Create gradient
    const gradient = svg.append('defs')
      .append('linearGradient')
      .attr('id', 'bar-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#4CAF50');

    gradient.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#2196F3');

    // Add bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.year))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', 'url(#bar-gradient)')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', 0.8);
        
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        
        const categoriesList = d.categories.map(cat => `• ${cat}`).join('<br/>');
        tooltip.html(`<div style="color: black">${d.year}<br/>Total: ${d3.format(',.0f')(d.value)}<br/><br/>Categories:<br/>${categoriesList}</div>`)
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
      .attr('x', d => x(d.year) + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 5)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .text(d => `$${d3.format(',.0f')(d.value)}`);
  });
</script>

<div class="w-full h-[400px]" bind:this={chart}></div>
