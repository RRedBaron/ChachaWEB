FROM node:18.16.1

WORKDIR /app

COPY . .

RUN if test -d node_modules; then find node_modules -regex '.*\.o' | xargs file | grep -v 'ELF 64-bit LSB relocatable, x86-64, version 1 (SYSV), not stripped' | cut -d/ -f1-2 | sort -u | xargs rm -rf; fi

RUN npm ci --production 

# 'npm run build' command compiles type script to java script
# 'npm run build' == 'rm -rf dist && tsc -p tsconfig.build.json'
RUN npm run build

USER node

CMD node dist/index.js
