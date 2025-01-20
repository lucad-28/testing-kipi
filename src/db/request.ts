import { db } from "@/lib/fbadmin";
import { Request, RequestStatus } from "./types";

const createRequest = async (request: Request): Promise<void> => {
  db.collection("requests").doc(request.id).set(request);
};

const getRequest = async (id: string): Promise<Request> => {
  return (await db.collection("requests").doc(id).get()).data() as Request;
};

const getRequests = async (): Promise<Request[]> => {
  const requests = await db.collection("requests").get();
  return requests.docs.map((doc) => doc.data() as Request);
};

const getRequestsByStatus = async (
  status: RequestStatus
): Promise<Request[]> => {
  const requests = await db
    .collection("requests")
    .where("status", "==", status)
    .get();
  return requests.docs.map((doc) => doc.data() as Request);
};

const getRequestsByClient = async (client_id: string): Promise<Request[]> => {
  const requests = await db
    .collection("requests")
    .where("client_id", "==", client_id)
    .get();
  return requests.docs.map((doc) => doc.data() as Request);
};

const updateRequest = async (
  id: string,
  data: Partial<Request>
): Promise<void> => {
  await db.collection("requests").doc(id).update(data);
};

const deleteRequest = async (id: string): Promise<void> => {
  await db.collection("requests").doc(id).delete();
};

export {
  createRequest,
  getRequest,
  getRequests,
  getRequestsByStatus,
  getRequestsByClient,
  updateRequest,
  deleteRequest,
};
