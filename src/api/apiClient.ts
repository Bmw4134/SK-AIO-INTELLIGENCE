import axios from 'axios';

const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY || process.env.OPENAI_API_KEY;
const BLACKBOX_API_KEY = process.env.REACT_APP_BLACKBOX_API_KEY || process.env.BLACKBOX_API_KEY;
const PERPLEXITY_API_KEY = process.env.REACT_APP_PERPLEXITY_API_KEY || process.env.PERPLEXITY_API_KEY || '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';
const NGROK_API_KEY = process.env.REACT_APP_NGROK_API_KEY || process.env.NGROK_API_KEY || 'ak_2zq9Rk1fQcCfGox0CdR9DKSNmbC';



const openaiClient = axios.create({
  baseURL: 'https://api.openai.com/v1',
  headers: {
    'Authorization': `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const blackboxClient = axios.create({
  baseURL: 'https://api.blackbox.com/v1', // Replace with actual Blackbox API base URL
  headers: {
    'Authorization': `Bearer ${BLACKBOX_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

const perplexityClient = axios.create({
  baseURL: 'https://api.perplexity.ai/v1', // Replace with actual Perplexity API base URL
  headers: {
    'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
    'Content-Type': 'application/json',
  },
});

export async function callOpenAIChat(messages: any[]) {
  try {
    const response = await openaiClient.post('/chat/completions', {
      model: 'gpt-4',
      messages,
    });
    return response.data;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw error;
  }
}

export async function callBlackboxAPI(endpoint: string, data: any) {
  try {
    const response = await blackboxClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Blackbox API error:', error);
    throw error;
  }
}

export async function callPerplexityAPI(query: string) {
  try {
    const response = await perplexityClient.post('/query', { query });
    return response.data;
  } catch (error) {
    console.error('Perplexity API error:', error);
    throw error;
  }
}


export async function callNgrokAPI(endpoint: string, data: any) {
  try {
    const response = await axios.post(`https://api.ngrok.com${endpoint}`, data, {
      headers: {
        'Authorization': `Bearer ${NGROK_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ngrok API error:', error);
    throw error;
  }
}
