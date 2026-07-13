# 🎨 Visual Guide: Admin Account Management

## 📊 System Overview Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    GSMA Admin System                         │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────────┐
                    │   Admin Portals  │
                    ├──────────────────┤
                    │ • Local Dev       │
                    │ • Cloud/Remote    │
                    └────────┬──────────┘
                             │
                    ┌────────▼──────────┐
                    │   Login Page      │
                    │ /admin/login      │
                    └────────┬──────────┘
                             │
                    ┌────────▼──────────┐
                    │  Verify Password  │
                    │  (bcrypt compare) │
                    └────────┬──────────┘
                             │
                    ┌────────▼──────────┐
                    │ Create JWT Token  │
                    │ (24h expiry)      │
                    └────────┬──────────┘
                             │
                    ┌────────▼──────────┐
                    │ HTTP-only Cookie  │
                    │ (secure storage)  │
                    └────────┬──────────┘
                             │
                    ┌────────▼──────────┐
                    │ Admin Dashboard   │
                    │ (full access)     │
                    └──────────────────┘
```

---

## 🔐 Password Creation Flow

```
┌─────────────────────────────────────────────────────────────┐
│             CREATE NEW ADMIN ACCOUNT                         │
└─────────────────────────────────────────────────────────────┘

   npm run admin:manage
         │
         ├─ Select Option 1
         │
         ├─ Enter Email: john.doe@gsma.gov.gh
         │
         ├─ Enter Password: MySecure@Password123
         │
         ├─ Confirm Password: MySecure@Password123
         │
         ├─ Enter Name: John Doe
         │
         └─► Generate SQL INSERT
             │
             ├─────────────────────────────────────────┐
             │ INSERT INTO admin_users (               │
             │   email,                                │
             │   password_hash,                        │
             │   name                                  │
             │ ) VALUES (                              │
             │   'john.doe@gsma.gov.gh',              │
             │   '$2b$10$...',  ← Bcrypt Hash         │
             │   'John Doe'                            │
             │ );                                      │
             └─────────────────────────────────────────┘
             │
             └─► Go to Supabase → SQL Editor → RUN
                 │
                 └─► Account Created ✓
```

---

## 🔄 Password Reset Flow

```
┌─────────────────────────────────────────────────────────────┐
│              RESET ADMIN PASSWORD                            │
└─────────────────────────────────────────────────────────────┘

   npm run admin:manage
         │
         ├─ Select Option 2
         │
         ├─ Enter Email: john.doe@gsma.gov.gh
         │
         ├─ Enter New Password: NewSecure@2024
         │
         ├─ Confirm Password: NewSecure@2024
         │
         └─► Generate SQL UPDATE
             │
             ├─────────────────────────────────────────┐
             │ UPDATE admin_users                      │
             │ SET password_hash = '$2b$10$...'        │
             │ WHERE email = 'john.doe@gsma.gov.gh';  │
             └─────────────────────────────────────────┘
             │
             └─► Go to Supabase → SQL Editor → RUN
                 │
                 └─► Password Reset ✓
                     │
                     └─► User can now login with new password
```

---

## 🔑 Login Process

```
┌─────────────────────────────────────────────────────────────┐
│              ADMIN LOGIN PROCESS                             │
└─────────────────────────────────────────────────────────────┘

User navigates to:
  http://localhost:3000/admin/login

         │
         ├─ Sees login form
         │  ├─ Email field
         │  └─ Password field
         │
         ├─ User enters credentials:
         │  ├─ Email: john.doe@gsma.gov.gh
         │  └─ Password: NewSecure@2024
         │
         ├─ Clicks "Sign In"
         │
         └─► POST /api/admin/login
             │
             ├─► Query: SELECT * FROM admin_users 
             │   WHERE email = 'john.doe@gsma.gov.gh'
             │
             ├─► Compare passwords using bcrypt
             │   ├─ entered_password: "NewSecure@2024"
             │   └─ stored_hash: "$2b$10$..."
             │
             ├─► Generate JWT Token
             │   ├─ Payload: { id, email, name }
             │   └─ Expiry: 24 hours
             │
             ├─► Set HTTP-only Cookie
             │   └─ Cookie name: admin_session
             │
             └─► Redirect to /admin/dashboard
                 │
                 └─► Dashboard loads ✓
                     (authenticated user can see all content)
```

---

## 📋 Available Credentials

```
┌──────────────────────────────────────────┐
│        DEFAULT ADMIN ACCOUNT              │
├──────────────────────────────────────────┤
│ Email:    admin@gsma.gov.gh               │
│ Password: admin123                        │
│ Name:     GSMA Administrator              │
└──────────────────────────────────────────┘

⚠️ IMPORTANT: Change this password in production!

Commands to change:
  npm run admin:manage → Option 2 → Reset Password
