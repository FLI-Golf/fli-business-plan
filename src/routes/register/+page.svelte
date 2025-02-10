<script lang="ts">
  import { goto } from '$app/navigation';
  import { pb } from '$lib/pocketbase';
  
  let email = '';
  let password = '';
  let acceptedTerms = false;

  async function handleSubmit() {
    if (!acceptedTerms) {
      alert('Please accept the terms to continue');
      return;
    }

    try {
      const data = {
        email: email,
        password: password,
        passwordConfirm: password,
        emailVisibility: true
      };
      
      await pb.collection('_pb_users_auth_').create(data);
      await pb.collection('_pb_users_auth_').authWithPassword(email, password);
      
      goto('/overview');
    } catch (error) {
      console.error('Registration error:', error);
    }
  }
</script>
<div class="flex flex-col items-center justify-center min-h-screen bg-gray-900">
  <form
    on:submit|preventDefault={handleSubmit}
    class="w-full max-w-md space-y-8 p-10 bg-gray-800 rounded-xl shadow-2xl mx-4"
  >
    <div class="text-center space-y-2">
      <h2 class="text-3xl font-bold text-white">Create Account</h2>
      <p class="text-gray-400">Enter your details to get started</p>
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

      <label class="flex items-center gap-3 cursor-pointer group">
        <input
          type="checkbox"
          bind:checked={acceptedTerms}
          class="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary"
        />
        <span class="text-sm text-gray-400 group-hover:text-gray-300">
          I acknowledge that this business plan contains confidential information and agree to maintain its confidentiality. I will not share, reproduce, or distribute any part of this document without explicit permission.
        </span>
      </label>
    </div>

    <button
      type="submit"
      class="w-full py-3 px-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg"
    >
      Create Account
    </button>
  </form>
</div>
