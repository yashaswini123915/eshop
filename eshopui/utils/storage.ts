// utils/storage.ts

export const saveUser = (name: string, email: string, password: string) => {
  document.cookie = `user=${JSON.stringify({ name, email, password })}; path=/`;
};

export const getUser = () => {
  const cookies = document.cookie.split("; ");
  const userCookie = cookies.find((c) => c.startsWith("user="));
  return userCookie ? JSON.parse(userCookie.split("=")[1]) : null;
};

export const removeUser = () => {
  document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
};
