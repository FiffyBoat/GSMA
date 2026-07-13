# 🚀 Quick Admin Account Management Guide

## 📍 TL;DR - Quick Commands

### Create New Admin Account
```bash
npm run admin:manage
# Then select option 1
```

### Reset Admin Password
```bash
npm run admin:manage
# Then select option 2
```

### List All Admin Accounts
```bash
npm run admin:manage
# Then select option 3
```

### Alternative: Direct Command
```bash
npm run create-admin admin@example.com MyPassword123 "Admin Name"
```

---

## 🔐 How Password Reset Works

### Current System
1. **No built-in password reset email** - Currently, passwords must be reset manually via:
   - Using the `npm run admin:manage` script
   - Running SQL UPDATE queries directly in Supabase
   - Using Supabase dashboard

2. **How it works:**
   - Admin provides their email
   - New password is generated/set
   - Password is hashed with bcrypt (one-way encryption)
   - Hash is stored in database
   - User logs in with new password

### Password Storage
- Passwords are **never stored in plain text**
- Passwords are hashed using **bcrypt** with 10 salt rounds
- Hash cannot be reversed (one-way encryption)
- Login verifies password by comparing with stored hash

---

## 👤 Creating Admin Accounts - Step by Step

### Option A: Interactive Menu (Easiest)

```bash
cd c:\Users\USER\Desktop\orchids-remix-of-gsma-ghana-official-website-main
npm run admin:manage
```

Then:
1. Choose option **1** for "Create a new admin user"
2. Enter email: `john.doe@gsma.gov.gh`
3. Enter password: `MySecurePassword123` (min 8 chars)
4. Confirm password: `MySecurePassword123`
5. Enter name: `John Doe`
6. Copy the SQL INSERT statement shown
7. Go to Supabase and run the SQL query

### Option B: Command Line

```bash
npm run create-admin john.doe@gsma.gov.gh MySecurePassword123 "John Doe"
```

Output:
```
=== Admin User Creation ===

Email: john.doe@gsma.gov.gh
Name: John Doe

SQL INSERT statement:

INSERT INTO admin_users (email, password_hash, name) VALUES ('john.doe@gsma.gov.gh', '$2b$10$...', 'John Doe');
```

Copy this and run in Supabase SQL Editor.

---

## 🔄 Resetting Admin Password - Step by Step

### Option A: Interactive Menu (Recommended)

```bash
npm run admin:manage
```

Then:
1. Choose option **2** for "Reset admin password"
2. Enter email: `john.doe@gsma.gov.gh`
3. Enter new password: `NewSecurePassword456` (min 8 chars)
4. Confirm password: `NewSecurePassword456`
5. Copy the SQL UPDATE statement
6. Go to Supabase and run the SQL query

### Option B: Manual via Supabase

1. Go to https://supabase.com/dashboard
2. Select your project: `orchids-remix-of-gsma-ghana-official-website-main`
3. Click **SQL Editor** on the left
4. Click **New Query**
5. Run this SQL to generate hash:

```sql
-- Copy this hash
SELECT crypt('NewPassword123', gen_salt('bf'));

-- Or use this to reset directly:
UPDATE admin_users 
SET password_hash = crypt('NewPassword123', gen_salt('bf'))
WHERE email = 'john.doe@gsma.gov.gh';
```

---

## 📱 Login After Creating Account

1. Go to: `http://localhost:3000/admin/login`
2. Enter email: `john.doe@gsma.gov.gh`
3. Enter password: (the password you set)
4. Click "Sign In"
5. Access admin dashboard at `/admin/dashboard`

---

## ❌ If You Forget Your Admin Password

### Can't Remember Email or Password?

**For Local Development:**
1. Reset the database:
   ```bash
   npm run supabase:reset
   ```
2. Create a new admin account:
   ```bash
   npm run create-admin admin@gsma.gov.gh admin123 "Administrator"
   ```

**For Production:**
1. Contact your database administrator
2. Ask them to reset your password using Supabase dashboard
3. They run: `UPDATE admin_users SET password_hash = ... WHERE email = 'your@email.com'`

---

## 🔍 View All Admin Accounts

### Using Script
```bash
npm run admin:manage
# Select option 3
```

### Using Supabase Dashboard
1. Go to https://supabase.com/dashboard
2. Select your project
3. Click **Table Editor**
4. Click **admin_users** table
5. View all admins with email, name, and creation date

### Using SQL
```bash
# Go to Supabase SQL Editor and run:
SELECT id, email, name, created_at FROM admin_users ORDER BY created_at DESC;
```

---

## 🗑️ Delete Admin Account

**Only in Supabase SQL Editor:**

```sql
DELETE FROM admin_users WHERE email = 'john.doe@gsma.gov.gh';
```

⚠️ **Warning:** Cannot be undone! Don't delete the only admin account.

---

## 💡 Password Best Practices

✅ **Good passwords:**
- `Ga$outh#Admin2024`
- `GSMA@News$2026`
- `MySecure#Pass789`

❌ **Bad passwords:**
- `admin123` (too simple)
- `password` (common)
- `123456` (too simple)

**Requirements:**
- Minimum 8 characters
- Mix of uppercase, lowercase, numbers, special characters
- Unique per admin

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| "Invalid email or password" | Check email spelling, verify password is correct |
| Can't create admin account | Ensure email doesn't already exist (must be unique) |
| Password reset not working | Verify SQL query ran successfully in Supabase |
| Locked out of admin dashboard | Reset password via Supabase or create new admin |
| Session expired | Log out and log back in (sessions last 24 hours) |

---

## 📚 Related Documentation
- [ADMIN_ACCOUNT_MANAGEMENT.md](./ADMIN_ACCOUNT_MANAGEMENT.md) - Full detailed guide
- [Admin Dashboard](./src/app/admin/dashboard/) - Dashboard source code
- [Login Page](./src/app/admin/login/) - Login page source code

