import { createClient } from '@supabase/supabase-js';
import ContactListClient from '@/components/admin/ContactListClient';
import { verifySession } from '@/lib/auth';
import { redirect } from 'next/navigation';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function AdminContactPage() {
  const session = await verifySession();

  if (!session) {
    redirect('/admin/login');
  }

  const { data: messages } = await supabase
    .from('contact_messages')
    .select('id, name, email, phone, subject, message, created_at, handled')
    .order('created_at', { ascending: false });

  const initialMessages = (messages || []) as any[];

  return (
    <main className="min-h-screen bg-[#f4f6f8] p-4 sm:p-6 lg:p-8">
      <div className="mb-6 rounded-[8px] border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B0000]">
          Admin Inbox
        </p>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">
          Contact Messages
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Review public enquiries submitted through the website contact form.
        </p>
      </div>
      <div className="rounded-[8px] border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
        <ContactListClient initialMessages={initialMessages} />
      </div>
    </main>
  );
}
