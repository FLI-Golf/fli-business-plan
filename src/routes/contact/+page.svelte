<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Textarea } from "$lib/components/ui/textarea";
  import { Mail, Home } from "lucide-svelte";

  let formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  const handleSubmit = async () => {
    const mailtoLink = `mailto:info@fligolf.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`)}`;
    window.location.href = mailtoLink;
  };
</script>
<div class="container mx-auto max-w-2xl p-4">
  <div class="flex items-center justify-between mb-8">
    <div class="flex items-center gap-2">
      <Mail class="h-6 w-6" />
      <h1 class="text-3xl font-bold">Contact Us</h1>
    </div>
    <a 
      href="/overview" 
      class="flex items-center gap-2 text-sm font-medium hover:text-primary"
    >
      <span>Back to Overview</span>
      <Home class="h-4 w-4" />
    </a>
  </div>
  
  <!-- Rest of the form remains the same -->
  <form on:submit|preventDefault={handleSubmit} class="space-y-6">
    <div class="space-y-2">
      <Label for="name">Name</Label>
      <Input id="name" bind:value={formData.name} required />
    </div>

    <div class="space-y-2">
      <Label for="email">Email</Label>
      <Input type="email" id="email" bind:value={formData.email} required />
    </div>

    <div class="space-y-2">
      <Label for="subject">Subject</Label>
      <Input id="subject" bind:value={formData.subject} required />
    </div>

    <div class="space-y-2">
      <Label for="message">Message</Label>
      <Textarea id="message" bind:value={formData.message} required />
    </div>

    <Button type="submit" class="w-full">Send Message</Button>
  </form>
</div>
