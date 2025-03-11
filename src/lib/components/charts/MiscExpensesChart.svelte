<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  const data = [
    {
      year: '2025/2026',
      category: 'Insurance',
      value: 80000,
      explanation: 'Event and general liability insurance'
    },
    {
      year: '2027',
      category: 'Insurance',
      value: 80000,
      explanation: 'Continued insurance coverage'
    },
    {
      year: '2028',
      category: 'Insurance',
      value: 80000,
      explanation: 'Ongoing insurance protection'
    },
    {
      year: '2025/2026',
      category: 'Payroll',
      value: 6000,
      explanation: 'Payroll processing services'
    },
    {
      year: '2027',
      category: 'Payroll',
      value: 7000,
      explanation: 'Increased payroll processing'
    },
    {
      year: '2028',
      category: 'Payroll',
      value: 8000,
      explanation: 'Extended payroll services'
    },
    {
      year: '2025/2026',
      category: 'Relocation',
      value: 40000,
      explanation: 'One-time Relocation to Scottsdale'
    },
    {
      year: '2027',
      category: 'Relocation',
      value: 0,
      explanation: 'No relocation expenses'
    },
    {
      year: '2028',
      category: 'Relocation',
      value: 0,
      explanation: 'No relocation expenses'
    },
    {
      year: '2025/2026',
      category: 'Staff Ins.',
      value: 60000,
      explanation: 'Staff Ins. benefits'
    },
    {
      year: '2027',
      category: 'Staff Ins.',
      value: 65000,
      explanation: 'Increased insurance coverage'
    },
    {
      year: '2028',
      category: 'Staff Ins.',
      value: 70000,
      explanation: 'Enhanced insurance benefits'
    },
    {
      year: '2025/2026',
      category: 'Savings',
      value: 500000,
      explanation: 'Emergency business savings'
    },
    {
      year: '2027',
      category: 'Savings',
      value: 500000,
      explanation: 'Continued emergency fund'
    },
    {
      year: '2028',
      category: 'Savings',
      value: 500000,
      explanation: 'Maintained emergency reserves'
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
      .range(['#4CAF50', '#2196F3', '#FFC107']);

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
      .text('Miscellaneous Business Expenses');

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
  });
</script>

<div class="w-full h-[500px]" bind:this={chart}></div>
