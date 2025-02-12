<script lang="ts">
  import FinancialChart from './FinancialChart.svelte';

  const revenueData = {
    ticketSales: [3000000, 3300000, 3600000],
    apparel: [100000, 150000, 225000],
    accessories: [9000, 18000, 36000]
  };
</script>

<div class="charts-grid">
  <div class="chart-wrapper">
    <h3>Ticket Sales Revenue</h3>
    <FinancialChart 
      data={revenueData.ticketSales}
      width={400}
      height={300}
    />
  </div>
  <div class="chart-wrapper">
    <h3>Apparel Revenue</h3>
    <FinancialChart 
      data={revenueData.apparel}
      width={400}
      height={300}
    />
  </div>
  <div class="chart-wrapper">
    <h3>Accessories Revenue</h3>
    <FinancialChart 
      data={revenueData.accessories}
      width={400}
      height={300}
    />
  </div>
</div>

<style>
  .charts-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
  }
  
  .chart-wrapper {
    text-align: center;
  }
</style>
