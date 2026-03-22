import { createClient } from '@supabase/supabase-js';
import ContactListClient from '@/components/admin/ContactListClient';

const supabaseUrl = process.env.SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export default async function AdminContactPage() {
  const { data: messages } = await supabase
    .from('contact_messages')
    .select('id, name, email, phone, subject, message, created_at, handled')
    .order('created_at', { ascending: false });

  const initialMessages = (messages || []) as any[];

  return (
    <main className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
      <div>
        <ContactListClient initialMessages={initialMessages} />
      </div>
    </main>
  );
}
