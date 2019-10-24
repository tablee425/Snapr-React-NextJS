import { replaceRoute } from '../../utils';

export default (target, ctx = {}) => {
  if (ctx.res) {
    ctx.res.redirect(target);
    ctx.res.end();
  } else {
    replaceRoute(target);
  }
};
