import { pb } from '$lib/pocketbase';

export async function load() {
  const records = await pb.collection('partners').getList(1, 50, {
    expand: 'relField1,relField2.subRelField'
  });
  
  return {
    partners: records.items
  };
}
