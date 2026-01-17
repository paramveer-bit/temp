import { NextResponse } from 'next/server';
import { getSeller } from '@/hooks/use-server';

export async function GET() {
  try {
    const seller = await getSeller();

    if (!seller) {
      return NextResponse.json({ name: 'Unknown' });
    }

    return NextResponse.json(seller);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch seller' }, { status: 500 });
  }
}
