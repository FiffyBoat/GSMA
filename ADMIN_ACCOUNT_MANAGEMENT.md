# 👥 Admin Account Management Guide

## Overview
This guide explains how to create new admin accounts, reset admin passwords, and manage admin users in the GSMA Ghana website system.

---

## 🔑 Create New Admin Account

### Method 1: Using the Admin Management Script (Recommended)

```bash
npm run admin:manage
```

This will open an interactive menu:
1. Select option "1" for "Create a new admin user"
2. Enter the admin email (e.g., `john.doe@gsma.gov.gh`)
3. Enter a secure password (minimum 8 characters)
4. Confirm the password
5. Enter the admin's name (e.g., `John Doe`)
6. Follow the instructions to execute the SQL query in Supabase

### Method 2: Using the Create Admin Script

```bash
npm run create-admin john.doe@gsma.gov.gh MyPassword123 "John Doe"
```

**Parameters:**
- `email` - Admin email address
- `password` - Admin password (minimum 8 characters)
- `name` - Admin full name

**Example:**
```bash
npm run create-admin admin@example.com Secure@Password123 "Jane Smith"
```

**Output:**
The script will display an SQL INSERT statement that you need to run in Supabase:

```sql
INSERT INTO admin_users (email, password_hash, name) VALUES ('john.doe@gsma.gov.gh', '$2b$10$...', 'John Doe');
```

---

## 🔄 Reset Admin Password

### Method 1: Using the Admin Management Script

```bash
npm run admin:manage
```

1. Select option "2" for "Reset admin password"
2. Enter the admin email
3. Enter the new password (minimum 8 characters)
4. Confirm the new password
5. Follow the instructions to execute the SQL UPDATE query in Supabase

### Method 2: Manual Reset via Supabase

1. Go to [Supabase Dashboard](https://supabase.com)
2. Select your project: `orchids-remix-of-gsma-ghana-official-website-main`
3. Navigate to **SQL Editor**
4. Create a new query
5. Use this command to generate the password hash:

```bash
node -e "const bcrypt = require('bcryptjs'); console.log(bcrypt.hashSync('YourNewPassword123', 10))"
```

6. Copy the hash output and run this query:

```sql
UPDATE admin_users 
SET password_hash = '$2b$10$...' 
WHERE email = 'john.doe@gsma.gov.gh';
```

---

## 📋 List All Admin Users

### Method 1: Using the Admin Management Script

```bash
npm run admin:manage
```

Select option "3" for "List all admin users" and follow the instructions.

### Method 2: Using Supabase Dashboard

1. Go to [Supabase Dashboard](https://supabase.com)
2. Select your project
3. Click on **Table Editor** in the left sidebar
4. Select the **admin_users** table
5. View all admin accounts with their email, name, and creation date

### Method 3: Using SQL Query

```bash
npm run admin:manage
```

Or manually run in Supabase SQL Editor:

```sql
SELECT id, email, name, created_at FROM admin_users ORDER BY created_at DESC;
```

---

## 🔐 Password Requirements

- **Minimum length:** 8 characters
- **Recommended:** Mix of uppercase, lowercase, numbers, and special characters
- **Examples of strong passwords:**
  - `MySecure@Pass123`
  - `Admin$Ghana2024`
  - `Ga$outh#2026!`

---

## 🔒 How Authentication Works

### Login Flow
1. User enters email and password on `/admin/login` page
2. System queries the `admin_users` table for matching email
3. Password is verified using bcrypt comparison
4. If valid, a JWT session token is created (valid for 24 hours)
5. Token is stored in an HTTP-only cookie
6. User is redirected to `/admin/dashboard`

### Session Management
- **Session duration:** 24 hours
- **Session storage:** HTTP-only secure cookies
- **Logout:** Clear the admin_session cookie at `/api/admin/logout`

---

## ✅ Admin Login

1. Go to: `http://localhost:3000/admin/login` (local) or `https://your-domain.com/admin/login` (production)
2. Enter email address
3. Enter password
4. Click "Sign In"
5. You'll be redirected to `/admin/dashboard`

---

## 🗑️ Delete an Admin Account

To delete an admin user, use this SQL query in Supabase:

```sql
DELETE FROM admin_users WHERE email = 'john.doe@gsma.gov.gh';
```

**Warning:** This action cannot be undone. Make sure you don't delete the only admin account.

---

## 🔍 Troubleshooting

### "Invalid email or password" error
- Check that the email is spelled correctly
- Verify the password is correct (passwords are case-sensitive)
- Ensure the admin account exists in the database

### Cannot login after password reset
- Verify the SQL UPDATE query ran successfully
- Check that the email in the WHERE clause matches exactly
- Try logging out and clearing browser cookies

### Locked out of admin account
- Contact the database administrator
- Use Supabase dashboard to reset the password directly
- Create a new temporary admin account and change the original password

---

## 📱 Database Schema: admin_users table

| Column | Type | Description |
|--------|------|-------------|
| `id` | UUID | Unique identifier (auto-generated) |
| `email` | VARCHAR(255) | Email address (unique) |
| `password_hash` | VARCHAR(255) | Bcrypt hashed password |
| `name` | VARCHAR(255) | Admin full name |
| `created_at` | TIMESTAMP | Account creation date |
| `updated_at` | TIMESTAMP | Last update date |

---

## 🎯 Admin Permissions

All authenticated admin users have full access to:
- ✅ Create/Edit/Delete News Posts
- ✅ Manage Hero Slides
- ✅ Manage Leadership Team
- ✅ Manage Projects
- ✅ Manage Events
- ✅ Manage Gallery
- ✅ Manage Site Settings
- ✅ View and Download Documents
- ✅ Manage Assembly Members
- ✅ Upload Images

---

## 📞 Support

For issues with admin account management:
1. Check the Supabase logs
2. Verify database connectivity
3. Ensure the admin_users table exists
4. Check that the email address is unique (no duplicates)

