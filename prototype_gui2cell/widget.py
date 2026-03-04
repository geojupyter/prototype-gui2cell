from ipywidgets import DOMWidget
from traitlets import Unicode

MODULE_NAME = 'prototype-gui2cell'
MODULE_VERSION = '^0.1.0'

class Gui2CellWidget(DOMWidget):
    # TODO: Set module name and version
    _model_name = Unicode('ExampleModel').tag(sync=True)
    _model_module = Unicode(MODULE_NAME).tag(sync=True)
    _model_module_version = Unicode(MODULE_VERSION).tag(sync=True)
    _view_name = Unicode(MODULE_NAME).tag(sync=True)
    _view_module = Unicode(MODULE_VERSION).tag(sync=True)
    _view_module_version = Unicode('bar').tag(sync=True)

    value = Unicode('Hello World').tag(sync=True)