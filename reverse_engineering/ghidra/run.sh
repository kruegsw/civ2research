#!/bin/bash
# run.sh — Run the Ghidra AST transpiler headlessly
#
# Usage:
#   bash run.sh                              # transpile all blocks
#   bash run.sh --dump FUN_004e868f          # dump AST for one function
#   bash run.sh --func FUN_004e868f          # transpile one function
#   bash run.sh --block 0x004E0000           # transpile one block
#
# Prerequisites:
#   - Ghidra 12.0.3 at C:\tmp\ghidra_12.0.3_PUBLIC
#   - JDK 21 at C:\tmp\jdk-21.0.10+7
#   - Ghidra project at C:\tmp\ghidra_projects\civ2_project.gpr
#     (civ2.exe must already be imported and analyzed)

set -e

GHIDRA_HOME="/c/tmp/ghidra_12.0.3_PUBLIC"
JAVA_HOME="/c/tmp/jdk-21.0.10+7"
PROJECT_DIR="/c/tmp/ghidra_projects"
PROJECT_NAME="civ2_project"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

export JAVA_HOME

# Build script args string
SCRIPT_ARGS=""
if [ $# -gt 0 ]; then
    # Join all args with spaces for -scriptArgs
    SCRIPT_ARGS="-scriptArgs"
    ARGS_STR=""
    for arg in "$@"; do
        if [ -z "$ARGS_STR" ]; then
            ARGS_STR="$arg"
        else
            ARGS_STR="$ARGS_STR $arg"
        fi
    done
fi

echo "=== Ghidra AST Transpiler ==="
echo "Ghidra:  $GHIDRA_HOME"
echo "Java:    $JAVA_HOME"
echo "Project: $PROJECT_DIR/$PROJECT_NAME"
echo "Script:  $SCRIPT_DIR/export-js.py"
if [ -n "$SCRIPT_ARGS" ]; then
    echo "Args:    $ARGS_STR"
fi
echo ""

"$GHIDRA_HOME/support/analyzeHeadless" \
    "$PROJECT_DIR" "$PROJECT_NAME" \
    -process civ2.exe \
    -noanalysis \
    -scriptPath "$SCRIPT_DIR" \
    -postScript export-js.py \
    $SCRIPT_ARGS "$ARGS_STR"
