<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  // Data structure for the per-event expenses
  const data = [
    {
      year: '2025/2026',
      category: 'Production',
      value: 266667,
      explanation: 'Live production crew, equipment, and broadcast setup'
    },
    {
      year: '2027',
      category: 'Production',
      value: 298667,
      explanation: 'Expanded production capabilities and higher quality broadcast'
    },
    {
      year: '2028',
      category: 'Production',
      value: 333334,
      explanation: 'Premium production with multiple camera angles and enhanced graphics'
    },
    {
      year: '2025/2026',
      category: 'Staffing',
      value: 117500,
      explanation: 'Course marshals, security, and event management personnel'
    },
    {
      year: '2027',
      category: 'Staffing',
      value: 131600,
      explanation: 'Additional staff for larger venues and crowds'
    },
    {
      year: '2028',
      category: 'Staffing',
      value: 146875,
      explanation: 'Full professional staffing for premier events'
    },
    {
      year: '2025/2026',
      category: 'Infrastructure',
      value: 205000,
      explanation: 'Temporary structures, seating, and course infrastructure'
    },
    {
      year: '2027',
      category: 'Infrastructure',
      value: 229600,
      explanation: 'Enhanced spectator experience with premium viewing areas'
    },
    {
      year: '2028',
      category: 'Infrastructure',
      value: 256250,
      explanation: 'Stadium-like setup with expanded capacity'
    },
    {
      year: '2025/2026',
      category: 'Branding',
      value: 90000,
      explanation: 'Sponsor signage, course branding, and promotional materials'
    },
    {
      year: '2027',
      category: 'Branding',
      value: 100800,
      explanation: 'Digital displays and enhanced sponsor activations'
    },
    {
      year: '2028',
      category: 'Branding',
      value: 112500,
      explanation: 'Premium branding with interactive sponsor experiences'
    },
    {
      year: '2025/2026',
      category: 'Misc Event Costs',
      value: 147500,
      explanation: 'Permits, insurance, and contingency funds'
    },
    {
      year: '2027',
      category: 'Misc Event Costs',
      value: 164400,
      explanation: 'Increased operational costs and enhanced fan amenities'
    },
    {
      year: '2028',
      category: 'Misc Event Costs',
      value: 183334,
      explanation: 'Premium event services and expanded fan experiences'
    },
    {
      year: '2025/2026',
      category: 'Entertainment',
      value: 100000,
      explanation: 'Music, activities, and entertainment between rounds'
    },
    {
      year: '2027',
      category: 'Entertainment',
      value: 112000,
      explanation: 'Featured performers and enhanced entertainment options'
    },
    {
      year: '2028',
      category: 'Entertainment',
      value: 125000,
      explanation: 'Headline entertainment and premium fan experiences'
    }
  ];

  let chart: HTMLDivElement;

  onMount(() => {
    const margin = { top: 60, right: 120, bottom: 60, left: 80 };
    const width = chart.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

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

    const categories = [...new Set(data.map(d => d.category))];
    const years = [...new Set(data.map(d => d.year))];

    const x0 = d3.scaleBand()
      .domain(categories)
      .rangeRound([0, width])
      .padding(0.1);

    const x1 = d3.scaleBand()
      .domain(years)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(years)
      .range(['#64B5F6', '#81C784', '#FFB74D']);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0))
      .selectAll('text')
      .style('fill', 'white')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y)
        .tickFormat(d => `$${d3.format(',')(d)}`))
      .selectAll('text')
      .style('fill', 'white');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', 'white')
      .text('Per-Event Expense Breakdown (2025-2028)');

    // Create groups for each category
    const categoryGroups = svg.selectAll('.category')
      .data(categories)
      .enter().append('g')
      .attr('class', 'category')
      .attr('transform', d => `translate(${x0(d)},0)`);

    // Add bars
    categoryGroups.selectAll('rect')
      .data(d => data.filter(item => item.category === d))
      .enter().append('rect')
      .attr('x', d => x1(d.year))
      .attr('y', d => y(d.value))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', d => color(d.year))
      .on('mouseover', function(event, d) {
        const barColor = color(d.year);
        d3.select(this).style('opacity', 0.8);
        tooltip.transition()
          .duration(200)
          .style('opacity', .9)
          .style('background-color', barColor);
        tooltip.html(`<div style="color: black">Year ${d.year}<br/>${d.category}<br/>$${d3.format(',')(d.value)}<br/><small>${d.explanation}</small></div>`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 1);
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width + 10}, 0)`);

    years.forEach((year, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);
     
      legendRow.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', color(year));

      legendRow.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr('text-anchor', 'start')
        .style('font-size', '12px')
        .style('fill', 'white')
        .text(year);
    });
    
    // In your onMount function, modify the text element that shows the totals:

// Add totals for each year
const yearTotals = years.map(year => {
  return {
    year,
    total: data.filter(d => d.year === year).reduce((sum, item) => sum + item.value, 0)
  };
});

// Increase the y value to add more spacing between the chart and this text
svg.append('text')
  .attr('x', width / 2)
  .attr('y', height + 200) // You can increase this value to add more space, e.g., to height + 60
  .attr('text-anchor', 'middle')
  .style('font-size', '14px')
  .style('fill', 'white')
  .text(`Total per event: 2025/26: $${d3.format(',')(yearTotals[0].total)} | 2027: $${d3.format(',')(yearTotals[1].total)} | 2028: $${d3.format(',')(yearTotals[2].total)}`);
  });
</script>

<div class="w-full h-[500px]" bind:this={chart}></div>
