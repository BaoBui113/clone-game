add app.js file

yarn add express cors @mhoc/axios-digest-auth querystring

package.json scripts add

"build": "next build",
"start": "next start",
"lint": "next lint",

"dev": "next dev",
"app": "node app"

npm run dev
npm run app

LoginForm.tsx ->

// const apiEndpoint = "http://api.plusgalaxy.com/api/login";
const apiEndpoint = "http://localhost:8000/user/login";