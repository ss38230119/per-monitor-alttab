// SPDX-License-Identifier: GPL-2.0-or-later

import * as AltTab from 'resource:///org/gnome/shell/ui/altTab.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as SwitcherPopup from 'resource:///org/gnome/shell/ui/switcherPopup.js';
import {Extension} from 'resource:///org/gnome/shell/extensions/extension.js';

export default class PerMonitorAltTabExtension extends Extension {
    enable() {
        const origGetWindowList = AltTab.WindowSwitcherPopup.prototype._getWindowList;
        this._origGetWindowList = origGetWindowList;

        AltTab.WindowSwitcherPopup.prototype._getWindowList = function () {
            const monitor = global.display.get_current_monitor();
            return origGetWindowList.call(this).filter(w => w.get_monitor() === monitor);
        };

        const origShow = SwitcherPopup.SwitcherPopup.prototype.show;
        this._origShow = origShow;

        SwitcherPopup.SwitcherPopup.prototype.show = function (...args) {
            if (this instanceof AltTab.WindowSwitcherPopup) {
                const targetIdx = global.display.get_current_monitor();
                const targetMonitor = Main.layoutManager.monitors[targetIdx];
                const savedPrimary = Main.layoutManager.primaryMonitor;
                const savedIndex = Main.layoutManager.primaryIndex;

                if (targetMonitor && savedPrimary) {
                    if (targetMonitor === savedPrimary) {
                        return origShow.apply(this, args);
                    }

                    Main.layoutManager.primaryMonitor = targetMonitor;
                    Main.layoutManager.primaryIndex = targetIdx;

                    const restore = () => {
                        Main.layoutManager.primaryMonitor = savedPrimary;
                        Main.layoutManager.primaryIndex = savedIndex;
                    };

                    this.connect('destroy', restore);

                    try {
                        const res = origShow.apply(this, args);
                        if (res === false) {
                            restore();
                        } else {
                            this.queue_relayout();
                        }
                        return res;
                    } catch (e) {
                        restore();
                        throw e;
                    }
                }
            }
            return origShow.apply(this, args);
        };
    }

    disable() {
        if (this._origGetWindowList) {
            AltTab.WindowSwitcherPopup.prototype._getWindowList = this._origGetWindowList;
            this._origGetWindowList = null;
        }
        if (this._origShow) {
            SwitcherPopup.SwitcherPopup.prototype.show = this._origShow;
            this._origShow = null;
        }
    }
}
