export NODE_ENV=development
./canvas_modules/common-canvas/build.sh
cd canvas_modules/harness
npm install
npm run build
npm start