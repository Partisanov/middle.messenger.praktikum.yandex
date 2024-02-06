export type Indexed<T = unknown> = {
  [key in string]: T;
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  for (const p in rhs) {
    if (!rhs.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p] && typeof rhs[p] === 'object' && lhs[p] && typeof lhs[p] === 'object') {
        lhs[p] = merge(lhs[p] as Indexed, rhs[p] as Indexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
};
