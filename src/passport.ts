import {Strategy as GitHubStrategy, Profile as GitHubProfile} from 'passport-github2';
import {UserDocument, userModel} from './models/user';
import {CallbackError} from 'mongoose';
import passport from 'passport';
import env from './util/env';

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await userModel.findById<UserDocument>(id);
    if (!user) {
      return done(null, false);
    }

    done(null, user);
  } catch (error) {
    done(error as CallbackError);
  }
});

passport.use(new GitHubStrategy(
  {
    callbackURL: env('GITHUB_CALLBACK_URL'),
    clientID: env('GITHUB_CLIENT_ID'),
    clientSecret: env('GITHUB_CLIENT_SECRET'),
    proxy: true,
    scope: ['user:email'],
  },
  async function (
    _accessToken: string,
    _refreshToken: string,
    profile: GitHubProfile,
    done: (error: unknown, user?: UserDocument | false | null) => void,
  ): Promise<void> {
    try {
      if (!profile.id) {
        return done(null, false);
      }

      let user = await userModel.findOne({githubId: profile.id});
      if (!user) {
        user = new userModel({
          avatar: profile.photos?.[0]?.value || '',
          githubId: profile.id,
          username: profile.username,
        });

        await user.save();
      }

      done(null, user);
    } catch (error) {
      done(error);
    }
  },
));

export default passport;
