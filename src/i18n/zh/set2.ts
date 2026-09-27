import type { CocktailText } from '../types';

// IBA category names, kept consistent with set1.
const UNF = '“难忘经典”（The Unforgettables）';
const CC = '“当代经典”（Contemporary Classics）';

/** Translation of the `supports` sentence built by `iba()` in src/data/sources.ts. */
const ibaZh = (category: string, extra = '') =>
  `本页所示的配方、做法、杯型和装饰。国际调酒师协会（IBA）将其列入${category}类别。${extra}`;

/** Translation of the eraNote built by `contemporary()` in src/data/classics2.ts. */
const contemporaryZh = (what: string) =>
  `国际调酒师协会（IBA）将这款酒归入${CC}类别。${what}，因此我们将其列入经典之列。`;

const SHAKE_STEPS = ['将所有材料倒入摇酒壶。', '加冰充分摇和。', '滤入冰镇过的鸡尾酒杯。'];
const STIR_STEPS = ['将所有材料倒入加了冰块的调酒杯。', '充分搅拌。', '滤入冰镇过的鸡尾酒杯。'];
const UP_COCKTAIL = '不加冰（净饮），盛于冰镇过的鸡尾酒杯。';
const LEMON = { label: '新鲜柠檬汁' };
const LIME = { label: '新鲜青柠汁' };

