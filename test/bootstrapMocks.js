import { vi } from "vitest";
import {getModule} from "/index"

const model= {
    doSearch(){},
    currentDishEffect(){},
}

function modl(importOriginal){ return {
    model,
    getOriginal(){ return getModule("/src/DinnerModel", importOriginal);},
}}

vi.mock("/src/DinnerModel", modl)
vi.mock("/src/solved-DinnerModel", modl)

vi.mock("firebase/app")
vi.mock("firebase/firestore")

function  ctp(importOriginal){
    return {
	getOriginal(){ return getModule("/src/firestoreModel", importOriginal);},
        connectToPersistence(){}
    }  
}

vi.mock("/src/solved-firestoreModel",ctp );
vi.mock("/src/firestoreModel",ctp );


// ----- vue mocks

function vueRoot(){
    return {
        VueRoot(){ return "renderedVueRoot"},
        makeRouter(){ return "mockRouter"}
    }
}
vi.mock("/src/vuejs/solved-VueRoot",vueRoot );
vi.mock("/src/vuejs/VueRoot",vueRoot );

vi.mock("vue", function(){ 
  return {
      createApp(){
          return {
              use:vi.fn(),
              mount:vi.fn()
          };
      },
      h(x, props){return x(props)},
      reactive(x){return {...x}},
      watch(){},
}})

//--- mobx mock
vi.mock("mobx", function(){ 
    return {
	observable(x){return {...x}},
	reaction(){},
	configure(){}
    }
})

//------react mocks
vi.mock("react", function(){
    return {
	createElement(x, props){return x(props)}
    }
})

vi.mock("react-dom/client", function(){
    return {
	createRoot(){
	    return {
		render:vi.fn()
	    };
	}
    }
})

function reactRoot(){
    return {
        ReactRoot(){ return "renderedReactRoot"},
    }
}

vi.mock("/src/reactjs/solved-ReactRoot",reactRoot );
vi.mock("/src/reactjs/ReactRoot",reactRoot );


const vueBootstrap= Object.values(import.meta.glob("/src/vuejs/solved-index.*sx"))[0]
      || Object.values(import.meta.glob("/src/vuejs/index.*sx"))[0]
const reactBootstrap= Object.values(import.meta.glob("/src/reactjs/solved-index.*sx"))[0]
      || Object.values(import.meta.glob("/src/reactjs/index.*sx"))[0];
const nativeBootstrap= Object.values(import.meta.glob("/src/bootstrapping.*s"))[0];

export {vueBootstrap, reactBootstrap, nativeBootstrap}
