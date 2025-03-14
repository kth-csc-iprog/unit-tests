import { defineConfig } from 'vite';
export default defineConfig(function(params){
    return {
    test: {
        globals: true, 
        environment: "jsdom",
    },
    resolve:{
        alias: ["./teacherFetch", "./teacherFetch.js", "./teacherFetch.ts",
		"/src/teacherFetch",  "/src/teacherFetch.js", "/src/teacherFetch.ts"]
	    .map(find=>({find, replacement :"/test/empty.js"}))

    }
    }
})
