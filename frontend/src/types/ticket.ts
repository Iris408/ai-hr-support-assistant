// =========================================
// EN: Ticket data returned from the backend
// JP: バックエンドから返されるチケットデータ
// =========================================

export type Ticket = {
  id: number;
  title: string;
  message: string;
  category: string;
  priority: string;
  status: string;
  suggested_response: string | null;
  classification_reasoning: string | null;
  created_at: string;
  updated_at: string;
};

// =========================================
// EN: Available demo roles for the MVP
// JP: MVP用のデモロール
// =========================================

export type UserRole = "employee" | "hr_team" | "admin";