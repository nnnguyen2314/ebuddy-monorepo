# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example

Run the following command:

```sh
npx create-turbo@latest
```

## What's inside?

This Turborepo includes the following packages/apps:

### Apps and Packages

- `docs`: a [Next.js](https://nextjs.org/) app
- `web`: another [Next.js](https://nextjs.org/) app
- `@repo/ui`: a stub React component library shared by both `web` and `docs` applications
- `@repo/eslint-config`: `eslint` configurations (includes `eslint-config-next` and `eslint-config-prettier`)
- `@repo/typescript-config`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Install dependencies for all Apps

`npm install -w`
or
`yarn install -w`

### Build

To build all apps and packages, run the following command:

```
cd ebuddy-monorepo
yarn build
```

### Develop

To develop all apps and packages, run the following command:

```
cd ebuddy-monorepo
yarn dev
```

============== Answers of Part 4: Firestore Query for Ranking & Active Status Update Strategy ========================
1. Problem: Multi-Factor Ranking with Pagination 
   We need a query to rank users efficiently based on:
   - Total Average Weight Ratings (Highest Priority)
   - Number of Rents
   - Recently Active Time
2. Solution: Precompute a Ranking Score
   To rank users correctly, we calculate a ranking score before querying
   Formula for rankingScore:
   `(totalAverageWeightRatings * 1000) + (numberOfRents * 10) + (recentlyActive / 1_000_000);`
3. Explanation:
   Multiplying `totalAverageWeightRatings` by 1000 ensures it has the highest priority.
   Multiplying `numberOfRents` by 10 makes it secondary.
   Dividing `recentlyActive` by 1,000,000 ensures it contributes without overpowering the first two factors.
4. Firestore Query with Pagination
   4.1. Firestore Query with Pagination
   ```
   import { db } from "../config/firebaseConfig";
   export const fetchRankedUsers = async (lastDoc: any = null, limit: number = 10) => {
       let query = db.collection("USERS").orderBy("rankingScore", "desc").limit(limit);

       if (lastDoc) {
          query = query.startAfter(lastDoc);
       }

       const snapshot = await query.get();
       return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
   };
   ```
   4.2. Keep `recentlyActive` Updated Automatically
        Users' `recentlyActive` field should be updated whenever they perform an action.
        Firestore Trigger to Update `recentlyActive` & `rankingScore`, use Firebase Cloud Function to update recentlyActive when users interact.

================  Answer Part 5: Personality & Technical Questions ============================== 

1️⃣ **Most Difficult Technical Problems & Solutions**
   - Problem: Develop the large-scale application, ensure it can be easy to maintain, extend and upgrade/migrate the new lib version or new platform/technologies.
   - Issue:
     + Libs have some deprecated features cause or conflicts between frameworks and libs when we upgrade to new version. Ex: upgrade from Next 13/14 to Next 15.
     + Migrate from Google Cloud to AWS takes much time
     + Source code comes larger and must migrate to mono-repo, apply the microservice architecture. => It's the big challenge when 
   - Fix: I divide to smaller step, make the plan to do:
     + What features/modules can be migrated/upgraded first
     + How many efforts to make things done
     + What risks and are there any chance to roll back the changes
     + ....

2️⃣ **When you’re working on a project, how do you typically approach it from start to finish**
✅ Step 1: Analyze the requirement, define the project scope, make the plan => We can't do anything we don't understand why, what we will do and when we start and finish.
✅ Step 2: Design the architecture, choose suitable technologies => Next step is define how to do. This step ensures the performance, scaling and maintain capability 
✅ Step 3: Design UI/UX (if we own the project or this phase of project)
✅ Step 4: Implementation => Should follow the coding convention, development model/process (Ex: Agile), including the self test, unit test...
✅ Step 5: Testing & Optimization.
✅ Step 6: Deployment & Monitoring

3️⃣ How I Learn New Topics Efficiently
   - Start with WHY. Why I need to learn it, it can solve which problem in real life/work
   - Read the official documents with the topics related to the problem
   - Create the simulator, practice environment to learn by practice
   - Research from online communities/forums or AI tools
   - Follow Experts – Read blog posts and GitHub repositories
   - Ask for reviewing the learning result by seniors or experts (if I know them)
   - 
4️⃣ "Consistency" vs "Fast & Efficient"
    - The best answer is "Consistency", long-term stability is more important than speed.
    But sometimes we have to choose Fast & Efficient, it depends on the most importance at the current development phase.
    We can make a short-term plan beside the long-term one for a purpose like demo or something. Then take some time to refactor the code.

5️⃣ Do I Own Any Apple Products?
   - Yes, I have iPhone 11 and iPad Gen 8

6️⃣ Immediate Availability to Start
   - I'm Ready to start immediately
