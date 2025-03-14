export function customEventWrap(component, customEventStatus){
  return function (props){
      return component(new Proxy(props, {
            get(target, p){
             if(target.hasOwnProperty(p))
               return target[p];

            customEventStatus.name= p;
            return function(...params){ customEventStatus.params= params;}
        }
      }));
    }
  }

export function solved(x){
  const slash= x.lastIndexOf("/")+1;
  return x.substring(0,slash)+"solved-"+x.substring(slash);
}
export async function getModule(x, importer){
  try{
      return importer?await importer(solved(x)):await import(solved(x))
  }catch(e){}
  
  try {
      return importer?await importer(x):await import(x)
  }catch(e){}
  return null; 
}
