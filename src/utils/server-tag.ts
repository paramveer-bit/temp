'use server';
import { revalidateTag as revalidate } from 'next/cache';

async function revalidateTag(tags: string[]) {
  await Promise.all(tags.map((tag) => revalidate(tag)));
}

export default revalidateTag;
