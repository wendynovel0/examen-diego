import axios from 'axios';

export class KitchenService {
  private kitchenOrders: any[] = [];

  async getPendingOrders() {
    return this.kitchenOrders.filter(o => o.estado === 'pendiente');
  }

  async updateStatus(id: string, estado: string) {
    const order = this.kitchenOrders.find(o => o.id === id);
    if (!order) throw new Error('Pedido no encontrado');
    order.estado = estado;

    // Notificar a Orders Service y Notification Service
    await axios.post('http://localhost:4001/orders/state', { id, estado }).catch(() => null);
    await axios.post('http://localhost:4005/notifications', { type: 'kitchen.update', data: order }).catch(() => null);

    return order;
  }

  async receiveNewOrder(order: any) {
    this.kitchenOrders.push(order);
    return order;
  }
}
