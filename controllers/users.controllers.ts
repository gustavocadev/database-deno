import { RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { ActionJSON } from '../actionJSON.ts'

const actionJSON = new ActionJSON('db.json', 'users')

const createUser = async (ctx: RouterContext<'/users/new-user'>) => {
    const { users } = await actionJSON.readJSON()
    // Desectructuramos la info del usuario
    const body = ctx.request.body({ type: 'form' });
    // Hacemos una validación de la info del usuario
    const formData = await body.value

    const name = formData.get('name')
    const rol = formData.get('rol')
    const age = formData.get('age')
    const country = formData.get('country')

    // console.log(Object.fromEntries(formData));

    if (!ctx.request.hasBody) {
        ctx.response.status = 404
        ctx.response.body = "Entries must have a name, age and country"
        return;
    }
    // creamos un objeto y en su interior agregamos la info que nos pasa el usuario
    const newData = {
        name,
        rol,
        age,
        country,
        picNum: Math.round(Math.random() * 25),
        id: crypto.randomUUID(),
    };
    // console.log(newData);
    users.push(newData)
    // Escribimos en nuestro data.json
    await actionJSON.writeJSON(users);
    // redireccionamos al usuario de nuevo a la página principal
    ctx.response.redirect('/')
};

const deleteUser = async (ctx: RouterContext<"/users/delete/:id">) => {
    const { users } = await actionJSON.readJSON()
    // Desestructuramos el id recibido por url
    const { id } = ctx.params;
    // Realizamos un filtro, este filtro eliminará el array con el id seleccionado
    const dataFound = users.filter((el) => el.id !== id);

    // Volvemos a introducir los datos con el nuevo arreglo generado despúes del filtro
    await actionJSON.writeJSON(dataFound);

    // Le redirigimos al cliente a la ruta inicial
    ctx.response.redirect('/')
};

const updateUser = async (ctx: RouterContext<'/users/update/:id'>) => {
    const { users } = await actionJSON.readJSON()
    const { id } = ctx.params
    const userFound = users.find(user => user.id === id)

    if(!userFound) return

    const body = ctx.request.body()
    const formData = await body.value


    userFound.name = formData.get('name')
    userFound.rol = formData.get('rol')
    userFound.age = formData.get('age')
    userFound.country = formData.get('country')

    await actionJSON.writeJSON(users);

    ctx.response.redirect('/')
}

export { createUser, deleteUser, updateUser };