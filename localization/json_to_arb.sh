#!/bin/bash

# Function to install jq on Linux
install_jq_linux() {
    sudo apt-get update
    sudo apt-get install -y jq
}

# Function to install jq on macOS
install_jq_macos() {
    brew install jq
}



# Check if jq is installed
if ! command -v jq &> /dev/null; then
    # jq is not installed

    # Determine the operating system
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        install_jq_linux
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        install_jq_macos
    
    else
        echo "Unsupported operating system."
        exit 1
    fi

    # Check again if jq is installed after attempting installation
    if ! command -v jq &> /dev/null; then
        echo "Error: jq installation failed. Please install jq manually and run the script again."
        exit 1
    fi
fi

distinct_keys=()
duplicate_keys=()

convert_json() {
    local json="$1"
    local indent="$2"
    

    if [ -z "$indent" ]; then
        indent=""
    fi

    for key in $(jq -r 'keys | .[]' <<< "$json"); do
        if [[ " ${distinct_keys[@]} " =~ " $key " ]]; then
            duplicate_keys+=("$key")
        fi

        value=$(jq -c ".$key" <<< "$json")

        if [ "$(jq -r 'type' <<< "$value")" == "object" ]; then
            # echo "$indent$key: {"
            convert_json "$value"
            # echo "$indent}"
        else
            distinct_keys+=("$key")
            value=$(jq -r '.' <<< "$value")
            echo "$indent\"$key\": \"$value\","
        fi
    done
}


json_file="$1"


json=$(cat "$json_file")

{
    echo "{"
    convert_json "$json" "   "
    echo "}"
} > en.arb

if [[ "${#duplicate_keys[@]}" > 0 ]]; then
    echo "ERROR: Number of duplicate keys: ${#duplicate_keys[@]}"
    echo "$duplicate_keys"
    exit 1

fi
