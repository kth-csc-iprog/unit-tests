import { defineConfig } from 'vite';
export default defineConfig(function(params){
    return {
    test: {
        globals: true, 
        environment: "jsdom",
    },
    resolve:{
        alias: [
            {
            find:"/src/teacherFetch.js",
            replacement: "/test/empty.js"
            },
        ]
    }
    }
})