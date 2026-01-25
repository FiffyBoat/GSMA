const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'http://127.0.0.1:54321';
const supabaseServiceKey = 'sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function insertAdmin() {
  try {
    const { data, error } = await supabase.from('admin_users').insert({
      email: 'admin@gsma.gov.gh',
      password_hash: '$2b$10$7DTj2s1UeVPX8AeNqnJGCe3LwX9t9vnHO15N4jHfNnsSryKoc4AFi',
      name: 'GSMA Admin'
    }).select();

    if (error) {
      console.log('❌ Error inserting admin user:', error.message);
    } else {
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: admin@gsma.gov.gh');
      console.log('🔐 Password: admin123');
    }
  } catch (err) {
    console.error('❌ Unexpected error:', err.message);
  }
  process.exit(0);
}

insertAdmin();
