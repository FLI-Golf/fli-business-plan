<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  const revenueData = [
    {
      category: "Total Revenue",
      values: [17179000, 22618000, 28811000]
    }
  ];

  const years = ['2026', '2027', '2028'];
  const width = 800;
  const height = 400;
  const margin = { top: 40, right: 200, bottom: 40, left: 80 };

  onMount(() => {
    const svg = d3.select('#total-revenue-chart')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleBand()
      .domain(years)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, 30000000])
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(revenueData.map(d => d.category))
      .range(['#059669']);

    // Add tooltip
    const tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("opacity", 0)
      .style("position", "absolute")
      .style("background-color", "white")
      .style("border", "1px solid #ddd")
      .style("padding", "10px")
      .style("border-radius", "4px")
      .style("pointer-events", "none");

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
        .attr("fill", color(category.category))
        .on("mouseover", function(event, d) {
          d3.select(this).style("opacity", 0.8);
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);
          tooltip.html(`<div style="color: black">${category.category}<br/>Year: ${years[i]}<br/>Revenue: ${d3.format(",.0f")(d)}</div>`)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
        })
        .on("mouseout", function() {
          d3.select(this).style("opacity", 1);
          tooltip.transition()
            .duration(500)
            .style("opacity", 0);
        });
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
      .text("Total Revenue Projections (2026-2028)");
  });
</script>

<div class="chart-container">
  <svg id="total-revenue-chart"></svg>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
    min-height: 400px;
  }
</style>
