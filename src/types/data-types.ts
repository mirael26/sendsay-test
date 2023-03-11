import { Mode } from '../consts';
import { valueof } from './util-types';

export type TButtonType = 'operator' | 'number';

export type TModeType = valueof<typeof Mode>;
