export class InventoryService {
  private stock: Record<string, number> = {
    '1': 10, // Pizza
    '2': 15, // Pasta
  };

  async getInventory() {
    return this.stock;
  }

  async decreaseStock(data: { id: string; quantity: number }) {
    if (!this.stock[data.id] || this.stock[data.id] < data.quantity)
      throw new Error('Stock insuficiente');

    this.stock[data.id] -= data.quantity;
    return { id: data.id, newStock: this.stock[data.id] };
  }

  async increaseStock(data: { id: string; quantity: number }) {
    this.stock[data.id] = (this.stock[data.id] || 0) + data.quantity;
    return { id: data.id, newStock: this.stock[data.id] };
  }
}
