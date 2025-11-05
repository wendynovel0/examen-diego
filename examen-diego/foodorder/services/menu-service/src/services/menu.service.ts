import { MenuRepositoryAdapter } from "../adapters/menu.repository.adapter.js";

export class MenuService {
  private repo = new MenuRepositoryAdapter();

  async create(data: any) {
    return this.repo.create(data);
  }

  async list() {
    return this.repo.findAll();
  }
}
