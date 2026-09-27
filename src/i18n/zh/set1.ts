import type { CocktailText } from '../types';

// IBA category names, kept consistent across all entries.
const UNF = '“难忘经典”（The Unforgettables）';
const CC = '“当代经典”（Contemporary Classics）';
const NE = '“新时代”（New Era）';

/** Translation of the `supports` sentence built by `iba()` in src/data/sources.ts. */
const ibaZh = (category: string, extra = '') =>
  `本页所示的配方、做法、杯型和装饰。国际调酒师协会（IBA）将其列入${category}类别。${extra}`;

/** Translation of the `supports` sentence built by `drinksIntl()` in src/data/modern.ts. */
const diZh = (rank: number) => `在其2025年全球最佳酒吧调查中将这款酒排在第${rank}位。`;

/** Translation of the recurring Drinks International ranking fact. */
const diFact = (rank: number) =>
  `在Drinks International 2025年“全球最佳酒吧最畅销经典鸡尾酒”榜单中排名第${rank}。`;

const SHAKE_STEPS = ['将所有材料倒入摇酒壶。', '加冰充分摇和。', '滤入冰镇过的鸡尾酒杯。'];
const UP_COCKTAIL = '不加冰（净饮），盛于冰镇过的鸡尾酒杯。';
const SIMPLE_SYRUP = { label: '糖浆（1:1 单糖浆）' };
const LEMON = { label: '新鲜柠檬汁' };
const LIME = { label: '新鲜青柠汁' };

