import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
    try {
        console.log("===================================================");
        console.log("🎨       PORTFOLIO ARTWORK UPLOAD ASSISTANT        ");
        console.log("===================================================\n");
        
        const title = await ask("1. Artwork Title: ");
        if (!title.trim()) {
            throw new Error("Artwork Title cannot be empty.");
        }

        const desc = await ask("2. Description (press Enter for none): ");
        const altText = await ask("3. Screen Reader Alt Text: ");
        const year = await ask("4. Year: ");
        const tagsInput = await ask("5. Tags (comma separated): ");
        const link = await ask("6. DeviantArt link (press Enter for none): ");
        const sourceImagePath = await ask("7. Drag and drop your PNG or JPG file here, then press Enter: ");
        
        const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
        const cleanName = title.toLowerCase().replace(/[^a-z0-9]/g, '');
        
        if (!cleanName) {
            throw new Error("Title must contain at least one letter or number.");
        }

        const cleanSourcePath = sourceImagePath.replace(/['"]/g, '').trim();
        if (!cleanSourcePath || !fs.existsSync(cleanSourcePath)) {
            throw new Error(`Could not find the source image at: "${cleanSourcePath}". Please verify the file path.`);
        }

        const ext = path.extname(cleanSourcePath).toLowerCase();
        const filename = `${cleanName}${ext || '.png'}`;
        
        // Ensure image destination exists
        const destDir = path.join('src', 'assets', 'images');
        if (!fs.existsSync(destDir)) {
            fs.mkdirSync(destDir, { recursive: true });
        }

        const destImagePath = path.join(destDir, filename);
        fs.copyFileSync(cleanSourcePath, destImagePath);
        console.log(`\n✔ Image copied successfully to: ${destImagePath}`);
        
        // Read galleryData.ts
        const filePath = path.join('src', 'galleryData.ts');
        if (!fs.existsSync(filePath)) {
            throw new Error(`Could not find portfolio database at ${filePath}`);
        }
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Generate import and insert entry
        const importStatement = `import ${cleanName} from './assets/images/${filename}';\n`;
        content = importStatement + content;
        
        const escapedDesc = desc.replace(/"/g, '\\"').replace(/\n/g, '\\n');
        const escapedAltText = altText.replace(/"/g, '\\"');
        const newEntry = `  {
    id: 'da-${cleanName}',
    title: "${title}",
    description: "${escapedDesc}",
    imageUrl: ${cleanName},
    year: "${year || new Date().getFullYear().toString()}",
    tags: ${JSON.stringify(tags)},
    link: "${link || 'https://www.deviantart.com/thedustyphoenix'}",
    altText: "${escapedAltText || title}"
  },`;
        
        // Insert entry at the start of the defined list array
        content = content.replace(/=\s*\[/, `=\n[\n${newEntry}`);
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log("✔ Portfolio metadata database updated successfully.");
        
        console.log("\n📦 Building website and deploying directly to Cloudflare Pages...");
        console.log("-------------------------------------------------------------------");
        
        // This is a direct deployment of the static built folder 'dist' to Cloudflare Pages
        execSync('npm run build && npx wrangler pages deploy dist --project-name=thedustyphoenix --branch=production', { stdio: 'inherit' });
        
        console.log("\n===================================================");
        console.log("🎉 SUCCESS! Your new artwork is live on Cloudflare Pages!");
        console.log("===================================================");
    } catch (error) {
        console.log("\n❌ PROCESS FAILED!");
        console.log("-------------------------------------------------------------------");
        console.log(`Error explanation: ${error.message}`);
        console.log("\nNo file logs were written to disk. The error has been displayed above.");
        console.log("Please check if you have signed in to wrangler (npx wrangler login) and try again.");
        console.log("-------------------------------------------------------------------");
    } finally {
        console.log("\nThis window will stay open so you can read the build output log.");
        await ask("Press Enter to close this window...");
        rl.close();
    }
}

main();
