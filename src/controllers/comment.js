const { Comment, User, Square } = require('../models/index');

class CommenCtr {
  // 测试首页数据
  async home(ctx) {
    const data = {
      errCode: 0,
      errMsg: "",
      data: {
        banner: [],
        women: [
          {
            authType: "0",
            bookAuthor: "六月",
            bookCategoryId: "2002",
            bookCategoryName: "古代言情",
            bookChannel: "200",
            bookCover: "http://file.lingyun5.com/coverAlias/774630149193729/fWYp1f2P.jpg",
            bookGrade: "9.90",
            bookId: "774630149193729",
            bookKeyWords: null,
            bookLevel: "S",
            bookName: "医妃倾天下",
            bookProtagonist: "元卿凌,宇文皓",
            bookStatus: "1",
            bookSummary: "天才医学博士穿越成楚王弃妃，刚来就遇上重症伤者，她秉持医德去救治，却差点被打下冤狱。太上皇病危，她设法救治，被那可恨的毒王误会斥责，莫非真的是好人难做？这男人整日给她使绊子就算了，最不可忍的是他竟还要娶侧妃来恶心她！毒王冷冽道：“你何德何能让本王恨你？本王只是憎恶你，见你一眼都觉得恶心。”元卿凌笑容可掬地道：“我又何尝不嫌弃王爷呢？只是大家都是斯文人，不想撕破脸罢了。”毒王嗤笑道：“你别以为怀了本王的孩子，本王就会认你这个王妃，喝下这碗药，本王与你一刀两断，别妨碍本王娶褚家二小姐。”元卿凌眉眼弯弯继续道：“王爷真爱说笑，您有您娶，我有我带着孩子再嫁，谁都不妨碍谁，到时候摆下满月酒，还请王爷过来喝杯水酒。”",
            bookWords: "3120925",
            chapterAuditPassNum: "1443",
            chapterPrice: null,
            extensionChapterId: null,
            extensionChapterName: null,
            extensionChapterSort: null,
            finishStatus: "0",
            id: "8722",
            lastChapterName: "第1443章 一起努力",
            lastChapterTime: "2020-11-23 09:29:54",
            mastFllowChapterId: null,
            mastFllowChapterName: null,
            mastFllowChapterSort: null,
            payChapterPointSort: "26",
            priceType: null,
          }
        ],
        man: [
          {
            authType: "0",
            bookAuthor: " ",
            bookCategoryId: "1002",
            bookCategoryName: "玄幻",
            bookChannel: "100",
            bookCover: "http://file.lingyun5.com/coverAlias/775076381196289/jypJMEJ5.jpg",
            bookGrade: "9.90",
            bookId: "775076381196289",
            bookKeyWords: null,
            bookLevel: "S",
            bookName: "至尊剑帝",
            bookProtagonist: "叶玄,叶灵",
            bookStatus: "1",
            bookSummary: "叶玄：吾为，剑道至尊，故谓，剑帝！",
            bookWords: "5932663",
            chapterAuditPassNum: "1734",
            chapterPrice: null,
            extensionChapterId: null,
            extensionChapterName: null,
            extensionChapterSort: null,
            finishStatus: "0",
            id: "8735",
            lastChapterName: "第一千七百四十章：做人不能忘本！",
            lastChapterTime: "2020-11-23 09:50:00",
            mastFllowChapterId: null,
            mastFllowChapterName: null,
            mastFllowChapterSort: null,
            payChapterPointSort: "23",
            priceType: null
          },
          {
            authType: "0",
            bookAuthor: "北冥小妖",
            bookCategoryId: "1001",
            bookCategoryName: "都市",
            bookChannel: "100",
            bookCover: "http://file.lingyun5.com/coverAlias/743916821282875/WIdXeSct.jpg",
            bookGrade: "9.70",
            bookId: "743916821282875",
            bookKeyWords: null,
            bookLevel: "S",
            bookName: "都市极品猛男",
            bookProtagonist: "罗军",
            bookStatus: "1",
            bookSummary: "罗军是一名光荣的小保安，也是最牛的小保安，没有之一！繁华都市里，罗军以超强的身手和非凡的智慧如鱼得水。敌人强猛，以拳破之。敌人狡诈，以智慧破之。奈何，离异女业主的美丽成熟，冰山总裁妹妹智慧无双，警花妹妹的英姿飒爽，她们所交织的情网袭杀而来时，罗军的拳与智慧都失去了作用？万丈红尘，我破不开！",
            bookWords: "9221976",
            chapterAuditPassNum: "2907",
            chapterPrice: null,
            extensionChapterId: null,
            extensionChapterName: null,
            extensionChapterSort: null,
            finishStatus: "0",
            id: "725",
            lastChapterName: "明天休息",
            lastChapterTime: "2019-11-28 16:50:38",
            mastFllowChapterId: null,
            mastFllowChapterName: null,
            mastFllowChapterSort: null,
            payChapterPointSort: "19",
            priceType: null
          }
        ]
      }
    }

    ctx.body = data
  }
  // 测试bookId
  async test(ctx) {
    const { bookId } =  ctx.request.query
    // 775076381196289 是至尊剑客
    // 743916821282875 是都市极品猛男
    // 774630149193729 医妃倾天下
    let data = {
      errCode: 0,
      errMsg: "",
      data: {
        chapterInfo: {
          bookResult: {
            authType: null,
            bookAuthor: " ",
            bookCategoryId: 1002,
            bookCategoryName: "玄幻",
            bookChannel: 100,
            bookCover: "http://file.lingyun5.com/coverAlias/775076381196289/jypJMEJ5.jpg",
            bookGrade: 9.9,
            bookId: "775076381196289",
            bookKeyWords: null,
            bookLevel: "S",
            bookName: "至尊剑帝",
            bookProtagonist: "叶玄,叶灵",
            bookStatus: 1,
            bookSummary: "叶玄：吾为，剑道至尊，故谓，剑帝！",
            bookWords: 5946905,
            chapterAuditPassNum: 1738,
            chapterPrice: null,
            extensionChapterId: null,
            extensionChapterName: null,
            extensionChapterSort: null,
            finishStatus: 0,
            id: null,
            lastChapterName: "第一千七百四十四章：神庙！",
            lastChapterTime: "2020-11-25 09:50:00",
            mastFllowChapterId: null,
            mastFllowChapterName: null,
            mastFllowChapterSort: null,
            payChapterPointSort: 23,
            priceType: null
          },
          bookId: "775076381196289",
          chapterContent: `  “听说了吗，叶玄的世子身份，要被大长老废除了！”“叶玄行事霸道，叶家早就看他不顺眼了！”
            “他此刻，还在南山与李家争夺矿山开采权，如果活着回来，怕不是要气晕过去……”
            青城，叶家，祠堂外。
            今日一早，族人们突然被召集过来，三五成群，正在议论纷纷。
            “肃静！”
            一位身着黑袍的老者，在叶家诸多长老的簇拥下，从祠堂中走出。
            身边，还跟着一位神色倨傲的少年。
            老者正是叶家大长老，他枯皱的脸上，带着几分冷厉，扫了一眼人群，道：“经商议，世子叶玄，无才，无德，已不能胜任世子之位......此刻起，罢黜其世子之位，由我孙儿叶天继承。”
            说罢，那神色傲然的少年走到众人面前，嘴角挂着淡淡笑容。此人，正是叶天。
            下方院落里的族人们都早有预料，正想要听听，这位新任世子准备说些什么。
            “为什么？”
            这时，一个十二三岁的小女孩，突然冲到了众人面前。
            小女孩名为叶灵，是叶玄的亲妹妹，她身体虚弱，脸色带着一丝病态苍白，正是听闻家族要罢免叶玄，她不顾身上的病赶了过来。
            大长老顿了顿，微怒道：“叶灵，你来做什么？”
            “不公平！”
            叶灵向大长老微微一礼，怯怯的眼神中却充满了倔强，她两只小手紧紧捏着裙角，毫不畏惧地直视着大长老道：“我哥……自担任世子以来，一直为家族做贡献，此刻还在矿山与人拼杀，生死未知，而眼下，家族却以莫须有的借口，废了他的世子之位，这实在是不公平。”
            大长老顿时阴沉无比：“这是家族决定，还轮不到你一个小丫头片子质疑！”
            这时，一旁的新任世子叶天，忽然笑道：“爷爷，这丫头扰乱族会，不敬尊长，应严惩！”
            大长老冷声道：“就依天儿所言，来人！”
            “在！”话音刚落，一位叶府侍卫就冲上前来，二话不说，一巴掌就扇在了叶灵的脸上。
            啪！
            一声脆响，叶灵的右脸瞬间红肿了起来，不过，她却没有哭，而是死死捂着自己脸颊，瞪着章朗：“走狗！”
            叶灵认得此人，他名叫章朗，一年前在外被人打成重伤，是叶玄将他扛回家才捡回一条命，此时见叶玄被罢，而叶天得势，却是第一个跳出来了。
            “叶天少爷继承世子，乃叶府，甚至这青城，都众望所归！”
            谁知章朗却毫不心虚，看了一眼新任世子叶天，他知道，这是自己表现的机会，指着叶灵，喝骂道：“胆敢挑衅大长老和世子的威严，你是活腻歪了吧！”
            叶天打量了一眼章朗，露出赞许之色：“你很不错，以后为我效力吧。”
            闻言，章朗大喜，连忙深深一礼，“属下愿为世子赴汤蹈火，万死不辞！”
            叶天微微点头，“拖下去吧，此人扰乱祠堂，惊了祖宗，重罚，可明白？”
            章朗看了一眼叶天，看到叶天眼中的杀意时，他明白了。当下便一把抓住了叶灵的头发，往外拖去。  
            就在这时，一位浑身浴血的少年，在祠堂外，风尘仆仆而来。
            瞬间便吸引了众人的目光。
            “啊，是世子……不，叶玄回来了……”有侍卫失声叫道。
            来人，正是从南山赶回来的叶玄！
            叶天嘴角，微微泛起了一抹阴冷笑容。而两旁的众长老们，眉头纷纷皱了起来。
            大长老双眼微眯，脸色阴沉的可怕，不知在想什么。  
            “哥！”
            当叶灵当看到叶玄时，她眼中的眼泪一下涌了出来，却不是叫疼，“他们欺负人，想罢免你......”
            “找死！”
            走进祠堂院里的叶玄，看见拖着叶灵的章朗，脸色顿时狰狞，“谁给你的狗胆，敢动我妹？”
            章朗见叶玄气势骇人，吓得连忙后退，他转头看向叶天，正要说话，就见叶玄宛如一只猛虎突然跃到了他面前，抬手一拳，直冲他面门而来。
            拳风呼啸！
            砰！
            章朗瞬间被击中，眼前一黑，直接栽倒在地。
            叶天狂怒出声：“叶玄，他是我的人，你胆敢.....”
            话未落音，叶玄已经提起一脚，向着章朗的脑袋践踏而去。
            砰！
            章朗的脑袋瞬间炸裂开来，鲜血溅射！
            这一幕，看得场中所有人都呆住了。
            叶天脸色无比难看，而叶玄则是抬头看向他，狞声道：“你的人？”
            说着，他直接朝着叶天冲了过去。
            祖祠内，大长老脸色大变，“放肆！”
            说完，他脚尖猛地一点地面，整个人直接滑到了叶玄面前，然后一掌拍向了叶玄。
            掌带劲风，凌厉刺人！
            叶玄嘴角泛起一抹狰狞，他右手紧握成拳，气劲鼓荡而出，下一刻，他猛地向大长老对轰了过去。
            呼啸间，拳掌相接！
            嘭！
            气浪交叠，发出阵阵爆鸣。
            叶玄身形一震，瞬间退出一丈远，而大长老也是摇晃着连退了好几步。
            见到这一幕，场中众人皆是震惊不已。
            在青州，武者分为一品淬体境，二品练力境，三品内壮境，四品兼修境，五品不息境，六品气变境，之上就是御气境。而大长老，可是实打实的御气境，但是，这叶玄只是五品不息境，与这大长老相隔两个大境界。
            然而，叶玄竟然只是稍落下风而已。
            大长老也是心惊不已，他知道叶玄天赋极好，是叶府精心培养的世子，而且常年为叶家在外死战，实力极高，但是，他没有想到叶玄的战力竟然有如此之强！
            翅膀硬了！
            念至此，大长老眼眸内深处的杀意更加的浓了。
            大长老死死看着叶玄，“叶玄，你竟敢当众攻击世子！”
            叶玄眼神一凝，“世子？”
            大长老冷笑，“叶玄，忘记告诉你了。你已被罢黜世子之位，此刻起，叶天是我叶家世子！”
            叶玄闻言一震，双眼微眯，“就凭你？”
            大长老冷声道：“这是，我们众长老一致的决定。”
            闻言，叶玄狞笑道：“哈哈哈，世子乃家族年轻一代领头人，是我在外拼死拼活才挣来的地位，叶天，有何资格取代我？”`,
          chapterId: "113356138610690",
          chapterName: "第一章：罢黜世子！",
          chapterWords: 2336,
          contentMd5: null,
          enableStatus: 0,
          id: null,
          isConsume: 0,
          nextChapterId: 113356138610691,
          payStatus: 1,
          sort: 1,
          upChapterId: null,
          updateType: null,
        },
        userInfo: null
      }
    }
    if (bookId == 743916821282875) {
      data.data.chapterInfo = {
        bookResult: {
          authType: null,
          bookAuthor: "北冥小妖",
          bookCategoryId: 1001,
          bookCategoryName: "都市",
          bookChannel: 100,
          bookCover: "http://file.lingyun5.com/coverAlias/743916821282875/WIdXeSct.jpg",
          bookGrade: 9.7,
          bookId: "743916821282875",
          bookKeyWords: null,
          bookLevel: "S",
          bookName: "都市极品猛男",
          bookProtagonist: "罗军",
          bookStatus: 1,
          bookSummary: "罗军是一名光荣的小保安，也是最牛的小保安，没有之一！繁华都市里，罗军以超强的身手和非凡的智慧如鱼得水。敌人强猛，以拳破之。敌人狡诈，以智慧破之。奈何，离异女业主的美丽成熟，冰山总裁妹妹智慧无双，警花妹妹的英姿飒爽，她们所交织的情网袭杀而来时，罗军的拳与智慧都失去了作用？万丈红尘，我破不开！",
          bookWords: 9221976,
          chapterAuditPassNum: 2907,
          chapterPrice: null,
          extensionChapterId: null,
          extensionChapterName: null,
          extensionChapterSort: null,
          finishStatus: 0,
          id: null,
          lastChapterName: "明天休息",
          lastChapterTime: "2019-11-28 16:50:38",
          mastFllowChapterId: null,
          mastFllowChapterName: null,
          mastFllowChapterSort: null,
          payChapterPointSort: 19,
          priceType: null
        },
        bookId: "743916821282875",
        chapterContent: `七月的海滨市炎热无比。
        这天晚上，罗军正在值班室里和同伴小周一起值班。长夜漫漫，格外寂寞无聊。
        突然，罗军的目光产生了变化。他紧紧盯着监视屏上。
        监视屏上显示有两个陌生的男子坐进了电梯里面。
        “怎么了，军哥？”小周马上问。
        罗军将监视屏上，属于电梯的九宫格放大成一格。他说道：“这两个男的怎么好像从没见过？”
        小周说道：“嗨，这小区里一共一千多户人家，军哥你还能每一户都认识了？”
        罗军沉声说道：“不大对劲，我都没见这两人进来。肯定是趁我们不注意翻墙进来的。”
        “那么多人进进出出，也许是军哥你没注意到呢。”小周不以为然。
        罗军不理会小周，他看见电梯里的两个男子到了29楼，然后就出了电梯。
        “你在这儿待着，我去看看。”罗军马上吩咐小周。
        小周觉得罗军太敏感了，他说了一声好。
        罗军出了值班室，迅速上了电梯。他知道29楼一共还只住进了两户人家。其中一户出去旅游了。还有一户是一个离异少妇独身住在里面。
        这两名男子十有八九是知道离异少妇的情况，所以起了恶念。
        罗军对那少妇是很有好感的。那少妇看起来28岁左右，长的端是美丽，成熟，性感。
        罗军都想不通，这女人的前夫是怎么舍得离婚的。
        当然，罗军对那少妇有好感不仅仅是因为她漂亮。更重要的是，那少妇每次对他们几个保安都很客气礼貌。早上还会主动问好。
        可不像其他的一些业主，眼睛都到天上去了。根本不将他们这些保安当人看。
        罗军迅速来到了29楼，他腰里别着警棍。这警棍不带电的，作用不是很大，吓唬人还可以。
        罗军来到了少妇所在的房门外，他先仔细听里面的情况。
        有隐隐约约的挣扎声。
        罗军马上肯定了自己的猜测，于是大力拍起门来。“开门，开门！”罗军大喊道。
        很快，门开了。
        开门的是之前坐电梯的其中一名陌生男子，他将门打开一条缝，冷淡的看向罗军，问道：“干什么？”
        罗军狐疑的打量男子一眼，说道：“我认识这房子的主人，好像不是你们吧。”他说完就一顺溜直接挤了进去。
        那陌生男子见罗军强行进门，他干脆就将门关紧闭了。
        “小子，是你自己找不痛快了。”陌生男子的眼神冰寒起来，说起话也是阴测测的。
        罗军也看到了另外一名刀疤男子从卧室里走了出来。两人将罗军围在了中间，而且他们手上出现了寒光闪闪的卡簧。
        罗军眼中毫无惧色，开玩笑，他在国外尸山血海的闯荡时，什么人凶人没杀过。像眼前这种货色，他压根就不会放在眼里。
        罗军冷笑一声，说道：“果然不是什么好东西。”
        那两货脸色更寒，立刻一起如虎狼一般扑了过来。
        出手狠辣，便是要置罗军于死地。
        左边男子卡簧快准狠的捅向罗军腰部，右边男子则是捅向罗军腹部。
        这两名男子看来便是亡命之徒了。罗军突然出手，他直接一拳击中左边男子面门。他的速度比那男子快太多了，那男子直接摔飞出去，晕死当场。
        至于右边的男子，罗军一把抓住那男子持卡簧的手腕，随后朝怀中一拉，接着一个肘击，直接将这男子打趴在地上，也是当场晕死过去。
        随后，罗军快步到了卧室里面。`,
        chapterId: "82229887762451",
        chapterName: "第001章 贼人进屋",
        chapterWords: 1241,
        contentMd5: null,
        enableStatus: 0,
        id: null,
        isConsume: 0,
        nextChapterId: 82229887762452,
        payStatus: 1,
        sort: 1,
        upChapterId: null,
        updateType: null,
      }
    }
    if (bookId == 774630149193729) {
      data.data.chapterInfo = {
        bookResult: {
          authType: null,
          bookAuthor: "北冥小妖",
          bookCategoryId: 1001,
          bookCategoryName: "都市",
          bookChannel: 100,
          bookCover: "http://file.lingyun5.com/coverAlias/743916821282875/WIdXeSct.jpg",
          bookGrade: 9.7,
          bookId: "743916821282875",
          bookKeyWords: null,
          bookLevel: "S",
          bookName: "都市极品猛男",
          bookProtagonist: "罗军",
          bookStatus: 1,
          bookSummary: "罗军是一名光荣的小保安，也是最牛的小保安，没有之一！繁华都市里，罗军以超强的身手和非凡的智慧如鱼得水。敌人强猛，以拳破之。敌人狡诈，以智慧破之。奈何，离异女业主的美丽成熟，冰山总裁妹妹智慧无双，警花妹妹的英姿飒爽，她们所交织的情网袭杀而来时，罗军的拳与智慧都失去了作用？万丈红尘，我破不开！",
          bookWords: 9221976,
          chapterAuditPassNum: 2907,
          chapterPrice: null,
          extensionChapterId: null,
          extensionChapterName: null,
          extensionChapterSort: null,
          finishStatus: 0,
          id: null,
          lastChapterName: "明天休息",
          lastChapterTime: "2019-11-28 16:50:38",
          mastFllowChapterId: null,
          mastFllowChapterName: null,
          mastFllowChapterSort: null,
          payChapterPointSort: 19,
          priceType: null
        },
        bookId: "743916821282875",
        chapterContent: `七月的海滨市炎热无比。
        这天晚上，罗军正在值班室里和同伴小周一起值班。长夜漫漫，格外寂寞无聊。
        突然，罗军的目光产生了变化。他紧紧盯着监视屏上。
        监视屏上显示有两个陌生的男子坐进了电梯里面。
        “怎么了，军哥？”小周马上问。
        罗军将监视屏上，属于电梯的九宫格放大成一格。他说道：“这两个男的怎么好像从没见过？”
        小周说道：“嗨，这小区里一共一千多户人家，军哥你还能每一户都认识了？”
        罗军沉声说道：“不大对劲，我都没见这两人进来。肯定是趁我们不注意翻墙进来的。”
        “那么多人进进出出，也许是军哥你没注意到呢。”小周不以为然。
        罗军不理会小周，他看见电梯里的两个男子到了29楼，然后就出了电梯。
        “你在这儿待着，我去看看。”罗军马上吩咐小周。
        小周觉得罗军太敏感了，他说了一声好。
        罗军出了值班室，迅速上了电梯。他知道29楼一共还只住进了两户人家。其中一户出去旅游了。还有一户是一个离异少妇独身住在里面。
        这两名男子十有八九是知道离异少妇的情况，所以起了恶念。
        罗军对那少妇是很有好感的。那少妇看起来28岁左右，长的端是美丽，成熟，性感。
        罗军都想不通，这女人的前夫是怎么舍得离婚的。
        当然，罗军对那少妇有好感不仅仅是因为她漂亮。更重要的是，那少妇每次对他们几个保安都很客气礼貌。早上还会主动问好。
        可不像其他的一些业主，眼睛都到天上去了。根本不将他们这些保安当人看。
        罗军迅速来到了29楼，他腰里别着警棍。这警棍不带电的，作用不是很大，吓唬人还可以。
        罗军来到了少妇所在的房门外，他先仔细听里面的情况。
        有隐隐约约的挣扎声。
        罗军马上肯定了自己的猜测，于是大力拍起门来。“开门，开门！”罗军大喊道。
        很快，门开了。
        开门的是之前坐电梯的其中一名陌生男子，他将门打开一条缝，冷淡的看向罗军，问道：“干什么？”
        罗军狐疑的打量男子一眼，说道：“我认识这房子的主人，好像不是你们吧。”他说完就一顺溜直接挤了进去。
        那陌生男子见罗军强行进门，他干脆就将门关紧闭了。
        “小子，是你自己找不痛快了。”陌生男子的眼神冰寒起来，说起话也是阴测测的。
        罗军也看到了另外一名刀疤男子从卧室里走了出来。两人将罗军围在了中间，而且他们手上出现了寒光闪闪的卡簧。
        罗军眼中毫无惧色，开玩笑，他在国外尸山血海的闯荡时，什么人凶人没杀过。像眼前这种货色，他压根就不会放在眼里。
        罗军冷笑一声，说道：“果然不是什么好东西。”
        那两货脸色更寒，立刻一起如虎狼一般扑了过来。
        出手狠辣，便是要置罗军于死地。
        左边男子卡簧快准狠的捅向罗军腰部，右边男子则是捅向罗军腹部。
        这两名男子看来便是亡命之徒了。罗军突然出手，他直接一拳击中左边男子面门。他的速度比那男子快太多了，那男子直接摔飞出去，晕死当场。
        至于右边的男子，罗军一把抓住那男子持卡簧的手腕，随后朝怀中一拉，接着一个肘击，直接将这男子打趴在地上，也是当场晕死过去。
        随后，罗军快步到了卧室里面。`,
        chapterId: "82229887762451",
        chapterName: "第001章 贼人进屋",
        chapterWords: 1241,
        contentMd5: null,
        enableStatus: 0,
        id: null,
        isConsume: 0,
        nextChapterId: 82229887762452,
        payStatus: 1,
        sort: 1,
        upChapterId: null,
        updateType: null,
      }
    }
    ctx.body = data
  }
  // 拿到该广场动态的全部评论，然后根据rootCommentId设置层级。
  async list(ctx) {
    const { squareId } =  ctx.params
    const comments = await Comment.findAll({
      include: [
        {
          model: User,
        }
      ],
      where: {
        squareId
      }
    })
    ctx.body = comments
  }
  // 评论，有一级评论，二级评论，三级评论(暂不开放)，都放在一起
  async comment(ctx) {
    const { squareId } =  ctx.params
    const { id } = ctx.session.info
    await Comment.create({
      userId: id,
      ...ctx.request.body,
      squareId
    })
    const count = await Comment.count({
      where: {
        squareId
      }
    })
    await Square.update({
      comment: count,
    },{
      where: {
        id: squareId
      }
    })
    ctx.status = 200
  }
}

module.exports = new CommenCtr()