export const zhSet2: Record<string, CocktailText> = {
  americano: {
    name: '美国佬',
    tagline: '金巴利和甜味美思，以苏打水拉长——内格罗尼更温和的前辈。',
    description:
      '苦甜的金巴利与甜味美思加冰直调，再以少许苏打水提升口感。酒精度低，风味十足——教科书般的意大利开胃酒（aperitivo）。',
    glassName: '古典杯（岩石杯）',
    recipe: [null, null, { amountText: '少许' }],
    steps: ['在古典杯中装满冰块。', '倒入金巴利和甜味美思。', '加入少许苏打水，轻轻搅拌。'],
    garnish: ['半片橙片', '柠檬皮'],
    presentation: '在古典杯中加冰块直调。',
    facts: [
      '这个名字在意大利语中意为“美国式”。Difford’s Guide将它与意大利酒商联系起来——他们把预先加入苦精的味美思当作“vermouth Americano”出售。',
      '1920年的一本意大利调酒书中已经收录了两份“Americano”配方。',
    ],
    formulaNote: '国际调酒师协会（IBA）只写苏打水“少许”（a splash）。',
    sourceSupports: [ibaZh(UNF), '名称的含义、“vermouth Americano”，以及早期的意大利配方（1920年、1936年）。'],
  },

  aviation: {
    name: '飞行',
    tagline: '金酒、黑樱桃利口酒、柠檬，再加一点紫罗兰——禁酒令之前的天蓝色酸酒。',
    description: '一款清爽的金酒酸酒，以黑樱桃利口酒增甜，再用紫罗兰利口酒着色，带来花香和淡淡的薰衣草色调。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, LEMON, null],
    steps: ['将所有材料倒入摇酒壶。', '加入敲碎的冰块摇和。', '滤入冰镇过的鸡尾酒杯。'],
    garnish: ['马拉斯奇诺樱桃（可选）'],
    presentation: UP_COCKTAIL,
    facts: [
      '飞行最早见于Hugo Ensslin 1916年的《Recipes for Mixed Drinks》；Ensslin是纽约Hotel Wallick的首席调酒师，普遍被认为是它的创作者。',
      '紫罗兰利口酒从未广泛流通，因此许多后来的配方——包括1930年的《Savoy Cocktail Book》——都把它省去了。',
    ],
    formulaNote: '国际调酒师协会（IBA）指定Luxardo黑樱桃利口酒；在这里，任何黑樱桃利口酒都算数。',
    sourceSupports: [ibaZh(UNF), '1916年首次付印（Ensslin）；名称与紫罗兰利口酒带来的颜色；Savoy一书中省去了它。'],
  },

  'clover-club': {
    name: '三叶草俱乐部',
    tagline: '金酒、覆盆子和柠檬，配上丝滑的粉色泡沫。',
    description: '一款费城经典：金酒与覆盆子糖浆、柠檬和少许蛋清一起摇和，成为一杯淡粉色的酸酒，顶上覆着柔软的白色泡沫。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, LEMON, { amountText: '几滴', label: '蛋清' }],
    steps: SHAKE_STEPS,
    garnish: ['新鲜覆盆子'],
    presentation: UP_COCKTAIL,
    tips: ['先不加冰摇和一次（即“干摇”，dry shake），有助于蛋清起泡。'],
    facts: [
      '得名于1882年成立的一个费城记者俱乐部，其成员每周在该市的Hotel Bellevue聚会。',
      '已知最早的提及是1901年纽约的一篇报纸文章；这款酒由谁、在何时创作，则不得而知。',
      '1911年的一段描述称它呈淡粉色，顶上有一层薄薄的白色泡沫。',
    ],
    formulaNote: '国际调酒师协会（IBA）将蛋清写作“几滴”（a few drops），并未标为可选。',
    sourceSupports: [ibaZh(UNF), '名称背后的费城俱乐部、已知最早的提及（1901年），以及早期的描述。'],
  },

  martinez: {
    name: '马丁内斯',
    tagline: '金酒和甜味美思，加上黑樱桃利口酒——马天尼醇厚的祖先。',
    description:
      '金酒与甜味美思等量，以黑樱桃利口酒圆润口感，再用橙味苦精增添锐度。搅拌而成，丝滑芬芳——是曼哈顿与马天尼之间缺失的一环。',
    glassName: '鸡尾酒杯',
    recipe: [{ label: '伦敦干金酒' }, null, null, null],
    steps: STIR_STEPS,
    garnish: ['柠檬皮'],
    presentation: UP_COCKTAIL,
    facts: [
      '饮品史学家大体认为，马丁内斯由曼哈顿演变而来，早于马天尼，约在1860年代或1870年代初出现。',
      '已知最早的配方（1884年）只是简单写道：与曼哈顿相同，只是把威士忌换成金酒。',
      'Jerry Thomas调酒指南的1887年版收录了一款马丁内斯，用老汤姆金酒、味美思、黑樱桃利口酒和苦精调制。',
    ],
    formulaNote: '国际调酒师协会（IBA）指定伦敦干金酒；历史上的版本使用老汤姆金酒。',
    sourceSupports: [ibaZh(UNF), '源自曼哈顿的传承、最早的配方（1884年），以及Jerry Thomas的1887年版本。'],
  },

  'vieux-carre': {
    name: '老广场',
    tagline: '黑麦威士忌、干邑、甜味美思和廊酒——杯中的法国区。',
    description:
      '一款来自新奥尔良、醇厚而富有层次的搅拌型鸡尾酒：辛辣的黑麦威士忌与柔和的干邑等量，加上甜味美思、一勺带蜜香的廊酒和裴乔苦精。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, null, null, null],
    steps: STIR_STEPS,
    garnish: ['橙皮', '马拉斯奇诺樱桃'],
    presentation: '国际调酒师协会（IBA）的做法是不加冰盛于冰镇过的鸡尾酒杯。许多酒吧——以及1938年的配方——则改为加冰饮用。',
    provenance: { bar: 'Hotel Monteleone', city: '新奥尔良', year: '1938' },
    facts: [
      '1938年由Walter Bergeron创作，他是新奥尔良Hotel Monteleone酒店一间酒吧的首席调酒师——那里就是今天的Carousel Bar。',
      '“Vieux Carré”字面意思是“老广场”，是新奥尔良法国区的法语名称。',
      'Difford’s引用的1938年配方，裴乔苦精和安高天娜苦精各用1抖。',
    ],
    sourceSupports: [ibaZh(UNF), '创作者、地点和年份；名称的含义；1938年的印刷配方。'],
  },

  'white-lady': {
    name: '白色佳人',
    tagline: '金酒、橙味利口酒和柠檬——干净、明亮而优雅。',
    description:
      '本质上就是金酒版的边车：伦敦干金酒加橙皮利口酒（Triple sec）和新鲜柠檬，摇和后不加冰饮用。清爽、带柑橘香，颜色像它的名字一样浅淡。',
    glassName: '鸡尾酒杯',
    recipe: [null, null, LEMON],
    steps: SHAKE_STEPS,
    garnish: [],
    presentation: '不加冰（净饮），盛于冰镇过的鸡尾酒杯。国际调酒师协会（IBA）未列装饰。',
    facts: [
      'Harry MacElhone于1919年在伦敦调制过最早的“White Lady”，但用的是白兰地和薄荷利口酒——与今天的金酒版本大不相同。',
      '金酒版白色佳人的创作者存在争议；Difford’s Guide称答案已湮没于时间之中，但倾向于认为是约1929年的Victor Cabrin。',
      '早期配方中没有蛋清；蛋清最早出现在1936年一份报纸刊登的配方中。',
    ],
    sourceSupports: [ibaZh(UNF), '1919年的白兰地原版、金酒版本存在争议的创作者，以及后来加入的蛋清。'],
  },

  'gin-fizz': {
    name: '金菲士',
    tagline: '金酒、柠檬和糖，摇和后以苏打水补满——不加冰饮用。',
    description:
      '一款摇和的金酒酸酒，在细长的杯中以少许苏打水拉长。与柯林斯不同，它不加冰饮用，所以要趁气泡正活跃时喝。',
    glassName: '细高平底杯',
    recipe: [null, LEMON, null, { amountText: '少许' }],
    steps: ['将金酒、柠檬汁和糖浆加冰摇和。', '倒入细高平底杯。', '加入少许苏打水补满。不加冰饮用。'],
    garnish: ['柠檬片', '柠檬皮（可选）'],
    presentation: '不加冰，盛于细高平底杯。',
    facts: [
      '一款19世纪中叶的经典：Jerry Thomas 1876年的调酒指南中，金菲士的做法与威士忌版本相同——糖浆、柠檬和烈酒一起摇和，再以苏打水（seltzer）补满。',
      'Difford’s Guide以较小的杯子和不加冰饮用来区分菲士与柯林斯；加入蛋清，它就成了银菲士（Silver Fizz）。',
    ],
    formulaNote: '国际调酒师协会（IBA）只写苏打水“少许”（a splash），并注明这款酒不加冰饮用。',
    sourceSupports: [ibaZh(UNF), '它在Jerry Thomas 1876年指南中的出现，以及菲士与柯林斯的区别。'],
  },

  alexander: {
    name: '白兰地亚历山大',
    tagline: '干邑、可可利口酒和奶油，撒上一层肉豆蔻。',
    description: '一款奶香浓郁、带巧克力风味的餐后经典：干邑和深色可可利口酒与鲜奶油一起摇和，最后撒上现磨肉豆蔻。',
    glassName: '鸡尾酒杯',
    recipe: [null, { label: '深色可可利口酒' }, { label: '鲜奶油' }],
    steps: ['将所有材料倒入装满冰块的摇酒壶。', '充分摇和。', '滤入冰镇过的鸡尾酒杯。'],
    garnish: ['现磨肉豆蔻，撒在表面'],
    presentation: UP_COCKTAIL,
    facts: [
      '最初的亚历山大由金酒、可可利口酒和奶油等量调成，1916年首次付印。',
      'Harry MacElhone被认为在1920年代初开启了由金酒改用白兰地的转变。',
      '1930年的《Savoy Cocktail Book》两种都有收录：金酒版Alexander No. 1和白兰地版Alexander No. 2。',
    ],
    formulaNote: '国际调酒师协会（IBA）将这款酒简称为“Alexander”（亚历山大）；用干邑调制时，就是大多数酒吧所说的白兰地亚历山大。',
    sourceSupports: [
      ibaZh(UNF),
      '从金酒改用白兰地的变化，以及Savoy的两个版本（1930年）。',
      '最初等量调配的金酒亚历山大，1916年付印。',
    ],
  },

  'pisco-sour': {
    name: '皮斯科酸',
    eraNote: contemporaryZh('早在1903年，利马就已有配方付印'),
    tagline: '皮斯科、柠檬和糖，覆着厚厚的蛋清泡沫，点缀几滴苦精。',
    description: '以葡萄为原料的皮斯科与柑橘、糖浆和一整个蛋清一起摇和至起泡，最后在雪白的泡沫上滴几滴芳香的苦精。',
    glassName: '高脚杯',
    recipe: [null, LEMON, null, { label: '蛋清', amountText: '1个蛋清' }],
    steps: ['将所有材料倒入加冰的摇酒壶。', '用力摇和。', '滤入冰镇过的高脚杯。'],
    garnish: ['在泡沫上加几抖阿马戈苦精'],
    presentation: '不加冰（净饮），盛于冰镇过的高脚杯。',
    tips: ['安高天娜苦精常被用来代替泡沫上的秘鲁阿马戈苦精——无论用哪种，这项装饰在匹配时都属可选。'],
    facts: [
      '已知最早的皮斯科酸式配方——名字就叫“Cocktail”——出现在1903年于利马出版的一本小册子中。',
      '这款酒由美国侨民Victor Morris推广开来，他于1916年在利马开设了Morris’ Bar；至于最早是谁调制的，恐怕永远无从得知。',
      '智利方面声称它创作于1872年，但依据的引文实际上说的是威士忌酸。',
    ],
    formulaNote: '遵循国际调酒师协会（IBA）的配方，使用柠檬；1903年的利马配方用的是青柠。',
    sourceSupports: [ibaZh(CC), '1903年的利马配方、Victor Morris的酒吧，以及存在争议的智利说法。'],
  },

  caipirinha: {
    name: '卡琵莉亚',
    eraNote: contemporaryZh('它是一款历史悠久的巴西饮品，确切起源并无记载'),
    tagline: '卡莎萨浇在捣压过的青柠和糖上，配敲碎的冰块。',
    description:
      '巴西最著名的鸡尾酒：新鲜青柠块与糖直接在杯中压出汁，装满敲碎的冰块，再倒入带青草香、风味独特的卡莎萨。',
    glassName: '双份古典杯',
    recipe: [null, { amountText: '1个青柠', label: '青柠，切成小块' }, { label: '白蔗糖' }],
    steps: ['在双份古典杯中轻轻捣压青柠块和糖。', '在杯中装满敲碎的冰块。', '倒入卡莎萨，轻轻搅拌。'],
    garnish: [],
    presentation: '在双份古典杯中加敲碎的冰块直调。国际调酒师协会（IBA）未列装饰。',
    facts: [
      '这个名字大致可译为“乡下小姑娘”，这款酒源自圣保罗州的乡村地区。',
      '关于它的起源说法不一——从水手预防坏血病的调饮，到青柠、蜂蜜加大蒜的偏方——但都未经证实。',
      '国际调酒师协会（IBA）列出了几个有专门名称的变体：Caipiroska（伏特加）、Caipirissima（朗姆酒）和Caipirão（Licor Beirão）。',
    ],
    sourceSupports: [ibaZh(CC), '名称的含义、它的圣保罗渊源，以及相互竞争的起源说法。'],
  },

  'mai-tai': {
    name: '迈泰',
    eraNote: contemporaryZh('它诞生于1940年代，是提基（tiki）经典的核心'),
    tagline: '两种朗姆酒、青柠、橙味库拉索和杏仁糖浆——提基之王。',
    description:
      '牙买加朗姆酒和马提尼克朗姆酒与新鲜青柠、橙味库拉索和杏仁糖浆（orgeat）一起摇和。坚果香、酸爽、朗姆风味浓厚——与受它启发的那些果汁潘趣式版本截然不同。',
    glassName: '双份岩石杯（或高球杯）',
    recipe: [
      { label: '琥珀色牙买加朗姆酒' },
      {
        label: '马提尼克糖蜜朗姆酒',
        note: '国际调酒师协会（IBA）注明，Trader Vic’s使用的马提尼克朗姆酒以糖蜜为原料，而不是农业朗姆酒（rhum agricole）。',
      },
      null,
      { label: '杏仁糖浆（Orgeat）' },
      LIME,
      null,
    ],
    steps: ['将所有材料倒入加冰的摇酒壶。', '摇和。', '倒入双份岩石杯或高球杯。'],
    garnish: ['菠萝条', '薄荷叶', '青柠皮'],
    presentation: '加冰盛于双份岩石杯或高球杯。',
    facts: [
      'Trader Vic（Victor Bergeron）称他于1944年在自己位于奥克兰的餐厅创作了这款酒；据说，一位塔希提朋友喝后欣喜地喊出“Maita’i roa aé!”（“好得不似人间！”），这款酒由此得名。',
      '它的起源存在争议：好莱坞的Don the Beachcomber也声称这款酒出自他手。',
      'Vic的原版只用一种17年的牙买加朗姆酒，倒在刨冰上。',
    ],
    sourceSupports: [
      ibaZh(CC, '允许使用双份岩石杯或高球杯。'),
      'Trader Vic对1944年的讲述、Don the Beachcomber与之竞争的说法，以及Vic的原版配方。',
    ],
  },

  'cuba-libre': {
    name: '自由古巴',
    eraNote: contemporaryZh('它的故事可追溯至1900年前后'),
    tagline: '白朗姆酒加可乐，再挤入新鲜青柠汁。',
    description: '不只是朗姆酒兑可乐：关键在于新鲜青柠汁，它削弱了可乐的甜腻，也让朗姆酒更加明亮。',
    glassName: '高球杯',
    recipe: [null, null, LIME],
    steps: ['在高球杯中装满冰。', '将所有材料倒入杯中直调。', '轻轻搅拌。'],
    garnish: ['青柠角'],
    presentation: '在装满冰的高球杯中直调。',
    facts: [
      '百加得（Bacardi）根据1964年的一份宣誓证词称，1900年8月，哈瓦那一家酒吧里的美国士兵把一款朗姆酒兑可乐的饮品命名为“Cuba Libre”（“自由古巴”）；此外还有其他版本，时间线也存在争议。',
      '它在1940年代的美国最为流行，部分得益于Andrews Sisters 1945年的热门歌曲《Rum and Coca-Cola》。',
    ],
    sourceSupports: [ibaZh(CC), '百加得的起源说法（及其争议），以及这款酒在1940年代的流行。'],
  },

  'irish-coffee': {
    name: '爱尔兰咖啡',
    eraNote: contemporaryZh('它诞生于1940年代中期'),
    tagline: '热咖啡、爱尔兰威士忌和糖，上覆一层冰凉的奶油。',
    description: '加糖的热咖啡兑入爱尔兰威士忌，顶上漂浮一层轻微打发的奶油——隔着冰凉的奶油啜饮温热的咖啡。',
    glassName: '预热过的爱尔兰咖啡杯',
    recipe: [
      null,
      { label: '热黑咖啡' },
      { label: '鲜奶油（冷藏）' },
      { label: '糖（或糖浆）', note: '国际调酒师协会（IBA）写明至少一茶匙。' },
    ],
    steps: [
      '将热黑咖啡倒入预热过的爱尔兰咖啡杯。',
      '加入威士忌和至少一茶匙糖，搅拌至溶化。',
      '将冷藏的奶油沿勺背缓缓倒入，使其漂浮在表面。不要搅拌。',
    ],
    garnish: [],
    presentation: '趁热盛于预热过的爱尔兰咖啡杯，表面漂浮一层奶油。',
    tips: ['奶油打发到稍微变稠即可——应当仍能倒出，这样也更容易浮在表面。'],
    facts: [
      '由Joe Sheridan于1944年底至1945年初在爱尔兰福因斯（Foynes）的水上飞机港创作，用来给横跨大西洋抵达的旅客暖身。',
      '旅行作家Stanton Delaplane于1947年在香农机场喝到了它，并协助旧金山的Buena Vista Café重现这款酒，使它在美国流行开来。',
    ],
    sourceSupports: [
      ibaZh(CC, '允许用糖浆代替糖。'),
      'Joe Sheridan在福因斯的创作（1944–45年），以及它在旧金山的流行。',
    ],
  },

  'bloody-mary': {
    name: '血腥玛丽',
    eraNote: contemporaryZh('它自1930年代起就有文献记载'),
    tagline: '伏特加、番茄和柠檬，按口味调味——终极咸鲜鸡尾酒。',
    description:
      '伏特加和番茄汁，以柠檬提亮，再用伍斯特酱、塔巴斯科辣椒酱、芹菜盐和胡椒调味。轻轻搅拌，绝不摇和，并按你的口味调整。',
    glassName: '岩石杯（如加冰则用高球杯）',
    recipe: [null, null, LEMON, null, { amountText: '适量' }, { amountText: '适量' }, { amountText: '适量' }],
    steps: ['将所有材料倒入加冰的调酒杯。', '轻轻搅拌。', '倒入岩石杯——如果想加冰饮用，则倒入高球杯。'],
    garnish: ['芹菜秆（可选）', '柠檬角（可选）'],
    presentation: '不加冰盛于岩石杯；如有要求，也可加冰盛于高球杯。',
    facts: [
      '常被归功于1920年代初巴黎Harry’s New York Bar的Fernand Petiot——不过Difford’s认为，更可能的情况是他后来在纽约的St. Regis为一款现成的伏特加番茄汁调饮加入了调味。',
      '1939年12月的一篇报纸专栏，称一款伏特加与番茄汁各半的血腥玛丽是艺人George Jessel“最新的提神饮品”。',
      '1964年，Petiot说他接手这款酒时，它“不过是伏特加和番茄汁”，是他加入了调味。',
    ],
    formulaNote:
      '国际调酒师协会（IBA）将塔巴斯科辣椒酱、芹菜盐和胡椒写作“适量”（up to taste），而非可选，因此在这里它们算作必需材料。',
    sourceSupports: [ibaZh(CC), 'Petiot与George Jessel两种说法、1939年的专栏，以及Petiot 1964年的访谈。'],
  },

  'pina-colada': {
    name: '椰林飘香',
    eraNote: contemporaryZh('它于1950–60年代诞生于波多黎各'),
    tagline: '朗姆酒、椰浆和菠萝，搅打得冰爽顺滑。',
    description: '白朗姆酒与椰浆、新鲜菠萝和冰一起搅打，成为一杯浓稠、冰爽的热带饮品。以大杯盛装，配上吸管。',
    glassName: '大号杯（图中为飓风杯）',
    recipe: [null, null, { label: '新鲜菠萝汁（或4片新鲜菠萝）' }],
    steps: ['将所有材料和冰一起放入电动搅拌机。', '搅打至顺滑。', '倒入大号杯中，配吸管饮用。'],
    garnish: ['菠萝片', '鸡尾酒樱桃'],
    presentation: '搅打后盛于大号杯，配吸管。国际调酒师协会（IBA）没有指定杯型。',
    facts: [
      '它的起源在三位波多黎各调酒师之间存在争议：Ramón “Monchito” Marrero（Caribe Hilton；据他本人说是1952年，酒店则称是1954年）、Ricardo García，以及Ramón Portas Mingot（Barrachina，1963年）。',
      '这个名字意为“过滤的菠萝”；1922年的一本杂志提到过一种古巴的“piña colada”，由菠萝、朗姆酒、青柠和糖调成——不含椰子。',
    ],
    formulaNote: '国际调酒师协会（IBA）允许用4片新鲜菠萝代替菠萝汁，并注明历史上会按口味加入几滴青柠汁。',
    sourceSupports: [ibaZh(CC), '三种相互竞争的波多黎各起源说法，以及名称的含义。'],
  },

  'champagne-cocktail': {
    name: '香槟鸡尾酒',
    eraNote: contemporaryZh('它早在1855年就有记载'),
    tagline: '一块浸透苦精的方糖、少许干邑和冰镇香槟。',
    description: '一块浸过安高天娜苦精的方糖沉在杯底，源源不断地冒出气泡，穿过添了一点干邑暖意的香槟。',
    glassName: '大号香槟杯',
    recipe: [{ label: '冰镇香槟' }, null, null, { label: '方糖' }, { amountText: '几滴' }],
    steps: [
      '将方糖放入大号香槟杯，用2抖安高天娜苦精将其浸透。',
      '加入干邑（如使用柑曼怡，也加入几滴）。',
      '缓缓倒入冰镇香槟。',
    ],
    garnish: ['橙皮', '马拉斯奇诺樱桃'],
    presentation: '不加冰，盛于大号香槟杯。',
    facts: [
      'Difford’s引用的最早文字记载来自1855年：平底杯中盛着香槟、苦精、糖和捣碎的冰——没有白兰地。',
      'Jerry Thomas 1862年的指南同样没有白兰地；到1887年版时，它改用高脚杯盛装，更接近今天的这款酒。',
    ],
    sourceSupports: [
      ibaZh(CC, '将柑曼怡标为可选。'),
      '最早的文字记载（1855年），以及Jerry Thomas的版本（1862年、1887年）。',
    ],
  },
};
