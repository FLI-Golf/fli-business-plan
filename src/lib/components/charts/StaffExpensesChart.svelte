<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  const expenseData = [
    {
      category: "Executive/Management",
      values: [1140000, 1197000, 1256850]
    },
    {
      category: "Office Staff",
      values: [286000, 300300, 315315]
    },
    {
      category: "Consultants",
      values: [800000, 800000, 800000]
    }
  ];

  const years = ['2025', '2026', '2027'];
  const width = 800;
  const height = 400;
  const margin = { top: 40, right: 200, bottom: 40, left: 80 };

  onMount(() => {
    const svg = d3.select('#staff-expenses-chart')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleBand()
      .domain(years)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, 1500000])
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(expenseData.map(d => d.category))
      .range(['#3B82F6', '#10B981', '#8B5CF6']);

    const barWidth = x.bandwidth() / expenseData.length;

    // Add grouped bars
    expenseData.forEach((category, i) => {
      svg.selectAll(`.bar-${i}`)
        .data(category.values)
        .join("rect")
        .attr("class", `bar-${i}`)
        .attr("x", (d, j) => x(years[j]) + i * barWidth)
        .attr("y", d => y(d))
        .attr("width", barWidth)
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

    expenseData.forEach((d, i) => {
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
      .text("Staff Expenses Breakdown (2025-2027)");
  });
</script>

<div class="chart-container">
  <svg id="staff-expenses-chart"></svg>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
    min-height: 400px;
  }
</style>
