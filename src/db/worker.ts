import { db } from "@/lib/fbadmin";
import { WorkerUser } from "./types";

const createWorker = async (worker: WorkerUser): Promise<void> => {
  db.collection("workers").doc(worker.user_id).set(worker);
};

const getWorker = async (user_id: string): Promise<WorkerUser> => {
  return (
    await db.collection("workers").doc(user_id).get()
  ).data() as WorkerUser;
};

const getWorkers = async (): Promise<WorkerUser[]> => {
  const workers = await db.collection("workers").get();
  return workers.docs.map((doc) => doc.data() as WorkerUser);
};

const updateWorker = async (
  user_id: string,
  data: Partial<WorkerUser>
): Promise<void> => {
  await db.collection("workers").doc(user_id).update(data);
};

const deleteWorker = async (user_id: string): Promise<void> => {
  await db.collection("workers").doc(user_id).delete();
};

const changeWallet = async (
  user_id: string,
  wallet_address: string
): Promise<void> => {
  await db.collection("workers").doc(user_id).update({ wallet_address });
};

export {
  createWorker,
  getWorker,
  getWorkers,
  updateWorker,
  deleteWorker,
  changeWallet,
};
