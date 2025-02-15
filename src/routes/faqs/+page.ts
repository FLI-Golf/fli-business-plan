export const load = async ({ fetch }) => {
  const response = await fetch('/api/faqs');
  const faqs = await response.json();
  
  return {
    faqs
  };
};