export const zhSet1: Record<string, CocktailText> = {
  'old-fashioned': {
    name: '古典鸡尾酒',
    tagline: '威士忌、糖、苦精和水——最初意义上的“鸡尾酒”。',
    description:
      '用苦精浸透一块方糖，加少许水捣压，再与威士忌一起加冰搅拌。这是现代酒吧里最接近19世纪初“鸡尾酒”定义的一杯，基本让威士忌唱主角。',
    glassName: '古典杯（岩石杯）',
    recipe: [null, { label: '方糖' }, { amountText: '几抖' }, { amountText: '几抖', label: '清水' }],
    steps: [
      '将方糖放入古典杯，用安高天娜苦精将其浸透。',
      '加入几抖清水，捣压至糖溶化。',
      '在杯中装满冰块，倒入威士忌，轻轻搅拌。',
    ],
    garnish: ['橙片或橙皮', '鸡尾酒樱桃'],
    presentation: '在古典杯中加冰块直调。',
    facts: [
      '1806年纽约的一份报纸将“cock-tail”定义为烈酒、糖、水和苦精的组合——正是这杯酒的四种元素。',
      '到了1870年代，调酒师开始用利口酒来“改良”威士忌鸡尾酒；点一杯“Old-Fashioned”（老式）威士忌鸡尾酒，就能喝到更朴素的原版——这个名字由此而来。',
    ],
    formulaNote: '国际调酒师协会（IBA）只写苦精和水各“几抖”（few dashes），没有给出确切数量。',
    sourceSupports: [
      ibaZh(UNF, '明确允许使用波本威士忌或黑麦威士忌。'),
      '1806年的“cock-tail”定义，以及“Old-Fashioned”这个名字的由来。',
    ],
  },

  manhattan: {
    name: '曼哈顿',
    tagline: '黑麦威士忌配甜味美思，加一抖苦精，搅拌得丝滑顺口。',
    description:
      '辛辣的黑麦威士忌被醇厚的甜味美思柔化，再以安高天娜苦精提味，搅拌后不加冰饮用。这是搅拌类鸡尾酒的标杆，自1880年代起就见诸印刷。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, null],
    steps: ['将所有材料倒入装满冰块的调酒杯。', '充分搅拌至彻底冰镇。', '滤入冰镇过的鸡尾酒杯。'],
    garnish: ['鸡尾酒樱桃'],
    presentation: UP_COCKTAIL,
    facts: [
      '已知最早提到曼哈顿的文字，出现在1882年9月纽约一份报纸的专栏中；完整配方随后于1884年问世。',
      '流传甚广的说法是：1874年Jennie Jerome（Lady Randolph Churchill）在Manhattan Club举办宴会时诞生了这款酒。但这被认为是虚构的——她当时身在英格兰。',
    ],
    formulaNote: '国际调酒师协会（IBA）配方指定使用黑麦威士忌；波本威士忌版本虽然存在，但不属于这一配方。',
    sourceSupports: [
      ibaZh(UNF),
      '已知最早的提及（1882年）、最早的印刷配方（1884年），以及已被推翻的1874年起源故事。',
    ],
  },

  negroni: {
    name: '内格罗尼',
    tagline: '金酒、金巴利、甜味美思等量调配。苦、烈、美。',
    description:
      '三种材料等量，加冰直调：金酒的杜松子香、金巴利的苦甜橙味，加上味美思的饱满甜润。做法简单，却令人难忘。',
    glassName: '古典杯（岩石杯）',
    recipe: [null, null, null],
    steps: ['在冰镇过的古典杯中装满冰。', '倒入金酒、金巴利和甜味美思。', '轻轻搅拌。'],
    garnish: ['半片橙片'],
    presentation: '在冰镇过的古典杯中加冰直调。',
    facts: [
      '据传统说法，约1919年在佛罗伦萨，Camillo Negroni伯爵要求把他的美国佬（Americano）调得更烈一些，于是调酒师把苏打水换成了金酒。',
      '这个故事存在争议：内格罗尼家族的另一支曾声称，发明者是自家的一位成员。',
    ],
    sourceSupports: [ibaZh(UNF), '传统的佛罗伦萨起源故事、它与美国佬（Americano）的渊源，以及围绕这一说法的争议。'],
  },

  'dry-martini': {
    name: '干马天尼',
    tagline: '冰冷的金酒，只带一丝干味美思。',
    description:
      '金酒加少量干味美思，搅拌至极冷后不加冰饮用。最后挤上柠檬皮油——喜欢的话也可以配橄榄。干净、清爽，永远众说纷纭。',
    glassName: '马天尼杯（鸡尾酒杯）',
    recipe: [null, null],
    steps: ['将金酒和干味美思倒入装满冰块的调酒杯。', '充分搅拌。', '滤入冰镇过的马天尼杯。'],
    garnish: ['从柠檬皮挤出的皮油', '或按要求配青橄榄'],
    presentation: '不加冰（净饮），盛于冰镇过的马天尼杯。',
    facts: [
      '没人真正知道马天尼从何而来；最广为接受的说法是它由马丁内斯（Martinez）演变而来。',
      '最早的马天尼是甜的——用老汤姆金酒和甜味美思调制——此后逐渐变得越来越干。',
      '已知第一份名为“Dry Martini Cocktail”的配方，出现在1904年的一本法国书中。',
    ],
    sourceSupports: [ibaZh(UNF), '起源不明、早期的甜马天尼，以及最早的“Dry Martini”配方（1904年）。'],
  },

  daiquiri: {
    name: '大吉利',
    tagline: '白朗姆酒、青柠和糖——摇和而成，清爽锐利，平衡完美。',
    description:
      '最纯粹的朗姆酸酒：朗姆酒、新鲜青柠和糖，用力摇和后不加冰饮用。经典大吉利与那些冰沙状的冰冻版本相去甚远，明亮、略带干爽，令人神清气爽。',
    glassName: '鸡尾酒杯',
    recipe: [{ label: '白朗姆酒（IBA：古巴白朗姆酒）' }, LIME, { label: '细砂糖' }],
    steps: ['将所有材料放入摇酒壶，搅拌使糖溶化。', '加冰充分摇和。', '滤入冰镇过的鸡尾酒杯。'],
    garnish: [],
    presentation: '不加冰（净饮），盛于冰镇过的鸡尾酒杯。国际调酒师协会（IBA）未列装饰。',
    facts: [
      '传统上认为这款酒出自Jennings Cox之手——他是一名美国采矿工程师，约1900年在古巴东部的代基里（Daiquirí）镇附近工作。',
      '它与Canchanchara关系密切，后者是一种更古老的古巴调饮，由甘蔗烈酒、青柠、蜂蜜和水调成。',
    ],
    sourceSupports: [ibaZh(UNF), 'Jennings Cox的归属说法（以及后来另一种与之竞争的说法），以及与Canchanchara的渊源。'],
  },

  margarita: {
    name: '玛格丽特',
    eraNote: `国际调酒师协会（IBA）将玛格丽特归入${CC}类别。由于这一名称自1953年起就有文献记载，且1937年已有其前身，我们将其列入经典之列。`,
    tagline: '龙舌兰、橙皮利口酒和青柠，可选半圈盐边。',
    description:
      '以龙舌兰的浓郁风味为主，用青柠提亮，再以橙皮利口酒（Triple sec）圆润口感，摇和后不加冰饮用。半圈盐边让你每一口都能自己决定咸度。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, LIME],
    steps: [
      '如果想要盐边，先润湿冰镇过的鸡尾酒杯的半圈杯沿，再蘸上盐。',
      '将龙舌兰、橙皮利口酒（Triple sec）和青柠汁倒入加冰的摇酒壶。',
      '摇和后滤入杯中。',
    ],
    garnish: ['半圈盐边（可选）'],
    presentation: UP_COCKTAIL,
    facts: [
      '“Margarita”在西班牙语中意为雏菊。这款酒很可能是Daisy的龙舌兰版本——Daisy是维多利亚时代由烈酒、柑橘和甜味剂组成的一类饮品。',
      '1937年曾有一份比例相同、名为“Picador”的配方付印。已知最早以玛格丽特之名称呼这款酒是在1953年。',
      '有好几个人声称自己发明了玛格丽特，但这些说法都没有定论。',
    ],
    formulaNote: '国际调酒师协会（IBA）将盐边列为可选，因此调这款酒并不一定需要盐。',
    sourceSupports: [ibaZh(CC), '与Daisy的渊源、1937年的“Picador”、已知最早的1953年提及，以及相互竞争的发明者说法。'],
  },

  'whiskey-sour': {
    name: '威士忌酸',
    tagline: '波本威士忌、柠檬和糖——可选加入丝滑的蛋清泡沫。',
    description:
      '一款甜酸平衡的波本酸酒。加几滴蛋清并稍微用力摇和，就能得到柔软的泡沫层；不加则更轻盈利落。',
    glassName: '考伯乐杯（Cobbler glass），或加冰使用古典杯',
    recipe: [null, LEMON, SIMPLE_SYRUP, { amountText: '几滴', label: '蛋清' }],
    steps: [
      '将所有材料倒入装满冰的摇酒壶。如果加蛋清，就稍微用力摇和以打出泡沫。',
      '充分摇和。',
      '滤入考伯乐杯——若要加冰饮用，则滤入装满冰的古典杯。',
    ],
    garnish: ['半片橙片', '马拉斯奇诺樱桃', '或橙皮'],
    presentation: '不加冰盛于考伯乐杯，或加冰盛于古典杯（如图所示）。',
    facts: [
      '已知最早的酸酒书面配方——白兰地酸、金酒酸和朗姆酸——见于Jerry Thomas 1862年的《Bartender’s Guide》。',
      '已知最早提到威士忌酸的是1870年1月威斯康星州的一份报纸。',
    ],
    formulaNote: '国际调酒师协会（IBA）将蛋清标为可选，因此在“我的酒柜”中，缺少蛋清永远不会妨碍这款酒的匹配。',
    sourceSupports: [ibaZh(UNF), '最早的酸酒书面配方（1862年）和已知最早的威士忌酸记载（1870年）。'],
  },

  mojito: {
    name: '莫吉托',
    eraNote: `国际调酒师协会（IBA）将莫吉托归入${CC}类别。由于其配方自1927年起就已见诸印刷，我们将其列入经典之列。`,
    tagline: '朗姆酒、青柠、薄荷和糖，再用苏打水拉长。纯粹的清爽。',
    description: '新鲜薄荷与糖和青柠一起轻压，再加入白朗姆酒、冰和苏打水调成长饮。轻盈芬芳，专为温暖的午后而生。',
    glassName: '高球杯',
    recipe: [
      { label: '白朗姆酒（IBA：古巴白朗姆酒）' },
      LIME,
      { label: '薄荷枝' },
      { label: '白蔗糖' },
      { label: '苏打水' },
    ],
    steps: [
      '在杯中将薄荷与糖和青柠汁轻轻混合。',
      '加入少许苏打水，并在杯中装满冰。',
      '倒入朗姆酒，用苏打水补满，轻轻搅拌。',
    ],
    garnish: ['薄荷枝', '一片青柠'],
    presentation: '加冰直调成长饮。国际调酒师协会（IBA）没有指定杯型；图中以高球杯呈现。',
    tips: ['轻轻按压薄荷——要的是它的香气，而不是碎叶。'],
    facts: [
      '莫吉托及其名称的确切起源不详。',
      '已知最早的配方以“Mojo Criollo”之名出现在1927年的一本古巴鸡尾酒书中；“Mojito”这个名字则出现在哈瓦那一家酒吧1931–32年度的酒单上。',
      '流行说法称第一杯莫吉托出自La Bodeguita del Medio，这被认为是都市传说。',
    ],
    formulaNote: '国际调酒师协会（IBA）配方没有给出苏打水的用量（只写“top”，即补满），薄荷则列为“6 pcs”（6个）。',
    sourceSupports: [ibaZh(CC), '起源不明、1927年的“Mojo Criollo”配方，以及这个名字的首次使用（1931–32年）。'],
  },

  sidecar: {
    name: '边车',
    tagline: '干邑、橙皮利口酒和柠檬：优雅而明亮。',
    description:
      '一款以橙皮利口酒（Triple sec）增甜的干邑酸酒。白兰地的醇厚温暖与新鲜柠檬相遇，自1920年代初以来一直是酒单上的常客。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, LEMON],
    steps: SHAKE_STEPS,
    garnish: [],
    presentation: '不加冰（净饮），盛于冰镇过的鸡尾酒杯。国际调酒师协会（IBA）未列装饰，也没有糖边。',
    facts: [
      '最早的印刷配方出现在1922年Robert Vermeire和Harry MacElhone的书中，两者都使用等量的白兰地、橙皮利口酒和柠檬。',
      '它的发明者并不确定。Difford’s Guide倾向于认为是伦敦Buck’s Club的Pat MacGarry，同时也指出我们可能永远无法确知。',
    ],
    sourceSupports: [ibaZh(UNF), '最早的印刷配方（1922年）、相互竞争的起源说法，以及比例的变化。'],
  },

  'french-75': {
    name: '法式75',
    eraNote: `国际调酒师协会（IBA）将法式75归入${CC}类别。它的金酒加香槟形式可追溯至1927年，因此我们将其列入经典之列。`,
    tagline: '以香槟补满的金酒酸酒。喜庆而清爽。',
    description:
      '金酒、柠檬和糖摇和后滤入笛形杯，再以香槟提升气泡。它以一战时期的一门野战炮命名，喝起来却比名字优雅得多。',
    glassName: '香槟杯（笛形）',
    recipe: [null, LEMON, SIMPLE_SYRUP, null],
    steps: ['将金酒、柠檬汁和糖浆加冰摇和。', '滤入香槟杯（笛形）。', '用香槟补满，轻轻搅拌。'],
    garnish: [],
    presentation: '盛于香槟杯（笛形），不加冰。国际调酒师协会（IBA）未列装饰。',
    facts: [
      '以第一次世界大战中法国的75毫米野战炮命名。',
      '早期的“Seventy-Five”配方（1915–1926年）使用卡尔瓦多斯和红石榴糖浆；金酒、柠檬、糖加香槟的版本最早出现在1927年。',
      '用笛形杯盛装是后来的潮流——它长期以来都盛在高身的柯林斯杯中。',
    ],
    sourceSupports: [ibaZh(CC), '名称由来、按年代排列的已出版配方时间线，以及杯型的变化。'],
  },

  'moscow-mule': {
    name: '莫斯科骡子',
    eraNote: `国际调酒师协会（IBA）将莫斯科骡子归入${CC}类别。它诞生于1940年代，本站将其视为经典。`,
    tagline: '伏特加、辛辣的姜汁啤酒和青柠，盛在结霜的铜杯里。',
    description:
      '伏特加与火辣的姜汁啤酒，再用青柠提味。它的走红很大程度上要归功于那只铜杯，至今仍是在家最容易调的长饮之一。',
    glassName: '铜制骡子杯（或岩石杯）',
    recipe: [null, null, LIME],
    steps: ['将伏特加和姜汁啤酒倒入骡子杯或岩石杯。', '加入青柠汁。', '轻轻搅拌使其混合。'],
    garnish: ['青柠片'],
    presentation:
      '盛于铜制骡子杯或岩石杯。国际调酒师协会（IBA）的做法没有提到冰，但这款酒通常加冰饮用（如图所示）。',
    facts: [
      '它诞生于1941年至1946年间的某个时候；确切时间和地点存在争议。',
      '它与Heublein公司的John G. Martin有关——他拥有Smirnoff伏特加的经营权——也与好莱坞Cock ’n’ Bull的Jack Morgan有关，后者当时正在推出一款姜汁啤酒。另一种说法则将功劳归于Cock ’n’ Bull的首席调酒师Wes Price。',
    ],
    formulaNote: '国际调酒师协会（IBA）配方指定Smirnoff；就“我的酒柜”而言，任何伏特加都可以。',
    sourceSupports: [ibaZh(CC), '诞生时期及相互竞争的起源说法；Difford’s自己的做法是加冰饮用。'],
  },

  'tom-collins': {
    name: '汤姆柯林斯',
    eraNote: `国际调酒师协会（IBA）将这种调法以John Collins之名列入${UNF}；而以汤姆柯林斯为名的配方早在1880年代就已见诸印刷。`,
    tagline: '一杯高身、带气泡的成人版金酒柠檬水。',
    description:
      '金酒、新鲜柠檬和糖，加冰后以苏打水拉长。用老汤姆金酒调制就是汤姆柯林斯；用伦敦干金酒的话，同样的调法就是国际调酒师协会（IBA）所说的John Collins。',
    glassName: '高球杯',
    recipe: [
      { label: '老汤姆金酒（或伦敦干金酒）', note: '用伦敦干金酒的话，严格来说这就是John Collins。' },
      LEMON,
      SIMPLE_SYRUP,
      null,
    ],
    steps: ['在高球杯中装满冰。', '倒入所有材料。', '轻轻搅拌。'],
    garnish: ['柠檬片', '马拉斯奇诺樱桃'],
    presentation: '在装满冰的高球杯中直调成长饮。',
    facts: [
      'Collins被认为出自伦敦Limmer’s Hotel的领班侍者John Collins之手；至于他是否创造或命名了汤姆柯林斯，则不得而知。',
      'David Embury在1948年写道，汤姆柯林斯最初用老汤姆金酒调制，而John Collins则用荷兰杜松子酒（genever）。',
      'Jerry Thomas的《Bar-Tender’s Guide》（1887年版已数字化）给出了分别以威士忌、白兰地或金酒调制的“Tom Collins”版本。',
    ],
    formulaNote:
      '配方依据国际调酒师协会（IBA）的John Collins，其备注写明调汤姆柯林斯时使用老汤姆金酒。由于该IBA配方以金酒调制，伦敦干金酒同样可以接受。',
    sourceSupports: [
      ibaZh(UNF, '其备注写道：调汤姆柯林斯时使用老汤姆金酒。'),
      '以老汤姆金酒调制的汤姆柯林斯；Tom Collins与John Collins两个名称的历史。',
      '一手资料：早期的“Tom Collins”配方，由烈酒、柠檬、糖和苏打水组成。',
    ],
  },

  boulevardier: {
    name: '花花公子',
    tagline: '内格罗尼那位偏爱威士忌的表亲，来自1920年代的巴黎。',
    description: '用威士忌取代金酒，搭配金巴利和甜味美思，成就一杯更圆润、更温暖的苦甜之酒。搅拌后不加冰饮用。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, null],
    steps: ['将所有材料倒入加了冰块的调酒杯。', '充分搅拌。', '滤入冰镇过的鸡尾酒杯。'],
    garnish: ['橙皮（或柠檬皮）'],
    presentation: UP_COCKTAIL,
    facts: [
      '它最早见于Harry MacElhone 1927年的书《Barflies and Cocktails》，被归功于巴黎杂志《Boulevardier》的联合创办人Erskine Gwynne。',
      '1927年的配方使用等量的金巴利、意大利味美思和波本威士忌。',
    ],
    sourceSupports: [
      ibaZh(UNF, '明确允许使用波本威士忌或黑麦威士忌。'),
      '首次出现（1927年）、归功于Erskine Gwynne的说法，以及最初的等量配方。',
    ],
  },

  'last-word': {
    name: '临别一语',
    tagline: '四种材料等量：金酒、绿查特酒、黑樱桃利口酒和青柠。',
    description:
      '一款锐利、草本、等量调配的酸酒。绿查特酒带来浓烈的植物香气，黑樱桃利口酒增添别具一格的樱桃甜味，青柠则让一切保持平衡。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, null, LIME],
    steps: ['将所有材料倒入加冰的摇酒壶。', '充分摇和。', '滤入冰镇过的鸡尾酒杯。'],
    garnish: [],
    presentation: '不加冰（净饮），盛于冰镇过的鸡尾酒杯。国际调酒师协会（IBA）未列装饰。',
    facts: [
      '已知最早的记录是1916年底特律运动俱乐部（Detroit Athletic Club）的一份菜单，上面列有酒名和价格，但没有配方。',
      'Ted Saucier在1951年的书《Bottoms Up!》中刊出了等量配方。',
      '在沉寂数十年后，它于2000年代初由Murray Stenson在西雅图的Zig Zag Café重新带火。',
    ],
    formulaNote: '国际调酒师协会（IBA）指定Luxardo黑樱桃利口酒；在这里，任何黑樱桃利口酒都算数。',
    sourceSupports: [ibaZh(UNF), '1916年底特律运动俱乐部的记录、1951年的印刷配方，以及它在2000年代的复兴。'],
  },

  sazerac: {
    name: '萨泽拉克',
    tagline: '杯中的新奥尔良：干邑、裴乔苦精（Peychaud\'s），再以苦艾酒涮杯。',
    description:
      '一款搅拌而成、以烈酒为主导的鸡尾酒，盛于用苦艾酒涮过、不加冰的杯中。裴乔苦精赋予它玫瑰色泽和茴香、樱桃的气息；柠檬皮则让香气更加明亮。',
    glassName: '古典杯（岩石杯）',
    recipe: [
      {
        label: '干邑（或黑麦威士忌）',
        note: '国际调酒师协会（IBA）配方使用干邑；其备注说明，历史上黑麦威士忌取代了干邑。',
      },
      { note: '用于涮杯；多余部分倒掉。' },
      { label: '方糖' },
      null,
    ],
    steps: [
      '用苦艾酒涮一下冰镇过的古典杯，装满碎冰后放在一旁。',
      '在调酒杯中，将糖、裴乔苦精和干邑加冰搅拌。',
      '倒掉酒杯中的冰和多余的苦艾酒，再将酒滤入杯中。',
    ],
    garnish: ['柠檬皮'],
    presentation: '不加冰，盛于冰镇过、以苦艾酒涮过的古典杯。',
    tips: ['先把方糖在苦精里压碎（加一滴水会更容易），再加入烈酒和冰，这样糖才能完全溶化。'],
    facts: [
      '传统说法认为，它于1850年代在新奥尔良诞生，以Sazerac干邑和裴乔苦精调制；历史学家David Wondrich的研究则表明，它最初可能是一款威士忌鸡尾酒。',
      '19世纪干邑变得难以获得，黑麦威士忌便逐渐取而代之。',
      '2008年，路易斯安那州宣布萨泽拉克为新奥尔良的官方鸡尾酒。',
    ],
    formulaNote:
      '黑麦威士忌可作为替代品，因为国际调酒师协会（IBA）页面本身就提到了历史上改用黑麦威士忌的变化，而且如今新奥尔良的做法也使用黑麦威士忌。',
    sourceSupports: [
      ibaZh(UNF, '其备注记录了历史上黑麦威士忌取代干邑的过程。'),
      '传统起源说法与Wondrich的不同观点；如今以黑麦威士忌为基酒的新奥尔良做法；2008年获定为官方鸡尾酒。',
    ],
  },

  'mint-julep': {
    name: '薄荷朱利普',
    eraNote: `国际调酒师协会（IBA）将薄荷朱利普归入${CC}类别，但朱利普早在1803年就有文献记载，因此我们将其列入经典之列。`,
    tagline: '波本威士忌和薄荷，浇在堆成小山的碎冰上，盛于结霜的杯中。',
    description:
      '将薄荷与糖和水轻轻捣压，再在压实的碎冰上倒入波本威士忌，搅拌至杯身结霜。冰凉、芬芳而浓烈——肯塔基德比赛马会的传统饮品。',
    glassName: '不锈钢朱利普杯',
    recipe: [null, { label: '新鲜薄荷枝' }, { label: '糖粉' }, { label: '水' }],
    steps: ['在朱利普杯中，将薄荷与糖和水轻轻捣压。', '在杯中装满碎冰，倒入波本威士忌。', '搅拌至杯子外壁结霜。'],
    garnish: ['薄荷枝'],
    presentation: '盛于装满碎冰的朱利普杯。',
    facts: [
      '“julep”一词可追溯至波斯语“gulab”，意为玫瑰水。',
      '1803年的一本游记描述了弗吉尼亚人早晨喝一小杯泡过薄荷的烈酒——这就是早期的朱利普。',
      'Difford’s Guide将它成为肯塔基德比官方饮品的时间定为1938年。',
    ],
    sourceSupports: [ibaZh(CC), '词源、1803年的文字记载，以及与肯塔基德比的渊源。'],
  },

  penicillin: {
    name: '盘尼西林',
    tagline: '调和苏格兰威士忌、蜂蜜、柠檬和新鲜生姜，再漂浮一层烟熏艾雷岛威士忌。',
    description:
      '一款加入新鲜生姜、以蜂蜜增甜的苏格兰威士忌酸酒，最后漂浮一层泥煤味的艾雷岛麦芽威士忌：先是烟熏香扑面而来，随后才是下方辛辣又带柑橘味的酒体。',
    glassName: '古典杯（岩石杯）',
    recipe: [
      null,
      LEMON,
      null,
      { amountText: '2–3片', label: '新鲜生姜（约硬币大小的薄片）' },
      {
        label: '艾雷岛单一麦芽威士忌',
        note: '国际调酒师协会（IBA）指定Lagavulin 16；任何带泥煤味的艾雷岛麦芽威士忌都符合做法中的描述。',
      },
    ],
    steps: [
      '在摇酒壶中捣压新鲜生姜。',
      '加入调和苏格兰威士忌、柠檬汁和蜂蜜糖浆，加满冰后摇和。',
      '双重过滤，滤入装有冰的冰镇古典杯。',
      '将艾雷岛单一麦芽威士忌漂浮在酒液表面。',
    ],
    garnish: ['糖渍姜片'],
    presentation: '加冰盛于冰镇过的古典杯，表面漂浮一层烟熏麦芽威士忌。',
    provenance: { bar: 'Milk & Honey', city: '纽约', year: '2005' },
    facts: [
      '由Sam Ross于2005年在纽约的Milk & Honey创作。',
      '它是Gold Rush（波本威士忌、蜂蜜和柠檬）的变体，后者是Milk & Honey的另一款酒。',
      '在Drinks International 2025年“全球最佳酒吧最畅销经典鸡尾酒”榜单中排名第12，榜单称它“可以说是当今最突出的现代经典”。',
    ],
    formulaNote:
      '遵循国际调酒师协会（IBA）配方（新鲜生姜与蜂蜜糖浆一起捣压）。Difford’s记载的原版则改用单一的蜂蜜生姜糖浆。',
    sourceSupports: [
      ibaZh(NE),
      '2005年由Sam Ross在曼哈顿的Milk & Honey创作；介绍了原版配方。',
      'Sam Ross、Milk & Honey、2005年；它与Gold Rush的关系。',
      diZh(12),
    ],
  },

  'paper-plane': {
    name: '纸飞机',
    tagline: '波本威士忌、阿佩罗、诺尼诺苦酒和柠檬，四者等量。',
    description:
      '一款苦甜交织的等量酸酒，以临别一语为模板。波本威士忌撑起骨架，阿佩罗和诺尼诺苦酒带来橙香和柔和的草本苦味，柠檬则让它保持明亮。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, null, LEMON],
    steps: SHAKE_STEPS,
    garnish: [],
    presentation: '不加冰（净饮），盛于冰镇过的鸡尾酒杯。国际调酒师协会（IBA）未列装饰。',
    provenance: {
      bar: '为The Violet Hour创作',
      city: '芝加哥',
      year: '2007年或2008年',
      note: 'Difford’s Guide记为2007年；PUNCH和Drinks International记为2008年。',
    },
    facts: [
      '由Sam Ross为芝加哥的The Violet Hour创作；不久后他也在纽约的Milk & Honey和Little Branch供应这款酒。',
      'Ross最早的版本用的是金巴利，不久后才换成阿佩罗。',
      '它的等量结构是对临别一语的变奏。',
      diFact(30),
    ],
    sourceSupports: [
      ibaZh(NE),
      'Sam Ross；2008年首次在The Violet Hour供应；从金巴利改为阿佩罗的变化。',
      '临别一语的变体，（据Difford’s记载）2007年由Sam Ross为The Violet Hour创作。',
      diZh(30),
    ],
  },

  'naked-and-famous': {
    name: '赤裸与成名',
    tagline: '烟熏梅斯卡尔与阿佩罗、黄查特酒等量相遇。',
    description:
      '临别一语家族中的又一款等量酸酒：烟熏味的梅斯卡尔、带蜜香的黄查特酒、苦甜的阿佩罗，再加青柠。杯中呈鲜艳的珊瑚色，平衡得出奇。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, null, LIME],
    steps: SHAKE_STEPS,
    garnish: [],
    presentation: '不加冰（净饮），盛于冰镇过的鸡尾酒杯，不加装饰。',
    provenance: {
      bar: 'Death & Co',
      city: '纽约',
      year: '2011',
      note: '创作于Simó在Death & Co任职期间；最早出现在Candelaria（巴黎）和Teardrop Lounge（俄勒冈州波特兰）的酒单上。',
    },
    facts: [
      '由Death & Co的Joaquín Simó于2011年在纽约创作。',
      '它首先登上巴黎Candelaria和俄勒冈州波特兰Teardrop Lounge的酒单，并因Death & Co而广为人知。',
      diFact(27),
    ],
    formulaNote: '国际调酒师协会（IBA）配方与Death & Co公布的创作者等量配方（各¾盎司）一致。',
    sourceSupports: [
      ibaZh(NE),
      '“By Joaquin Simo (Death & Co NYC, 2011)”——等量调配，摇和，盛于碟形杯。',
      '2011年由Joaquín Simó创作；最早出现在Candelaria（巴黎）和Teardrop Lounge（波特兰）的酒单上。',
      diZh(27),
    ],
  },

  'old-cuban': {
    name: '老古巴人',
    tagline: '陈年朗姆酒、青柠、薄荷和苦精，再以香槟加冕。',
    description:
      '一半像莫吉托，一半像法式75：陈年朗姆酒与青柠、薄荷和少许安高天娜苦精一起摇和，不加冰盛装，再以起泡酒补满。它的创作者有句名言，称它是穿着小黑裙的莫吉托。',
    glassName: '鸡尾酒杯',
    recipe: [
      null,
      LIME,
      null,
      { amountText: '6–8片', label: '新鲜薄荷叶' },
      null,
      { label: '干型（Brut）香槟或普洛赛克' },
    ],
    steps: ['将除起泡酒以外的所有材料倒入加冰的摇酒壶。', '摇和后滤入冰镇过的鸡尾酒杯。', '用香槟或普洛赛克补满。'],
    garnish: ['薄荷枝'],
    presentation: UP_COCKTAIL,
    tips: ['用小滤网双重过滤，滤掉薄荷碎屑。'],
    provenance: {
      bar: 'Bemelmans Bar, The Carlyle',
      city: '纽约',
      year: '2001',
      note: '创作于Saunders在Beacon餐厅工作期间；在Bemelmans Bar首次亮相，后来又出现在她的Pegu Club（2005年开业）。',
    },
    facts: [
      '由Audrey Saunders于2001年创作，在纽约The Carlyle酒店的Bemelmans Bar首次亮相。',
      'Saunders称它为“穿着小黑裙的莫吉托”。',
      diFact(39),
    ],
    sourceSupports: [
      ibaZh(NE, '指定使用“干型（Brut）香槟或普洛赛克”。'),
      'Audrey Saunders，2001年，在Bemelmans Bar首次亮相；“小黑裙”一语的出处。',
      '2001年Saunders在Beacon工作期间创作；在Bemelmans首次亮相；后来进入Pegu Club。',
      diZh(39),
    ],
  },

  'espresso-martini': {
    name: '浓缩咖啡马天尼',
    tagline: '伏特加、咖啡利口酒和新鲜意式浓缩咖啡，摇出丝绒般的咖啡油脂。',
    description: '将新鲜的浓烈意式浓缩咖啡与伏特加和咖啡利口酒用力摇和，直到形成厚实绵密的泡沫层。浓郁、苦甜，让人精神一振。',
    glassName: '马天尼杯（鸡尾酒杯）',
    recipe: [
      null,
      { note: '国际调酒师协会（IBA）指定Kahlúa。' },
      SIMPLE_SYRUP,
      {
        amountText: '1份浓烈的浓缩咖啡',
        label: '新鲜意式浓缩咖啡',
        note: '国际调酒师协会（IBA）没有给出用量——一份现萃、浓烈的意式浓缩咖啡。',
      },
    ],
    steps: SHAKE_STEPS,
    garnish: ['3颗咖啡豆'],
    presentation: UP_COCKTAIL,
    tips: ['用力摇和——泡沫正是来自现煮的意式浓缩咖啡。'],
    provenance: {
      bar: 'Soho Brasserie',
      city: '伦敦',
      year: '1980年代中期',
      note: 'Difford’s Guide称约为1983年；PUNCH援引Bradsell女儿的说法，称很可能是1985年。最初的“Vodka Espresso”加冰饮用，且不含咖啡利口酒。',
    },
    facts: [
      'Dick Bradsell于1980年代中期在伦敦的Soho Brasserie创作了它，最初名为“Vodka Espresso”，加冰饮用。',
      '它曾有过别的名字——包括1998年在伦敦Pharmacy的“Pharmaceutical Stimulant”——到1990年代末才以浓缩咖啡马天尼之名为人所知。',
      diFact(4),
    ],
    sourceSupports: [
      ibaZh(NE),
      '由Dick Bradsell在Soho Brasserie创作（很可能是1985年）；直至1990年代末的各种名称和酒单。',
      '由Bradsell的女儿撰写：1980年代中期在Soho Brasserie以“Vodka Espresso”之名创作。',
      diZh(4),
    ],
  },

  'tommys-margarita': {
    name: '汤米玛格丽特',
    tagline: '100%龙舌兰草酿造的龙舌兰、青柠和龙舌兰糖浆——无处藏拙。',
    description:
      '一杯不含橙皮利口酒的玛格丽特：龙舌兰糖浆呼应龙舌兰酒本身的风味，让一款好的100%龙舌兰草龙舌兰大放异彩。加冰饮用。',
    glassName: '岩石杯',
    recipe: [null, LIME, { label: '龙舌兰糖浆' }],
    steps: ['将所有材料倒入摇酒壶。', '加冰充分摇和。', '滤入装满冰的冰镇岩石杯。'],
    garnish: ['青柠片'],
    presentation: '加冰盛于装满冰的冰镇岩石杯。',
    provenance: {
      bar: 'Tommy’s Mexican Restaurant',
      city: '旧金山',
      year: '1980年代末至1990年代初',
      note: 'Difford’s Guide称约为1987/88年；PUNCH称是90年代初。',
    },
    facts: [
      '由Julio Bermejo在Tommy’s创作，这是他家族在旧金山经营的墨西哥餐厅兼酒吧。',
      'Tommy’s由Tomas和Elmy Bermejo于1965年创立，并自称是汤米玛格丽特的诞生地。',
    ],
    formulaNote:
      '遵循国际调酒师协会（IBA）的60 / 30 / 30毫升。Difford’s Guide和PUNCH的龙舌兰糖浆用量减半（2盎司 : 1盎司 : ½盎司），酒体更干——如果你喜欢不那么甜，值得一试。',
    sourceSupports: [
      ibaZh(NE),
      '约1987/88年由Julio Bermejo在旧金山的Tommy’s创作；另一种2 : 1 : ½的配方。',
      '90年代初由Tommy’s Mexican Restaurant的Julio Bermejo创作。',
      '1965年由Tomas和Elmy Bermejo创立；自称是汤米玛格丽特的诞生地。',
    ],
  },

  bramble: {
    name: '荆棘',
    tagline: '碎冰上的金酒酸酒，黑莓利口酒缓缓渗下。',
    description:
      '一款酸爽的金酒酸酒，盛在堆成小山的碎冰上，再在表面淋上黑莓利口酒，让它化作紫色丝带缓缓流下。清新、果香浓郁，颜值很高。',
    glassName: '古典杯（岩石杯）',
    recipe: [null, LEMON, SIMPLE_SYRUP, null],
    steps: ['将金酒、柠檬汁和糖浆加冰摇和。', '滤入装满碎冰的冰镇古典杯。', '以画圈的方式将黑莓利口酒淋在表面。'],
    garnish: ['柠檬片（可选）', '黑莓（可选）'],
    presentation: '盛于装满碎冰的冰镇古典杯。',
    provenance: {
      bar: 'Fred’s Club',
      city: '伦敦',
      year: '1980年代中期',
      note: 'Bradsell本人回忆是“八十年代中期左右”；PUNCH记为1984年。',
    },
    facts: [
      'Dick Bradsell在担任苏豪区Fred’s Club酒吧经理时创作了它——用他自己的话说，是“在八十年代中期左右”。',
      'Bradsell自己的比例（2 : 1½ : ½ : 1 shot）比国际调酒师协会（IBA）配方更酸，黑莓利口酒也用得更多。',
      diFact(35),
    ],
    sourceSupports: [
      ibaZh(NE),
      '一手资料：Bradsell讲述他在Fred’s Club创作这款酒的经过，附有他自己的配方。',
      '1984年由Dick Bradsell在Fred’s Club发明。',
      diZh(35),
    ],
  },

  'gin-basil-smash': {
    name: '金酒罗勒碎',
    tagline: '金酒、柠檬和一大把罗勒，摇出鲜亮的绿色。',
    description:
      '新鲜罗勒与金酒、柠檬和糖一起用力摇和，直到酒液变成鲜艳的绿色。草本清香、柑橘活泼，是出自德国的最著名饮品之一。',
    glassName: '鸡尾酒杯',
    recipe: [null, LEMON, SIMPLE_SYRUP, { label: '罗勒叶（意大利罗勒）' }],
    steps: ['将所有材料倒入加冰的摇酒壶。', '用力摇和。', '倒入冰镇过的鸡尾酒杯。'],
    garnish: [],
    presentation:
      '国际调酒师协会（IBA）的做法是不加冰盛于冰镇过的鸡尾酒杯，不加装饰（如图所示）。在Le Lion，则是加冰盛于平底杯，并以罗勒装饰。',
    tips: ['像创作者那样，先在摇酒壶里捣压罗勒，酒色会更绿、风味更浓。用双重过滤滤掉叶子碎屑。'],
    provenance: {
      bar: 'Le Lion • Bar de Paris',
      city: '汉堡',
      year: '2008',
      note: '2008年春夏以“Gin Pesto”之名首次供应；Meyer将他2008年7月10日发布的博客文章视为它的生日。',
    },
    facts: [
      '由Jörg Meyer于2008年在汉堡的Le Lion • Bar de Paris创作，最初以“Gin Pesto”之名供应。',
      'Meyer自己的做法是用3厘升柠檬汁和2厘升液体蔗糖，加一把捣压过的罗勒，双重过滤后加冰饮用。',
      diFact(42),
    ],
    formulaNote: '遵循国际调酒师协会（IBA）配方。创作者的做法略有不同（见上文）。',
    sourceSupports: [
      ibaZh(NE),
      '由Joerg Meyer在汉堡的Le Lion创作；2008年首次以Gin Pesto之名供应。',
      '创作者自己的做法，以及2008年7月10日这个“生日”。',
      '2008年夏由Jörg Meyer在Le Lion • Bar de Paris创作；最初名为Gin Pesto。',
      diZh(42),
    ],
  },
};
