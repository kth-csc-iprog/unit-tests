import { expect, test, vi } from "vitest"

import { getModule } from "../index"

import {model} from "./bootstrapMocks.js"

import {vueBootstrap} from "./bootstrapMocks.js"
if (vueBootstrap)
    test("bootstrap Vue", async function (test) {
        const vue= await import("vue")
        const VueRoot = vi.spyOn(await getModule("/src/vuejs/VueRoot"), "VueRoot")
        const reactive = vi.spyOn(vue, "reactive")
        const createApp = vi.spyOn(vue, "createApp")

        // run the bootstrapping
        await vueBootstrap();

        expect(createApp).toHaveBeenCalled()
        const app= createApp.mock.results[0].value;

        expect(app.mount).toHaveBeenCalled();
        const mountParam= app.mount.mock.calls[0][0];

        if ( mountParam != "#root") {
            console.warn("mount to #root to enable")
            test.skip()
        }

        expect(reactive).toHaveBeenCalledWith(model)
        const reactiveModel= reactive.mock.results[0].value;
       
        let createAppParam = createApp.mock.calls[0][0];  // first param of the first call
        if (typeof createAppParam === "function")
            createAppParam = createAppParam();

        expect(createAppParam, "createApp should be called with a rendering of VueRoot as parameter")
            .toEqual("renderedVueRoot")

        expect(VueRoot, "VueRoot must get one prop, called model, with the reactiveModel as value")
            .toHaveBeenCalledWith({ model: reactiveModel })
    })


    
import {reactBootstrap} from "./bootstrapMocks.js"
if (reactBootstrap)
    test("bootstrap React", async function (test) {
        const ReactRoot = vi.spyOn(await getModule("/src/reactjs/ReactRoot"), "ReactRoot")
        const createRoot = vi.spyOn(await import("react-dom/client"), "createRoot")
        const div= document.createElement("div")
        const getElementById= vi.spyOn(document, "getElementById").mockReturnValue(div);
        const observable = vi.spyOn(await import("mobx"), "observable")
	
        // Run the bootstrapping
        await reactBootstrap();
	
        expect(createRoot).toHaveBeenCalledWith(div);
        expect(getElementById).toHaveBeenCalled()
	
	const id= getElementById.mock.calls[0][0];
	
        if ( id != "root") {
            console.warn("mount to 'root' to enable")
            test.skip()
        }
        const mountRoot= createRoot.mock.results[0].value;
        expect(mountRoot.render).toHaveBeenCalled();
	
        expect(observable).toHaveBeenCalledWith(model)
        const reactiveModel= observable.mock.results[0].value;
	
        
        let renderParam = mountRoot.render.mock.calls[0][0];  // first param of the first call
	
        expect(renderParam, "render should be called with a rendering of ReactRoot as parameter")
            .toEqual("renderedReactRoot")
	
        expect(ReactRoot, "ReactRoot must get one prop, called model, with the reactiveModel as value")
            .toHaveBeenCalledWith({ model: reactiveModel })
    })

import {nativeBootstrap} from "./bootstrapMocks.js"
if(nativeBootstrap)
    test("bootstrap React Native", async function (test) {
	const observable = vi.spyOn(await import("mobx"), "observable")

	// run the bootstrapping:
	const ret= await nativeBootstrap();
	
	expect(observable).toHaveBeenCalledWith(model)
	const reactiveModel = observable.mock.results[0].value;

	expect(ret.reactiveModel).toBe(reactiveModel)
    })
