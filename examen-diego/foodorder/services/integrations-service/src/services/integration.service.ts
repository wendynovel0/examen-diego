import axios from 'axios';

export class IntegrationService {
  async connectPayment(data: any) {
    const response = await axios.post('https://api.fakegateway.com/pay', data);
    return response.data;
  }

  async notifySystem(data: any) {
    console.log('🔗 Notificando a sistema externo...', data);
    return { success: true, timestamp: new Date() };
  }
}
