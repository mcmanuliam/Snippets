import {Request, Response} from 'express';

export function githubCallback(req: Request, res: Response): void {
  if (!req.user) {
    return res.badRequest();
  }

  req.session.save((error) => {
    if (error) {
      return res.negotiate(error);
    }
    res.ok({user: req.user});
  });
}

export function logout(req: Request, res: Response): void {
  if (!req.isAuthenticated()) {
    res.unauthorized();
  }

  req.logout((logoutError) => {
    if (logoutError) {
      return res.negotiate(logoutError);
    }

    req.session.destroy((sessionError) => {
      if (sessionError) {
        return res.negotiate(sessionError);
      }

      res.clearCookie('connect.sid', {
        httpOnly: true,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      });

      res.ok();
    });
  });
}
