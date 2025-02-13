<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  const revenueData = [
    {
      category: "Broadcasting Revenue",
      values: [1500000, 3000000, 6000000]
    }
  ];

  const years = ['2026', '2027', '2028'];
  const width = 800;
  const height = 400;
  const margin = { top: 40, right: 200, bottom: 40, left: 80 };

  onMount(() => {
    const svg = d3.select('#broadcasting-revenue-chart')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleBand()
      .domain(years)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, 7000000])
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(revenueData.map(d => d.category))
      .range(['#10B981']);

    // Add bars
    revenueData.forEach((category, i) => {
      svg.selectAll(`.bar-${i}`)
        .data(category.values)
        .join("rect")
        .attr("class", `bar-${i}`)
        .attr("x", (d, j) => x(years[j]))
        .attr("y", d => y(d))
        .attr("width", x.bandwidth())
        .attr("height", d => height - margin.bottom - y(d))
        .attr("fill", color(category.category));
    });

    // Add axes
    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat(d => `$${d3.format(",.0f")(d)}`));

    // Add legend
    const legend = svg.append("g")
      .attr("transform", `translate(${width - margin.right + 10},${margin.top})`);

    revenueData.forEach((d, i) => {
      legend.append("rect")
        .attr("x", 0)
        .attr("y", i * 25)
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", color(d.category));

      legend.append("text")
        .attr("x", 25)
        .attr("y", i * 25 + 12)
        .style("fill", "currentColor")
        .text(d.category);
    });

    // Add title
    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "currentColor")
      .text("Broadcasting Revenue Projections (2025-2027)");
  });
</script>

<div class="chart-container">
  <svg id="broadcasting-revenue-chart"></svg>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
    min-height: 400px;
  }
</style>
