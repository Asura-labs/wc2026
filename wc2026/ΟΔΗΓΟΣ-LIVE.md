# 🏆 Οδηγός: Πώς να κάνεις το WC 2026 app LIVE

> Αυτός ο οδηγός σε πάει βήμα-βήμα. **Δεν χρειάζεσαι καμία τεχνική γνώση.**
> Συνολικός χρόνος: **~30-40 λεπτά**. Κόστος: **€0** (όλα δωρεάν).

---

## 📋 Τι θα κάνουμε (η μεγάλη εικόνα)

Θα φτιάξουμε 2 πράγματα:

1. **Supabase** = η "κοινή βάση δεδομένων" στο cloud. Εκεί αποθηκεύονται οι χρήστες, οι ψηφίσεις και τα αποτελέσματα ώστε να τα βλέπουν **όλοι μαζί** live.
2. **Vercel** = ο "server" που φιλοξενεί το app και σου δίνει ένα link (π.χ. `wc2026.vercel.app`) που μοιράζεσαι στην παρέα.

```
Κινητά παρέας  →  Vercel (το app)  →  Supabase (κοινή βάση)
                                            ↑
                                    όλοι βλέπουν τα ίδια
```

---

# ΜΕΡΟΣ 1: Φτιάχνουμε τη βάση (Supabase)

## Βήμα 1.1 — Δημιουργία λογαριασμού

1. Πήγαινε στο **https://supabase.com**
2. Πάτα **"Start your project"** (πράσινο κουμπί πάνω δεξιά)
3. Κάνε **Sign in with GitHub** (αν δεν έχεις GitHub, φτιάξε δωρεάν στο github.com — 2 λεπτά)

## Βήμα 1.2 — Νέο project

1. Πάτα **"New project"**
2. Συμπλήρωσε:
   - **Name:** `wc2026` (ό,τι θες)
   - **Database Password:** πάτα **"Generate a password"** και **ΑΝΤΙΓΡΑΨΕ ΤΟΝ ΚΑΠΟΥ** (σε ένα σημειωματάριο). Θα τον χρειαστείς.
   - **Region:** διάλεξε **"Central EU (Frankfurt)"** (πιο κοντά στην Ελλάδα)
3. Πάτα **"Create new project"**
4. Περίμενε ~2 λεπτά να ετοιμαστεί (θα δεις μια μπάρα φόρτωσης)

## Βήμα 1.3 — Φτιάχνουμε τους πίνακες (copy-paste)

1. Στο αριστερό μενού, πάτα το εικονίδιο **"SQL Editor"** (μοιάζει με `</>`)
2. Πάτα **"+ New query"**
3. **Αντίγραψε ΟΛΟΚΛΗΡΟ** το παρακάτω κείμενο και κόλλησέ το στο μεγάλο άσπρο πλαίσιο:

```sql
-- Πίνακας χρηστών
create table users (
  id text primary key,
  username text unique not null,
  password text not null,
  is_admin boolean default false,
  created_at timestamptz default now()
);

-- Πίνακας ψηφίσεων
create table predictions (
  id bigint generated always as identity primary key,
  user_id text references users(id) on delete cascade,
  match_id text not null,
  match_date text not null,
  pick text not null,
  created_at timestamptz default now(),
  unique(user_id, match_id)
);

-- Πίνακας αποτελεσμάτων & ομάδων knockout (κοινά για όλους)
create table game_data (
  key text primary key,
  value jsonb,
  updated_at timestamptz default now()
);

-- Βάζουμε τον admin
insert into users (id, username, password, is_admin)
values ('admin', 'admin', 'admin123', true);

-- Επιτρέπουμε πρόσβαση (ανοιχτή βάση — OK για παρέα)
alter table users enable row level security;
alter table predictions enable row level security;
alter table game_data enable row level security;

create policy "open_users" on users for all using (true) with check (true);
create policy "open_predictions" on predictions for all using (true) with check (true);
create policy "open_game_data" on game_data for all using (true) with check (true);
```

4. Πάτα **"Run"** (κάτω δεξιά, ή Ctrl+Enter)
5. Αν δεις **"Success. No rows returned"** → ✅ τέλεια, πέτυχε!

## Βήμα 1.4 — Παίρνουμε τα κλειδιά (ΣΗΜΑΝΤΙΚΟ)

Αυτά τα 2 κλειδιά συνδέουν το app με τη βάση.

1. Στο αριστερό μενού, πάτα το **γρανάζι ⚙️ "Project Settings"** (κάτω-κάτω)
2. Πάτα **"API Keys"** η **"Data API"**
3. Θα δεις:
   - **Project URL** → κάτι σαν `https://abcdxyz.supabase.co` → **ΑΝΤΙΓΡΑΨΕ ΤΟ**
   - **anon public** key → ένα μεγάλο κείμενο → **ΑΝΤΙΓΡΑΨΕ ΤΟ**
