import { Timestamp } from "firebase-admin/firestore";

export interface ClientUser {
  user_id: string;
  qr_img_url: string;
}

export interface WorkerUser {
  user_id: string;
  wallet_address: string;
}

type RequestStatus = "pending" | "taken";

export interface Request {
  id: string;
  status: RequestStatus;
  created_at: Timestamp;
  client_id: string;
}

type TransactionStatus = "checking" | "approved" | "rejected";
type RejectReason = "falsified" | "already_charged" | "ss_error";

export interface Transaction {
  id: string;
  status: TransactionStatus;
  reject_reason?: RejectReason;
  request_id: string;
  worker_id: string;
  client_screenshot_img_url?: string;
  timestamps: TransactionTimestamps;
  change_amount?: number;
  final_amount?: number;
  response_screenshot_img_url?: string;
}

export interface TransactionTimestamps {
  created_at: Timestamp;
  ss_send_at?: Timestamp;
  ss_result_at?: Timestamp;
  finished_at?: Timestamp;
}
