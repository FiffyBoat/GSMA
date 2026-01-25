# GSMA Ghana Website - API Documentation

Complete API reference for the GSMA Ghana website backend.

## Base URL

- Development: `http://localhost:3000/api`
- Production: `https://yourdomain.com/api`

## Authentication

All admin endpoints require a valid JWT session cookie. Obtain this by logging in at `/api/admin/login`.

### Headers Required

```
Content-Type: application/json
Cookie: session=<jwt-token>
```

---

## Admin Endpoints

### Authentication

#### POST /admin/login
Login to admin dashboard.

**Request Body:**
```json
{
  "email": "admin@gsma.org.gh",
  "password": "password123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "admin@gsma.org.gh",
    "is_admin": true
  },
  "session": "jwt-token"
}
```

**Error (401):**
```json
{
  "error": "Invalid credentials"
}
```

---

#### POST /admin/logout
Logout from admin dashboard.

**Response (200):**
```json
{
  "success": true
}
```

---

#### POST /admin/change-password
Change admin password.

**Request Body:**
```json
{
  "currentPassword": "old-password",
  "newPassword": "new-password-min-8-chars",
  "confirmPassword": "new-password-min-8-chars"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Password changed successfully"
}
```

**Error (400):**
```json
{
  "error": "Passwords do not match"
}
```

---

#### GET /admin/session
Check current session status.

**Response (200):**
```json
{
  "user": {
    "id": "uuid",
    "email": "admin@gsma.org.gh",
    "is_admin": true
  }
}
```

**Error (401):**
```json
{
  "error": "No active session"
}
```

---

### User Management

#### GET /admin/users
List all admin users.

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "email": "admin@gsma.org.gh",
      "is_admin": true,
      "is_active": true,
      "created_at": "2025-01-20T10:00:00Z"
    }
  ]
}
```

---

#### POST /admin/users
Create new admin user.

**Request Body:**
```json
{
  "email": "newadmin@gsma.org.gh",
  "password": "SecurePassword123!"
}
```

**Response (201):**
```json
{
  "data": {
    "id": "uuid",
    "email": "newadmin@gsma.org.gh",
    "is_admin": true,
    "is_active": true
  }
}
```

**Error (409):**
```json
{
  "error": "Email already exists"
}
```

---

#### PUT /admin/users
Update admin user.

**Request Body:**
```json
{
  "id": "uuid",
  "email": "updated@gsma.org.gh",
  "is_active": true
}
```

**Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "email": "updated@gsma.org.gh",
    "is_active": true
  }
}
```

---

#### DELETE /admin/users?id=uuid
Delete admin user.

**Response (200):**
```json
{
  "success": true
}
```

**Error (400):**
```json
{
  "error": "Cannot delete the last admin user"
}
```

---

### Content Management

#### News

**GET /admin/news**
List all news posts.

**Response (200):**
```json
{
  "data": [
    {
      "id": "uuid",
      "slug": "breaking-news",
      "title": "Breaking News",
      "content": "Content here...",
      "excerpt": "Short summary...",
      "image_url": "https://...",
      "category": "General",
      "published": true,
      "created_at": "2025-01-20T10:00:00Z",
      "updated_at": "2025-01-20T10:00:00Z"
    }
  ]
}
```

---

**POST /admin/news**
Create new news post.

**Request Body:**
```json
{
  "title": "News Title",
  "content": "Full content...",
  "excerpt": "Short description",
  "image_url": "https://bucket.supabase.co/...",
  "category": "General",
  "published": true
}
```

**Response (201):**
```json
{
  "data": {
    "id": "uuid",
    "slug": "news-title",
    "title": "News Title",
    "created_at": "2025-01-20T10:00:00Z"
  }
}
```

---

**PUT /admin/news**
Update news post.

**Request Body:**
```json
{
  "id": "uuid",
  "title": "Updated Title",
  "content": "Updated content..."
}
```

**Response (200):**
```json
{
  "data": {
    "id": "uuid",
    "slug": "updated-title",
    "title": "Updated Title"
  }
}
```

---

**DELETE /admin/news?id=uuid**
Delete news post (removes image from storage).

**Response (200):**
```json
{
  "success": true
}
```

---

#### Projects

**GET /admin/projects**
List all projects.

**Response:** Same structure as news

**POST /admin/projects**
Create project.

**Request Body:**
```json
{
  "title": "Project Name",
  "description": "Description...",
  "status": "ongoing",
  "budget": "100000",
  "start_date": "2025-01-01",
  "end_date": "2025-12-31",
  "image_url": "https://...",
  "department": "Works"
}
```

---

**PUT /admin/projects**
Update project.

**DELETE /admin/projects?id=uuid**
Delete project (removes image from storage).

---

#### Events

