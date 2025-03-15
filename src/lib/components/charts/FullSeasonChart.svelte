<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  // Data structure for the full season expenses
  const data = [
    {
      year: '2025/2026',
      perEvent: 926667,
      totalSeason: 5560002,
      percentIncrease: 0
    },
    {
      year: '2027',
      perEvent: 1037067,
      totalSeason: 6222402,
      percentIncrease: 12
    },
    {
      year: '2028',
      perEvent: 1157293,
      totalSeason: 6943758,
      percentIncrease: 25
    }
  ];

  let chart: HTMLDivElement;

  onMount(() => {
    const margin = { top: 60, right: 120, bottom: 80, left: 120 };
    const width = chart.clientWidth - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;
    
    const svgHeight = 600;

    const svg = d3.select(chart)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', svgHeight)
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

    const years = data.map(d => d.year);
    const metrics = ['Per Event Expense', 'Total Season Expense'];

    // Create scales
    const x0 = d3.scaleBand()
      .domain(years)
      .rangeRound([0, width])
      .padding(0.2);

    const x1 = d3.scaleBand()
      .domain(metrics)
      .rangeRound([0, x0.bandwidth()])
      .padding(0.05);

    // Find max value for y scale (using total season expense)
    const maxValue = d3.max(data, d => d.totalSeason);
    
    const y = d3.scaleLinear()
      .domain([0, maxValue * 1.1]) // Add 10% padding at the top
      .range([height, 0]);

    const color = d3.scaleOrdinal()
      .domain(metrics)
      .range(['#64B5F6', '#FFB74D']);

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x0))
      .selectAll('text')
      .style('fill', 'white')
      .style('font-size', '12px');

    // Add Y axis
    svg.append('g')
      .call(d3.axisLeft(y)
        .tickFormat(d => `$${d3.format(',.0f')(d / 1000000)}M`))
      .selectAll('text')
      .style('fill', 'white')
      .style('font-size', '12px');

    // Add title
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', -30)
      .attr('text-anchor', 'middle')
      .style('font-size', '18px')
      .style('fill', 'white')
      .text('Full Season Expense Breakdown (2025-2028)');

    // Create groups for each year
    const yearGroups = svg.selectAll('.year')
      .data(data)
      .enter().append('g')
      .attr('class', 'year')
      .attr('transform', d => `translate(${x0(d.year)},0)`);

    // Add bars for per event expense
    yearGroups.append('rect')
      .attr('x', x1('Per Event Expense'))
      .attr('y', d => y(d.perEvent))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.perEvent))
      .attr('fill', color('Per Event Expense'))
      .on('mouseover', function(event, d) {
        d3.select(this).style('opacity', 0.8);
        tooltip.transition()
          .duration(200)
          .style('opacity', .9)
          .style('background-color', color('Per Event Expense'));
        tooltip.html(`<div style="color: black">
                      <strong>${d.year}</strong><br/>
                      Per Event: $${d3.format(',')(d.perEvent)}<br/>
                      ${d.percentIncrease > 0 ? `+${d.percentIncrease}% from 2025/26` : ''}
                      </div>`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 1);
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Add bars for total season expense
    yearGroups.append('rect')
      .attr('x', x1('Total Season Expense'))
      .attr('y', d => y(d.totalSeason))
      .attr('width', x1.bandwidth())
      .attr('height', d => height - y(d.totalSeason))
      .attr('fill', color('Total Season Expense'))
      .on('mouseover', function(event, d) {
        d3.select(this).style('opacity', 0.8);
        tooltip.transition()
          .duration(200)
          .style('opacity', .9)
          .style('background-color', color('Total Season Expense'));
        tooltip.html(`<div style="color: black">
                      <strong>${d.year}</strong><br/>
                      Total Season: $${d3.format(',.2f')(d.totalSeason / 1000000)}M<br/>
                      ${d.percentIncrease > 0 ? `+${d.percentIncrease}% from 2025/26` : ''}
                      </div>`)
          .style('left', (event.pageX + 10) + 'px')
          .style('top', (event.pageY - 28) + 'px');
      })
      .on('mouseout', function() {
        d3.select(this).style('opacity', 1);
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      });

    // Add value labels on top of bars
    yearGroups.append('text')
      .attr('x', x1('Per Event Expense') + x1.bandwidth() / 2)
      .attr('y', d => y(d.perEvent) - 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '11px')
      .style('fill', 'white')
      .text(d => `$${d3.format(',.1f')(d.perEvent / 1000000)}M`);

    yearGroups.append('text')
      .attr('x', x1('Total Season Expense') + x1.bandwidth() / 2)
      .attr('y', d => y(d.totalSeason) - 10)
      .attr('text-anchor', 'middle')
      .style('font-size', '11px')
      .style('fill', 'white')
      .text(d => `$${d3.format(',.1f')(d.totalSeason / 1000000)}M`);

    // Add percentage increase labels for 2027 and 2028
    yearGroups.filter(d => d.percentIncrease > 0)
      .append('text')
      .attr('x', x1.bandwidth() + x1.bandwidth() / 2)
      .attr('y', d => y(d.totalSeason) + (height - y(d.totalSeason)) / 2)
      .attr('text-anchor', 'middle')
      .style('font-size', '12px')
      .style('fill', 'white')
      .style('font-weight', 'bold')
      .text(d => `+${d.percentIncrease}%`);

    // Add legend
    const legend = svg.append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${width + 10}, 0)`);

    metrics.forEach((metric, i) => {
      const legendRow = legend.append('g')
        .attr('transform', `translate(0, ${i * 20})`);
      
      legendRow.append('rect')
        .attr('width', 10)
        .attr('height', 10)
        .attr('fill', color(metric));

      legendRow.append('text')
        .attr('x', 20)
        .attr('y', 10)
        .attr('text-anchor', 'start')
        .style('font-size', '12px')
        .style('fill', 'white')
        .text(metric);
    });

    // Add key takeaways section
    const takeaways = svg.append('g')
      .attr('class', 'takeaways')
      .attr('transform', `translate(0, ${height + 40})`);

    takeaways.append('text')
      .attr('x', 0)
      .attr('y', 0)
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text('📌 Key Takeaways:');

    takeaways.append('text')
      .attr('x', 0)
      .attr('y', 20)
      .style('font-size', '12px')
      .style('fill', 'white')
      .text(`2025/2026 Total Season Expenses: $${d3.format(',.2f')(data[0].totalSeason / 1000000)}M`);

    takeaways.append('text')
      .attr('x', 0)
      .attr('y', 40)
      .style('font-size', '12px')
      .style('fill', 'white')
      .text(`2027 Total Season Expenses: $${d3.format(',.2f')(data[1].totalSeason / 1000000)}M (+${data[1].percentIncrease}% growth)`);

    takeaways.append('text')
      .attr('x', 0)
      .attr('y', 60)
      .style('font-size', '12px')
      .style('fill', 'white')
      .text(`2028 Total Season Expenses: $${d3.format(',.2f')(data[2].totalSeason / 1000000)}M (+${data[2].percentIncrease}% growth)`);
  });
</script>

<div class="w-full h-[600px]" bind:this={chart}></div>
