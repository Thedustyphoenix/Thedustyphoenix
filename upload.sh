#!/bin/bash
echo "==================================================="
echo "🎨      PORTFOLIO ARTWORK UPLOAD ASSISTANT         "
echo "==================================================="
echo
echo "Launching upload assistant in Node.js..."
echo
node upload.js
if [ $? -ne 0 ]; then
    echo
    echo "[ERROR] The upload assistant crashed or exited with an error."
    echo "Check above for details. Ensure Node.js is installed on your machine."
    echo
    echo "Press Enter to close this window..."
    read
fi
