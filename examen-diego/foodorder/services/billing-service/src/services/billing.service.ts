import axios from 'axios';

export class BillingService {
  private transactions: any[] = [];

  async processPayment(data: { orderId: string; amount: number }) {
    const payment = { id: Date.now().toString(), ...data, status: 'pagado' };
    this.transactions.push(payment);

    await axios.post('http://localhost:4001/orders/state', {
      id: data.orderId,
      estado: 'pagado',
    }).catch(() => null);

    return payment;
  }

  async getReceipt(orderId: string) {
    const receipt = this.transactions.find(t => t.orderId === orderId);
    if (!receipt) throw new Error('No se encontró el recibo');
    return receipt;
  }

  async listTransactions() {
    return this.transactions;
  }
}
