#!/usr/bin/env python3
"""
run_pyghidra.py — Launch export-js.py via PyGhidra (Python 3)

Ghidra 12.0.3 dropped Jython; Python scripts run through PyGhidra.
This wrapper starts Ghidra headlessly and runs export-js.py.

Usage:
  python run_pyghidra.py                              # transpile all blocks
  python run_pyghidra.py --dump FUN_004e868f          # dump AST for one function
  python run_pyghidra.py --func FUN_004e868f          # transpile one function
  python run_pyghidra.py --block 0x004E0000           # transpile one block

Prerequisites:
  pip install pyghidra  (bundled wheels in Ghidra/Features/PyGhidra/pypkg/dist/)
"""

import sys
import os
from pathlib import Path

# ── Configuration ──────────────────────────────────────────────────

GHIDRA_INSTALL = Path(r"C:\tmp\ghidra_12.0.3_PUBLIC")
JAVA_HOME = Path(r"C:\tmp\jdk-21.0.10+7")
PROJECT_DIR = Path(r"C:\tmp\ghidra_projects")
PROJECT_NAME = "civ2_project"
CIV2_EXE = Path(r"C:\Users\stuar\OneDrive\Documents\Games\Civilization II Multiplayer Gold Edition\civ2.exe")

# Script location (same directory as this file)
SCRIPT_DIR = Path(__file__).parent
EXPORT_SCRIPT = SCRIPT_DIR / "export-js.py"

# ── Main ───────────────────────────────────────────────────────────

def main():
    # Set JAVA_HOME and add java to PATH for Ghidra/PyGhidra
    os.environ["JAVA_HOME"] = str(JAVA_HOME)
    os.environ["GHIDRA_INSTALL_DIR"] = str(GHIDRA_INSTALL)
    java_bin = str(JAVA_HOME / "bin")
    os.environ["PATH"] = java_bin + os.pathsep + os.environ.get("PATH", "")

    # Collect script args (everything passed to this wrapper)
    script_args = sys.argv[1:] if len(sys.argv) > 1 else []

    print("=== Ghidra AST Transpiler (PyGhidra) ===")
    print(f"  Ghidra:  {GHIDRA_INSTALL}")
    print(f"  Java:    {JAVA_HOME}")
    print(f"  Project: {PROJECT_DIR / PROJECT_NAME}")
    print(f"  Script:  {EXPORT_SCRIPT}")
    if script_args:
        print(f"  Args:    {' '.join(script_args)}")
    print()

    # Inject script args into sys.argv so export-js.py can read them
    # via _get_script_args() fallback (sys.argv[1:])
    old_argv = sys.argv
    sys.argv = [str(EXPORT_SCRIPT)] + script_args

    import pyghidra

    # Start Ghidra headlessly and open the project
    launcher = pyghidra.HeadlessPyGhidraLauncher(install_dir=GHIDRA_INSTALL)
    launcher.start()

    # Now Ghidra is running — open the project and program
    from ghidra.base.project import GhidraProject
    from java.io import File

    project = GhidraProject.openProject(str(PROJECT_DIR), PROJECT_NAME)
    try:
        program = project.openProgram("/", "civ2.exe", False)

        # Make currentProgram available to the script
        import builtins
        builtins.currentProgram = program

        # Run the export script
        print("--- Running export-js.py ---")
        print()
        exec(open(str(EXPORT_SCRIPT), encoding='utf-8').read(), {
            "__name__": "__main__",
            "__file__": str(EXPORT_SCRIPT),
            "currentProgram": program,
        })
    finally:
        project.close()

    sys.argv = old_argv


if __name__ == "__main__":
    main()
