# 👤 Admin Credentials & User Management Guide

## Quick Answer

**No default admin credentials exist** in the project. You must create them explicitly.

There are **3 ways to create admin logins:**

1. **Using the npm script** (Easiest) - Recommended
2. **Using Supabase Studio UI** (Quick)
3. **Using SQL directly** (Advanced)

---

## ✅ Method 1: Using npm Script (Recommended)

This is the **easiest and safest way** to create admin credentials.

### Prerequisites
- Database must be initialized (`npm run supabase:reset` completed)
- npm dependencies installed

### Step 1: Run the Create Admin Script

```bash
npm run create-admin
```

This command will prompt you for:
- **Email:** `admin@gsma.org.gh`
- **Password:** Create a strong one (8+ characters recommended)
- **Name:** `Admin User` or your name

### Step 2: With Parameters (No Prompts)

You can also provide all info in one command:

```bash
npm run create-admin admin@gsma.org.gh MyPassword123! "Admin User"
```

### Step 3: Result

The script outputs:
```
✅ Admin user created successfully
Email: admin@gsma.org.gh
Password: (hashed and stored securely)
```

### Step 4: Test Login

1. Start dev server: `npm run dev`
2. Visit: http://localhost:3000/admin/login
3. Enter your credentials
4. Should redirect to admin dashboard ✅

---

## ✅ Method 2: Using Supabase Studio UI

If you prefer a graphical interface:

### For Cloud Supabase:

1. **Go to** https://app.supabase.com
2. **Select your project**
3. **Click** "SQL Editor" (left sidebar)
4. **Click** "New Query"
5. **Paste this SQL:**

```sql
-- First, generate a bcrypt hash of your password
-- Use an online bcrypt generator: https://bcrypt-generator.com/
-- Paste your hashed password below

INSERT INTO admin_users (email, password_hash, name)
VALUES (
  'admin@gsma.org.gh',
  '$2b$10$...paste_your_bcrypt_hash_here...',
  'Admin User'
);
```

6. **Click** "Run"

### For Local Supabase (Docker):

1. **Visit** http://localhost:54323
2. **Login** with:
   - Email: `supabase`
   - Password: `password`
3. **Click** "SQL Editor"
4. **Paste the SQL above** (with real bcrypt hash)
5. **Click** "Run"

---

## ✅ Method 3: Using Bcrypt Hash (Advanced)

If you want to create the hash yourself:

### Step 1: Generate Bcrypt Hash

```bash
# Using Node.js
node -e "console.log(require('bcryptjs').hashSync('YourPassword123', 10))"
```

This outputs something like:
```
$2b$10$abcdefghijklmnopqrstuvwxyz1234567890
```

### Step 2: Insert into Database

Using Supabase Studio SQL Editor:

```sql
INSERT INTO admin_users (email, password_hash, name)
VALUES (
  'admin@gsma.org.gh',
  '$2b$10$abcdefghijklmnopqrstuvwxyz1234567890',
  'Admin User'
);
```

### Step 3: Login

Visit http://localhost:3000/admin/login with:
- Email: `admin@gsma.org.gh`
- Password: `YourPassword123`

---

## 📊 Admin Table Structure

The `admin_users` table has this structure:

```sql
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Fields Explained:
- **id** - Unique identifier (auto-generated)
- **email** - Login email (must be unique)
- **password_hash** - Bcrypt hashed password (NOT plain text!)
- **name** - Display name
- **created_at** - When account was created
- **updated_at** - When account was last modified

---

## 🔐 Security Notes

### ✅ DO:
- ✅ Use strong passwords (8+ characters, mix of upper/lowercase/numbers)
- ✅ Hash passwords with bcrypt (never store plain text)
- ✅ Use unique email addresses
- ✅ Keep .env.local secret (don't commit to git)
- ✅ Change default passwords immediately
- ✅ Use HTTPS in production

### ❌ DON'T:
- ❌ Never store plain text passwords
- ❌ Never use simple passwords like "password123"
- ❌ Never commit .env.local to git
- ❌ Never expose JWT secrets
- ❌ Never share admin credentials
- ❌ Never use default passwords in production

---

## 🔑 Creating Multiple Admin Accounts

You can create multiple admin users by running the script multiple times:

```bash
# First admin
npm run create-admin admin1@gsma.org.gh Password123! "Admin One"

# Second admin
npm run create-admin admin2@gsma.org.gh SecurePass456! "Admin Two"

