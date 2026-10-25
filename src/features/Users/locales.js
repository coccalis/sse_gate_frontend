// Merge into your i18n.js. The key must be exactly `usersPage`:
//   import { usersPageEn, usersPageEl } from "./features/Users/locales";
//   en: { translation: { ...existing, usersPage: usersPageEn } }
//   el: { translation: { ...existing, usersPage: usersPageEl } }
//
// ALSO add these three flat keys (sidebar section and links) next to
// `section`, `check`, `logs`...:
//   en: adminSection: "Administration", adminUsers: "Users", adminCreateUser: "Create User",
//   el: adminSection: "Διαχειριστικό",  adminUsers: "Χρήστες", adminCreateUser: "Δημιουργία Χρήστη",

export const usersPageEn = {
  title: "Users",
  subtitle: "Review who has access to the gate management system and manage dashboard access rights.",
  summary: {
    total_one: "{{count, number}} dashboard user",
    total_other: "{{count, number}} dashboard users",
    admins_one: "{{count, number}} Administrator",
    admins_other: "{{count, number}} Administrators",
    operators_one: "{{count, number}} Operator",
    operators_other: "{{count, number}} Operators",
    add: "Add user",
  },
  filters: {
    searchPlaceholder: "Search by name or email",
    searchLabel: "Search users",
    role: "Role",
    status: "Status",
    allRoles: "All roles",
    allStatuses: "All statuses",
    clear: "Clear filters",
  },
  roles: { admin: "Administrator", operator: "Operator" },
  statuses: { active: "Active", inactive: "Inactive" },
  columns: {
    name: "Full name",
    email: "Email",
    role: "Role",
    lastLogin: "Last sign-in",
    status: "Status",
    actions: "Actions",
  },
  lastLogin: {
    never: "Never",
    today: "Today, {{time}}",
    other: "{{date}}, {{time}}",
  },
  you: "You",
  actions: {
    edit: "Edit {{name}}",
    delete: "Delete {{name}}",
    cannotDeleteSelf: "You can't delete your own account",
  },
  pagination: {
    showing_one: "Showing {{from}}–{{to}} of {{count, number}} user",
    showing_other: "Showing {{from}}–{{to}} of {{count, number}} users",
  },
  states: {
    errorTitle: "Could not load the users",
    errorText: "Check the connection and try again.",
    retry: "Try again",
    emptyTitle: "No users found",
    emptyText: "Try changing the search or the filters.",
    emptyDbTitle: "No users yet",
    emptyDbText: "Add the first user to get started.",
  },
  note: "Administrators manage the dashboard users. Operators can scan cards, manage personnel and view the logs.",
  delete: {
    title: "Delete user?",
    text: "{{name}} ({{email}}) will be deleted and will no longer be able to sign in to the dashboard. This cannot be undone.",
    confirm: "Delete",
    cancel: "Cancel",
    errors: {
      cannot_delete_self: "You can't delete your own account.",
      last_admin: "The last administrator can't be deleted.",
      generic: "Deleting failed. Please try again.",
    },
  },
  form: {
    createTitle: "Create user",
    createSubtitle: "Give a new user access to the gate dashboard.",
    editTitle: "Edit user",
    editSubtitle: "Update the details and access of {{name}}.",
    account: {
      title: "Account details",
      description: "The details the user signs in to the dashboard with.",
    },
    access: {
      title: "Role and access",
      description: "Choose what the user can do in the dashboard.",
    },
    fields: {
      name: { label: "Full name", placeholder: "Full name" },
      email: { label: "Email", placeholder: "name@sse.com" },
      password: {
        label: "Temporary password",
        editLabel: "New password (optional)",
        placeholder: "At least 8 characters",
        hintCreate: "The user signs in with it the first time.",
        hintEdit: "Leave it empty to keep the current password.",
        generate: "Generate",
        copy: "Copy",
        copied: "Copied",
      },
      role: "Role",
      status: {
        label: "Active account",
        description: "Inactive users can't sign in.",
      },
    },
    roles: {
      admin: {
        title: "Administrator",
        description: "Manages the dashboard users and has full access.",
      },
      operator: {
        title: "Operator",
        description: "Scans cards, manages personnel and views the logs.",
      },
    },
    selfNote: "You can't change your own role or status.",
    actions: { cancel: "Cancel", create: "Create user", save: "Save changes" },
    errors: {
      required: "This field is required.",
      invalidEmail: "Enter a valid email address.",
      emailExists: "This email is already used by another user.",
      passwordShort: "The password must have at least 8 characters.",
      lastAdmin: "At least one active administrator must remain.",
      submitFailed: "Saving failed. Please try again.",
    },
    edit: {
      notFoundTitle: "User not found",
      notFoundText: "This account may have been deleted.",
      errorTitle: "Could not load this user",
      errorText: "Check the connection and try again.",
      retry: "Try again",
      back: "Back to users",
    },
  },
};

