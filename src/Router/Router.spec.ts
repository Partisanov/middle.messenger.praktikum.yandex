import Block from '../utils/Block.ts';
import Router from './Router.ts';
import sinon from 'sinon';
import { expect } from 'chai';

describe('Router', () => {
  let router: typeof Router;
  const originalForward = window.history.forward;
  const originalBack = window.history.back;
  const getContentFake = sinon.fake.returns(document.createElement('div'));
  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as typeof Block;

  before(() => {
    router = Router;
  });

  beforeEach(() => {
    window.history.forward = sinon.fake();
    window.history.back = sinon.fake();
  });

  after(() => {
    sinon.restore();
    window.history.forward = originalForward;
    window.history.back = originalBack;
  });
  afterEach(() => {
    sinon.restore();
  });

  it('Должен отображать страницу при запуске', () => {
    router.use('/', BlockMock).start();
    expect(getContentFake.callCount).to.eq(1);
  });

  it('Должен возвращать экземпляр Router при вызове use()', () => {
    const result = router.use('/', BlockMock);
    expect(result).to.equal(router);
  });

  it('Переход на новую страницу должен менять состояние сущности history', () => {
    window.history.pushState({ page: 'login' }, 'Login', '/login');
    window.history.pushState({ page: 'register' }, 'Register', '/register');

    expect(window.history.length).to.eq(3);
  });
});
