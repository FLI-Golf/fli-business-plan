<script lang="ts">
  import { goto } from '$app/navigation';
  import PocketBase from 'pocketbase';
  
  const pb = new PocketBase('https://few-likely.pockethost.io');
  
  let email = '';
  let password = '';

  async function handleLogin() {
    try {
      await pb.collection('_pb_users_auth_').authWithPassword(email, password);
      goto('/overview');
    } catch (error) {
      console.error('Login error:', error);
    }
  }
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
  <form
    on:submit|preventDefault={handleLogin}
    class="w-full max-w-md space-y-8 p-10 bg-gray-800 rounded-xl shadow-2xl mx-4"
  >
    <div class="text-center space-y-2">
      <h2 class="text-3xl font-bold text-white">Welcome Back</h2>
      <p class="text-gray-400">Sign in to view the business plan</p>
    </div>

    <div class="space-y-6">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder-gray-400"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label for="password" class="block text-sm font-medium text-gray-300 mb-1">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          class="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder-gray-400"
          placeholder="••••••••"
        />
      </div>
    </div>

    <button
      type="submit"
      class="w-full py-3 px-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
    >
      Sign In
    </button>

    <div class="text-center">
      <a href="/register" class="text-primary hover:text-primary-dark">
        Need an account? Register here
      </a>
    </div>
  </form>
</div>
