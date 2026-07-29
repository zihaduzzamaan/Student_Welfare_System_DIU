# DIU Student Welfare System — Database Schema (Phase 2)

> **Note:** This schema will be implemented in Phase 2 when Supabase is integrated. During Phase 1, all data is served from mock data files in `src/data/`.

---

## Entity Relationship Diagram

```
┌──────────────┐     ┌──────────────┐     ┌──────────────────┐
│   profiles   │     │   tickets    │     │  ticket_replies  │
│──────────────│     │──────────────│     │──────────────────│
│ id (PK, FK)  │◄────│ student_id   │     │ id (PK)          │
│ full_name    │◄────│ assigned_to  │     │ ticket_id (FK)───│──► tickets.id
│ student_id   │     │ title        │     │ author_id (FK)───│──► profiles.id
│ department   │     │ description  │     │ content          │
│ role         │     │ category     │     │ created_at       │
│ avatar_url   │     │ status       │     └──────────────────┘
│ created_at   │     │ created_at   │
└──────┬───────┘     │ updated_at   │
       │             └──────────────┘
       │
       │             ┌──────────────────────┐
       │             │  announcements       │
       │◄────────────│ author_id (FK)       │
       │             │ id (PK)              │
       │             │ title                │
       │             │ content              │
       │             │ category             │
       │             │ is_pinned            │
       │             │ created_at           │
       │             └──────────────────────┘
       │
       │             ┌──────────────────────┐
       │◄────────────│ counselling_requests │
       │◄────────────│ student_id (FK)      │
       │             │ assigned_to (FK)     │
       │             │ id (PK)              │
       │             │ type                 │
       │             │ description          │
       │             │ preferred_date       │
       │             │ preferred_time       │
       │             │ status               │
       │             │ created_at           │
       │             └──────────────────────┘
       │
       │             ┌──────────────┐
       │             │     faq      │
       │             │──────────────│
       │             │ id (PK)      │
       │             │ question     │
       │             │ answer       │
       │             │ category     │
       │             │ view_count   │
       │             │ created_at   │
       │             └──────────────┘
```

---

## Table Definitions

### `profiles`
Extends Supabase Auth `auth.users`. Stores additional user metadata.

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `UUID` | PK, FK → auth.users(id) | — | Matches Supabase Auth user ID |
| `full_name` | `TEXT` | NOT NULL | — | User's full name |
| `student_id` | `TEXT` | NULLABLE, UNIQUE | — | DIU Student ID (e.g., 222-15-7100) |
| `department` | `TEXT` | NOT NULL | `'SWE'` | Department name |
| `role` | `TEXT` | CHECK IN ('student', 'representative', 'admin') | `'student'` | User role |
| `avatar_url` | `TEXT` | NULLABLE | — | Profile picture URL |
| `created_at` | `TIMESTAMPTZ` | NOT NULL | `NOW()` | Account creation timestamp |

### `tickets`
Help desk support tickets submitted by students.

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `UUID` | PK | `gen_random_uuid()` | Unique ticket ID |
| `student_id` | `UUID` | FK → profiles(id), NOT NULL | — | Submitting student |
| `title` | `TEXT` | NOT NULL | — | Ticket title |
| `description` | `TEXT` | NOT NULL | — | Detailed description |
| `category` | `TEXT` | NOT NULL | — | One of 8 defined categories |
| `status` | `TEXT` | CHECK IN ('open', 'in_progress', 'resolved', 'escalated') | `'open'` | Current status |
| `assigned_to` | `UUID` | FK → profiles(id), NULLABLE | — | Assigned representative |
| `created_at` | `TIMESTAMPTZ` | NOT NULL | `NOW()` | Submission timestamp |
| `updated_at` | `TIMESTAMPTZ` | NOT NULL | `NOW()` | Last update timestamp |

### `ticket_replies`
Threaded replies on tickets.

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `UUID` | PK | `gen_random_uuid()` | Reply ID |
| `ticket_id` | `UUID` | FK → tickets(id) ON DELETE CASCADE | — | Parent ticket |
| `author_id` | `UUID` | FK → profiles(id), NOT NULL | — | Reply author |
| `content` | `TEXT` | NOT NULL | — | Reply text |
| `created_at` | `TIMESTAMPTZ` | NOT NULL | `NOW()` | Reply timestamp |

