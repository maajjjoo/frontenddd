import axios from 'axios';

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 15_000,
});

export async function generateText(userId, prompt) {
  const { data } = await client.post('/api/ai/generate', { userId, prompt });
  return data;
}

export async function getQuotaStatus(userId) {
  const { data } = await client.get('/api/quota/status', { params: { userId } });
  return data;
}

export async function getQuotaHistory(userId) {
  const { data } = await client.get('/api/quota/history', { params: { userId } });
  return data;
}

export async function upgradePlan(userId) {
  const { data } = await client.post('/api/quota/upgrade', { userId });
  return data;
}
