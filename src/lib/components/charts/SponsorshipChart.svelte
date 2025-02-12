<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section; // Receive the section data as a prop

  // Transform the expanded financial_data into our chart format
  const data = [
    {tier: "Tier 1 - Title Sponsor", y2025: 5500000, y2026: 7000000, y2027: 7500000},
    {tier: "Tier 2 - Disc Golf Brands", y2025: 3000000, y2026: 3300000, y2027: 3600000},
    {tier: "Tier 3 - Major Brands", y2025: 1500000, y2026: 2000000, y2027: 2500000},
    {tier: "Tier 4 - Product Sampling", y2025: 1000000, y2026: 1400000, y2027: 1800000}
  ];  let width = 900;  let height = 400;
  let margin = {top: 40, right: 200, bottom: 40, left: 60};

  onMount(() => {
    const svg = d3.select('#sponsorship-chart')
      .attr('width', width)
      .attr('height', height);

    // Group data by year
    const years = ["2025", "2026", "2027"];
    const groupWidth = 100; // Width for group of bars
    const barWidth = groupWidth / data.length;

    const x = d3.scaleBand()
      .domain(years)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, 8])
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.tier))
      .range(['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4']);

    // Create groups for each year
    const yearGroups = svg.selectAll('.year-group')
      .data(years)
      .join('g')
      .attr('class', 'year-group')
      .attr('transform', d => `translate(${x(d)}, 0)`);

    // Add bars for each tier within year groups
    data.forEach((tierData, i) => {
      yearGroups.append('rect')
        .attr('x', i * barWidth)
        .attr('y', d => y(tierData[`y${d}`]))
        .attr('width', barWidth - 1)
        .attr('height', d => height - margin.bottom - y(tierData[`y${d}`]))
        .attr('fill', color(tierData.tier));
    });

    // Add axes
    svg.append('g')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x))
      .append('text')
      .attr('y', 35)
      .attr('x', width/2 - margin.right)
      .text('Year');

    svg.append('g')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).ticks(8).tickFormat(d => `${d}M`))
      .append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', -40)
      .attr('x', -height/2)
      .text('Revenue (Millions USD)');

    // Add title
    svg.append('text')
      .attr('x', width/2 - margin.right)
      .attr('y', margin.top/2)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('font-weight', 'bold')
      .text('Sponsorship Revenue by Tier (2025-2027)');

    // Legend
    const legend = svg.append('g')
      .attr('transform', `translate(${width - margin.right + 20},${margin.top})`);

    data.forEach((d, i) => {
      const legendGroup = legend.append('g')
        .attr('transform', `translate(0,${i * 25})`);

      legendGroup.append('rect')
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', color(d.tier));

      legendGroup.append('text')
        .attr('x', 25)
        .attr('y', 12)
        .style('font-size', '12px')
        .style('fill', 'white')
        .text(d.tier);    });
  });
</script>

<svelte:component
  this={section.id === 1 ? SponsorshipChart :
       section.id === 2 ? MembershipChart : RevenueChart}
  {section}
/>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
    min-height: 400px;
  }
</style>
