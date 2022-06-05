import { Router } from 'express';

import { CreateLikeController } from '@post/controllers/create-like-controller';
import { CreatePostController } from '@post/controllers/create-post-controller';
import { ListPostsByUserController } from '@post/controllers/list-posts-by-user-controller';

const postRoutes = Router();

const createPostController = new CreatePostController();
const createLikeController = new CreateLikeController();
const listPostsByUserController = new ListPostsByUserController();

postRoutes.post('/', createPostController.handle);
postRoutes.get('/:email', listPostsByUserController.handle);
postRoutes.post('/like', createLikeController.handle);

export { postRoutes };
