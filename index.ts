import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import prompts from "prompts";

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

async function install(currentPath: string) {
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

function exec(command: string, currentPath: string) {
  execSync(command, { cwd: currentPath, stdio: "inherit" });
}

main();
