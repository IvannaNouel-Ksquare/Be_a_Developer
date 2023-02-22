import * as admin from "firebase-admin"; // npm install firebase-admin --save

import { Role } from "../models/userModel";

const mapToUser = (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || { role: "" }) as { role?: string };
  const role = customClaims.role ? customClaims.role : "";
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    role,
  };
};

export const createUser = async (
  displayName: string,
  email: string,
  password: string,
  role: Role
) => {
  const { uid } = await admin.auth().createUser({
    displayName,
    email,
    password,
  });

  await admin.auth().setCustomUserClaims(uid, { role });

  return uid;
};

export const readUser = async (uid: string) => {
  const user = await admin.auth().getUser(uid);

  return mapToUser(user);
};

export const getAllUsers = async () => {
  const listOfUsers = await admin.auth().listUsers(); 
  const users = listOfUsers.users.map(mapToUser);

  return users;
};

export const updateUser = async (
  uid: string,
  displayName: string,
  email: string,
  password: string
) => {
  const user = await admin.auth().updateUser(uid, {
    displayName,
    email,
    password,
  });

  return mapToUser(user);
};
