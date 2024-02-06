import constants from '../constants';

enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export class HTTPTransport {
  private readonly apiUrl: string = '';

  constructor(apiPath: string) {
    this.apiUrl = `${constants.HOST}${apiPath}`;
  }

  get<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.GET });
  }

  post<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.POST });
  }

  put<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.PUT });
  }

  delete<TResponse>(url: string, options: OptionsWithoutMethod = {}): Promise<TResponse> {
    return this.request<TResponse>(`${this.apiUrl}${url}`, { ...options, method: METHOD.DELETE });
  }

  async request<TResponse>(url: string, options: Options = { method: METHOD.GET }): Promise<TResponse> {
    const { method, data } = options;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    let requestBody;

    if (data instanceof FormData) {
      // If data is FormData, update headers and set requestBody directly
      delete headers['Content-Type'];
      requestBody = data;
    } else if (data) {
      // If data is provided, stringify it for JSON
      requestBody = JSON.stringify(data);
    }

    const response = await fetch(url, {
      method,
      credentials: 'include',
      mode: 'cors',
      headers,
      body: requestBody,
    });

    const isJson = response.headers.get('content-type')?.includes('application/json');
    const resultData = isJson ? await response.json() : null;

    return resultData as unknown as TResponse;
  }
}
