import * as admin from "firebase-admin";

export type Role =
  | 'user'
  | 'admin'
  | 'superadmin'

const mapToUser = (user: admin.auth.UserRecord) => {
  const customClaims = (user.customClaims || { role: "" }) as { role?: string };
  const role = customClaims.role ? customClaims.role : "";
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    role,
    isDisabled: user.disabled,
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
  password: string,
) => {
  const user = await admin.auth().updateUser(uid, {
    displayName,
    email,
    password,
  });

  return mapToUser(user);
};

export const disableUser = async (uid: string) => {
  const user = await admin.auth().updateUser(uid, {
    disabled: true,
  });

  return `User ${uid} was succesfully disabled`;
};

export const enableUser = async (uid: string) => {
  const user = await admin.auth().updateUser(uid, {
    disabled: false,
  });

  return `User ${uid} was succesfully enabled`;
};
