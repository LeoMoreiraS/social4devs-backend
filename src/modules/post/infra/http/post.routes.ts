import { Router } from 'express';

import { AuthorizationMiddleware } from '@shared/middlewares/authorization-middleware';

import { CreateCommentaryController } from '@post/controllers/create-commentary-controller';
import { CreateLikeController } from '@post/controllers/create-like-controller';
import { CreatePostController } from '@post/controllers/create-post-controller';
import { DeleteCommentaryController } from '@post/controllers/delete-commentary-controller';
import { DeleteLikeController } from '@post/controllers/delete-like-controller';
import { ListPostsByUserController } from '@post/controllers/list-posts-by-user-controller';
import { ListPostsTimelineController } from '@post/controllers/list-posts-timeline-controller';

const postRoutes = Router();

const createPostController = new CreatePostController();
const createLikeController = new CreateLikeController();
const deleteLikeController = new DeleteLikeController();
const listPostsByUserController = new ListPostsByUserController();
const listPostsTimelineController = new ListPostsTimelineController();
const authorizationMiddleware = new AuthorizationMiddleware();
const createCommentaryController = new CreateCommentaryController();
const deleteCommentaryController = new DeleteCommentaryController();

postRoutes.use(authorizationMiddleware.verifyToken);
postRoutes.post('/', createPostController.handle);
postRoutes.get('/user/:pageEmail', listPostsByUserController.handle);
postRoutes.get('/', listPostsTimelineController.handle);
postRoutes.post('/like', createLikeController.handle);
postRoutes.delete('/like', deleteLikeController.handle);
postRoutes.post('/commentary', createCommentaryController.handle);
postRoutes.delete('/commentary', deleteCommentaryController.handle);

export { postRoutes };
