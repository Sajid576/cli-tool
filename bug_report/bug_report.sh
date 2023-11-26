#!/bin/bash

# Initialize variables with default values
bug_report=""
platform=""
assign=""
by=""

# Parse command-line options
while getopts ":r:p:a:b:" opt; do
  case $opt in
    r)
      bug_report="$OPTARG"
      ;;
    p)
      platform="$OPTARG"
      ;;
    a)
      assign="$OPTARG"
      ;;
    b)
      by="$OPTARG"
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
    :)
      echo "Option -$OPTARG requires an argument." >&2
      exit 1
      ;;
  esac
done

# Check if required options are provided
if [ -z "$bug_report" ] || [ -z "$platform" ] || [ -z "$assign" ] || [ -z "$by" ]; then
  echo "Usage: $0 -r 'bug report' -p 'platform' -a 'assign' -b 'by'"
  exit 1
fi

# Define your Google Sheets API endpoint
api_endpoint="https://docs.google.com/spreadsheets/d/1X6LO0ij05fz5tgPJ2O85Ay3KiH70rV_AFeNWMprVxxQ/edit#gid=183537899"

# Create JSON payload
json_payload='{
  "range": "A1:D1",
  "majorDimension": "ROWS",
  "values": [["'$bug_report'", "'$platform'", "'$assign'", "'$by'"]]
}'

# Send data to Google Sheets using curl
curl -X PUT -H "Content-Type: application/json" --data "$json_payload" "$api_endpoint"
