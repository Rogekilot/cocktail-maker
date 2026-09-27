import type { CocktailText } from '../types';

// IBA category names, kept consistent across all entries.
const CC = '“当代经典”（Contemporary Classics）';
const NE = '“新时代”（New Era）';

/** Translation of the `supports` sentence built by `iba()` in src/data/sources.ts. */
const ibaZh = (category: string, extra = '') =>
  `本页所示的配方、做法、杯型和装饰。国际调酒师协会（IBA）将其列入${category}类别。${extra}`;

const UP_COCKTAIL = '不加冰（净饮），盛于冰镇过的鸡尾酒杯。';
const SIMPLE_SYRUP = { label: '糖浆（1:1 单糖浆）' };
const LEMON = { label: '新鲜柠檬汁' };
const LIME = { label: '新鲜青柠汁' };

export const zhSet4: Record<string, CocktailText> = {
  jasmine: {
    name: '茉莉',
    tagline: '金酒、柠檬，加少许君度和金巴利——喝起来像西柚。',
    description:
      '一款明亮的金酒酸酒，金巴利和君度各只用¼盎司。这一组合以喝起来像新鲜西柚而闻名，酒色是漂亮的浅三文鱼粉。',
    glassName: '鸡尾酒杯',
    recipe: [null, LEMON, { label: '君度（橙皮利口酒）' }, null],
    steps: [
      '将金酒、柠檬汁、君度和金巴利倒入装有四分之三满冰块的摇酒壶。',
      '摇和至充分冰镇。',
      '滤入冰镇过的鸡尾酒杯。',
    ],
    garnish: ['柠檬皮'],
    presentation: UP_COCKTAIL,
    provenance: {
      bar: 'Townhouse Bar & Grill',
      city: '加州埃默里维尔',
      year: '1993',
      note: 'PUNCH记为1993年；Difford’s Guide称是1990年代中期。',
    },
    facts: [
      'Paul Harrington在加州埃默里维尔的Townhouse创作了它，作为Pegu Club的变奏——用金巴利代替苦精，用柠檬代替青柠。',
      '它以Harrington的朋友Matt Jasmin命名，并因Harrington 1998年出版的鸡尾酒书而流行开来。',
      'PUNCH在2021年讲述饮品如何成为现代经典的系列文章中介绍过它。',
    ],
    sourceSupports: [
      '本页遵循的配方，归功于埃默里维尔Townhouse的Paul Harrington。',
      '1993年创作于Townhouse，是Pegu Club的变奏。',
      '创作于1990年代中期；以Matt Jasmin命名；被标为当代经典。',
    ],
  },

  'red-hook': {
    name: '红钩',
    tagline: '黑麦威士忌、Punt e Mes和黑樱桃利口酒——来自Milk & Honey的布鲁克林变奏。',
    description:
      '一款搅拌而成的曼哈顿式饮品：把普通味美思换成带苦味的Punt e Mes，再加少许黑樱桃利口酒。浓郁、苦甜、劲道十足。',
    glassName: '碟形杯',
    recipe: [
      null,
      { label: 'Punt e Mes（甜味美思）' },
      { amountText: '7.5–15 ml · ¼–½ oz', note: '适量——PUNCH给出的用量范围是¼–½盎司。' },
    ],
    steps: ['将所有材料倒入调酒杯。', '加冰搅拌。', '滤入碟形杯。'],
    garnish: [],
    presentation: '不加冰（净饮），盛于碟形杯。PUNCH未列装饰；Difford’s则用一颗马拉斯奇诺樱桃。',
    provenance: {
      bar: 'Milk & Honey',
      city: '纽约',
      year: '2003–2005年',
      note: '各来源给出的年份分别为2003年、2004年和“2003–5”。',
    },
    facts: [
      '由Vincenzo “Enzo” Errico在纽约的Milk & Honey创作，是布鲁克林（Brooklyn）鸡尾酒与曼哈顿的结合。',
      '以布鲁克林的一个街区命名；Difford’s Guide将其归为当代经典。',
      'PUNCH称它是布鲁克林鸡尾酒较为经久不衰的现代变奏之一。',
    ],
    sourceSupports: [
      '本页遵循的配方，归功于Milk & Honey的Enzo Errico。',
      '2004年由Vincenzo Errico创作，是曼哈顿与布鲁克林的混搭。',
      '2003–5年创作于Milk & Honey；以布鲁克林的这个街区命名；当代经典。',
    ],
  },

  greenpoint: {
    name: '绿点',
    tagline: '黑麦威士忌配甜味美思和黄查特酒——又一个布鲁克林街区。',
    description:
      '布鲁克林家族中的一款搅拌型黑麦威士忌饮品，以带蜜香的黄查特酒和甜味美思增甜、添深度，再用两种苦精撑起骨架。',
    glassName: '碟形杯',
    recipe: [null, null, null, null, null],
    steps: ['将所有材料倒入调酒杯。', '加冰搅拌至冰镇。', '滤入碟形杯。'],
    garnish: ['柠檬皮'],
    presentation: '不加冰（净饮），盛于碟形杯。',
    provenance: {
      bar: 'Milk & Honey',
      city: '纽约',
      year: '2006',
      note: 'PUNCH和Difford’s记为2006年；有一处资料记为2005年。',
    },
    facts: [
      '由Michael McIlroy在纽约的Milk & Honey创作，是布鲁克林鸡尾酒的变奏——以布鲁克林的绿点（Greenpoint）街区命名。',
      '它用的是黄查特酒，而不是绿查特酒。',
      'Difford’s Guide将其归为当代经典，并指出原版用的是柠檬皮装饰。',
    ],
    sourceSupports: [
      '本页遵循的配方，归功于Michael McIlroy（为Milk & Honey创作）。',
      'Michael McIlroy于2006年创作了绿点，作为布鲁克林鸡尾酒的变奏。',
      '2006年创作于Milk & Honey；被归为当代经典。',
    ],
  },

  'russian-spring-punch': {
    name: '俄罗斯春日潘趣',
    tagline: '伏特加、柠檬和黑加仑利口酒加冰，再以起泡酒补满。',
    description:
      '一款高身、莓果红色的派对饮品：伏特加、新鲜柠檬和黑加仑利口酒摇和后，以起泡酒拉长。它的创作者说，它基本上就是一杯加了烈酒、加冰的皇家基尔（Kir Royal）。',
    glassName: '高身平底杯',
    recipe: [null, LEMON, null, SIMPLE_SYRUP, { label: '起泡酒' }],
    steps: ['将除起泡酒以外的所有材料加冰摇和。', '滤入装满冰的冰镇高身平底杯。', '用起泡酒补满。'],
    garnish: ['黑莓', '柠檬片（可选）'],
    presentation: '加冰盛于高身平底杯，作为长饮。',
    provenance: {
      city: '伦敦',
      year: '1980年代',
      note: '为朋友的私人派对调制；有说法称地点是Zanzibar Club，但未获可靠来源证实。',
    },
    facts: [
      'Dick Bradsell于1980年代在伦敦为朋友创作了它——他们派对上的每位客人都带了香槟；他形容它“基本上就是一杯加了烈酒、加冰的皇家基尔（Kir Royal）”。',
      '按Bradsell自己的说法，它“肯定早于”1988年。',
      `国际调酒师协会（IBA）将其列入${NE}类别。`,
    ],
    formulaNote: '国际调酒师协会（IBA）指定的是“起泡酒”（sparkling wine），因此香槟、普洛赛克或其他干型起泡酒都可以。',
    sourceSupports: [
      ibaZh(NE),
      '1980年代由Dick Bradsell在伦敦创作；附有他本人讲述为朋友调制这款酒的经过。',
      '伦敦，1980年代——据Bradsell说，早于1988年。',
    ],
  },

  'lemon-drop-martini': {
    name: '柠檬糖马天尼',
    eraNote: `国际调酒师协会（IBA）将其归入${CC}类别。它由1970年代旧金山的一款饮品演变而来，创作者和酒吧都有据可查，因此我们将其标为现代。`,
    tagline: '伏特加、橙皮利口酒和柠檬——杯中的酸甜糖果。',
    description:
      '伏特加与橙味利口酒和新鲜柠檬汁一起摇和，不加冰饮用。甜中带酸、容易讨人喜欢——是1990年代鸡尾酒单上的常客。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, LEMON],
    steps: ['将所有材料倒入加冰的摇酒壶。', '充分摇和。', '滤入冰镇过的鸡尾酒杯。'],
    garnish: [],
    presentation: '不加冰（净饮），盛于冰镇过的鸡尾酒杯。国际调酒师协会（IBA）未列装饰。',
    provenance: {
      bar: 'Henry Africa’s',
      city: '旧金山',
      year: '1970年代',
      note: 'Hobday在1970年代调制的是“Lemon Drop”；Difford’s Guide认为马天尼版本是1990年代衍生出来的。',
    },
    facts: [
      'Lemon Drop由Norman Hobday在旧金山发明，他是Henry Africa’s的老板——这是一家典型的1970年代“蕨类酒吧”（fern bar）。',
      '“Lemon Drop Martini”在1990年代流行起来，据信是由那款1970年代的饮品演变而来。',
    ],
    formulaNote: 'Difford’s Guide的版本使用柑橘味伏特加，橙皮利口酒少得多，并加入一些糖浆。',
    sourceSupports: [
      ibaZh(CC),
      '由Norman Hobday在旧金山发明，他是1970年代蕨类酒吧Henry Africa’s的老板。',
      '在1990年代流行；据信由Hobday 1970年代的Lemon Drop演变而来。',
    ],
  },

  siesta: {
    name: '午休',
    tagline: '龙舌兰、青柠、西柚，再加少许金巴利。',
    description:
      '海明威大吉利的龙舌兰版本：银龙舌兰、青柠和西柚以糖浆增甜，再由金巴利添上一抹苦甜。珊瑚粉色，清爽宜人。',
    glassName: '碟形杯',
    recipe: [{ label: '银龙舌兰（Blanco）' }, LIME, { label: '新鲜西柚汁' }, null, null],
    steps: ['将所有材料倒入加冰的摇酒壶。', '摇和至冰镇。', '滤入冰镇过的碟形杯。'],
    garnish: ['青柠片'],
    presentation: '不加冰（净饮），盛于冰镇过的碟形杯。',
    provenance: { bar: 'Flatiron Lounge', city: '纽约', year: '2006' },
    facts: [
      'Katie Stipe于2006年在纽约的Flatiron Lounge想出了它，作为海明威大吉利的变奏——用龙舌兰代替朗姆酒，用金巴利代替黑樱桃利口酒。',
      '它成了这家酒吧最畅销的原创饮品之一。',
      'PUNCH称它为现代经典；Difford’s Guide将其归为当代经典。',
    ],
    sourceSupports: [
      '本页遵循的配方——“来自Flatiron Lounge的这款现代经典”。',
      '2006年由Katie Stipe在Flatiron Lounge创作，是海明威大吉利的变奏。',
      '约2006年由Katie Stipe创作；被归为当代经典。',
    ],
  },

  'white-negroni': {
    name: '白色内格罗尼',
    tagline: '金酒、龙胆利口酒和利莱白（Lillet Blanc）——一杯浅色、苦甜的内格罗尼。',
    description:
      '以金色重新演绎的内格罗尼：金酒搭配带泥土气息、味苦的龙胆利口酒（如Suze）和花香馥郁的利莱白，加冰搅拌，最后挤上粉红西柚皮油。',
    glassName: '古典杯',
    recipe: [
      { label: '伦敦干金酒' },
      { label: '龙胆利口酒（如Suze）' },
      { label: '加香葡萄酒（如利莱白）' },
      { label: '盐水（或一小撮盐）' },
    ],
    steps: ['在古典杯中装满冰。', '倒入所有材料。', '搅拌。'],
    garnish: ['粉红西柚皮，在酒液上方挤出皮油'],
    presentation: '加冰盛于古典杯。',
    provenance: {
      city: '波尔多（Vinexpo 展会）',
      year: '2001',
      note: 'Difford’s将其归功于Collins，称他是为Plymouth Gin的Nick Blacknell调制的；PUNCH则将其归功于两人共同创作。',
    },
    facts: [
      '2001年在波尔多Vinexpo贸易展期间创作，使用Plymouth金酒、Suze和利莱白。',
      'Collins最初用的是等量配比。',
      'Drinks International的2025年报告称它是“最具革命性的”内格罗尼变体之一。',
    ],
    formulaNote: '遵循Difford’s Guide的等量配方，据其所说与Collins最初的比例一致。',
    sourceSupports: [
      '2001年由Wayne Collins在波尔多的Vinexpo为Nick Blacknell创作；等量配方。',
      'Blacknell与Collins，波尔多，2001年；最初的粉红西柚装饰。',
      '提到白色内格罗尼是最具革命性的内格罗尼变体之一。',
    ],
  },

  'chartreuse-swizzle': {
    name: '查特酒斯维泽',
    tagline: '绿查特酒、菠萝、青柠和法勒南（Falernum），倒在颗粒碎冰上。',
    description:
      '把草本风味的绿查特酒变成热带风：与菠萝、青柠和带香料味的法勒南一起，在装满颗粒碎冰的高杯中搅打（swizzle），最后以薄荷和肉豆蔻点缀。',
    glassName: '高杯',
    recipe: [null, { label: '新鲜菠萝汁' }, LIME, null],
    steps: [
      '在装满颗粒碎冰的高杯中直调所有材料。',
      '用斯维泽搅拌棒或吧勺用力搅打。',
      '再补满颗粒碎冰。',
    ],
    garnish: ['薄荷叶', '现磨肉豆蔻'],
    presentation: '盛于塞满颗粒碎冰的高杯。',
    provenance: {
      bar: 'Harry Denton’s Starlight Room',
      city: '旧金山',
      year: '2003',
    },
    facts: [
      'Marco Dionysos为2003年旧金山一场由查特酒赞助的鸡尾酒比赛创作了它——并且赢得了比赛。',
      '它最早出现在Harry Denton’s Starlight Room的酒单上，后来在Clock Bar和Smuggler’s Cove走红。',
      `国际调酒师协会（IBA）将其列入${NE}类别。`,
    ],
    sourceSupports: [
      ibaZh(NE),
      '赢得2003年的一场查特酒比赛；最早在Starlight Room供应；后来在Clock Bar和Smuggler’s Cove走红。',
    ],
  },
};