```

---

## 🗂️ File Structure

```
project-root/
├── scripts/
│   ├── create-admin-user.js       ← Original script
│   ├── admin-management.js        ← New interactive script
│   └── migrate-cloud-db.js        ← Cloud migration
│
├── src/
│   └── app/
│       └── admin/
│           ├── login/
│           │   └── page.tsx       ← Login page
│           ├── dashboard/
│           │   └── ...            ← Admin dashboard
│           └── api/
│               └── admin/
│                   ├── login/
│                   │   └── route.ts ← Login API
│                   ├── logout/
│                   │   └── route.ts ← Logout API
│                   └── news/
│                       └── route.ts ← News management
│
├── ADMIN_ACCOUNT_MANAGEMENT.md    ← Detailed guide
├── ADMIN_QUICK_REFERENCE.md       ← Quick guide
└── ADMIN_SETUP_SUMMARY.md         ← This summary
```

---

## 🎯 Quick Command Reference

```bash
╔════════════════════════════════════════════════════════════╗
║           ADMIN MANAGEMENT COMMANDS                        ║
╠════════════════════════════════════════════════════════════╣
║                                                            ║
║  Interactive Menu:                                        ║
║  $ npm run admin:manage                                   ║
║                                                            ║
║  Direct Create:                                           ║
║  $ npm run create-admin email password "Name"             ║
║                                                            ║
║  Example:                                                 ║
║  $ npm run create-admin jane@gsma.gov.gh MyPass123 "Jane" ║
║                                                            ║
║  Database Backup:                                         ║
║  $ npm run backup-db                                      ║
║                                                            ║
║  Reset Local DB:                                          ║
║  $ npm run supabase:reset                                 ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
```

---

## 🔐 Security Checklist

```
✅ Passwords are hashed with bcrypt
✅ Hashing uses 10 salt rounds
✅ Passwords stored as irreversible hashes
✅ Sessions use HTTP-only cookies
✅ Session expires after 24 hours
✅ JavaScript cannot access session cookie
✅ SSL/TLS in production (secure connection)
✅ Each admin account is unique (no duplicates)
✅ Password minimum 8 characters
✅ Strong password recommendations provided

DEPLOYMENT CHECKLIST:
□ Change default admin password
□ Enable HTTPS/SSL
□ Backup database regularly
□ Monitor login attempts
□ Update admin credentials policy
□ Document access control
□ Train admins on security
□ Test password reset flow
□ Verify backup/recovery procedures
```

---

## 🌐 Database Structure

```sql
admin_users table:

CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

---

## 📱 Login URLs

```
╔════════════════════════════════════════════════════════╗
║              LOGIN URLS                                ║
╠════════════════════════════════════════════════════════╣
║                                                        ║
║  Local Development:                                   ║
║  http://localhost:3000/admin/login                    ║
║                                                        ║
║  Cloud/Production:                                    ║
║  https://your-domain.com/admin/login                  ║
║                                                        ║
║  Admin Dashboard:                                     ║
║  http://localhost:3000/admin/dashboard                ║
║                                                        ║
║  Logout:                                              ║
║  http://localhost:3000/api/admin/logout               ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
```

---

## 🎓 Educational Breakdown

### What is Bcrypt?
- **Purpose:** Secure password hashing algorithm
- **How it works:** Converts password to one-way hash
- **Why it's safe:** Cannot be reversed (irreversible)
- **Salt rounds:** 10 (makes hashing slower = more secure)
- **Example:**
  ```
  Password: "MyPassword123"
  Hash:     "$2b$10$abcdef123456..."
  
  Each time you hash the same password, 
  you get a DIFFERENT hash (due to salt)
  ```

### How Login Verification Works
```
User enters: "MyPassword123"
System has:  "$2b$10$abcdef123456..."

Bcrypt compares using internal algorithm:
bcrypt.compare(
  "MyPassword123",                    ← User input
  "$2b$10$abcdef123456..."            ← Stored hash
)

Returns: true or false
```

### Why HTTP-only Cookies?
- **Secure:** JavaScript cannot access (prevents XSS attacks)
- **Automatic:** Sent with every request
- **HttpOnly flag:** Prevents client-side access
- **Secure flag:** Only sent over HTTPS in production
- **SameSite flag:** Prevents CSRF attacks

---

## 🆘 Troubleshooting Guide

```
PROBLEM: "Invalid email or password"
SOLUTIONS:
  □ Check email spelling
  □ Verify password is correct
  □ Ensure account exists in database
  □ Check email is lowercase

PROBLEM: Cannot create new admin
SOLUTIONS:
  □ Ensure email doesn't already exist
  □ Check email format is valid
  □ Verify password is at least 8 chars
  □ Run SQL INSERT in Supabase

PROBLEM: Password reset not working
SOLUTIONS:
  □ Verify SQL UPDATE ran successfully
  □ Check email in WHERE clause matches exactly
  □ Clear browser cache/cookies
  □ Try incognito/private window

PROBLEM: Session expired
SOLUTIONS:
  □ Log out and log back in
  □ Sessions last 24 hours
  □ Create new session automatically
  □ No manual re-login needed usually

PROBLEM: Locked out of admin
SOLUTIONS:
  □ Reset password via admin:manage script
  □ Ask database admin to reset
  □ Create new temporary admin account
  □ Use Supabase dashboard directly
```

---

## 🎊 You're All Set!

You now have a complete, secure admin account management system with:

✅ Interactive admin management tool
✅ Password hashing with bcrypt
✅ Secure session management
✅ 24-hour session expiry
✅ HTTP-only cookies
✅ Comprehensive documentation
✅ Quick reference guides
✅ Cloud & local database support

**Ready for production use!** 🚀
