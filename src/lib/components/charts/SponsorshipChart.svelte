<script lang="ts">
  import * as d3 from 'd3';
  import { onMount } from 'svelte';

  const revenueData = [
    {
      category: "Title Partner",
      values: [8500000, 6000000, 5500000]
    },
    {
      category: "Major Disc Golf Brands",
      values: [3300000, 3600000, 3900000]
    },
    {
      category: "Food and Beverage",
      values: [2000000, 2500000, 3000000]
    },
    {
      category: "Local Brands",
      values: [1400000, 1800000, 2200000]
    }
  ];

  const years = ['2025 /2026', '2027', '2028'];
  const width = 800;
  const height = 400;
  const margin = { top: 40, right: 200, bottom: 40, left: 80 };

  onMount(() => {
    const svg = d3.select('#revenue-chart')
      .attr('width', width)
      .attr('height', height);

    const x = d3.scaleBand()
      .domain(years)
      .range([margin.left, width - margin.right])
      .padding(0.2);

    const y = d3.scaleLinear()
      .domain([0, 9000000])
      .range([height - margin.bottom, margin.top]);

    const color = d3.scaleOrdinal()
      .domain(revenueData.map(d => d.category))
      .range(['#FF3366', '#33CC99', '#6633CC', '#FFCC33']);

    const barWidth = x.bandwidth() / revenueData.length;

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

    revenueData.forEach((category, i) => {
      svg.selectAll(`.bar-${i}`)
        .data(category.values)
        .join("rect")
        .attr("class", `bar-${i}`)
        .attr("x", (d, j) => x(years[j]) + i * barWidth)
        .attr("y", d => y(d))
        .attr("width", barWidth)
        .attr("height", d => height - margin.bottom - y(d))
        .attr("fill", color(category.category))
        .on("mouseover", function(event, d) {
          const currentYear = years[Math.floor((this.x.baseVal.value - margin.left) / x.step())];
          d3.select(this).style("opacity", 0.8);
          tooltip.transition()
            .duration(200)
            .style("opacity", 0.9)
            .style("background-color", color(category.category));
          tooltip.html(`<div style="color: black">${category.category}<br/>Year: ${currentYear}<br/>Revenue: ${d3.format(",.0f")(d)}</div>`)
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

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(y).tickFormat(d => `${d3.format(",.0f")(d)}`));

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

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("fill", "currentColor")
      .text("FLI Golf Sponsorship Revenue (2025-2028)");
  });
</script>

<div class="chart-container">
  <svg id="revenue-chart"></svg>
</div>

<style>
  .chart-container {
    width: 100%;
    height: 100%;
    min-height: 400px;
  }
</style>
