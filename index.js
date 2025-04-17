#!/usr/bin/env node

import inquirer from 'inquirer';
import fs from 'fs-extra'; 
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import chalk from 'chalk';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const templatesDir = path.join(__dirname, 'templates');

const frontendTemplateDir = path.join(templatesDir, 'frontend'); 

async function run() {
    console.log(chalk.cyan('Creating your Fullstack Web Template...'));

    
    const args = process.argv.slice(2); 
    let projectName = args[0];
    let targetDir = process.cwd(); 
    let createdProjectDir = false; 

    if (projectName && projectName !== '.') {
        targetDir = path.join(process.cwd(), projectName);
        if (fs.existsSync(targetDir)) {
            console.error(chalk.red(`Error: Directory '${projectName}' already exists.`));
            process.exit(1);
        }
        fs.mkdirSync(targetDir);
        createdProjectDir = true;
        console.log(chalk.green(`Created project directory: ${projectName}`));
    } else if (!projectName) {
        
        const nameAnswer = await inquirer.prompt([
            {
                type: 'input',
                name: 'projectName',
                message: 'Enter a name for your project:',
                default: 'my-webfs-app', 
                validate: (input) => {
                    if (!input) return 'Project name cannot be empty.';
                    const potentialPath = path.join(process.cwd(), input);
                    if (input !== '.' && fs.existsSync(potentialPath)) {
                        return `Directory '${input}' already exists. Choose another name or use '.' for current directory.`;
                    }
                    return true;
                }
            }
        ]);
        projectName = nameAnswer.projectName;
        if (projectName !== '.') {
            targetDir = path.join(process.cwd(), projectName);
            fs.mkdirSync(targetDir);
            createdProjectDir = true;
            console.log(chalk.green(`Created project directory: ${projectName}`));
        } else {
            projectName = path.basename(process.cwd()); 
            console.log(chalk.yellow(`Creating project in the current directory: ${targetDir}`));
        }
    } else { 
        projectName = path.basename(process.cwd()); 
        console.log(chalk.yellow(`Creating project in the current directory: ${targetDir}`));
    }

    
    const backendChoice = await inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: 'Select backend language:',
            choices: [
                { name: 'Node.js + TypeScript', value: 'ts' },
                { name: 'Node.js + JavaScript', value: 'js' },
            ],
        },
    ]);

    const backendType = backendChoice.type; 
    const backendTemplateDir = path.join(templatesDir, backendType === 'ts' ? 'backend-ts' : 'backend-js');
    const backendTargetDir = path.join(targetDir, 'backend');
    const frontendTargetDir = path.join(targetDir, 'frontend'); 

    try {
        
        console.log(chalk.blue('\nSetting up Frontend (React + Vite + Tailwind)...'));

        
        if (!fs.existsSync(frontendTemplateDir)) {
            console.error(chalk.red(`Error: Frontend template not found at ${frontendTemplateDir}`));
            console.error(chalk.red('Please make sure you have created the pre-built frontend template in the "templates/frontend" directory.'));
            throw new Error('Frontend template missing.'); 
        }

        
        fs.copySync(frontendTemplateDir, frontendTargetDir);
        console.log(chalk.green(' ✓ Frontend Created'));

        
        console.log(chalk.yellow(`\nInstalling frontend dependencies (this might take a minute)...`));
        execSync('npm install', { cwd: frontendTargetDir, stdio: 'inherit' });
        console.log(chalk.green.bold('Frontend setup complete!'));


        
        console.log(chalk.blue(`\nSetting up Backend (Node + Express + ${backendType === 'ts' ? 'TypeScript' : 'JavaScript'})...`));

        
        if (!fs.existsSync(backendTemplateDir)) {
             console.error(chalk.red(`Error: Backend template not found at ${backendTemplateDir}`));
             throw new Error('Backend template missing.');
        }

        
        fs.copySync(backendTemplateDir, backendTargetDir);
        console.log(chalk.green(' ✓ Backend Created'));

        
        const backendPkgPath = path.join(backendTargetDir, 'package.json');
        if(fs.existsSync(backendPkgPath)) {
             try {
                const backendPkg = fs.readJsonSync(backendPkgPath);
                backendPkg.name = `backend`;
                fs.writeJsonSync(backendPkgPath, backendPkg, { spaces: 2 });
                console.log(chalk.green(' ✓ Backend package.json updated.'));
             } catch (pkgError) {
                 console.warn(chalk.yellow(`Warning: Could not update backend package.json: ${pkgError.message}`));
             }
        } else {
             console.log(chalk.yellow(' Backend package.json not found in template. Skipping update.'));
        }

        
        console.log(chalk.yellow(`\nInstalling backend dependencies...`));
        execSync('npm install', { cwd: backendTargetDir, stdio: 'inherit' });

        
        console.log(chalk.yellow('\nPrisma setup included in template (prisma/schema.prisma).'));
        console.log(chalk.yellow('Remember to configure your database connection in .env files and run Prisma commands.'));

        console.log(chalk.green.bold('Backend setup complete!'));

        
        console.log(chalk.cyan.bold('\n🎉 Project setup finished! 🎉'));
        console.log('\nNext steps:');
        
        if (createdProjectDir) {
            console.log(chalk.yellow(`  cd ${projectName}`));
        }
        console.log(chalk.yellow('\n  --- Frontend ---'));
        console.log(chalk.yellow(`  cd ${createdProjectDir ? '' : 'frontend'} `)); 
        console.log(chalk.yellow('  npm run dev   (Starts the frontend dev server)'));

        console.log(chalk.yellow('\n  --- Backend ---'));
        console.log(chalk.yellow(`  cd ${createdProjectDir ? '../backend' : 'backend'}`)); 
        console.log(chalk.yellow('  1. Configure your database connection string in the .env files (e.g., .env.local)'));
        console.log(chalk.yellow('  2. Update the provider in `prisma/schema.prisma` (e.g., "postgresql", "mysql", "mongodb")'));
        console.log(chalk.yellow('  3. Run `npx prisma db push` (for initial sync/prototyping) or `npx prisma migrate dev` (recommended for development)'));
        console.log(chalk.yellow('  4. Run `npm run start:local` (Starts the backend server using .env.local)'));
        console.log(chalk.dim('     Other backend commands: `npm run start:dev` (if configured), `npm run start:test`, `npm run start:prod`'));
        if (backendType === 'ts') {
             console.log(chalk.dim('     For TS production: `npm run build` then `npm run start:prod`'));
        }


    } catch (error) {
        console.error(chalk.red('\nAn error occurred during setup:'));
        console.error(error.message); 
        
        console.log(chalk.yellow('Attempting to clean up...'));
        if (createdProjectDir && fs.existsSync(targetDir)) {
             console.log(chalk.yellow(`Removing directory: ${targetDir}`));
             fs.removeSync(targetDir);
        } else {
             
             if(fs.existsSync(frontendTargetDir)) fs.removeSync(frontendTargetDir);
             if(fs.existsSync(backendTargetDir)) fs.removeSync(backendTargetDir);
             console.log(chalk.yellow(`Removed frontend and backend folders from current directory.`));
        }
        process.exit(1);
    }
}

run();