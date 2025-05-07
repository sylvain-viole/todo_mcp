#!/bin/bash

# Check if the correct number of arguments is provided
if [ "$#" -ne 1 ]; then
    echo "Usage: $0 <path_to_todo_file>"
    exit 1
fi

# Assign the first argument to a variable
TODO_FILE="$1"

# Run the goose command with the provided todo file
goose run --with-extension "node /home/sylinux/Documents/repos/pw/build/index.js" -i "$TODO_FILE"