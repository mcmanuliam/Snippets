import {SnippetDocument, SnippetInterface, snippetModel} from '../models/snippet';
import {ActionTypes} from '../util/action-types';
import {Request, Response} from 'express';
import {Types} from 'mongoose';

export async function create(req: Request, res: Response): Promise<void> {
  try {
    const {title, description, code} = req.body;
    const user = req.user?._id;

    if (!user) {
      res.unauthorized();
    }

    const snippet = new snippetModel({
      code,
      description,
      title,
      user,
    });

    await snippet.save();
    res.ok(snippet, `Successfully created Snippet ${snippet._id.toString()}`);
  } catch (error) {
    res.negotiate(error);
  }
};

export async function find(req: Request, res: Response): Promise<void> {
  try {
    const snippets = await snippetModel
      .find<SnippetDocument>(req.query ?? {})

    res.ok(snippets);
  } catch (error) {
    res.negotiate(error);
  }
};

export async function findById(req: Request, res: Response): Promise<void> {
  if (!req.params.id) {
    return res.badRequest();
  }

  try {
    const snippet = await snippetModel
      .findById<SnippetDocument>(new Types.ObjectId(req.params.id))
      .populate('user');

    if (!snippet) {
      return res.notFound();
    }

    res.ok(snippet);
  } catch (error) {
    res.negotiate(error);
  }
};

export async function update(req: Request, res: Response): Promise<void> {
  if (!req.params.id) {
    return res.badRequest();
  }

  try {
    const snippet = await snippetModel
      .findById<SnippetDocument>(new Types.ObjectId(req.params.id))

    if (!snippet) {
      return res.notFound();
    }

    if (req.user?._id.toHexString() !== snippet.user.toHexString()) {
      return res.unauthorized();
    }

    const body: Partial<SnippetInterface> = req.body;
    snippet.set(body);

    await snippet.save();

    res.ok(snippet, `Successfully updated Snippet ${snippet._id.toString()}`);
  } catch (error) {
    res.negotiate(error);
  }
};

export async function action(req: Request, res: Response): Promise<void> {
  if (!req.params.id || Object.values(ActionTypes).includes(req.params.action as ActionTypes)) {
    return res.badRequest()
  }

  const action = req.params.action as ActionTypes;

  try {
    const snippet = await snippetModel.findById<SnippetDocument>(new Types.ObjectId(req.params.id));
    if (!snippet) {
      return res.notFound();
    }

    if (action === ActionTypes.UPVOTES) {
      snippet.upvotes += 1;
    } else if (action === ActionTypes.DOWNVOTES) {
      snippet.downvotes += 1;
    }

    await snippet.save();

    res.ok(snippet, `Successfully actioned ${action} Snippet ${snippet._id.toString()}`);
  } catch (error) {
    res.negotiate(error);
  }
};
