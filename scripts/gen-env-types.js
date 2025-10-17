const fs = require("fs");
const path = require("path");

function generateEnvTypes() {
  const envFiles = [".env.local", ".env"];
  let envContent = "";

  // Read from .env.local first, then .env
  for (const file of envFiles) {
    const envPath = path.join(__dirname, "..", file);
    if (fs.existsSync(envPath)) {
      envContent += fs.readFileSync(envPath, "utf-8") + "\n";
      console.log(`📄 Reading ${file}`);
    }
  }

  if (!envContent) {
    console.error("❌ No .env files found");
    process.exit(1);
  }

  const envVars = envContent
    .split("\n")
    .filter((line) => line.trim() && !line.startsWith("#"))
    .map((line) => line.split("=")[0].trim())
    .filter(Boolean);

  // Remove duplicates
  const uniqueVars = [...new Set(envVars)];

  const typeDefinitions = `// This file is auto-generated. Do not edit manually.

declare global {
  namespace NodeJS {
    interface ProcessEnv {
${uniqueVars.map((varName) => `      ${varName}: string;`).join("\n")}
    }
  }
}

export {};
`;

  const outputFile = path.join(__dirname, "..", "environment.d.ts");
  fs.writeFileSync(outputFile, typeDefinitions);
  console.log("✅ Environment types generated successfully!");
  console.log(`📝 Found ${uniqueVars.length} environment variables`);
}

generateEnvTypes();
