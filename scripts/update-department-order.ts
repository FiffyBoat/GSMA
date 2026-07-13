import { createAdminSupabaseClient } from "@/lib/supabase/server";

async function updateDepartmentOrder() {
  const supabase = await createAdminSupabaseClient();

  try {
    // Define the desired order
    const desiredOrder = [
      { name: "Central Administration", order: 1 },
      { name: "Finance", order: 2 },
      { name: "Education", order: 3 },
      { name: "Environmental Health and Sanitation", order: 4 },
      { name: "Social Welfare and Community Development", order: 5 },
      { name: "Physical Planning", order: 6 },
      { name: "Works", order: 7 },
    ];

    // Update each department's order
    for (const dept of desiredOrder) {
      console.log(`Updating ${dept.name} to order ${dept.order}`);

      const { error } = await supabase
        .from("departments")
        .update({ order: dept.order })
        .eq("name", dept.name);

      if (error) {
        console.error(`Failed to update ${dept.name}:`, error);
      } else {
        console.log(`✅ Updated ${dept.name}`);
      }
    }

    // Handle name changes
    // Update "Education, Youth & Sports" to "Education"
    const { error: educationError } = await supabase
      .from("departments")
      .update({ name: "Education" })
      .eq("name", "Education, Youth & Sports");

    if (!educationError) {
      console.log("✅ Updated Education name");
    }

    // Update "Social Welfare" to "Social Welfare and Community Development"
    const { error: socialWelfareError } = await supabase
      .from("departments")
      .update({ name: "Social Welfare and Community Development" })
      .eq("name", "Social Welfare");

    if (!socialWelfareError) {
      console.log("✅ Updated Social Welfare name");
    }

    // Update "Health" to "Environmental Health and Sanitation"
    const { error: healthError } = await supabase
      .from("departments")
      .update({ name: "Environmental Health and Sanitation" })
      .eq("name", "Health");

    if (!healthError) {
      console.log("✅ Updated Health name");
    }

    console.log("✅ Department order update completed!");
  } catch (error) {
    console.error("Error updating department order:", error);
  }
}

updateDepartmentOrder();