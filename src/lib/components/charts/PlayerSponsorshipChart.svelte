<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  const data = [
    {
      year: '2025/2026',
      category: 'MPO (Male)',
      value: 150000,
      explanation: 'Male Professional Open division player sponsorships'
    },
    {
      year: '2027',
      category: 'MPO (Male)',
      value: 150000,
      explanation: 'Continued support for male athletes'
    },
    {
      year: '2028',
      category: 'MPO (Male)',
      value: 150000,
      explanation: 'Sustained investment in male division'
    },
    {
      year: '2025/2026',
      category: 'FPO (Female)',
      value: 150000,
      explanation: 'Female Professional Open division player sponsorships'
    },
    {
      year: '2027',
      category: 'FPO (Female)',
      value: 150000,
      explanation: 'Continued support for female athletes'
    },
    {
      year: '2028',
      category: 'FPO (Female)',
      value: 150000,
      explanation: 'Sustained investment in female division'
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
      .range(['#7C4DFF', '#00BCD4', '#76FF03']);

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
      .text('Player Sponsorship Expenses by Division');

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
        d3.select(this).style('opacity', 0.8);
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        tooltip.html(`${d.year}<br/>${d.category}<br/>$${d3.format(',')(d.value)}<br/><small>${d.explanation}</small>`)
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
  });
</script>

<div class="w-full h-[500px]" bind:this={chart}></div>
