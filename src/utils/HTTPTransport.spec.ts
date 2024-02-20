import sinon from 'sinon';
import { expect } from 'chai';
import { HTTPTransport, METHODS } from './HTTPTransport.ts';
import constants from '../constants.ts';

describe('HttpTransport', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('Должен создавать экземпляр с правильным apiUrl', () => {
    const apiPath = '/test';
    const http = new HTTPTransport(apiPath);
    expect(http['apiUrl']).to.equal(`${constants.HOST}${apiPath}`);
  });
  it('Должен выполнять GET запрос с правильными параметрами', async () => {
    const apiPath = '/auth';
    const url = '/user';
    const options = { data: {} };

    const http = new HTTPTransport(apiPath);
    const requestStub = sinon.stub(http, 'request').resolves();

    await http.get(url, options);

    const expectedUrl = `${constants.HOST}${apiPath}${url}`;

    expect(requestStub.calledWithMatch(expectedUrl, { method: METHODS.GET })).to.be.true;
  });

  it('Должен выполнять POST запрос с правильными параметрами', async () => {
    const apiPath = '/auth';
    const url = '/logout';
    const postData = {};

    const http = new HTTPTransport(apiPath);
    const requestStub = sinon.stub(http, 'request').resolves();

    await http.post(url, { data: postData });

    const expectedUrl = `${constants.HOST}${apiPath}${url}`;
    const expectedOptions = { method: METHODS.POST, data: postData };

    expect(requestStub.calledWithMatch(expectedUrl, expectedOptions)).to.be.true;
  });

  it('Должен выполнять PUT запрос с правильными параметрами', async () => {
    const apiPath = '/test';
    const url = '/put-endpoint';
    const putData = { some: 'data' };

    const http = new HTTPTransport(apiPath);
    const requestStub = sinon.stub(http, 'request').resolves();

    await http.put(url, { data: putData });

    const expectedUrl = `${constants.HOST}${apiPath}${url}`;
    const expectedOptions = { method: METHODS.PUT, data: putData };

    expect(requestStub.calledWithMatch(expectedUrl, expectedOptions)).to.be.true;
  });

  it('Должен выполнять DELETE запрос с правильными параметрами', async () => {
    const apiPath = '/test';
    const url = '/delete-endpoint';

    const http = new HTTPTransport(apiPath);
    const requestStub = sinon.stub(http, 'request').resolves();

    await http.delete(url);

    const expectedUrl = `${constants.HOST}${apiPath}${url}`;
    const expectedOptions = { method: METHODS.DELETE };

    expect(requestStub.calledWithMatch(expectedUrl, expectedOptions)).to.be.true;
  });
});
