function e(e,t){return new Promise(((o,n)=>{const s=Math.random()>.3;setTimeout((()=>{s?o({position:e,delay:t}):n({position:e,delay:t})}),t)}))}document.querySelector(".form").addEventListener("submit",(async function(t){t.preventDefault();const o=new FormData(t.target),n=parseInt(o.get("delay")),s=parseInt(o.get("step")),a=parseInt(o.get("amount"));if(s<=0||n<=0||a<=0)alert("Некоректні значення step, delay або amount. Введіть правильні значення.");else for(let t=0;t<a;t++){const o=n+t*s;try{const n=await e(t+1,o);console.log(`✅ Fulfilled promise ${n.position} in ${n.delay}ms`)}catch(e){console.log(`❌ Rejected promise ${e.position} in ${e.delay}ms`)}}}));
//# sourceMappingURL=03-promises.81eccff5.js.map