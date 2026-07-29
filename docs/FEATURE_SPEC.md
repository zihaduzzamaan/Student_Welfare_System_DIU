# DIU Student Welfare System — Feature Specification

## Module 1: Student Help Desk

### Purpose
Replace the fragmented Messenger-group based student support with a centralized, trackable ticket system.

### Categories
| Category | Description |
|---|---|
| Academic | Course content, class schedules, faculty queries |
| BLC | Blended Learning Center issues and access |
| Student Portal | Portal login, features, navigation issues |
| Accounts | Fee-related, payment, clearance queries |
| Exam | Exam schedules, hall tickets, results |
| Registration | Course registration, add/drop, section changes |
| Transcript | Transcript application, collection, status |
| Welfare | General welfare, events, miscellaneous |

### Ticket Lifecycle
```
Student Submits Ticket
        │
        ▼
    [OPEN] ─────────────── Rep views in queue
        │
        ▼
  [IN PROGRESS] ─────────── Rep replies / working on it
        │
        ├──▶ [RESOLVED] ──── Issue solved, student notified
        │
        └──▶ [ESCALATED] ─── Beyond rep scope, forwarded to Admin/HoD
```

### Student Features
- Submit ticket with: Title, Description, Category (dropdown)
- View "My Tickets" with status badges and history
- See replies from representatives
- Filter tickets by status

### Representative Features
- View all open/in-progress tickets
- Filter by category, status, date
- Reply to tickets with text responses
- Change ticket status (In Progress → Resolved / Escalated)
- See ticket history and student details

### Admin Features
- Read-only view of all tickets
- View escalated tickets specifically
- Ticket analytics (count by category, resolution time)

---

## Module 2: Academic Information Center

### Purpose
Reduce 50%+ of repetitive questions by providing curated, always-available academic information.

### Sections

#### Freshman Guide
| Guide | Content |
|---|---|
| Student Portal Guide | Step-by-step portal navigation, login, features |
| BLC Guide | How to use BLC, submit assignments, access materials |
| Account Clearance Guide | Fee payment process, clearance requirements |
| Exam Procedures | Exam rules, hall ticket process, exam day guidelines |
| Transcript Collection | How to apply, processing time, collection location |
| Course Registration | Registration period, how to register, common issues |

#### Academic Policies
| Policy | Content |
|---|---|
| Overlap Exam | Rules for overlapping exam schedules, application process |
| Medical Exam | Medical leave exam policy, required documents |
| Semester Drop | How to drop a semester, fee implications, readmission |
| Retake | Retake exam rules, eligibility, fee structure |
| Improvement | Improvement exam policy, GPA impact, eligibility |

#### FAQ
- Top 50 most-asked questions curated from common student queries
- Searchable with keyword matching
- Filterable by category
- Expandable accordion UI
- View count tracking (Phase 2) to surface popular questions

---

## Module 3: Announcement & Notice Center

### Purpose
Provide a single, reliable channel for all departmental communications.

### Announcement Types
| Type | Icon | Color |
|---|---|---|
| Exam Notice | 📝 | `--color-info` |
| Workshop | 🔧 | `--color-primary` |
| Seminar | 🎤 | `--color-primary-light` |
| Competition | 🏆 | `--color-accent` |
| Scholarship | 🎓 | `--color-success` |
| Internship | 💼 | `--color-warning` |

### Student Features
- Browse all announcements in a chronological feed
- Filter by type/category
- Pinned announcements always appear at top
- Search announcements by keyword

### Representative / Admin Features
- Create new announcement with: Title, Content, Category, Optional attachment link
- Pin/unpin announcements
- Edit existing announcements
- Delete announcements

---

## Module 4: Student Counselling System

### Purpose
Formalize the counselling request process with a digital workflow.

### Counselling Types
| Type | Description |
|---|---|
| Admission Counselling | Help for prospective or new students with admission queries |
| Academic Counselling | Study plans, course selection, GPA improvement strategies |
| Research Counselling | Research opportunities, thesis guidance, publication advice |
| Career Counselling | Job preparation, CV review, interview tips, career planning |

### Request Lifecycle
```
Student Submits Request
        │
        ▼
   [PENDING] ─────────── Rep/Admin reviews
        │
        ├──▶ [ACCEPTED] ──── Request acknowledged
        │        │
        │        ▼
        │   [SCHEDULED] ──── Date/time confirmed
        │        │
        │        ▼
        │   [COMPLETED] ──── Session done
        │
        └──▶ [DECLINED] ──── With reason
```

### Student Features
- Submit counselling request with: Type, Description, Preferred Date, Preferred Time
- View status of submitted requests
- See scheduled session details

### Representative / Admin Features
- View all counselling requests
- Accept/Decline requests
- Schedule sessions (date + time)
- Mark sessions as completed
- Filter by type, status

---

## Module 5: Analytics Dashboard (Admin Only)

### Purpose
Provide data-driven insights for departmental decision-making.

### Stat Cards
| Metric | Description |
|---|---|
| Total Tickets | All-time ticket count |
| Unresolved Issues | Currently open + in-progress tickets |
| Counselling Requests | Total requests this month |
| Announcements Posted | Total this month |

### Charts (Phase 2 — with real data)
| Chart | Type | Data |
|---|---|---|
| Tickets by Category | Bar chart | Distribution across 8 categories |
| Monthly Trends | Line chart | Tickets per month (last 6 months) |
| Questions by Category | Pie/Donut chart | FAQ category distribution |
| Resolution Time | Bar chart | Average time to resolve by category |

### Key Insights
- Most asked questions / problems
- Number of unresolved issues
- Busiest support periods
- Counselling demand by type