# Third admin
npm run create-admin admin3@gsma.org.gh StrongPwd789! "Admin Three"
```

Or using SQL to insert multiple:

```sql
INSERT INTO admin_users (email, password_hash, name) VALUES
('admin1@gsma.org.gh', '$2b$10$...hash1...', 'Admin One'),
('admin2@gsma.org.gh', '$2b$10$...hash2...', 'Admin Two'),
('admin3@gsma.org.gh', '$2b$10$...hash3...', 'Admin Three');
```

---

## 🔄 Resetting Admin Password

If you forgot your password:

### Using Supabase Studio:

1. Go to SQL Editor
2. Run:

```sql
UPDATE admin_users 
SET password_hash = '$2b$10$...new_bcrypt_hash...'
WHERE email = 'admin@gsma.org.gh';
```

3. Generate new hash using: `node -e "console.log(require('bcryptjs').hashSync('NewPassword123', 10))"`

### Using Script:

Create a new temporary admin:
```bash
npm run create-admin temp@gsma.org.gh TempPassword123 "Temp Admin"
```

Then delete the old one:
```sql
DELETE FROM admin_users WHERE email = 'admin@gsma.org.gh';
```

---

## 🔍 Viewing Existing Admins

### Using Supabase Studio:

1. Click **admin_users** table in left sidebar
2. See all admins
3. Click on any row to view details

### Using SQL:

```sql
SELECT id, email, name, created_at FROM admin_users;
```

This shows:
```
                  id                  | email           | name       | created_at
--------------------------------------+------------------+------------+-----------
 12345678-1234-1234-1234-123456789012 | admin@gsma.org.gh| Admin User | 2025-01-23
```

---

## 🚀 Quick Setup Flowchart

```
Want to create admin credentials?
│
├─ Easiest: npm run create-admin
│  └─ Follow the prompts
│  └─ Done in 30 seconds
│
├─ Graphical: Supabase Studio UI
│  ├─ Visit http://localhost:54323 (local)
│  │  or https://app.supabase.com (cloud)
│  ├─ Go to SQL Editor
│  ├─ Paste SQL
│  └─ Done in 1 minute
│
└─ Manual: Generate hash + SQL
   ├─ Generate bcrypt hash
   ├─ Insert into database
   └─ Done in 2 minutes
```

---

## ✅ Verification Checklist

After creating an admin account, verify:

- [ ] Email address is correct
- [ ] Password is strong (8+ chars)
- [ ] Account appears in admin_users table
- [ ] Can login at /admin/login ✅
- [ ] Dashboard loads after login ✅
- [ ] Can navigate to different sections ✅
- [ ] Can create/edit content ✅

---

## 🆘 Troubleshooting

### "Email already exists"
**Problem:** You're trying to create an account with an email that already exists

**Solution:**
```bash
# Check existing admins
npm run verify-db

# Or use different email
npm run create-admin different@gsma.org.gh Password123 "User"
```

### "Invalid email or password" at login
**Problem:** Credentials don't match

**Solutions:**
1. Verify email spelling is correct
2. Check password is correct
3. Verify account exists: `npm run verify-db`
4. Create new account if needed

### "bcryptjs not found"
**Problem:** Module not installed

**Solution:**
```bash
npm install bcryptjs
npm run create-admin
```

### Can't access Supabase Studio
**Problem:** Wrong URL or service not running

**Solutions:**
- Local: http://localhost:54323 (not 54321)
- Cloud: https://app.supabase.com
- Check `npm run supabase:status`

### "Table admin_users doesn't exist"
**Problem:** Database not initialized

**Solution:**
```bash
npm run supabase:reset
npm run verify-db
npm run create-admin
```

---

## 📋 Admin Account Details

### What You Need to Know:

| Item | Value | Important |
|------|-------|-----------|
| **Table name** | `admin_users` | ✅ Yes |
| **Login email field** | `email` | ✅ Yes |
| **Password field** | `password_hash` | ✅ Bcrypt only |
| **Login URL** | `/admin/login` | ✅ Yes |
| **Dashboard URL** | `/admin` or `/admin/dashboard` | ✅ Yes |
| **Default credentials** | None (create your own) | ⚠️ Important |
| **Password requirement** | 8+ characters | ✅ Recommended |
| **Email requirement** | Valid, unique | ✅ Yes |

---

## 🎯 Next Steps

### If you haven't created an admin yet:

1. **Start database:**
   ```bash
   npm run supabase:start
   npm run supabase:reset
   ```

2. **Create admin:**
   ```bash
   npm run create-admin
   ```

3. **Start dev server:**
   ```bash
   npm run dev
   ```

4. **Login:**
   - Visit http://localhost:3000/admin/login
   - Use your credentials
   - Access dashboard ✅

### If you already have an admin:

1. Just start dev server:
   ```bash
   npm run dev
   ```

2. Visit http://localhost:3000/admin/login

3. Login with your credentials

---

## 📞 Related Commands

```bash
# Create admin account
npm run create-admin

# Verify database has admin table
npm run verify-db

# Start database
npm run supabase:start

# Reset database (drops and recreates)
npm run supabase:reset

# Check database status
npm run supabase:status

# Backup database
npm run backup-db
```

---

## 🔗 Related Files

- [Login Route](./src/app/api/admin/login/route.ts) - How login works
- [Auth Utilities](./src/lib/auth.ts) - Session management
- [Admin Dashboard](./src/app/admin/dashboard/) - What admin sees
- [Database Schema](./supabase/migrations/20260120090000_init.sql) - Table structure

---

**Status:** Ready to create admin accounts ✅  
**Time to create:** 30 seconds - 2 minutes  
**Recommended method:** npm run create-admin
