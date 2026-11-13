# Per-Monitor Alt-Tab

A lightweight GNOME Shell extension that restricts the native window switcher (`Alt+Tab`) to windows on the monitor where the mouse pointer is currently located, and centers the switcher popup on that monitor.

## Features

- **Pointer-Aware Window Filtering:** Displays only the windows belonging to the monitor under the mouse cursor.
- **Per-Monitor Popup Placement:** Centers the native `Alt+Tab` switcher popup on the active pointer monitor instead of always locking it to the primary monitor.
- **Native & Lightweight:** Hooks directly into GNOME Shell's `WindowSwitcherPopup` without extra background daemons or permanent modifications to global layout state.

## Supported GNOME Shell Versions

- GNOME 45
- GNOME 46
- GNOME 47

## Installation

### Option 1: GNOME Extensions Website / Extension Manager (Recommended)

1. Visit the [extension page on extensions.gnome.org](https://extensions.gnome.org/extension/11752/per-monitor-alt-tab/) and toggle the switch to **ON**, or search for **Per-Monitor Alt-Tab** in the **Extension Manager** desktop app (`gnome-shell-extension-manager`).

### Option 2: Build and Install from Source

1. Clone this repository and run the included packaging/installation script:
```bash
   git clone https://github.com/ss38230119/per-monitor-alttab.git
   cd per-monitor-alttab
   ./pack.sh --install

```

2. Restart GNOME Shell to load the newly installed extension:
* **X11:** Press `Alt + F2`, type `r`, and press `Enter`.
* **Wayland:** Log out and log back in.


3. Enable the extension:
```bash
gnome-extensions enable per-monitor-alttab@ss38230119.github.io

```



## Usage & Keybinding Note

This extension customizes GNOME Shell's **Window Switcher** (`WindowSwitcherPopup`). If pressing `Alt+Tab` opens the grouped application switcher instead of individual windows, assign `Alt+Tab` to **Switch windows**:

* **Via Settings:** Open **Settings → Keyboard → View and Customize Shortcuts → Navigation** and set **Switch windows** to `Alt+Tab`.
* **Via Terminal:**
```bash
gsettings set org.gnome.desktop.wm.keybindings switch-applications "[]"
gsettings set org.gnome.desktop.wm.keybindings switch-windows "['<Alt>Tab']"
gsettings set org.gnome.desktop.wm.keybindings switch-windows-backward "['<Shift><Alt>Tab']"

```


* **Restore Default Keybindings:**
```bash
gsettings reset org.gnome.desktop.wm.keybindings switch-applications
gsettings reset org.gnome.desktop.wm.keybindings switch-applications-backward
gsettings reset org.gnome.desktop.wm.keybindings switch-windows
gsettings reset org.gnome.desktop.wm.keybindings switch-windows-backward

```



## License

This project is licensed under the **GPL-2.0-or-later** license. See the [LICENSE](LICENSE) file for details.
