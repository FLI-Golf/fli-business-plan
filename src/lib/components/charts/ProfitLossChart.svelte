<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  const data = [
    {
      year: '2025 / 2026',
      value: -2500000,
      details: {
        revenue: 6000000,
        expenses: 8500000,
        keyFactors: [
          'Initial infrastructure investment',
          'Prize purses establishment',
          'Documentary production',
          'Marketing and brand development'
        ]
      }
    },
    {
      year: '2027',
      value: 1800000,
      details: {
        revenue: 9000000,
        expenses: 7200000,
        keyFactors: [
          'Streamlined operations',
          'Reduced one-time expenses',
          'Revenue growth',
          'Market traction'
        ]
      }
    },
    {
      year: '2028',
      value: 4200000,
      details: {
        revenue: 12000000,
        expenses: 7800000,
        keyFactors: [
          'Established revenue streams',
          'Larger audience engagement',
          'Market expansion',
          'Operational efficiency'
        ]
      }
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
      .domain([d3.min(data, d => d.value), d3.max(data, d => d.value)])
      .range([height, 0])
      .nice();

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${y(0)})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('fill', 'white');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y)
        .tickFormat(d => `$${d3.format(',.0f')(d)}`))
      .selectAll('text')
      .style('fill', 'white');

    // Add zero line
    svg.append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', y(0))
      .attr('y2', y(0))
      .attr('stroke', 'white')
      .attr('stroke-opacity', 0.3);

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', 'white')
      .text('Profit/Loss Analysis');

    // Add bars
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.year))
      .attr('y', d => d.value > 0 ? y(d.value) : y(0))
      .attr('width', x.bandwidth())
      .attr('height', d => Math.abs(y(0) - y(d.value)))
      .attr('fill', d => d.value >= 0 ? '#4CAF50' : '#FF5252')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .style('opacity', 0.8);
        
        const factorsList = d.details.keyFactors.map(factor => `• ${factor}`).join('<br/>');
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
tooltip.html(`
  <div style="color: black">
    ${d.year}<br/>
    Profit/Loss: ${d3.format(',.0f')(d.value)}<br/>
    Revenue: ${d3.format(',.0f')(d.details.revenue)}<br/>
    Expenses: ${d3.format(',.0f')(d.details.expenses)}<br/>
    <br/>Key Factors:<br/>${factorsList}
  </div>
`)
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
      .attr('y', d => d.value >= 0 ? y(d.value) - 5 : y(d.value) + 15)
      .attr('text-anchor', 'middle')
      .style('fill', 'white')
      .text(d => `$${d3.format(',.0f')(d.value)}`);
  });
</script>

<div class="w-full h-[400px]" bind:this={chart}></div>
