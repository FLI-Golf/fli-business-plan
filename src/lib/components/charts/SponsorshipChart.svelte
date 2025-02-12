<script lang="ts">
  import FinancialChart from './FinancialChart.svelte';

  const membershipData = [20000, 50000, 100000];
</script>

<div class="chart-wrapper">
  <h3>Membership Revenue Growth</h3>
  <FinancialChart 
    data={membershipData}
    width={600}
    height={400}
  />
</div>

<style>
  .chart-wrapper {
    text-align: center;
  }
</style>
