/* This is a script to create a new photo markdown file with front-matter */

import fs from "fs"
import path from "path"

function getDate() {
	const today = new Date();
	const year = today.getFullYear();
	const month = String(today.getMonth() + 1).padStart(2, "0");
	const day = String(today.getDate()).padStart(2, "0");
	const hours = String(today.getHours()).padStart(2, "0");
	const minutes = String(today.getMinutes()).padStart(2, "0");

	return `${year}-${month}-${day}T${hours}:${minutes}:00`;
}

const args = process.argv.slice(2).filter(arg => arg !== "--")

if (args.length === 0) {
  console.error(`Error: No name argument provided
Usage: pnpm new-photo -- <name>`)
  process.exit(1)
}

const name = args[0]

const targetDir = path.join("./src/content/photos/", name)
const fullPath = path.join(targetDir, `${name}.md`)

if (fs.existsSync(fullPath)) {
  console.error(`Error: File ${fullPath} already exists `)
  process.exit(1)
}

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true })
}

const content = `---
title: ${name}
published: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false
lang: ''
---
`

fs.writeFileSync(fullPath, content)

console.log(`Photo ${fullPath} created`)