### `announcements`
Departmental notices and events.

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `UUID` | PK | `gen_random_uuid()` | Announcement ID |
| `author_id` | `UUID` | FK → profiles(id), NOT NULL | — | Posted by |
| `title` | `TEXT` | NOT NULL | — | Announcement title |
| `content` | `TEXT` | NOT NULL | — | Full content |
| `category` | `TEXT` | NOT NULL | — | Type (exam, workshop, etc.) |
| `is_pinned` | `BOOLEAN` | NOT NULL | `FALSE` | Pin to top of feed |
| `created_at` | `TIMESTAMPTZ` | NOT NULL | `NOW()` | Post timestamp |

### `counselling_requests`
Student counselling session requests.

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `UUID` | PK | `gen_random_uuid()` | Request ID |
| `student_id` | `UUID` | FK → profiles(id), NOT NULL | — | Requesting student |
| `type` | `TEXT` | CHECK IN ('admission', 'academic', 'research', 'career'), NOT NULL | — | Counselling type |
| `description` | `TEXT` | NOT NULL | — | Student's description |
| `preferred_date` | `DATE` | NULLABLE | — | Preferred session date |
| `preferred_time` | `TIME` | NULLABLE | — | Preferred session time |
| `status` | `TEXT` | CHECK IN ('pending', 'accepted', 'scheduled', 'completed', 'declined') | `'pending'` | Request status |
| `assigned_to` | `UUID` | FK → profiles(id), NULLABLE | — | Assigned counsellor |
| `created_at` | `TIMESTAMPTZ` | NOT NULL | `NOW()` | Request timestamp |

### `faq`
Frequently asked questions with view tracking.

| Column | Type | Constraints | Default | Description |
|---|---|---|---|---|
| `id` | `UUID` | PK | `gen_random_uuid()` | FAQ ID |
| `question` | `TEXT` | NOT NULL | — | Question text |
| `answer` | `TEXT` | NOT NULL | — | Answer text |
| `category` | `TEXT` | NOT NULL | — | Category for filtering |
| `view_count` | `INTEGER` | NOT NULL | `0` | Number of views |
| `created_at` | `TIMESTAMPTZ` | NOT NULL | `NOW()` | Creation timestamp |

---

## Row-Level Security (RLS) Summary

| Table | Policy | Rule |
|---|---|---|
| `profiles` | Read own profile | `auth.uid() = id` |
| `profiles` | Admin reads all | `role = 'admin'` |
| `tickets` | Student reads own | `auth.uid() = student_id` |
| `tickets` | Rep/Admin reads all | `role IN ('representative', 'admin')` |
| `tickets` | Student inserts own | `auth.uid() = student_id` |
| `ticket_replies` | Read if ticket accessible | Inherited from ticket access |
| `announcements` | All authenticated read | `auth.role() = 'authenticated'` |
| `announcements` | Rep/Admin insert/update | `role IN ('representative', 'admin')` |
| `counselling_requests` | Student reads own | `auth.uid() = student_id` |
| `counselling_requests` | Rep/Admin reads all | `role IN ('representative', 'admin')` |
| `faq` | All authenticated read | `auth.role() = 'authenticated'` |
| `faq` | Admin manages | `role = 'admin'` |

---

## Indexes (Performance)

```sql
CREATE INDEX idx_tickets_student ON tickets(student_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_category ON tickets(category);
CREATE INDEX idx_tickets_created ON tickets(created_at DESC);
CREATE INDEX idx_announcements_category ON announcements(category);
CREATE INDEX idx_announcements_pinned ON announcements(is_pinned DESC, created_at DESC);
CREATE INDEX idx_counselling_student ON counselling_requests(student_id);
CREATE INDEX idx_counselling_status ON counselling_requests(status);
CREATE INDEX idx_faq_category ON faq(category);
CREATE INDEX idx_faq_views ON faq(view_count DESC);
```
