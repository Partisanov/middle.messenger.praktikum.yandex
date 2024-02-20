import { JSDOM } from 'jsdom';
import * as Components from './src/components';
import { registerComponent } from './src/utils/registerComponents.js';

Object.entries(Components).forEach(([componentName, component]) => registerComponent(componentName, component));

const jsdom = new JSDOM('<body><div id="app"></div></body>', {
  url: 'https://localhost:3000/',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.store = jsdom.window.store;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
