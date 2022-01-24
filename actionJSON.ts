import * as path from 'https://deno.land/std/path/mod.ts';


interface ReadJSON {
    [propName: string]: Record<string, unknown>[]
}

class ActionJSON {

    constructor(
        private pathAndFileName: string,
        private entryPropertyName: string
    ) {}

    async writeJSON(newArray: Record<string, unknown>[], indent = { indent: true }) {
        const newData = {
            [this.entryPropertyName]: newArray
        }
        // by default the indent is true
        if (!indent.indent) {
            await Deno.writeTextFile(path.join(Deno.cwd(), this.pathAndFileName), JSON.stringify(newData))
            return
        } 
        // Write JSON 
        await Deno.writeTextFile(path.join(Deno.cwd(), this.pathAndFileName), JSON.stringify(newData, null, 4))
    }


    async readJSON(): Promise<ReadJSON> {
        // We read the data 
        const data = await Deno.readTextFile(path.join(Deno.cwd(), this.pathAndFileName))
        
        // if there's no content we create a template :D
        if (data.length === 0) {
            const newData = {
                [this.entryPropertyName]: []
            }
            await Deno.writeTextFile(path.join(Deno.cwd(), this.pathAndFileName), JSON.stringify(newData, null, 4))
            return newData

        }
        return JSON.parse(data)
    }

}


export { ActionJSON }