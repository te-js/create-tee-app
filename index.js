#!/usr/bin/env node
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import prompts from "prompts";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

async function main() {
  const args = process.argv.slice(2);
  console.log(args);

  const { name } = await prompts({
    type: "text",
    name: "name",
    message: "What is the project's name?",
  });

  const currentPath = path.join(process.cwd(), name);

  fs.mkdirSync(currentPath, { recursive: true });

  fs.cpSync(path.join(__dirname, "template"), currentPath, {
    recursive: true,
  });

  install(currentPath);
  await prompts({
    type: "text",
    name: "name",
    message: "Press enter to exit",
    initial: "Press enter to exit",
  });
  // console.log(`Project created in ${currentPath}`);
}

async function install(currentPath) {
  const { choice } = await prompts({
    type: "toggle",
    name: "choice",
    message: "Install dependencies? (Y/n)",
    initial: true,
  });
  if (!choice) return;
  const { command } = await prompts({
    type: "select",
    name: "command",
    message: "Install dependencies?",
    choices: [
      { title: "npm", value: "npm install" },
      { title: "yarn", value: "yarn install" },
      { title: "pnpm", value: "pnpm install" },
      { title: "bun", value: "bun install" },
    ],
  });
  exec(command, currentPath);
}

function exec(command, currentPath) {
  execSync(command, { cwd: currentPath, stdio: "inherit" });
}

main();

// #!/usr/bin/env node
// import { execSync } from "child_process";
// import fs from "fs";
// import path from "path";
// import prompts from "prompts";

// interface ProjectConfig {
//   name: string;
//   useTailwind: boolean;
//   language: "javascript" | "typescript";
//   routingType: "manual" | "pages";
// }

// async function main() {
//   const config = await getProjectConfiguration();
//   const currentPath = path.join(process.cwd(), config.name);

//   // Create project directory
//   fs.mkdirSync(currentPath, { recursive: true });

//   // Copy and modify template based on configuration
//   await setupProject(currentPath, config);

//   // Install dependencies
//   await install(currentPath);
//   await prompts({
//     type: "text",
//     name: "name",
//     message: "Press enter to exit",
//     initial: "Press enter to exit",
//   });
//   // console.log(`Project created in ${currentPath}`);
// }

// async function getProjectConfiguration(): Promise<ProjectConfig> {
//   return await prompts([
//     {
//       type: "text",
//       name: "name",
//       message: "What is the project's name?",
//     },
//     {
//       type: "toggle",
//       name: "useTailwind",
//       message: "Would you like to use Tailwind CSS?",
//       initial: true,
//     },
//     {
//       type: "select",
//       name: "language",
//       message: "Choose your language:",
//       choices: [
//         { title: "TypeScript", value: "typescript" },
//         { title: "JavaScript", value: "javascript" },
//       ],
//     },
//     {
//       type: "select",
//       name: "routingType",
//       message: "Choose routing type:",
//       choices: [
//         { title: "Pages Router", value: "pages" },
//         { title: "Manual Router", value: "manual" },
//       ],
//     },
//   ]);
// }

// async function setupProject(currentPath: string, config: ProjectConfig) {
//   // Copy base template
//   const templatePath = path.join(__dirname, "template");
//   fs.cpSync(templatePath, currentPath, { recursive: true });

//   // Modify files based on configuration
//   if (config.useTailwind) {
//     // Copy tailwind configuration files
//     // Add tailwind dependencies to package.json
//   }

//   if (config.language === "javascript") {
//     // Convert TypeScript files to JavaScript
//     // Update configuration files
//   }

//   // Setup routing based on choice
//   const routingPath = path.join(currentPath, "src/routing");
//   if (config.routingType === "pages") {
//     // Copy pages router template
//   } else {
//     // Copy manual router template
//   }

//   // Update package.json with required dependencies
//   updatePackageJson(currentPath, config);
// }

// function updatePackageJson(currentPath: string, config: ProjectConfig) {
//   const packageJsonPath = path.join(currentPath, "package.json");
//   const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

//   // Add dependencies based on configuration
//   const dependencies: Record<string, string> = {
//     // Base dependencies
//     react: "^18.2.0",
//     "react-dom": "^18.2.0",
//   };

//   if (config.useTailwind) {
//     dependencies["tailwindcss"] = "^3.0.0";
//     dependencies["postcss"] = "^8.0.0";
//     dependencies["autoprefixer"] = "^10.0.0";
//   }

//   // Add more dependencies based on routing choice
//   if (config.routingType === "pages") {
//     dependencies["@next/router"] = "^13.0.0";
//   }

//   packageJson.dependencies = {
//     ...packageJson.dependencies,
//     ...dependencies,
//   };

//   fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
// }

// async function install(currentPath: string) {
//   const { choice } = await prompts({
//     type: "toggle",
//     name: "choice",
//     message: "Install dependencies? (Y/n)",
//     initial: true,
//   });
//   if (!choice) return;
//   const { command } = await prompts({
//     type: "select",
//     name: "command",
//     message: "Install dependencies?",
//     choices: [
//       { title: "npm", value: "npm install" },
//       { title: "yarn", value: "yarn install" },
//       { title: "pnpm", value: "pnpm install" },
//       { title: "bun", value: "bun install" },
//     ],
//   });
//   exec(command, currentPath);
// }

// function exec(command: string, currentPath: string) {
//   execSync(command, { cwd: currentPath, stdio: "inherit" });
// }

// main();