export const usersPageEl = {
  title: "Χρήστες",
  subtitle: "Ελέγξτε ποιοι έχουν πρόσβαση στο σύστημα διαχείρισης πύλης και διαχειριστείτε τα δικαιώματα πρόσβασης στον πίνακα ελέγχου.",
  summary: {
    total_one: "{{count, number}} χρήστης του πίνακα ελέγχου",
    total_other: "{{count, number}} χρήστες του πίνακα ελέγχου",
    admins_one: "{{count, number}} Διαχειριστής",
    admins_other: "{{count, number}} Διαχειριστές",
    operators_one: "{{count, number}} Χειριστής",
    operators_other: "{{count, number}} Χειριστές",
    add: "Προσθήκη Χρήστη",
  },
  filters: {
    searchPlaceholder: "Αναζήτηση με όνομα ή email",
    searchLabel: "Αναζήτηση χρηστών",
    role: "Ρόλος",
    status: "Κατάσταση",
    allRoles: "Όλοι οι ρόλοι",
    allStatuses: "Όλες οι καταστάσεις",
    clear: "Εκκαθάριση φίλτρων",
  },
  roles: { admin: "Διαχειριστής", operator: "Χειριστής" },
  statuses: { active: "Ενεργός", inactive: "Ανενεργός" },
  columns: {
    name: "Ονοματεπώνυμο",
    email: "Email",
    role: "Ρόλος",
    lastLogin: "Τελευταία σύνδεση",
    status: "Κατάσταση",
    actions: "Ενέργειες",
  },
  lastLogin: {
    never: "Ποτέ",
    today: "Σήμερα, {{time}}",
    other: "{{date}}, {{time}}",
  },
  you: "Εσείς",
  actions: {
    edit: "Επεξεργασία: {{name}}",
    delete: "Διαγραφή: {{name}}",
    cannotDeleteSelf: "Δεν μπορείτε να διαγράψετε τον δικό σας λογαριασμό",
  },
  pagination: {
    showing_one: "Εμφάνιση {{from}}–{{to}} από {{count, number}} χρήστη",
    showing_other: "Εμφάνιση {{from}}–{{to}} από {{count, number}} χρήστες",
  },
  states: {
    errorTitle: "Δεν ήταν δυνατή η φόρτωση των χρηστών",
    errorText: "Ελέγξτε τη σύνδεση και δοκιμάστε ξανά.",
    retry: "Δοκιμή ξανά",
    emptyTitle: "Δεν βρέθηκαν χρήστες",
    emptyText: "Δοκιμάστε να αλλάξετε την αναζήτηση ή τα φίλτρα.",
    emptyDbTitle: "Δεν υπάρχουν ακόμη χρήστες",
    emptyDbText: "Προσθέστε τον πρώτο χρήστη για να ξεκινήσετε.",
  },
  note: "Οι διαχειριστές διαχειρίζονται τους χρήστες του πίνακα ελέγχου. Οι χειριστές μπορούν να σαρώνουν κάρτες, να διαχειρίζονται το προσωπικό και να προβάλλουν το ιστορικό καταγραφών.",
  delete: {
    title: "Διαγραφή χρήστη;",
    text: "Ο χρήστης {{name}} ({{email}}) θα διαγραφεί και δεν θα μπορεί πλέον να συνδεθεί στον πίνακα ελέγχου. Η ενέργεια δεν μπορεί να αναιρεθεί.",
    confirm: "Διαγραφή",
    cancel: "Ακύρωση",
    errors: {
      cannot_delete_self: "Δεν μπορείτε να διαγράψετε τον δικό σας λογαριασμό.",
      last_admin: "Δεν μπορεί να διαγραφεί ο τελευταίος διαχειριστής.",
      generic: "Η διαγραφή απέτυχε. Δοκιμάστε ξανά.",
    },
  },
  form: {
    createTitle: "Δημιουργία χρήστη",
    createSubtitle: "Δώστε σε έναν νέο χρήστη πρόσβαση στον πίνακα ελέγχου της πύλης.",
    editTitle: "Επεξεργασία χρήστη",
    editSubtitle: "Ενημέρωση στοιχείων και δικαιωμάτων: {{name}}.",
    account: {
      title: "Στοιχεία λογαριασμού",
      description: "Τα στοιχεία με τα οποία ο χρήστης συνδέεται στον πίνακα ελέγχου.",
    },
    access: {
      title: "Ρόλος και πρόσβαση",
      description: "Επιλέξτε τι μπορεί να κάνει ο χρήστης στον πίνακα ελέγχου.",
    },
    fields: {
      name: { label: "Ονοματεπώνυμο", placeholder: "Ονοματεπώνυμο" },
      email: { label: "Email", placeholder: "name@sse.com" },
      password: {
        label: "Προσωρινός κωδικός",
        editLabel: "Νέος κωδικός (προαιρετικό)",
        placeholder: "Τουλάχιστον 8 χαρακτήρες",
        hintCreate: "Ο χρήστης θα τον χρησιμοποιήσει για την πρώτη σύνδεση.",
        hintEdit: "Αφήστε το κενό για να διατηρηθεί ο τρέχων κωδικός.",
        generate: "Δημιουργία",
        copy: "Αντιγραφή",
        copied: "Αντιγράφηκε",
      },
      role: "Ρόλος",
      status: {
        label: "Ενεργός λογαριασμός",
        description: "Οι ανενεργοί χρήστες δεν μπορούν να συνδεθούν.",
      },
    },
    roles: {
      admin: {
        title: "Διαχειριστής",
        description: "Διαχειρίζεται τους χρήστες του πίνακα ελέγχου και έχει πλήρη πρόσβαση.",
      },
      operator: {
        title: "Χειριστής",
        description: "Σαρώνει κάρτες, διαχειρίζεται το προσωπικό και προβάλλει το ιστορικό καταγραφών.",
      },
    },
    selfNote: "Δεν μπορείτε να αλλάξετε τον δικό σας ρόλο ή κατάσταση.",
    actions: { cancel: "Άκυρο", create: "Δημιουργία χρήστη", save: "Αποθήκευση αλλαγών" },
    errors: {
      required: "Το πεδίο είναι υποχρεωτικό.",
      invalidEmail: "Εισαγάγετε έγκυρη διεύθυνση email.",
      emailExists: "Το email χρησιμοποιείται ήδη από άλλον χρήστη.",
      passwordShort: "Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες.",
      lastAdmin: "Πρέπει να παραμείνει τουλάχιστον ένας ενεργός διαχειριστής.",
      submitFailed: "Η αποθήκευση απέτυχε. Δοκιμάστε ξανά.",
    },
    edit: {
      notFoundTitle: "Δεν βρέθηκε ο χρήστης",
      notFoundText: "Ο λογαριασμός ίσως έχει διαγραφεί.",
      errorTitle: "Δεν ήταν δυνατή η φόρτωση των στοιχείων",
      errorText: "Ελέγξτε τη σύνδεση και δοκιμάστε ξανά.",
      retry: "Δοκιμή ξανά",
      back: "Επιστροφή στους χρήστες",
    },
  },
};
