// Copyright (c) me
// Distributed under the terms of the Modified BSD License.

import {
  DOMWidgetModel,
  DOMWidgetView,
  ISerializers
} from '@jupyter-widgets/base';
import { INotebookTracker } from '@jupyterlab/notebook';

import { MODULE_NAME, MODULE_VERSION } from './version';

// Import the CSS
import '../style/index.css';

export class ExampleModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: ExampleModel.model_name,
      _model_module: ExampleModel.model_module,
      _model_module_version: ExampleModel.model_module_version,
      _view_name: ExampleModel.view_name,
      _view_module: ExampleModel.view_module,
      _view_module_version: ExampleModel.view_module_version
    };
  }

  static serializers: ISerializers = {
    ...DOMWidgetModel.serializers
    // Add any extra serializers here
  };

  static model_name = 'ExampleModel';
  static model_module = MODULE_NAME;
  static model_module_version = MODULE_VERSION;
  static view_name = 'ExampleView'; // Set to null if no view
  static view_module = MODULE_NAME; // Set to null if no view
  static view_module_version = MODULE_VERSION;
}

export class ExampleView extends DOMWidgetView {
  static tracker: INotebookTracker;

  private button!: HTMLButtonElement;
  private textarea!: HTMLTextAreaElement;
  private select!: HTMLSelectElement;

  render() {
    this.textarea = document.createElement('textarea');
    this.textarea.value = this.model.get('value');

    this.button = document.createElement('button');
    this.button.textContent = 'test'; //this.model.get('value');

    this.select = document.createElement('select');
    for (const country of this.model.get('countries')) {
      const option = document.createElement('option');
      option.textContent = country;
      this.select.appendChild(option);
    }

    this.button.onclick = () => {

      this.model.set('selected_country', this.select.value);
      this.model.save_changes();

      const notebook = ExampleView.tracker?.currentWidget?.content;
      if (!notebook?.model) {
        return;
      }
      const notebookModel = notebook.model;

      this.model.on('change:filtered_geojson', () => {

        const map_code =
          'from ipyleaflet import Map, GeoJSON\n' +
          'import json\n' +
          'm = Map()\n' +
          'm.add(GeoJSON(data=json.loads("""'+
          this.model.get('filtered_geojson')+
          '""")))\n' +
          'm'
          ;

        notebookModel.sharedModel.insertCell(
          notebook.widgets.findIndex(cell => cell.node.contains(this.el)) + 1,
          {
            cell_type: 'code',
            source: "print('" + String(this.textarea.value) + "')"+"\n" + map_code,
            metadata: {}
          }
        );
      });
    };

    this.el.appendChild(this.textarea);
    this.el.appendChild(this.select);
    this.el.appendChild(this.button);
    this.el.classList.add('custom-widget');
    this.model.on('change:value', this.value_changed, this);
  }

  value_changed() {
    this.button.textContent = this.model.get('value');
  }
}
