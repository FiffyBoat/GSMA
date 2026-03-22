import { NextResponse } from 'next/server';
import { createAdminSupabaseClient } from '@/lib/supabase/server';
import { requireAdminPermission } from '@/lib/admin-route-access';

export async function POST(req: Request) {
  try {
    // Allow either an authenticated admin session OR a server secret header for cron jobs
    const secretHeader = req.headers.get('x-refresh-secret');
    const serverSecret = process.env.REFRESH_EVENTS_SECRET;

    let authorized = false;

    if (serverSecret && secretHeader && secretHeader === serverSecret) {
      authorized = true;
    }

    if (!authorized) {
      const access = await requireAdminPermission("manage_events");
      if (!("response" in access)) authorized = true;
    }

    if (!authorized) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = await createAdminSupabaseClient();
    const { error } = await supabase.rpc('refresh_event_statuses');
    if (error) {
      console.error('Failed to refresh event statuses:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
