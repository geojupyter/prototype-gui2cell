from pathlib import Path

from ipywidgets import DOMWidget
from traitlets import List, Unicode

MODULE_NAME = "prototype-gui2cell"
MODULE_VERSION = "^0.1.0"

ADMIN_BOUNDARIES_GEOJSON_FILE = Path(__file__).parent / "data" / "ne_110m_admin_0_countries.geojson"
ADMIN_BOUNDARIES_GEOJSON = ADMIN_BOUNDARIES_GEOJSON_FILE.read_text()


class Gui2CellWidget(DOMWidget):
    # TODO: Set module name and version
    _model_name = Unicode("ExampleModel").tag(sync=True)
    _model_module = Unicode(MODULE_NAME).tag(sync=True)
    _model_module_version = Unicode(MODULE_VERSION).tag(sync=True)
    _view_name = Unicode("ExampleView").tag(sync=True)
    _view_module = Unicode(MODULE_NAME).tag(sync=True)
    _view_module_version = Unicode(MODULE_VERSION).tag(sync=True)

    value = Unicode("Hello World").tag(sync=True)

    # Probably no good reason to pass this data from Python to JS...
    # Only needs to be synced unidirectionally, do we need the sync tag?
    admin_boundaries_geojson = Unicode(ADMIN_BOUNDARIES_GEOJSON).tag(sync=True)
