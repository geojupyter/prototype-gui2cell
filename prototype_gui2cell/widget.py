import json
import os

from ipywidgets import DOMWidget
from traitlets import List, Unicode, observe

MODULE_NAME = "prototype-gui2cell"
MODULE_VERSION = "^0.1.0"


with open(
    os.path.join(os.path.dirname(__file__), "data", "ne_110m_admin_0_countries.geojson")
) as _f:
    admin0 = json.load(_f)


class Gui2CellWidget(DOMWidget):
    # TODO: Set module name and version
    _model_name = Unicode("ExampleModel").tag(sync=True)
    _model_module = Unicode(MODULE_NAME).tag(sync=True)
    _model_module_version = Unicode(MODULE_VERSION).tag(sync=True)
    _view_name = Unicode("ExampleView").tag(sync=True)
    _view_module = Unicode(MODULE_NAME).tag(sync=True)
    _view_module_version = Unicode(MODULE_VERSION).tag(sync=True)

    value = Unicode("Hello World").tag(sync=True)
    countries = List(sorted(f["properties"]["NAME"] for f in admin0["features"])).tag(
        sync=True
    )

    selected_country = Unicode("").tag(sync=True)
    filtered_geojson = Unicode("").tag(sync=True)

    @observe("selected_country")
    def _on_selected_country_change(self, change):
        feature = next(
            (f for f in admin0["features"] if f["properties"]["NAME"] == change["new"]),
            None,
        )
        self.filtered_geojson = json.dumps(feature) if feature else ""
