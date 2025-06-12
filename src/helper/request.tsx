// utils/request.ts
type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  token?: string;
}
const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiRequest<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', headers = {}, body, token } = options;

  const fetchOptions: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, fetchOptions);
    const data = await response.json();

    if (response.status == 400 || response.status == 409 ) {
        return data
    } 

    if (!response.ok) {
      throw new Error(data?.message || 'Request failed');
    }

    return data as T;
  } catch (error: any) {
    console.error('API Request Error:', error.message);
    throw error;
  }
}
