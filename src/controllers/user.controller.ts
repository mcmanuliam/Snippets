import {Request, Response} from 'express';
import {UserDocument, userModel} from '../models/user';
import {Types} from 'mongoose';
import {platformConfig} from '../config/platform.config';

export async function current(req: Request, res: Response): Promise<void> {
  if (!req.user) {
    return res.badRequest();
  }

  try {
    const user = await userModel.findById<UserDocument>(req.user._id)
    if (!user) {
      return res.notFound();
    }

    res.ok(user);
  } catch (error) {
    res.negotiate(error);
  }
}

export async function findById(req: Request, res: Response): Promise<void> {
  if (!req.params.id) {
    return res.badRequest();
  }

  try {
    const user = await userModel.findById<UserDocument>(new Types.ObjectId(req.params.id))
    if (!user) {
      return res.notFound();
    }

    res.ok(user);
  } catch (error) {
    res.negotiate(error);
  }
}

export async function destroy(req: Request, res: Response): Promise<void> {
  try {
    const user = req.user as UserDocument;
    const deletedUser = await userModel.findByIdAndDelete(user._id);
    if (!deletedUser) {
      return res.notFound();
    }

    req.logout((err) => {
      if (err) {
        return res.error();
      }

      req.session.destroy((destroyErr) => {
        if (destroyErr) {
          return res.error();
        }

        res.clearCookie(platformConfig.cookie.name, {
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV === 'production',
        });

        return res.ok({}, `successfully deleted user ${user._id.toString()}`);
      });
    });

  } catch (error) {
    return res.negotiate(error);
  }
}
