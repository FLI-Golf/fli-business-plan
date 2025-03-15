<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  export let section;

  const data = [
    {
      year: '2025/2026',
      value: 7896798,
      details: {
        revenue: 21956800,
        expenses: 14060002,
        keyFactors: [
          'Strong sponsorship model',
          'Initial infrastructure investment',
          'Marketing channels established',
          'Brand presence development'
        ]
      }
    },
    {
      year: '2027',
      value: 10335598,
      details: {
        revenue: 23758000,
        expenses: 13422402,
        keyFactors: [
          'Streamlined operations',
          'Reduced marketing budget',
          'Continued revenue growth',
          'Increased league traction'
        ]
      }
    },
    {
      year: '2028',
      value: 14809742,
      details: {
        revenue: 29553500,
        expenses: 14743758,
        keyFactors: [
          'Established revenue streams',
          'Larger audience engagement',
          'Expanded market presence',
          'Previous investment benefits'
        ]
      }
    }
  ];

  let chart: HTMLDivElement;

  onMount(() => {
    const margin = { top: 60, right: 30, bottom: 70, left: 90 };
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

    // Add some padding to the y-axis range
    const maxValue = d3.max(data, d => d.value) * 1.1; // 10% padding at the top
    const minValue = d3.min(data, d => d.value) * 1.1; // 10% padding at the bottom if negative

    const y = d3.scaleLinear()
      .domain([minValue < 0 ? minValue : 0, maxValue])
      .range([height, 0])
      .nice();

    // Add X axis
    svg.append('g')
      .attr('transform', `translate(0,${y(0)})`)
      .call(d3.axisBottom(x))
      .selectAll('text')
      .style('fill', 'white');

    // Add Y axis with better formatting for millions
    svg.append('g')
      .call(d3.axisLeft(y)
        .tickFormat(d => `$${d3.format(',.1f')(d / 1000000)}M`))
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
            <strong>${d.year}</strong><br/>
            <strong>Profit:</strong> $${d3.format(',.2f')(d.value / 1000000)}M<br/>
            <strong>Revenue:</strong> $${d3.format(',.2f')(d.details.revenue / 1000000)}M<br/>
            <strong>Expenses:</strong> $${d3.format(',.2f')(d.details.expenses / 1000000)}M<br/>
            <br/><strong>Key Factors:</strong><br/>${factorsList}
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

    // Add value labels with improved formatting for millions
    svg.selectAll('.value')
      .data(data)
      .enter()
      .append('text')
      .attr('class', 'value')
      .attr('x', d => x(d.year) + x.bandwidth() / 2)
      .attr('y', d => d.value >= 0 ? y(d.value) - 10 : y(d.value) + 20)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('font-weight', 'bold')
      .style('fill', 'white')
      .text(d => `$${d3.format(',.1f')(d.value / 1000000)}M`);
    
    // Calculate growth percentages
    const baseProfit = data[0].value;
    const growth2027 = ((data[1].value - baseProfit) / baseProfit * 100).toFixed(1);
    const growth2028 = ((data[2].value - baseProfit) / baseProfit * 100).toFixed(1);
    
    // Add growth information at the bottom
    svg.append('text')
      .attr('x', width / 2)
      .attr('y', height + 40)
      .attr('text-anchor', 'middle')
      .style('font-size', '13px')
      .style('fill', 'white')
      .text(`Profit Growth: 2027 (+${growth2027}%), 2028 (+${growth2028}%) from 2025/26 baseline`);
  });
</script>

<div class="w-full h-[450px]" bind:this={chart}></div>
