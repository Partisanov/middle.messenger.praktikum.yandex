import constants from '../constants';

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHODS;
  data?: any;
};

type OptionsWithoutMethod = Omit<Options, 'method'>;
type HTTPMethod = <R = unknown>(url: string, options?: OptionsWithoutMethod) => Promise<R>;

export class HTTPTransport {
  private readonly apiUrl: string = '';

  constructor(apiPath: string) {
    this.apiUrl = `${constants.HOST}${apiPath}`;
  }

  get: HTTPMethod = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.GET });
  };

  post: HTTPMethod = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.POST });
  };

  put: HTTPMethod = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.PUT });
  };

  delete: HTTPMethod = (url, options = {}) => {
    return this.request(`${this.apiUrl}${url}`, { ...options, method: METHODS.DELETE });
  };

  async request<TResponse>(url: string, options: Options = { method: METHODS.GET }): Promise<TResponse> {
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
