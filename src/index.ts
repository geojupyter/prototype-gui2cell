import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

/**
 * Initialization data for the prototype-gui2cell extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'prototype-gui2cell:plugin',
  description: 'TO DO.',
  autoStart: true,
  activate: (app: JupyterFrontEnd) => {
    console.log('JupyterLab extension prototype-gui2cell is activated!');
  }
};

export default plugin;
