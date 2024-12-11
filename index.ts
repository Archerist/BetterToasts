export default class BetterToasts {
    #drawregion: HTMLDivElement
    #timeout: number
    #maxNumberOfToasts: number
    constructor(opts?: Options)
    {
        this.#drawregion = document.createElement("div")
        this.#timeout = opts?.timeout ?? 5
        this.#maxNumberOfToasts = opts?.maxNumberOfToasts ?? 10


        this.#drawregion.style.position = "absolute"
        this.#drawregion.style.width = "100%"
        this.#drawregion.style.height = "100%"
        this.#drawregion.style.top = "0"
        this.#drawregion.style.left = "0"


        this.#drawregion.style.display = "flex"
        this.#drawregion.style.flexDirection = opts?.direction ?? "column"
        this.#drawregion.style.justifyContent = opts?.justify ?? "flex-start"
        this.#drawregion.style.alignItems = opts?.align ?? "stretch"
        this.#drawregion.style.gap = opts?.gap ?? "5px"

        let _p = opts?.parent ? opts.parent : document.body
        _p.appendChild(this.#drawregion)
    }

    postToast(msg:string, cssClass: string = "toast"){
        let el = document.createElement("div")
        el.textContent = msg
        el.className = cssClass
        this.addItem(el)
    }

    postParameteredToast(msg:string[], values:Parameter[], cssClass:string = "toast"){
        let el = document.createElement("div")
        console.log(msg,values)
        for (let i = 0; i < msg.length; i++) {
            el.innerHTML += msg[i] ?? ""
            let span = document.createElement("span")
            if (values[i]) {
                
                span.className = values[i].cssClass ?? "parameter"
                span.innerText = values[i].text ?? ""
                el.appendChild(span)
                
            }
        }

        el.className = cssClass
        this.addItem(el)
    }

    postElement(el: HTMLElement){
        this.addItem(el)
    }

    private addItem(el: HTMLElement){
        this.#drawregion.appendChild(el)

        if (this.#drawregion.childNodes.length > this.#maxNumberOfToasts) {
            let rmel = this.#drawregion.children.item(0) as HTMLElement
            if (rmel) this.removeItem(rmel)
        }

        if (this.#timeout !== 0 ) {
            setTimeout(() => {
                this.removeItem(el)
            },  this.#timeout * 1000);  
        }  
    }

    private removeItem(el:HTMLElement){
        el.remove()
    }
}

type Parameter = {
    text: string,
    cssClass: string
}

type Options = {
    direction?:  "row" |"row-reverse" |"column" |"column-reverse", 
    justify?: "flex-start" | "flex-end",
    align?: "flex-start" | "flex-end" | "stretch" | "center"
    timeout?:number, 
    parent?: HTMLElement,
    gap?: string,
    maxNumberOfToasts: number,
    //fadeDuration: number
}