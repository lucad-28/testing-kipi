import { db } from "@/lib/fbadmin";
import { ClientUser } from "./types";

const createClient = async (client: ClientUser): Promise<void> => {
  db.collection("clients").doc(client.user_id).set(client);
};

const getClient = async (user_id: string): Promise<ClientUser> => {
  return (
    await db.collection("clients").doc(user_id).get()
  ).data() as ClientUser;
};

const getClients = async (): Promise<ClientUser[]> => {
  const clients = await db.collection("clients").get();
  return clients.docs.map((doc) => doc.data() as ClientUser);
};

const updateClient = async (
  user_id: string,
  data: Partial<ClientUser>
): Promise<void> => {
  await db.collection("clients").doc(user_id).update(data);
};

const deleteClient = async (user_id: string): Promise<void> => {
  await db.collection("clients").doc(user_id).delete();
};

const updateQR = async (user_id: string, qr_img_url: string): Promise<void> => {
  await db.collection("clients").doc(user_id).update({ qr_img_url });
};

export {
  createClient,
  getClient,
  getClients,
  updateClient,
  deleteClient,
  updateQR,
};
