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
export async function getModule(x){
  try{
    return await import(solved(x))
  }catch(e){console.error(e)}
  
  try {
    return await import(x)
  }catch(e){}
  return null; 
}
