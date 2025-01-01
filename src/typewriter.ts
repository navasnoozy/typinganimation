type QueueItem = ()=> Promise<void>;

type TypewriterOptions = {
    loop?:boolean;
    typingSpeed?:number;
    deletingSpeed?:number;
}

export default class Typewriter{

    #queue : QueueItem []= [];
    #element : HTMLElement;
    #loop:boolean;
    #typingSpeed:number;
    #deletingSpeed:number;

    constructor(parent:HTMLElement,{loop=false,typingSpeed=50,deletingSpeed=50}:TypewriterOptions={}){
        this.#element = document.createElement('div');
        parent.append(this.#element);
        this.#loop = loop;
        this.#typingSpeed = typingSpeed;
        this.#deletingSpeed = deletingSpeed;

    }

    typeString(string:string):this{
        this.#addToQueue(async resolve=>{
            for (let i=0;i<string.length;i++){
                this.#element.append(string[i]);
                await this.#wait(this.#typingSpeed);
            }
            resolve();
        });
        return this;
    }

    deleteChars(number:number):this{
        this.#addToQueue(async resolve=>{
            for (let i=0;i<number;i++){
                this.#element.innerText= this.#element.innerText.slice(0,-1);
                await this.#wait(this.#deletingSpeed);
            }
            resolve();
        });
        return this;
    }

    deleteAll(deleteSpeed = this.#deletingSpeed):this{
        this.#addToQueue(async resolve =>{ 
            while (this.#element.innerText.length >0){
                this.#element.innerText = this.#element.innerText.slice(0,-1);
                await this.#wait(deleteSpeed);
            }
            resolve();
        });
        return this;
    }

    puaseFor(duration:number):this{
        this.#addToQueue(resolve=>{
            setTimeout(resolve,duration);
        });
        return this;
    }

    async start():Promise <this>{
        while(this.#queue.length){
            const cb = this.#queue.shift();
            if (cb) await cb();
            if(this.#loop && cb) this.#queue.push(cb);
        };
        return this;
    }

    #addToQueue(cb:(resolve:()=>void)=>void):void{
        this.#queue.push(()=>new Promise(cb));

    }

    #wait(ms:number):Promise<void>{
        return new Promise (resolve =>setTimeout(resolve,ms))
    }

}