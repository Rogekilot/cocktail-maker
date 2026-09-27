import type { CocktailText } from '../types';

// IBA category names, kept consistent across all entries.
const CC = '“当代经典”（Contemporary Classics）';
const NE = '“新时代”（New Era）';

/** Translation of the `supports` sentence built by `iba()` in src/data/sources.ts. */
const ibaZh = (category: string, extra = '') =>
  `本页所示的配方、做法、杯型和装饰。国际调酒师协会（IBA）将其列入${category}类别。${extra}`;

/** Translation of the recurring Drinks International ranking fact. */
const diFact = (rank: number) =>
  `在Drinks International 2025年“全球最佳酒吧最畅销经典鸡尾酒”榜单中排名第${rank}。`;

const UP_COCKTAIL = '不加冰（净饮），盛于冰镇过的鸡尾酒杯。';
const LEMON = { label: '新鲜柠檬汁' };
const LIME = { label: '新鲜青柠汁' };

export const zhSet3: Record<string, CocktailText> = {
  cosmopolitan: {
    name: '大都会',
    eraNote: `国际调酒师协会（IBA）将其归入${CC}类别。它的现代形式可追溯至1980年代末，并有具名（尽管存在争议）的创作者，因此我们将其列入现代之列。`,
    tagline: '柑橘味伏特加、君度、青柠和蔓越莓——淡粉色泽，明亮清爽。',
    description:
      '柑橘味伏特加与君度、新鲜青柠一起摇和，再加少许蔓越莓汁增添颜色和酸度。用新鲜果汁调制时清爽而精致，是1990年代最具代表性的饮品之一。',
    glassName: '大号鸡尾酒杯',
    recipe: [{ label: '柑橘味伏特加（vodka citron）' }, { label: '君度（橙皮利口酒）' }, LIME, null],
    steps: ['将所有材料倒入装满冰的摇酒壶。', '充分摇和。', '滤入大号鸡尾酒杯。'],
    garnish: ['柠檬皮'],
    presentation: '不加冰（净饮），盛于大号鸡尾酒杯。',
    provenance: {
      creator: '有争议——Cheryl Cook 或 Toby Cecchini',
      bar: 'The Strand（迈阿密）/ The Odeon（纽约）',
      year: '1980年代末',
      note: 'Difford’s认为Cook的说法依据充分；Cecchini则称他于1988年在The Odeon创作了自己的版本。此外也存在更早的同名饮品。',
    },
    facts: [
      '它的创作者存在争议：迈阿密的Cheryl Cook和纽约的Toby Cecchini是最知名的两位声称者，Difford’s还记录了更早的同名饮品。',
      'Cecchini称，他于1988年在The Odeon调制了自己的版本——柑橘味伏特加、君度、新鲜青柠和蔓越莓。',
      '在Drinks International 2025年榜单中排名第25，榜单将它走红主流归功于《欲望都市》（Sex and the City）。',
    ],
    formulaNote: '这里必须使用柑橘味伏特加——国际调酒师协会（IBA）指定的是“vodka citron”，而非普通伏特加。',
    sourceSupports: [
      ibaZh(CC),
      '各方相互竞争的说法（Cook、Cecchini、Murray等人），以及更早的同名饮品。',
      '一部口述史，其中包括Cecchini讲述他1988年在The Odeon创作自己版本的经过。',
      '将这款酒排在第25位；指出Cook与Cecchini对其1980年代末的创作权存在争议。',
    ],
  },

  'porn-star-martini': {
    name: '艳星马天尼',
    tagline: '香草伏特加加百香果，旁边再配一小杯香槟。',
    description:
      '一款酸甜果香、广受欢迎的饮品：香草伏特加与百香果利口酒、百香果果泥和香草糖一起用力摇和，顶上放半个百香果，旁边另配一小杯冰镇香槟。',
    glassName: '大号鸡尾酒杯，另配一只烈酒杯（shot glass）',
    recipe: [null, null, null, null, { note: '另用烈酒杯盛装，放在一旁。' }],
    steps: [
      '将除香槟以外的所有材料加冰用力摇和。',
      '双重过滤，滤入冰镇过的大号鸡尾酒杯。',
      '将香槟盛于烈酒杯，放在一旁一同上桌。',
    ],
    garnish: ['半个百香果（“百香果杯”），加糖'],
    presentation: '不加冰（净饮），盛于冰镇过的大号鸡尾酒杯，旁边另配一小杯香槟。',
    provenance: {
      bar: 'Townhouse（骑士桥）',
      city: '伦敦',
      year: '2002',
      note: 'PUNCH记为2003年。Ankrah的另一家酒吧——苏豪区的LAB——常被当作它的诞生地。它最初名为“Maverick Martini”。',
    },
    facts: [
      '由Douglas Ankrah在伦敦骑士桥的The Townhouse创作；它最初名为“Maverick Martini”。',
      'Ankrah说，他是在为Townhouse撰写开业酒单时构思出这款酒的，香槟一直都是另外放在一旁上桌。',
      diFact(11),
    ],
    formulaNote: '国际调酒师协会（IBA）、Ankrah本人2004年的书以及后来的各种版本之间，配方差别很大；这里遵循IBA。',
    sourceSupports: [
      ibaZh(NE),
      '2002年由Douglas Ankrah在The Townhouse创作；最初名为Maverick Martini；Ankrah本人2004年的配方。',
      '对Ankrah的访谈，讲述他为Townhouse开业酒单创作这款酒的经过。',
      '将这款酒排在第11位；它于2002年首创于Townhouse，但功劳常被归于LAB。',
    ],
  },

  'gold-rush': {
    name: '淘金热',
    tagline: '波本威士忌、柠檬和浓稠的蜂蜜糖浆，倒在一块大冰上。',
    description:
      '用蜂蜜代替糖的威士忌酸——简单、金黄，影响深远。它的蜂蜜加柠檬模板后来启发了盘尼西林。',
    glassName: '岩石杯',
    recipe: [null, LEMON, { note: '浓稠型：3份蜂蜜兑1份水。' }],
    steps: ['将所有材料倒入加冰的摇酒壶。', '充分摇和。', '滤入放有一块大冰的岩石杯。'],
    garnish: [],
    presentation: '加一块大冰，盛于岩石杯。PUNCH未列装饰。',
    provenance: {
      bar: 'Milk & Honey',
      city: '纽约',
      year: '2000',
      note: 'PUNCH记为2000年，Difford’s记为2001年。第一杯由Sasha Petraske应Siegal的要求调制。',
    },
    facts: [
      'Milk & Honey创办人Sasha Petraske的朋友T.J. Siegal在酒吧里想出了它：他点了一杯波本酸酒，要求用Petraske的蜂蜜糖浆来调；到2002年初，它已成为店里的常备饮品。',
      'Difford’s Guide将那一晚定在2001年，并称第一杯是Petraske调制的。',
      'Drinks International在介绍盘尼西林的条目中称它为“另一款Milk & Honey经典”。',
    ],
    sourceSupports: [
      '本页遵循的配方，归功于Milk & Honey的T.J. Siegal。',
      '2000年Siegal如何在Milk & Honey想出这款酒；3:1的蜂蜜糖浆。',
      '2001年由T.J. Siegel在Milk & Honey构想；第一杯由Sasha Petraske调制。',
      '在盘尼西林条目中称淘金热为“另一款Milk & Honey经典”。',
    ],
  },

  'oaxaca-old-fashioned': {
    name: '瓦哈卡古典',
    tagline: '微陈龙舌兰（Reposado）加梅斯卡尔，像古典鸡尾酒一样搅拌。',
    description:
      '用龙舌兰类烈酒重新搭建古典鸡尾酒的模板：微陈龙舌兰加少许带烟熏味的梅斯卡尔、龙舌兰糖浆和安高天娜苦精，最后以火焰橙皮收尾。',
    glassName: '古典杯',
    recipe: [{ label: '微陈龙舌兰（Reposado）' }, null, { label: '龙舌兰糖浆' }, null],
    steps: ['将所有材料加冰搅拌。', '滤入放有一块大冰的古典杯。', '在酒液上方用火焰炙烤橙皮，然后将橙皮放入杯中。'],
    garnish: ['火焰橙皮'],
    presentation: '加一块大冰，盛于古典杯。',
    provenance: { bar: 'Death & Co', city: '纽约', year: '2007' },
    facts: [
      '由Phil Ward于2007年在纽约的Death & Co创作。',
      'Death & Co称它是店里点单最多、被模仿最多的鸡尾酒。',
      '在Drinks International 2025年榜单中排名第34——是当年新上榜的饮品。',
    ],
    formulaNote: '遵循Death & Co公布的配方（苦精2抖）；Difford’s称Ward的原版只用1抖。',
    sourceSupports: [
      '本页遵循的配方——出自Phil Ward（Death & Co NYC，2007年）；“点单最多、被模仿最多”。',
      '2007年由Philip Ward在Death & Co创作；他原版配方的细节。',
      '将这款酒排在第34位，是2025年的新上榜饮品。',
    ],
  },

  'trinidad-sour': {
    name: '特立尼达酸',
    tagline: '足足45毫升安高天娜苦精，由杏仁糖浆、柠檬和黑麦威士忌来驯服。',
    description:
      '一款打破常规的杰作：以安高天娜苦精为基底，用带坚果香的杏仁糖浆柔化，再以柠檬和少许黑麦威士忌提亮。辛香、深红褐色，平衡得出人意料。',
    glassName: '鸡尾酒杯',
    recipe: [null, { label: '杏仁糖浆（Orgeat）' }, LEMON, null],
    steps: ['将所有材料倒入加冰的摇酒壶。', '充分摇和。', '滤入冰镇过的鸡尾酒杯。'],
    garnish: [],
    presentation: `${UP_COCKTAIL}国际调酒师协会（IBA）未列装饰。`,
    provenance: {
      bar: 'Clover Club',
      city: '纽约布鲁克林',
      year: '2009',
      note: 'Difford’s记为2009年；Robb Report记为2008年。',
    },
    facts: [
      '由Giuseppe González在布鲁克林的Clover Club创作，灵感来自一款名为Trinidad Especial、曾在比赛中获胜的饮品。',
      'Robb Report将它的诞生定在2008年，并建议不要加蛋清。',
      `国际调酒师协会（IBA）将它列为${NE}饮品之一。`,
    ],
    sourceSupports: [
      ibaZh(NE),
      '2009年由Giuseppe Gonzalez在布鲁克林的Clover Club创作；灵感来自Trinidad Especial。',
      '2008年由Giuseppe Gonzalez在Clover Club发明；比例与IBA相同。',
    ],
  },

  'jungle-bird': {
    name: '丛林鸟',
    eraNote: `1970年代诞生于吉隆坡希尔顿酒店，2000–2010年代重新流行；国际调酒师协会（IBA）将其列为${NE}饮品之一，因此我们将其列入现代之列。`,
    tagline: '深色朗姆酒、金巴利、菠萝和青柠——一款苦甜交织的提基（tiki）饮品。',
    description:
      '一款带着苦味的提基饮品：浓郁的黑糖蜜朗姆酒和金巴利，由菠萝、青柠和德梅拉拉糖浆来平衡。玫瑰红色，果香浓郁，风格成熟。',
    glassName: '岩石杯',
    recipe: [null, null, null, LIME, null],
    steps: ['将所有材料倒入加冰的摇酒壶。', '摇和。', '滤入装满冰的岩石杯。'],
    garnish: ['菠萝角'],
    presentation: '加冰盛于岩石杯。',
    provenance: {
      creator: '一般认为是 Jeffrey Ong',
      bar: 'Aviary Bar，吉隆坡希尔顿酒店（Kuala Lumpur Hilton）',
      city: '吉隆坡',
      year: '1973年或1978年',
      note: '1989年的一本酒吧指南记为1978年；后来基于前员工说法的研究则认为，它是酒店1973年开业时的迎宾饮品。',
    },
    facts: [
      '它首次亮相于吉隆坡希尔顿酒店——据1989年的一本酒吧指南记载是“约1978年”——后来被提基历史学家Jeff Berry重新发掘，并于2002年发表。',
      '接受Thirst Magazine采访的酒店前员工指出，饮品经理Jeffrey Ong是它的创作者，并称它是酒店1973年开业时的迎宾饮品。',
      '2010年，Giuseppe González改用黑糖蜜朗姆酒并减少菠萝汁，重新演绎了它——国际调酒师协会（IBA）配方遵循的正是这种风格。',
    ],
    sourceSupports: [
      ibaZh(NE),
      '吉隆坡希尔顿酒店的起源，以及1989年的配方。',
      '约1978年首次亮相于吉隆坡希尔顿；Jeff Berry 2002年的发表；González 2010年的黑糖蜜朗姆酒版本。',
      '前员工指出Jeffrey Ong是创作者；主张1973年开业这一时间。',
    ],
  },

  'final-ward': {
    name: '最终病房',
    tagline: '用黑麦威士忌和柠檬调制的临别一语——四种材料等量。',
    description:
      'Phil Ward对临别一语的变奏，保留了等量结构，但把金酒换成黑麦威士忌，把青柠换成柠檬。草本、锐利，比它的灵感来源稍辛辣一些。',
    glassName: '碟形杯或鸡尾酒杯',
    recipe: [null, null, null, LEMON],
    steps: ['将所有材料倒入摇酒壶。', '加冰摇和至冰镇。', '滤入冰镇过的碟形杯或鸡尾酒杯。'],
    garnish: [],
    presentation: '不加冰（净饮），盛于冰镇过的碟形杯。PUNCH未列装饰。',
    provenance: { bar: 'Death & Co', city: '纽约', year: '2007' },
    facts: [
      '2007年由Phil Ward在纽约的Death & Co创作，是临别一语的变体。',
      'Difford’s Guide称它“或许是最知名的”临别一语变奏。',
      'Whisky Advocate指出，Ward用的是保税（bonded）黑麦威士忌。',
    ],
    sourceSupports: [
      '本页遵循的配方，署名Phil Ward。',
      '2007年由Phil Ward在Death & Co创作；临别一语“或许最知名的变奏”。',
      '2007年由Phil Ward在Death & Co以保税黑麦威士忌创作；各用¾盎司，等量调配。',
    ],
  },

  'division-bell': {
    name: '表决钟',
    tagline: '梅斯卡尔、阿佩罗、黑樱桃利口酒和青柠——带烟熏味的临别一语变奏。',
    description:
      'Phil Ward的又一款临别一语变奏：烟熏梅斯卡尔搭配苦甜的阿佩罗、少许黑樱桃利口酒和新鲜青柠，最后以西柚皮油收尾。',
    glassName: '碟形杯',
    recipe: [null, null, null, LIME],
    steps: ['将所有材料倒入加冰的摇酒壶。', '摇和至冰镇，滤入碟形杯。', '在酒液表面挤出西柚皮油，然后将西柚皮丢弃。'],
    garnish: ['西柚皮，挤出皮油后丢弃'],
    presentation: '不加冰（净饮），盛于碟形杯。',
    provenance: {
      bar: 'Mayahuel',
      city: '纽约',
      year: '2009',
      note: 'VinePair给出的梅斯卡尔用量是1½盎司；PUNCH和Difford’s则是1盎司。',
    },
    facts: [
      '2009年由Phil Ward在他位于纽约的龙舌兰酒吧Mayahuel创作，是临别一语的变体。',
      '它是该酒吧酒单上的“Mayahuel Classics”之一。',
      'Drinks International的2025年报告提到，它是Ward对临别一语的演绎（Mayahuel已于2017年关闭）。',
    ],
    sourceSupports: [
      '本页遵循的配方，署名Phil Ward。',
      '2009年由Phil Ward在纽约的Mayahuel创作；临别一语的变体。',
      '将表决钟列为“Mayahuel Classics”之一。',
      '提到表决钟是Phil Ward对临别一语的演绎。',
    ],
  },
};
