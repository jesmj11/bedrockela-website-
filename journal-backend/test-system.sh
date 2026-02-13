#!/bin/bash

# BedrockELA User Management System Test Script
# Tests all major API endpoints to verify system is working

echo "🧪 Testing BedrockELA User Management System"
echo "============================================="
echo ""

API_URL="http://localhost:3001/api"

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
PASSED=0
FAILED=0

# Function to test an endpoint
test_endpoint() {
    local name=$1
    local method=$2
    local endpoint=$3
    local data=$4
    local expected=$5
    
    echo -n "Testing: $name... "
    
    response=$(curl -s -X $method "$API_URL$endpoint" \
        -H "Content-Type: application/json" \
        ${data:+-d "$data"})
    
    if echo "$response" | grep -q "$expected"; then
        echo -e "${GREEN}✓ PASSED${NC}"
        ((PASSED++))
    else
        echo -e "${RED}✗ FAILED${NC}"
        echo "  Response: $response"
        ((FAILED++))
    fi
}

# Check if server is running
echo "1. Checking if server is running..."
if curl -s "$API_URL/health" > /dev/null; then
    echo -e "${GREEN}✓ Server is running${NC}"
    echo ""
else
    echo -e "${RED}✗ Server is not running!${NC}"
    echo "  Start it with: node server-v2.js"
    echo ""
    exit 1
fi

# Test health endpoint
echo "2. Testing Health Endpoint"
test_endpoint "Health Check" "GET" "/health" "" "success"
echo ""

# Test parent login
echo "3. Testing Parent Login"
test_endpoint "Parent Login" "POST" "/parent/login" '{"email":"jes@example.com","password":"password123"}' "success"
echo ""

# Test student login
echo "4. Testing Student Login"
test_endpoint "Student Login" "POST" "/student/login" '{"username":"bryton_j","pin_code":"1234"}' "success"
test_endpoint "Student Login (no PIN)" "POST" "/student/login" '{"username":"riley_j"}' "Invalid PIN"
echo ""

# Test invalid logins
echo "5. Testing Invalid Logins (should fail)"
test_endpoint "Invalid Parent Email" "POST" "/parent/login" '{"email":"fake@example.com","password":"wrong"}' "Invalid email"
test_endpoint "Invalid Student Username" "POST" "/student/login" '{"username":"nonexistent"}' "Student not found"
echo ""

# Summary
echo "============================================="
echo "Test Results:"
echo -e "${GREEN}Passed: $PASSED${NC}"
echo -e "${RED}Failed: $FAILED${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed! System is working correctly.${NC}"
    echo ""
    echo "Next steps:"
    echo "  1. Open index-new.html in your browser"
    echo "  2. Try logging in as parent (jes@example.com / password123)"
    echo "  3. Try logging in as student (bryton_j / PIN: 1234)"
    echo ""
    exit 0
else
    echo -e "${RED}⚠️  Some tests failed. Check the errors above.${NC}"
    echo ""
    exit 1
fi
