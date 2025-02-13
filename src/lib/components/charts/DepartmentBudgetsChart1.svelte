<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  const data = [
    { 
      department: 'Marketing', 
      value: 1500000,
      explanation: 'Budget includes social media, influencers, SEO, and other strategies across 6 countries'
    },
    { 
      department: 'Relations', 
      value: 200000,
      explanation: 'Covers monthly retainer for PR efforts and securing premium space in publications'
    },
    { 
      department: 'Legal', 
      value: 100000,
      explanation: 'Covers business development, contracts, copyright and trademark work'
    },
    { 
      department: 'Advertising', 
      value: 200000,
      explanation: 'Non-digital marketing including billboards, printed ads, and radio ads'
    },
    { 
      department: 'Tech/App', 
      value: 150000,
      explanation: 'Development of FLI Golf fantasy app and website'
    }
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

    // Create tooltip
    const tooltip = d3.select(chart)
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0)
      .style('position', 'absolute')
      .style('background-color', 'white')
      .style('border', '1px solid #ddd')
      .style('padding', '10px')
      .style('border-radius', '4px');

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
      .text('Department Budgets 2025/2026 - Total: $2,150,000');

    // Add bars with interactions
    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', d => x(d.department))
      .attr('y', d => y(d.value))
      .attr('width', x.bandwidth())
      .attr('height', d => height - y(d.value))
      .attr('fill', '#FF5722')
      .on('mouseover', function(event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('fill', '#FF7043');
        
        tooltip.transition()
          .duration(200)
          .style('opacity', .9);
        
        tooltip.html(`${d.department}<br/>$${d3.format(',')(d.value)}<br/><small>${d.explanation}</small>`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this)
          .transition()
          .duration(500)
          .attr('fill', '#FF5722');
        
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
      .attr('x', d => x(d.department) + x.bandwidth() / 2)
      .attr('y', d => y(d.value) - 5)
      .attr('text-anchor', 'middle')
      .text(d => `$${d3.format(',')(d.value)}`);
  });
</script>

<div class="w-full h-[400px]" bind:this={chart}></div>
