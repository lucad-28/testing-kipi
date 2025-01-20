import { db } from "@/lib/fbadmin";
import {
  RejectReason,
  Transaction,
  TransactionStatus,
  TransactionTimestamps,
} from "./types";
import { Timestamp } from "firebase-admin/firestore";

const createTransaction = async (transaccion: Transaction): Promise<void> => {
  transaccion.timestamps.created_at = Timestamp.now();
  transaccion.status = "checking";
  db.collection("transactions").doc(transaccion.id).set(transaccion);
};

const getTransaction = async (id: string): Promise<Transaction> => {
  const transaccion = await db.collection("transactions").doc(id).get();
  return transaccion.data() as Transaction;
};

const getTransactionsByRequest = async (
  request_id: string
): Promise<Transaction[]> => {
  const transaccion = await db
    .collection("transactions")
    .where("request_id", "==", request_id)
    .get();
  return transaccion.docs.map((doc) => doc.data() as Transaction);
};

const getTransactionsByWorker = async (
  worker_id: string
): Promise<Transaction[]> => {
  const transaccion = await db
    .collection("transactions")
    .where("worker_id", "==", worker_id)
    .get();
  return transaccion.docs.map((doc) => doc.data() as Transaction);
};

const getTransactions = async (): Promise<Transaction[]> => {
  const transaccion = await db.collection("transactions").get();
  return transaccion.docs.map((doc) => doc.data() as Transaction);
};

const updateTransaction = async (
  id: string,
  data: Partial<Transaction>
): Promise<void> => {
  await db.collection("transactions").doc(id).update(data);
};

const deleteTransaction = async (id: string): Promise<void> => {
  await db.collection("transactions").doc(id).delete();
};

const rejectTransaction = async (
  id: string,
  reject_reason: RejectReason
): Promise<void> => {
  let transaction = await getTransaction(id);
  transaction.status = "rejected";
  transaction.reject_reason = reject_reason;
  await updateTransaction(id, transaction);
};

const uploadScreenshot = async (
  id: string,
  screenshot_img_url: string,
  user: "client" | "worker"
): Promise<void> => {
  let transaction = await getTransaction(id);
  if (user === "client") {
    transaction = await getTransaction(id);
    transaction.client_screenshot_img_url = screenshot_img_url;
    transaction.timestamps.ss_send_at = Timestamp.now();
    await updateTransaction(id, transaction);
  } else {
    transaction = await getTransaction(id);
    transaction.response_screenshot_img_url = screenshot_img_url;
    transaction.timestamps.ss_result_at = Timestamp.now();
    await updateTransaction(id, transaction);
  }
};

const changeTransactionStatus = async (
  id: string,
  status: TransactionStatus
): Promise<void> => {
  let transaction = await getTransaction(id);
  transaction.status = status;
  await updateTransaction(id, transaction);
};

const closeTransaction = async (id: string): Promise<void> => {
  let transaction = await getTransaction(id);
  transaction.status = "approved";
  await updateTransaction(id, transaction);
};

export {
  createTransaction,
  getTransaction,
  getTransactionsByRequest,
  getTransactionsByWorker,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  rejectTransaction,
  uploadScreenshot,
  changeTransactionStatus,
  closeTransaction,
};
