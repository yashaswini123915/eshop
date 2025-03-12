// utils/storage.ts

export const saveUser = (email: string, password: string) => {
  document.cookie = `user=${JSON.stringify({ email, password })}; path=/`;
};

export const getUser = () => {
  const cookies = document.cookie.split("; ");
  const userCookie = cookies.find((c) => c.startsWith("user="));

  return userCookie ? JSON.parse(userCookie.split("=")[1]) : null;
};
