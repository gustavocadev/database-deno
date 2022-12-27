import { Router } from 'https://deno.land/x/oak/mod.ts';
import {
  renderTeamPage,
  renderIndex,
} from '../controllers/renderPages.controllers.ts';
import { handle } from '../server.ts';
import { ActionJSON } from '../actionJSON.ts';

const router = new Router();
const actionJSON = new ActionJSON('db.json', 'users');

// Renderizamos la vista del index
router.get('/', renderIndex);

// Renderizamos la vista de new-user
router.get('/users/new-user', async (ctx) => {
  ctx.response.body = await handle.renderView('new-user');
});

router.get('/team', renderTeamPage);

router.get('/users/edit-user/:id', async (ctx) => {
  const { users } = await actionJSON.readJSON();

  const { id } = ctx.params;

  const userData = users.find((user) => user.id === id);

  ctx.response.body = await handle.renderView('edit-user', {
    userData,
  });
});

export default router;