**GET /admin/events**
List all events.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "Event Name",
      "description": "Description...",
      "event_date": "2025-02-14",
      "start_time": "09:00",
      "end_time": "17:00",
      "venue": "Location",
      "contact_person": "John Doe",
      "contact_email": "john@example.com",
      "contact_phone": "+233...",
      "image_url": "https://...",
      "is_featured": true
    }
  ]
}
```

---

**POST /admin/events**
Create event.

**Request Body:**
```json
{
  "title": "Event Name",
  "description": "Description...",
  "event_date": "2025-02-14",
  "start_time": "09:00",
  "end_time": "17:00",
  "venue": "Location",
  "contact_person": "Name",
  "contact_email": "email@example.com",
  "contact_phone": "+233...",
  "image_url": "https://...",
  "is_featured": true
}
```

---

**PUT /admin/events**
Update event.

**DELETE /admin/events?id=uuid**
Delete event (removes image from storage).

---

#### Gallery

**GET /admin/gallery**
List all gallery items.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "image_url": "https://...",
      "video_url": "https://youtube.com/...",
      "title": "Gallery Item",
      "description": "Description...",
      "category": "Events",
      "display_order": 1
    }
  ]
}
```

---

**POST /admin/gallery**
Create gallery item.

**Request Body:**
```json
{
  "image_url": "https://...",
  "video_url": null,
  "title": "Item Title",
  "description": "Description...",
  "category": "Events",
  "display_order": 1
}
```

---

**PUT /admin/gallery**
Update gallery item.

**DELETE /admin/gallery?id=uuid**
Delete gallery item (removes image from storage).

---

#### Hero Slides

**GET /admin/slides**
List all hero slides.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "image_url": "https://...",
      "title": "Slide Title",
      "subtitle": "Subtitle",
      "description": "Description...",
      "display_order": 1,
      "is_active": true
    }
  ]
}
```

---

**POST /admin/slides**
Create hero slide.

**Request Body:**
```json
{
  "image_url": "https://...",
  "title": "Slide Title",
  "subtitle": "Subtitle",
  "description": "Description...",
  "display_order": 1,
  "is_active": true
}
```

---

**PUT /admin/slides**
Update hero slide.

**DELETE /admin/slides?id=uuid**
Delete hero slide (removes image from storage).

---

#### Leadership

**GET /admin/leadership**
List all leadership profiles.

**Response:**
```json
{
  "data": [
    {
      "id": "uuid",
      "name": "John Doe",
      "position": "Director",
      "title": "Director of Finance",
      "image_url": "https://...",
      "bio": "Biography...",
      "display_order": 1,
      "is_active": true
    }
  ]
}
```

---

**POST /admin/leadership**
Create leadership profile.

**Request Body:**
```json
{
  "name": "John Doe",
  "position": "Director",
  "title": "Director of Finance",
  "image_url": "https://...",
  "bio": "Biography...",
  "display_order": 1,
  "is_active": true
}
```

---

**PUT /admin/leadership**
Update leadership profile.

**DELETE /admin/leadership?id=uuid**
Delete leadership profile (removes image from storage).

---

### File Upload

#### POST /admin/upload
Upload image to storage.

**Request:**
```bash
curl -X POST http://localhost:3000/api/admin/upload \
  -F "file=@image.jpg" \
  --cookie "session=<token>"
```

**Response (200):**
```json
{
  "url": "https://bucket.supabase.co/storage/v1/object/public/website-images/...",
  "path": "website-images/..."
}
```

**Error (413):**
```json
{
  "error": "File too large (max 10MB)"
}
```

---

### Settings

#### GET /admin/settings
Get site settings.

**Response (200):**
```json
{
  "data": {
    "site_name": "GSMA Ghana",
    "site_description": "...",
    "contact_email": "contact@gsma.org.gh",
    "phone": "+233...",
    "address": "Address...",
    "social_media": {
      "facebook": "https://...",
      "twitter": "https://...",
      "linkedin": "https://..."
    }
  }
}
```

---

#### PUT /admin/settings
Update site settings.

**Request Body:**
```json
{
  "site_name": "GSMA Ghana",
  "contact_email": "newemail@gsma.org.gh",
  "phone": "+233..."
}
```

---

## Public Endpoints

#### GET /health
Health check endpoint.

**Response (200):**
```json
{
  "status": "healthy",
  "database": "connected",
  "storage": "operational",
  "timestamp": "2025-01-20T10:00:00Z"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "error": "Error message",
  "code": "ERROR_CODE",
  "statusCode": 400
}
```

### Common Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 413 | Payload Too Large |
| 500 | Internal Server Error |

---

## Rate Limiting

- No rate limits in development
- Production: 100 requests per minute per IP for public endpoints
- Admin endpoints: 50 requests per minute per user

---

## CORS

- Development: All origins allowed
- Production: Only configured domain allowed

---

## Testing

### Using cURL

```bash
# Login
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@gsma.org.gh","password":"password"}' \
  -c cookies.txt

# Get news (with session cookie)
curl http://localhost:3000/api/admin/news \
  -b cookies.txt

# Create news post
curl -X POST http://localhost:3000/api/admin/news \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "title": "Test Post",
    "content": "Content...",
    "excerpt": "Summary...",
    "category": "General",
    "published": true
  }'
```

### Using Postman

1. Import this API collection: [API_Collection.postman_json](./API_Collection.postman_json)
2. Set up environment variables:
   - `base_url`: http://localhost:3000/api
   - `session`: Will be auto-populated after login
3. Run requests in order (login first)

---

## Webhooks (Future)

Coming soon:
- Content published notifications
- Admin activity logs
- Storage cleanup events

---

## Changelog

**v1.0.0** (January 2025)
- Initial API release
- All CRUD operations for content
- Admin user management
- Session-based authentication
- Image storage integration

---

**Last Updated:** January 2025
**API Version:** 1.0.0
