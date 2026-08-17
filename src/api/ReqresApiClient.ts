export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface ApiRequestOptions {
  method?: HttpMethod;
  body?: object | null;
  headers?: Record<string, string>;
  params?: Record<string, string | number>;
}

export interface ReqresUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

export interface ReqresUsersResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqresUser[];
  support: {
    url: string;
    text: string;
  };
}

export interface SingleUserResponse {
  data: ReqresUser;
  support: {
    url: string;
    text: string;
  };
}

export interface CreateUserPayload {
  name: string;
  job: string;
}

export interface CreateUserResponse extends CreateUserPayload {
  id: string;
  createdAt: string;
}

export interface UpdateUserPayload {
  name?: string;
  job?: string;
}

export interface UpdateUserResponse extends UpdateUserPayload {
  updatedAt: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export interface ErrorResponse {
  error: string;
}

import 'dotenv/config';

const runtimeEnv = (globalThis as typeof globalThis & {
  process?: {
    env?: Record<string, string | undefined>;
  };
}).process?.env ?? {};

export class ReqresApiClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(baseUrl = runtimeEnv.REQRES_BASE_URL || 'https://reqres.in/api', apiKey?: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey ?? runtimeEnv.REQRES_API_KEY;
  }

  private getDefaultHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['x-api-key'] = this.apiKey;
    }

    return headers;
  }

  private async request<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
    const { method = 'GET', body = null, headers = {}, params = {} } = options;
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      query.append(key, String(value));
    });

    const url = `${this.baseUrl}${endpoint}${query.toString() ? `?${query.toString()}` : ''}`;

    const response = await fetch(url, {
      method,
      headers: {
        ...this.getDefaultHeaders(),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const responseBody = await response.text();
    const parsedBody = responseBody ? JSON.parse(responseBody) : null;

    if (!response.ok) {
      const errorMessage = parsedBody?.error || `Request failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return parsedBody as T;
  }

  async listUsers(page = 1): Promise<ReqresUsersResponse> {
    return this.request<ReqresUsersResponse>('/users', {
      params: { page }
    });
  }

  async getUser(userId: number): Promise<SingleUserResponse> {
    return this.request<SingleUserResponse>(`/users/${userId}`);
  }

  async createUser(payload: CreateUserPayload): Promise<CreateUserResponse> {
    return this.request<CreateUserResponse>('/users', {
      method: 'POST',
      body: payload,
    });
  }

  async updateUser(userId: number, payload: UpdateUserPayload): Promise<UpdateUserResponse> {
    return this.request<UpdateUserResponse>(`/users/${userId}`, {
      method: 'PUT',
      body: payload,
    });
  }

  async patchUser(userId: number, payload: UpdateUserPayload): Promise<UpdateUserResponse> {
    return this.request<UpdateUserResponse>(`/users/${userId}`, {
      method: 'PATCH',
      body: payload,
    });
  }

  async deleteUser(userId: number): Promise<{ success: boolean; id: number }> {
    return this.request<{ success: boolean; id: number }>(`/users/${userId}`, {
      method: 'DELETE',
    });
  }

  async login(payload: LoginPayload): Promise<LoginResponse> {
    return this.request<LoginResponse>('/login', {
      method: 'POST',
      body: payload,
    });
  }

  async register(payload: LoginPayload): Promise<LoginResponse> {
    return this.request<LoginResponse>('/register', {
      method: 'POST',
      body: payload,
    });
  }

  async getResources(): Promise<{ page: number; per_page: number; total: number; total_pages: number; data: Array<{ id: number; name: string; year: number; color: string; pantone_value: string }>; support: { url: string; text: string } }> {
    return this.request<{ page: number; per_page: number; total: number; total_pages: number; data: Array<{ id: number; name: string; year: number; color: string; pantone_value: string }>; support: { url: string; text: string } }>('/unknown');
  }

  async getSingleResource(resourceId: number): Promise<{ data: { id: number; name: string; year: number; color: string; pantone_value: string }; support: { url: string; text: string } }> {
    return this.request<{ data: { id: number; name: string; year: number; color: string; pantone_value: string }; support: { url: string; text: string } }>(`/unknown/${resourceId}`);
  }
}
