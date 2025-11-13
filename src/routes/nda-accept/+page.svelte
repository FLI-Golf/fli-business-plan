<script lang="ts">
  import { goto } from '$app/navigation';
  import { pb } from '$lib/pocketbase';
  import { Copyright } from 'lucide-svelte';
  
  let email = '';
  let acceptedTerms = false;
  let isLoading = false;
  let generatedPassword = '';
  let showPassword = false;
  let errorMessage = '';

  function generateRandomPassword(): string {
    const length = 12;
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
    let password = '';
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
  }

  async function handleAcceptNDA() {
    if (!acceptedTerms) {
      errorMessage = 'Please accept the NDA terms to continue';
      return;
    }

    if (!email || !email.includes('@')) {
      errorMessage = 'Please enter a valid email address';
      return;
    }

    isLoading = true;
    errorMessage = '';

    try {
      // Generate random password
      const password = generateRandomPassword();
      generatedPassword = password;

      // Create user account
      const data = {
        email: email,
        password: password,
        passwordConfirm: password,
        emailVisibility: true
      };
      
      await pb.collection('_pb_users_auth_').create(data);
      
      // Authenticate the user
      await pb.collection('_pb_users_auth_').authWithPassword(email, password);
      
      // Show password for 5 seconds before redirecting
      showPassword = true;
      
      setTimeout(() => {
        goto('/overview');
      }, 5000);
      
    } catch (error: any) {
      console.error('NDA acceptance error:', error);
      
      // If user already exists, try to inform them
      if (error?.message?.includes('already exists') || error?.status === 400) {
        errorMessage = 'This email is already registered. Please use the login page.';
      } else {
        errorMessage = 'An error occurred. Please try again or contact support.';
      }
      
      isLoading = false;
      showPassword = false;
    }
  }

  function copyPassword() {
    navigator.clipboard.writeText(generatedPassword);
  }
</script>

<div class="flex flex-col min-h-screen bg-gray-900">
  <div class="flex-grow flex flex-col items-center justify-center px-4">
    <div class="w-full max-w-md space-y-8 p-10 bg-gray-800 rounded-xl shadow-2xl">
      {#if !showPassword}
        <div class="text-center space-y-2">
          <h2 class="text-3xl font-bold text-white">Quick Access</h2>
          <p class="text-gray-400">Accept NDA and view the business plan</p>
        </div>

        <div class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
            <input
              id="email"
              type="email"
              bind:value={email}
              required
              disabled={isLoading}
              class="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all placeholder-gray-400 disabled:opacity-50"
              placeholder="you@example.com"
            />
          </div>

          <label class="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              bind:checked={acceptedTerms}
              disabled={isLoading}
              class="w-4 h-4 mt-1 text-primary bg-gray-700 border-gray-600 rounded focus:ring-primary disabled:opacity-50"
            />
            <span class="text-sm text-gray-400 group-hover:text-gray-300">
              I acknowledge that this business plan contains confidential information and agree to maintain its confidentiality. I will not share, reproduce, or distribute any part of this document without explicit permission.
            </span>
          </label>

          {#if errorMessage}
            <div class="p-3 bg-red-900/50 border border-red-700 rounded-lg text-red-200 text-sm">
              {errorMessage}
            </div>
          {/if}
        </div>

        <button
          type="button"
          on:click={handleAcceptNDA}
          disabled={isLoading}
          class="w-full py-3 px-4 bg-primary text-black font-semibold rounded-lg hover:bg-primary-dark transform hover:scale-[1.02] transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isLoading ? 'Creating Account...' : 'Accept NDA & Continue'}
        </button>

        <div class="text-center">
          <a href="/" class="text-gray-400 hover:text-primary text-sm">
            ← Back to Home
          </a>
        </div>
      {:else}
        <div class="text-center space-y-6">
          <div class="text-green-500 text-5xl mb-4">✓</div>
          <h2 class="text-2xl font-bold text-white">Account Created!</h2>
          <p class="text-gray-400">Your temporary credentials have been generated.</p>
          
          <div class="bg-gray-700 p-4 rounded-lg space-y-3">
            <div class="text-left">
              <p class="text-xs text-gray-400 mb-1">Email:</p>
              <p class="text-white font-mono text-sm break-all">{email}</p>
            </div>
            <div class="text-left">
              <p class="text-xs text-gray-400 mb-1">Password:</p>
              <div class="flex items-center gap-2">
                <p class="text-white font-mono text-sm break-all flex-1">{generatedPassword}</p>
                <button
                  on:click={copyPassword}
                  class="px-3 py-1 bg-gray-600 hover:bg-gray-500 text-white text-xs rounded transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>
          </div>

          <div class="bg-yellow-900/30 border border-yellow-700 rounded-lg p-4">
            <p class="text-yellow-200 text-sm">
              ⚠️ <strong>Save these credentials!</strong> You'll need them to log in again later.
            </p>
          </div>

          <p class="text-gray-400 text-sm">
            Redirecting to business plan in 5 seconds...
          </p>
        </div>
      {/if}
    </div>
  </div>

  <footer class="bg-gray-800 text-gray-400 py-4 border-t border-gray-700">
    <div class="max-w-7xl mx-auto px-4 flex items-center justify-center gap-2 text-sm">
      <Copyright class="h-4 w-4" />
      <span>2025 FLI Golf. All rights reserved.</span>
    </div>
  </footer>
</div>
