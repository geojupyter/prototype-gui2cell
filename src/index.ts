import { IJupyterWidgetRegistry } from '@jupyter-widgets/base';
import { INotebookTracker } from '@jupyterlab/notebook';
import { Application, IPlugin } from '@lumino/application';
import { Widget } from '@lumino/widgets';

import { MODULE_NAME, MODULE_VERSION } from './version';
import * as widgetExports from './widget';

const EXTENSION_ID = 'prototype-gui2cell:plugin'

/**
 * Initialization data for the prototype-gui2cell extension.
 */
const plugin: IPlugin<Application<Widget>, void> = {
  id: EXTENSION_ID,
  description: 'TODO.',
  requires: [IJupyterWidgetRegistry, INotebookTracker],
  autoStart: true,
  activate: (
    app: Application<Widget>,
    registry: IJupyterWidgetRegistry,
    tracker: INotebookTracker
  ): void => {
    widgetExports.ExampleView.tracker = tracker;
    registry.registerWidget({
      name: MODULE_NAME,
      version: MODULE_VERSION,
      exports: widgetExports,
    });
    console.info('JupyterLab extension prototype-gui2cell is activated!');
  }
};

export default plugin;