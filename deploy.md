# Deploy

This document is for internal use only and describes the current deployment/release process on GitHub.
 
1. Merge changes/ PR to main branch
1. Switch to main branch
1. In root folder execute
   ```
   npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git]
   ```
   see: [npm version](https://docs.npmjs.com/cli/v11/commands/npm-version)

   This will change version in all package*.json with the ```NEW_VERSION``` and creates a local tag ```NEW_VERSION``
1. Create a new releasenotes file ```/releasenotes/[NEW_VERSION].md``` with changes.
1. Commit changes to main branch 
1. Create GitHub Release using ```NEW_VERSION``` from last step using:
   ```
   git push origin [NEW_VERSION]
   ```
   (This will trigger GitHub action: ```Create Release```)
