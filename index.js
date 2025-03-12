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
