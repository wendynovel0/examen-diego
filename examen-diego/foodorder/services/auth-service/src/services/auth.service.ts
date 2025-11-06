import { User } from "../models/User";

export class AuthService {
  async login({ email, password }: { email: string; password: string }) {
    const user = await User.findOne({ where: { email, password } });
    if (!user) throw new Error("Credenciales inválidas");
    return user; // retornamos el usuario directamente
  }

  async register(data: any) {
    const newUser = await User.create(data);
    return newUser;
  }
}
