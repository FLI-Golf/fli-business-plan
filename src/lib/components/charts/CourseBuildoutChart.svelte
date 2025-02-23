<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  const data = [
    {
      year: '2025/2026',
      category: 'Materials',
      value: 250000,
      explanation: 'Expected expense for on-course materials needed to build out the course at Chicken Ranch'
    },
    {
      year: '2027',
      category: 'Materials',
      value: 50000,
      explanation: 'Maintenance budget for course materials'
    },
    {
      year: '2028',
      category: 'Materials',
      value: 250000,
      explanation: 'Additional buildout for transportable course elements'
    },
    {
      year: '2025/2026',
      category: 'Tools',
      value: 50000,
      explanation: 'Initial purchase of necessary tools for course construction'
    },
    {
      year: '2027',
      category: 'Tools',
      value: 10000,
      explanation: 'Tool upkeep and part replacement'
    },
    {
      year: '2028',
      category: 'Tools',
      value: 10000,
      explanation: 'Continued tool maintenance'
    },
    {
      year: '2025/2026',
      category: 'Misc',
      value: 30000,
      explanation: 'Unforeseen expenses including land alterations and equipment use'
    },
    {
      year: '2027',
      category: 'Misc',
      value: 30000,
      explanation: 'Ongoing miscellaneous expenses'
    },
    {
      year: '2028',
      category: 'Misc',
      value: 30000,
      explanation: 'Continued miscellaneous expense allocation'
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
      .style('pointer-events', 'none')
      .style('color', 'black');

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
      .range(['#2196F3', '#4CAF50', '#FF5722']);

    // Add X axis with white text
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0))
      .selectAll('text')
      .attr('transform', 'translate(-10,0)rotate(-45)')
      .style('text-anchor', 'end')
      .style('fill', 'white');

    // Add Y axis with white text
    svg.append('g')
      .call(d3.axisLeft(y)
        .tickFormat(d => `${d3.format(',')(d)}`))
      .selectAll('text')
      .style('fill', 'white');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .style('fill', 'white')
      .text('Course Buildout Expenses by Year');

    // Create groups for each category
    const categoryGroups = svg.selectAll('.category')
      .data(categories)
      .enter().append('g')
      .attr('class', 'category')
      .attr('transform', d => `translate(${x0(d)},0)`);

    // Update bars with black text tooltip
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
        tooltip.html(`<div style="color: black">${d.year}<br/>${d.category}<br/>${d3.format(',')(d.value)}<br/><small>${d.explanation}</small></div>`)
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