4. Κράτησέ τα και τα δύο σε ένα σημειωματάριο. Θα τα βάλουμε στο app στο Μέρος 2.

> ⚠️ Το **anon public** key είναι ΟΚ να μπει στο app. ΜΗΝ χρησιμοποιήσεις το "service_role" key — αυτό είναι μυστικό.

---

# ΜΕΡΟΣ 2: Ανεβάζουμε το app (Vercel)

## Βήμα 2.1 — Βάζουμε τα κλειδιά στον κώδικα

1. Άνοιξε το αρχείο **`worldcup2026-supabase.jsx`** (σου το έχω ετοιμάσει)
2. Στην **κορυφή** του αρχείου θα δεις 2 γραμμές:

```javascript
const SUPABASE_URL = "ΒΑΛΕ_ΕΔΩ_ΤΟ_URL";
const SUPABASE_KEY = "ΒΑΛΕ_ΕΔΩ_ΤΟ_ANON_KEY";
```

3. Αντικατέστησε:
   - `ΒΑΛΕ_ΕΔΩ_ΤΟ_URL` με το **Project URL** σου (μέσα στα εισαγωγικά)
   - `ΒΑΛΕ_ΕΔΩ_ΤΟ_ANON_KEY` με το **anon public** key σου

Παράδειγμα (με ψεύτικα κλειδιά):
```javascript
const SUPABASE_URL = "https://abcdxyz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiI...πολύ-μεγάλο-κείμενο...";
```

4. Αποθήκευσε το αρχείο.

## Βήμα 2.2 — Φτιάχνουμε project στο GitHub

Το Vercel "διαβάζει" τον κώδικα από το GitHub.

**Εύκολος τρόπος (μέσω browser, χωρίς εντολές):**

1. Πήγαινε στο **https://github.com** και κάνε login
2. Πάτα το **"+"** πάνω δεξιά → **"New repository"**
3. Name: `wc2026` → άσε τα υπόλοιπα → πάτα **"Create repository"**
4. Στην επόμενη σελίδα πάτα **"uploading an existing file"** (μπλε link στη μέση)
5. Σύρε μέσα **ολόκληρο το project** που σου έχω ετοιμάσει (φάκελος με όλα τα αρχεία)
6. Πάτα **"Commit changes"**

> 💡 Θα σου ετοιμάσω ολόκληρο το project φάκελο (όχι μόνο το .jsx) ώστε να το ανεβάσεις έτοιμο. Πες μου να το φτιάξω.

## Βήμα 2.3 — Deploy στο Vercel

1. Πήγαινε στο **https://vercel.com**
2. **Sign up / Login with GitHub**
3. Πάτα **"Add New..." → "Project"**
4. Θα δεις τη λίστα με τα GitHub repos σου → δίπλα στο **`wc2026`** πάτα **"Import"**
5. Άσε όλες τις ρυθμίσεις ως έχουν → πάτα **"Deploy"**
6. Περίμενε ~1 λεπτό
7. 🎉 Θα δεις **"Congratulations!"** και ένα link τύπου `wc2026-xxx.vercel.app`

## Βήμα 2.4 — Μοιράσου το link!

- Αντίγραψε το link (π.χ. `https://wc2026-xxx.vercel.app`)
- Στείλ' το στην παρέα (WhatsApp, Viber, ό,τι θες)
- Ο καθένας ανοίγει το link από το κινητό, κάνει **Εγγραφή**, και παίζει!
- Όλοι βλέπουν **κοινό leaderboard** σε πραγματικό χρόνο ✨

---

# 📱 BONUS: Να μοιάζει με εφαρμογή στο κινητό

Όταν κάποιος ανοίξει το link στο κινητό:
- **iPhone (Safari):** πάτα το κουμπί "Μοιρασμού" → **"Προσθήκη στην Αρχική οθόνη"**
- **Android (Chrome):** μενού (3 τελείες) → **"Προσθήκη στην αρχική οθόνη"**

Έτσι θα έχουν ένα εικονίδιο σαν κανονικό app!

---

# ❓ Συχνές απορίες

**Θα πληρώσω κάτι;**
Όχι. Το δωρεάν πλάνο Supabase + Vercel φτάνει άνετα για 50-60 άτομα.

**Πώς βάζω τα αποτελέσματα κάθε μέρα;**
Μπαίνεις ως `admin` (admin/admin123) → καρτέλα **Admin** → βάζεις 1/Χ/2 ή πατάς "Ανάκτηση" από το API.

**⚠️ Άλλαξε τον κωδικό του admin!**
Στο Supabase → "Table Editor" → πίνακας `users` → άλλαξε το `password` του admin σε κάτι δικό σου.

**Κάποιος ξέχασε τον κωδικό του;**
Μπες στο Supabase → "Table Editor" → `users` → βρες τον και άλλαξέ τον.

---

> Όταν είσαι έτοιμος, πες μου να σου φτιάξω **τον κώδικα με Supabase + ολόκληρο το project φάκελο** για ανέβασμα!
