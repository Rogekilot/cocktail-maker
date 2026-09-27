import type { FlavorKey, GlassKey, IngredientCategory, MethodKey, SpiritKey, Strength, StyleKey } from '../../data/types';

export const zhSpirit: Record<SpiritKey, string> = {
  gin: '金酒',
  whiskey: '威士忌',
  rum: '朗姆酒',
  tequila: '龙舌兰',
  mezcal: '梅斯卡尔',
  brandy: '白兰地与干邑',
  vodka: '伏特加',
  pisco: '皮斯科',
  cachaca: '卡莎萨',
  none: '其他基底',
};

export const zhFlavor: Record<FlavorKey, string> = {
  citrusy: '柑橘清新',
  'spirit-forward': '烈酒主导',
  bitter: '苦甜',
  refreshing: '清爽',
  herbal: '草本',
  sweet: '醇厚甜润',
  smoky: '烟熏',
  bubbly: '气泡',
  coffee: '咖啡',
  fruity: '果香',
  spicy: '辛香',
  creamy: '奶香顺滑',
  tropical: '热带风情',
  savory: '咸鲜',
  floral: '花香',
};

export const zhStyle: Record<StyleKey, string> = {
  sour: '酸酒类',
  stirred: '搅拌型烈饮',
  highball: '长饮·气泡',
  sparkling: '起泡酒调',
  smash: '碎冰·朱利普',
  muddled: '捣压型',
  tiki: '提基',
  hot: '热饮',
  creamy: '奶油型',
};

export const zhMethod: Record<MethodKey, string> = {
  shaken: '摇和',
  stirred: '搅拌',
  built: '杯中直调',
  muddled: '捣压',
  swizzled: '搅棒搅拌（Swizzle）',
  blended: '搅拌机打制',
};

export const zhStrength: Record<Strength, string> = {
  light: '较低',
  medium: '中等',
  strong: '较高',
};

export const zhGlass: Record<GlassKey, string> = {
  rocks: '岩石杯',
  coupe: '碟形杯 / 鸡尾酒杯',
  martini: '马天尼杯',
  highball: '高球杯',
  collins: '柯林斯杯',
  flute: '香槟杯',
  mule: '铜杯',
  julep: '朱利普杯',
  irish: '爱尔兰咖啡杯',
  hurricane: '飓风杯',
  wine: '葡萄酒杯',
};

export const zhCategory: Record<IngredientCategory, string> = {
  spirit: '烈酒',
  liqueur: '利口酒与味美思',
  wine: '葡萄酒',
  bitters: '苦精',
  citrus: '柑橘',
  sweetener: '甜味剂',
  mixer: '调和饮料',
  fresh: '新鲜食材',
  pantry: '常备食品',
};

export const zhPickerGroups = ['烈酒', '利口酒、味美思与葡萄酒', '柑橘与新鲜食材', '甜味剂与调和饮料', '苦精与常备食品'];
