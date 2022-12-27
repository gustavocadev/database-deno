import { handle } from '../server.ts';
import { RouterContext } from 'https://deno.land/x/oak/mod.ts';
import { ActionJSON } from '../actionJSON.ts';

const actionJSON = new ActionJSON('db.json', 'users');

const renderIndex = async (ctx: RouterContext<'/'>) => {
  const { users } = await actionJSON.readJSON();

  ctx.response.body = await handle.renderView('index', { users });
};

const renderTeamPage = async (ctx: RouterContext<'/team'>) => {
  const team = [
    {
      name: 'René',
      picture: 'https://picsum.photos/350/350',
      description:
        'Es extraño que sólo las personas extraordinarios hagan descubrimientos que luego aparecen de manera fácil y sencilla',
    },
    {
      name: 'Edward',
      picture: 'https://picsum.photos/200/200',
      description:
        'No se puede enseñar nada a un hombre, sólo se le puede ayudar a descubrirse a sí mismo',
    },
    {
      name: 'Gustavo',
      picture: 'https://picsum.photos/400/400',
      description:
        'La ciencia nunca resuelve un problema sin crear otros 10 más. ',
    },
  ];

  ctx.response.body = await handle.renderView('team', {
    team,
  });
};

export { renderIndex, renderTeamPage };
