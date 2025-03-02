<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Search, Home, HelpCircle } from "lucide-svelte";
  import { Input } from "$lib/components/ui/input";
  import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "$lib/components/ui/accordion";
  import Breadcrumb from "$lib/components/ui/breadcrumb/breadcrumb.svelte";

  interface FAQ {
    id: string;
    question: string;
    new_answer: string;
    answer: string;
    order: number;
}  export let data: { faqs: FAQ[] };
  let searchQuery = "";
  let isMobileMenuOpen = false;
  let showBackToTop = false;

  function handleScroll() {
    showBackToTop = window.scrollY > 300;
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  onMount(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  $: filteredFaqs = data.faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.new_answer.toLowerCase().includes(searchQuery.toLowerCase())
  );
</script>

<div class="grid min-h-screen w-full md:grid-cols-[280px_1fr]">
  <aside class="bg-muted/40 border-r hidden md:flex flex-col">
    <div class="h-14 border-b px-4 flex items-center lg:px-6">
      <div class="flex items-center gap-2">
        <HelpCircle class="h-5 w-5" />
        <a href="/faqs" class="font-semibold text-xl hover:underline">
          FAQs
        </a>
      </div>
    </div>

    <nav class="flex-1 overflow-y-auto p-4">
      <div class="space-y-2">
        {#each data.faqs as faq}
          <a href={`#faq-${faq.id}`} class="block px-2 py-1 text-sm font-medium hover:bg-muted rounded-md transition">
            {faq.question}
          </a>
        {/each}
      </div>
    </nav>
  </aside>

  <div class="flex flex-col">
    <header class="bg-muted/40 flex h-14 items-center gap-4 border-b px-4 lg:h-[60px] lg:px-6">
      <button class="md:hidden p-2" on:click={() => isMobileMenuOpen = !isMobileMenuOpen}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>

      <div class="w-full flex-1 flex items-center gap-4">
        <form class="flex-1">
          <div class="relative">
            <Search class="text-muted-foreground absolute left-2.5 top-2.5 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search FAQs..."
              class="bg-background w-full appearance-none pl-8 shadow-none md:w-2/3 lg:w-1/3"
              bind:value={searchQuery}
            />
          </div>
        </form>

        <a href="/overview" class="text-foreground hover:text-foreground transition-colors flex items-center gap-3">
          <img src="/logos/fli_logo.png" alt="FLI Logo" class="h-12 w-12" />
          Overview
        </a>
      </div>
    </header>

    <main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/overview' },
          { label: 'FAQs', href: '/faqs' }
        ]} />

      <h1 class="text-2xl font-bold">Frequently Asked Questions</h1>

      <Accordion type="single" collapsible class="w-full">
        {#each filteredFaqs as faq}
          <AccordionItem value={faq.id} id={`faq-${faq.id}`}>
            <AccordionTrigger class="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              {@html faq.new_answer}
            </AccordionContent>
          </AccordionItem>
        {/each}
      </Accordion>
    </main>
  </div>
</div>
{#if showBackToTop}
  <button
    class="fixed bottom-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background/90 transition-all flex flex-col items-center gap-2"
    on:click={scrollToTop}
  >
    <div class="flex items-center gap-1 text-sm font-medium">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4"><path d="m18 15-6-6-6 6"/></svg>
      Back to top
    </div>
    <img src="/logos/fli_logo.png" alt="Back to top" class="h-14 w-14" />
  </button>
{/if}
{#if isMobileMenuOpen}
  <div class="fixed inset-0 z-50 bg-background md:hidden">
    <div class="h-14 border-b px-4 flex items-center justify-between">
      <span class="font-semibold text-xl">FAQs</span>
      <button class="p-2" on:click={() => isMobileMenuOpen = false}>✕</button>
    </div>

    <nav class="flex-1 overflow-y-auto p-4 space-y-2">
      {#each data.faqs as faq}
        <a
          href={`#faq-${faq.id}`}
          class="block px-3 py-2 rounded-md text-sm font-medium hover:bg-muted transition"
          on:click={() => isMobileMenuOpen = false}
        >
          {faq.question}
        </a>
      {/each}
    </nav>
  </div>
{/if}
