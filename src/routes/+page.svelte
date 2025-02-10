<script lang="ts">
  import { goto } from '$app/navigation';

  function startRegistration() {
    goto('/register');
  }
</script>

<section class="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
  <img
    src="/logos/fli_logo.png"
    alt="FLI Logo"
    class="w-48 h-auto"
  />
  
  <div class="text-center space-y-6">
    <h1 class="text-4xl font-bold">Register to view our Business Plan</h1>
    
    <button
      on:click={startRegistration}
      class="px-8 py-4 text-lg font-semibold text-black bg-primary rounded-lg hover:bg-primary-dark transition-all transform hover:scale-105"
    >
      Create Account
    </button>
  </div>
</section>
