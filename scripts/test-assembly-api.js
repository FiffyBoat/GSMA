#!/usr/bin/env node

/**
 * Assembly Members Admin API Test Script
 * Tests CRUD operations for Electoral Areas and Assembly Members
 */

const BASE_URL = "http://localhost:3001/api/admin";

async function testElectoralAreas() {
  console.log("\n=== Testing Electoral Areas API ===\n");

  try {
    // Test GET
    console.log("Testing GET /electoral-areas...");
    const getRes = await fetch(`${BASE_URL}/electoral-areas`);
    const areas = await getRes.json();
    console.log(`✓ Found ${areas.length} electoral areas`);

    // Test POST
    console.log("\nTesting POST /electoral-areas...");
    const newArea = {
      name: `Test Area ${Date.now()}`,
      description: "Test electoral area",
      display_order: 999,
      is_active: true,
    };
    const postRes = await fetch(`${BASE_URL}/electoral-areas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArea),
    });
    const createdArea = await postRes.json();
    console.log(`✓ Created area: ${createdArea.id}`);

    // Test PUT
    if (createdArea.id) {
      console.log("\nTesting PUT /electoral-areas/[id]...");
      const updateData = {
        ...newArea,
        description: "Updated description",
      };
      const putRes = await fetch(`${BASE_URL}/electoral-areas/${createdArea.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });
      const updatedArea = await putRes.json();
      console.log(`✓ Updated area: ${updatedArea.description}`);

      // Test DELETE
      console.log("\nTesting DELETE /electoral-areas/[id]...");
      const deleteRes = await fetch(`${BASE_URL}/electoral-areas/${createdArea.id}`, {
        method: "DELETE",
      });
      const deleteData = await deleteRes.json();
      console.log(`✓ Deleted area: ${deleteData.success}`);
    }
  } catch (error) {
    console.error("❌ Electoral Areas test failed:", error);
  }
}

async function testAssemblyMembers() {
  console.log("\n=== Testing Assembly Members API ===\n");

  try {
    // Test GET
    console.log("Testing GET /assembly-members...");
    const getRes = await fetch(`${BASE_URL}/assembly-members`);
    const members = await getRes.json();
    console.log(`✓ Found ${members.length} assembly members`);

    // Get first electoral area for testing
    console.log("\nFetching electoral area for member creation...");
    const areasRes = await fetch(`${BASE_URL}/electoral-areas`);
    const areas = await areasRes.json();
    
    if (areas.length > 0) {
      const areaId = areas[0].id;
      console.log(`✓ Using area: ${areas[0].name}`);

      // Test POST
      console.log("\nTesting POST /assembly-members...");
      const newMember = {
        name: `Test Member ${Date.now()}`,
        electoral_area_id: areaId,
        position: "Test Position",
        image_url: "",
        bio: "Test biography",
        contact_email: "test@example.com",
        contact_phone: "+233123456789",
        is_active: true,
        display_order: 999,
      };
      const postRes = await fetch(`${BASE_URL}/assembly-members`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMember),
      });
      const createdMember = await postRes.json();
      console.log(`✓ Created member: ${createdMember.id}`);

      // Test PUT
      if (createdMember.id) {
        console.log("\nTesting PUT /assembly-members/[id]...");
        const updateData = {
          ...newMember,
          position: "Updated Position",
        };
        const putRes = await fetch(`${BASE_URL}/assembly-members/${createdMember.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        });
        const updatedMember = await putRes.json();
        console.log(`✓ Updated member: ${updatedMember.position}`);

        // Test DELETE
        console.log("\nTesting DELETE /assembly-members/[id]...");
        const deleteRes = await fetch(`${BASE_URL}/assembly-members/${createdMember.id}`, {
          method: "DELETE",
        });
        const deleteData = await deleteRes.json();
        console.log(`✓ Deleted member: ${deleteData.success}`);
      }
    } else {
      console.log("⚠️  No electoral areas found. Create one first.");
    }
  } catch (error) {
    console.error("❌ Assembly Members test failed:", error);
  }
}

async function runTests() {
  console.log("🚀 Starting Assembly Members Admin API Tests");
  console.log(`Testing against: ${BASE_URL}`);

  await testElectoralAreas();
  await testAssemblyMembers();

  console.log("\n✅ All tests completed!");
  console.log("Check the output above for any errors.");
}

// Run tests
runTests().catch(console.error);
