#!/bin/bash

# Display usage information
usage() {
  echo "Usage: $0 [number_of_runs]"
  echo "  number_of_runs: Number of times to run the tests (default: 10)"
  exit 1
}

# Parse command line arguments
COUNT=10  # Default value
if [ $# -gt 0 ]; then
  if [[ $1 =~ ^[0-9]+$ ]]; then
    COUNT=$1
  else
    echo "Error: Number of runs must be a positive integer"
    usage
  fi
fi
# Counter for successful runs
SUCCESS=0
# Counter for failed runs
FAILED=0
# Array to store failed run numbers
FAILED_RUNS=()

# Create a directory for test logs
LOG_DIR="test-logs"
mkdir -p "$LOG_DIR"

# Record the start time
START_TIME=$(date +%s)

echo "Running tests $COUNT times to check for flakiness..."

for i in $(seq 1 $COUNT); do
  echo -n "Run $i: "
  
  # Run the tests and capture the output and exit code
  TEST_OUTPUT=$(npm test 2>&1)
  EXIT_CODE=$?
  
  if [ $EXIT_CODE -eq 0 ]; then
    echo "✅ Passed"
    ((SUCCESS++))
  else
    echo "❌ Failed"
    ((FAILED++))
    FAILED_RUNS+=($i)
    
    # Save the output to a file
    echo "$TEST_OUTPUT" > "$LOG_DIR/failed-run-$i.log"
  fi
done

# Calculate elapsed time
END_TIME=$(date +%s)
ELAPSED_TIME=$((END_TIME - START_TIME))
AVG_TIME=$((ELAPSED_TIME / COUNT))

echo ""
echo "Results:"
echo "========"
echo "Total runs: $COUNT"
echo "Successful: $SUCCESS"
echo "Failed: $FAILED"
echo "Total time: ${ELAPSED_TIME} seconds (${AVG_TIME} seconds per test run)"

if [ $FAILED -gt 0 ]; then
  echo ""
  echo "Failed runs: ${FAILED_RUNS[@]}"
  echo ""
  echo "Failed test outputs have been saved to the $LOG_DIR directory."
  echo "To view a specific failed run, use:"
  echo "cat $LOG_DIR/failed-run-<run-number>.log"
  exit 1
else
  echo ""
  echo "All tests passed! Your tests appear to be stable."
  exit 0
fi
