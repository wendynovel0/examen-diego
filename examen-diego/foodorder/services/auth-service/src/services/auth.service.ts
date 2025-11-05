import jwt from "jsonwebtoken";

const users: any[] = [];

export class AuthService {
  async register(data: any) {
    const newUser = { id: users.length + 1, ...data };
    users.push(newUser);
    return newUser;
  }

  async login({ username, password }: any) {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) throw new Error("Invalid credentials");
    return jwt.sign({ id: user.id, role: user.role }, "secret", { expiresIn: "1h" });
  }
}
