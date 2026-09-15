/* WillBet Casino 需求登记表：仅供 Specs Mode 展示。 */
(() => {
  const r = (id, title, page, element, description, route = {}, selectors = [], extra = {}) => ({
    id, module: 'Casino', page, element, title, description, route, selectors,
    status: 'Confirmed', version: 'Casino 2.0', ...extra
  });

  window.CASINO_REQUIREMENTS = [
    r('REQ-CASINO-001', '累积奖池（Jackpot）', 'Casino 大厅', 'Jackpot 横幅', '展示当前累积奖池金额、倒计时及最新奖池注入信息。', { view:'casino', category:'lobby' }, ['.jackpot'], { interactionRules:['页面停留期间，奖池金额和最新注入信息持续更新。'], uiNotes:['保持现有 Jackpot 卡片布局与背景素材。'], acceptanceCriteria:['Jackpot 位于 Lobby 顶部并正常展示。'] }),
    r('REQ-CASINO-002', 'Banner 轮播（Banner Carousel）', 'Casino 大厅', 'Casino Banner', '按配置顺序展示 Jackpot 及其他 Casino 活动横幅。', { view:'casino', category:'lobby' }, ['#casinoBannerCarousel'], { interactionRules:['横幅自动轮播，用户可直接选择当前活动入口。', '点击横幅 CTA 后提供对应活动反馈。'], acceptanceCriteria:['同一时间仅展示一个激活横幅。'] }),
    r('REQ-CASINO-003', 'Casino 分类导航（Casino Category Navigation）', 'Casino 大厅', '分类导航标签', '用于切换 Lobby、Live Casino 及其他游戏分类。', { view:'casino', category:'lobby' }, ['#categoryNav'], { interactionRules:['用户选择分类后，页面更新为对应分类内容。', '本次会话内再次进入 Live Casino 时，恢复上次有效的二级分类。'], acceptanceCriteria:['移动端分类导航支持横向浏览。'] }),
    r('REQ-CASINO-004', '游戏搜索（Search Games）', 'Casino 大厅', '搜索框', '用户可按游戏名称搜索全站 Casino 游戏。', { view:'casino', category:'lobby' }, ['.search-box:not(.provider-search)'], { interactionRules:['搜索仅匹配游戏名称。', '用户输入关键词后进入全局搜索状态。', '搜索状态下隐藏 Lobby 原有分组、分类导航及 Providers 入口。', '清空关键词后恢复搜索前的 Casino 页面状态。'], edgeCases:['无匹配结果时展示 No games found 空状态。', '游戏搜索不匹配厂商名称。'], acceptanceCriteria:['搜索结果统一使用三列游戏网格展示。'] }),
    r('REQ-CASINO-005', '厂商入口（Providers）', 'Casino 大厅', 'Providers 按钮', '从 Casino 搜索区域进入厂商发现页面。', { view:'casino', category:'lobby' }, ['#providersEntry'], { interactionRules:['点击后进入独立厂商列表页，不打开底部弹层。'], acceptanceCriteria:['入口与搜索区域保持同一视觉层级。'] }),
    r('REQ-CASINO-006', '为你推荐（Recommend For You）', 'Casino 大厅', '推荐游戏横滑区', '基于收藏和最近游玩上下文展示精选游戏。', { view:'casino', category:'lobby' }, ['[data-spec-section="recommended"]'], { interactionRules:['点击 View All 后进入对应 Lobby 子分类详情页。'], businessRules:['仅当用户历史状态开启时展示该分组。'], acceptanceCriteria:['游戏卡保持现有紧凑横向浏览样式。'] }),
    r('REQ-CASINO-007', '热门游戏（Trending Now）', 'Casino 大厅', '热门游戏横滑区', '突出展示当前玩家热度较高的游戏。', { view:'casino', category:'lobby' }, ['[data-spec-section="trending"]'], { businessRules:['仅 Trending 游戏卡长期展示 Playing 或 Plays Today 数据。'], acceptanceCriteria:['Hot 标签和实时赢钱反馈可与该横滑区共存。'] }),
    r('REQ-CASINO-008', '继续游玩（Continue Playing）', 'Casino 大厅', '继续游玩模块', '预留用于展示用户可继续游玩的游戏。', {}, [], { status:'To Confirm', interactionRules:['当前原型未提供独立的 Continue Playing 模块。'], edgeCases:['需确认游戏历史来源及无历史记录时的展示规则。'] }),
    r('REQ-CASINO-009', '新游上架（New Drops）', 'Casino 大厅', '新游横滑区', '以横向浏览形式展示新发布游戏。', { view:'casino', category:'lobby' }, ['[data-spec-section="released"]'], { interactionRules:['点击 View All 后进入对应 Lobby 子分类详情页。'], acceptanceCriteria:['已配置的 New 标签保持可见。'] }),
    r('REQ-CASINO-010', '百家乐好路推荐（Baccarat Road Picks）', 'Casino 大厅', '好路推荐横滑区', '通过百家乐路图信号帮助用户发现合适的真人桌台。', { view:'casino', category:'lobby' }, ['[data-spec-section="baccarat-road-picks"]'], { interactionRules:['点击 View All 进入 Baccarat Road Picks 页面。', '点击路图卡进入对应游戏详情。'], acceptanceCriteria:['Lobby 内横滑浏览方式保持不变。'] }),
    r('REQ-CASINO-011', '贵宾厅（VIP Lounge）', 'Casino 大厅', 'VIP Lounge 横滑区', '展示包含最低投注金额的精选高端游戏。', { view:'casino', category:'lobby' }, ['.vip-lounge'], { interactionRules:['点击 Explore Lounge 后进入 VIP Lounge 详情页。'], acceptanceCriteria:['保持高级游戏推荐定位，不改变普通游戏卡体系。'] }),
    r('REQ-CASINO-012', '真人娱乐场（Live Casino）', 'Casino 大厅', '真人娱乐场横滑区', '在 Lobby 中提供真人娱乐场游戏的快捷发现入口。', { view:'casino', category:'lobby' }, ['[data-spec-section="live"]'], { businessRules:['真人游戏卡不展示冗余的 Live 标签。'], acceptanceCriteria:['点击 View All 后进入 Live Casino 分类详情页。'] }),
    r('REQ-CASINO-013', '最新赢家（Latest Wins）', 'Casino 大厅', '实时赢单横滑区', '展示由统一赢单事件驱动的实时获胜信息。', { view:'casino', category:'lobby' }, ['#latestWinsRail'], { interactionRules:['新赢单从右侧进入，现有卡片整体向左推进。', '用户不可手动横向滑动该信息流。', '点击赢单卡沿用正常游戏跳转。'], businessRules:['信息流仅保留合理数量的最新事件。'], acceptanceCriteria:['Latest Wins 保持紧凑的横向实时消息流形式。'] }),

    r('REQ-CASINO-014', '搜索结果（Search Result）', '游戏搜索', '搜索结果网格', '以单一、不分组的游戏网格展示全局搜索匹配结果。', { view:'casino', category:'lobby', search:'fortune' }, ['.search-results-page'], { interactionRules:['搜索结果沿用 Load More 分页规则。'], acceptanceCriteria:['移动端搜索结果使用三列网格。'] }),
    r('REQ-CASINO-015', '搜索空状态（Search Empty State）', '游戏搜索', '空状态', '当全局游戏搜索无匹配结果时，向用户展示明确反馈。', { view:'casino', category:'lobby', search:'no-match' }, ['.search-results-page .empty-state'], { interactionRules:['关键词仍存在时，分类导航继续隐藏。'], acceptanceCriteria:['空状态文案显示 No games found。'] }),
    r('REQ-CASINO-016', '清空搜索（Clear Search）', '游戏搜索', '清空按钮', '清除当前游戏搜索关键词。', { view:'casino', category:'lobby', search:'fortune' }, ['#clearSearch'], { interactionRules:['清空后恢复搜索前的 Casino 页面状态。'], acceptanceCriteria:['仅在存在搜索关键词时展示该按钮。'] }),

    r('REQ-CASINO-017', '厂商列表（Provider List）', '厂商', '厂商目录', '以两列网格展示平台接入的游戏厂商。', { view:'providers' }, ['.provider-list-page'], { interactionRules:['点击厂商进入对应厂商游戏页。', '厂商搜索仅匹配厂商名称。'], acceptanceCriteria:['各移动端宽度下始终保持两列展示。'] }),
    r('REQ-CASINO-018', '最近访问厂商（Recent Providers）', '厂商', '最近访问分组', '按最近访问时间倒序保留最多四个厂商。', { view:'providers' }, ['.recent-provider-group', '.provider-list-page #providerListResults'], { interactionRules:['再次访问同一厂商时，将其移动至第一位。', '超过四个时移除最早访问的厂商。'], businessRules:['最近访问仅作为快捷分组，不影响厂商在完整列表中的展示。'], edgeCases:['无访问记录时隐藏最近访问分组。'] }),
    r('REQ-CASINO-019', '数字厂商分组（0–9 Providers）', '厂商', '数字厂商分组', '展示名称首字符为数字的厂商。', { view:'providers' }, ['.provider-list-page #providerListResults'], { businessRules:['组内按厂商名称升序排列。'], acceptanceCriteria:['数字厂商仍属于完整可搜索厂商目录。'] }),
    r('REQ-CASINO-020', '字母厂商分组（A–Z Providers）', '厂商', '字母厂商分组', '展示名称首字符为英文字母的厂商。', { view:'providers' }, ['.provider-list-page #providerListResults'], { businessRules:['忽略大小写并按名称升序排列。'], acceptanceCriteria:['字母厂商仍属于完整可搜索厂商目录。'] }),
    r('REQ-CASINO-021', '厂商游戏页（Provider Games Page）', '厂商', '厂商信息与游戏列表', '按所选厂商筛选统一游戏数据，并展示该厂商游戏数量。', { view:'providerGames', providerId:'evolution' }, ['.provider-games-page'], { interactionRules:['点击返回后回到厂商列表。', '游戏卡沿用正常游戏详情跳转。'], acceptanceCriteria:['游戏列表使用统一三列网格。'] }),

    r('REQ-CASINO-022', '三列游戏网格（Three-Column Game Grid）', '游戏列表', '游戏网格', '所有完整游戏列表页使用统一的响应式三列游戏网格。', { view:'casino', category:'slots' }, ['.game-grid'], { businessRules:['该规则不适用于 Lobby 游戏横滑区、Latest Wins 和 Baccarat Road Picks。'], acceptanceCriteria:['游戏卡内容及地区限制状态不影响网格布局。'] }),
    r('REQ-CASINO-023', '加载更多（Load More）', '游戏列表', '分页区域', '在保留已展示内容和当前滚动位置的前提下，加载下一批结果。', { view:'casino', category:'slots' }, ['[data-load-more-wrap]'], { interactionRules:['每次最多追加 10 条数据。', '搜索、筛选、排序、分类或厂商变化后，分页回到第一页。'], edgeCases:['总数不超过 10 条时不展示分页区域。', '全部展示后隐藏按钮，并展示完成状态文案。'] }),
    r('REQ-CASINO-024', '游戏数量（Game Count）', '游戏列表', '分页数量', '在分页列表中展示当前已显示数量与总数量。', { view:'casino', category:'slots' }, ['.load-more-count'], { acceptanceCriteria:['全部加载完成后显示 X games shown，不显示 X / X。'] }),
    r('REQ-CASINO-025', '地区限制（Region Restriction）', '游戏列表', '地区限制蒙层', '标识当前地区不可游玩的游戏。', { view:'casino', category:'slots' }, ['.game-grid'], { interactionRules:['点击受限游戏时展示地区限制提示，不进入游戏详情。', '受限游戏仍显示在搜索、厂商和分类列表中。', '受限游戏不展示游戏卡实时赢钱反馈。'], acceptanceCriteria:['蒙层降低封面亮度，但不改变游戏卡尺寸。'] }),
    r('REQ-CASINO-026', '收藏（Favorite）', '游戏列表', '收藏状态', '支持在当前已提供收藏入口的位置保留游戏收藏状态。', { view:'gameDetail', gameId:'slots-1' }, ['#detailFavorite'], { interactionRules:['收藏状态同步应用到同一游戏的统一数据。'] }),
    r('REQ-CASINO-027', '游戏标签（Game Tag）', '游戏列表', '游戏标签', '展示已配置的 New、Hot 或 Jackpot 等游戏标签。', { view:'casino', category:'slots' }, ['.game-grid'], { uiNotes:['Hot 与 New 标签首次进入视口时保留一次钻石光线扫过效果。'], acceptanceCriteria:['地区限制蒙层出现时，标签配置仍保留，但受限提示优先展示。'] }),

    r('REQ-CASINO-028', '游戏类型筛选（Game Type Filter）', '筛选', '筛选按钮', '在已配置游戏类型的分类中，支持按游戏类型筛选。', { view:'casino', category:'live' }, ['#openFilter'], { interactionRules:['应用筛选条件后，分页从第一页开始。', 'Live Casino 提供当前启用的真人游戏二级分类作为游戏类型选项。'], acceptanceCriteria:['筛选使用现有底部弹层展示。'] }),
    r('REQ-CASINO-029', '热门排序（Popular）', '排序', '排序控件', '默认按游戏热度对结果排序。', { view:'casino', category:'slots' }, ['.toolbar-sort'], { businessRules:['切换排序方式后，游戏分页从第一页开始。'] }),
    r('REQ-CASINO-030', '最新排序（Newest）', '排序', '排序控件', '按游戏发布日期从新到旧排序。', { view:'casino', category:'slots' }, ['.toolbar-sort']),
    r('REQ-CASINO-031', '名称正序（A–Z）', '排序', '排序控件', '按游戏名称字母正序排列。', { view:'casino', category:'slots' }, ['.toolbar-sort']),
    r('REQ-CASINO-032', '名称倒序（Z–A）', '排序', '排序控件', '按游戏名称字母倒序排列。', { view:'casino', category:'slots' }, ['.toolbar-sort']),
    r('REQ-CASINO-033', 'RTP 从高到低（RTP High → Low）', '排序', '排序控件', '按 RTP 数值从高到低排序。', { view:'casino', category:'slots' }, ['.toolbar-sort']),

    r('REQ-CASINO-034', 'Lobby 路图推荐卡（Lobby Road Pick Card）', '百家乐好路推荐', '路图推荐卡', '展示真人桌台封面、桌台信息、路型及紧凑路图。', { view:'casino', category:'lobby' }, ['.baccarat-rail'], { acceptanceCriteria:['路图维持庄红、闲蓝、和绿的颜色规则。'] }),
    r('REQ-CASINO-035', '好路推荐页（Road Picks Page）', '百家乐好路推荐', '好路推荐列表', '以纵向单卡列表展示完整的百家乐好路推荐数据。', { view:'baccaratRoadPicks' }, ['.baccarat-road-picks-page'], { interactionRules:['点击返回后回到原 Casino Lobby 状态。', '点击路图卡进入对应游戏详情。'], acceptanceCriteria:['页面仅支持纵向浏览，不转换为普通游戏网格。'] }),
    r('REQ-CASINO-036', '百家乐路图（Road Map）', '百家乐好路推荐', '路图', '以 Bead Plate / Big Road 形式展示桌台路型，辅助用户选择桌台。', { view:'baccaratRoadPicks' }, ['.road-map'], { businessRules:['Lobby 卡与好路推荐页复用同一套路型数据。'] }),
    r('REQ-CASINO-037', '查看全部好路推荐（Road Picks View All）', '百家乐好路推荐', 'View All 入口', '从 Lobby 路图推荐横滑区进入完整好路推荐页面。', { view:'casino', category:'lobby' }, ['[data-baccarat-road-picks]'], { interactionRules:['不改变 Lobby 路图横滑区的现有行为。'] }),

    r('REQ-CASINO-038', 'Lobby 贵宾厅（Lobby VIP Lounge）', 'VIP Lounge', '高级游戏横滑区', '在 Casino Lobby 展示精选贵宾游戏。', { view:'casino', category:'lobby' }, ['.vip-lounge'], { uiNotes:['卡片展示最低投注金额，不重复展示游戏名称和厂商名称。'] }),
    r('REQ-CASINO-039', '浏览贵宾厅（Explore Lounge）', 'VIP Lounge', 'Explore Lounge 入口', '从 Lobby 贵宾游戏横滑区进入全部 VIP 游戏。', { view:'casino', category:'lobby' }, ['[data-vip-lounge]'], { interactionRules:['在原型模式中保持原有点击行为。'] }),
    r('REQ-CASINO-040', '贵宾厅详情页（VIP Lounge Detail Page）', 'VIP Lounge', 'VIP 游戏列表', '在紧凑高级的页面氛围中展示全部 VIP 游戏。', { view:'vipLounge' }, ['.vip-lounge-page'], { interactionRules:['点击返回后回到 Casino Lobby。', '游戏数量超过一页时沿用 Load More 分页。'], acceptanceCriteria:['游戏卡继续使用统一普通三列卡片。'] }),

    r('REQ-CASINO-041', '赢单信息流（Winning Bet Feed）', 'Latest Wins', '实时赢单卡', '展示来自统一赢单数据源的实时获胜事件。', { view:'casino', category:'lobby' }, ['#latestWinsRail'], { businessRules:['每条事件包含游戏、脱敏用户名、正向赢单金额、币种、可选倍数及时间。'] }),
    r('REQ-CASINO-042', '赢单自动推进（Latest Wins Auto Shift）', 'Latest Wins', '信息流推进', '新赢单从右侧进入，现有内容整体向左推进。', { view:'casino', category:'lobby' }, ['#latestWinsRail .latest-wins-track'], { interactionRules:['每次仅推进一条赢单，更新过程保持克制。', '用户不可手动横向滑动该信息流。'] }),
    r('REQ-CASINO-043', '游戏卡赢钱反馈（Game Card Winning Animation）', 'Latest Wins', '赢钱反馈', '当共享赢单事件对应的游戏卡当前可见时，在该游戏卡上短暂展示相同金额。', { view:'casino', category:'lobby' }, ['[data-spec-section="trending"]'], { interactionRules:['仅当前视口内匹配的游戏卡可触发反馈。', '同一游戏多张卡同时可见时，优先视口中心附近的卡片。', '全局与单游戏冷却时间共同限制反馈频率。'], edgeCases:['游戏卡离开并重新进入视口后，不补播旧赢单。'] }),

    r('REQ-CASINO-044', '游戏名称（Game Name）', '游戏详情', '详情页标题', '在游戏详情页标题区域展示当前游戏名称。', { view:'gameDetail', gameId:'slots-1' }, ['.game-detail-header h1']),
    r('REQ-CASINO-045', '详情页收藏（Game Detail Favorite）', '游戏详情', '收藏按钮', '切换当前游戏的收藏状态。', { view:'gameDetail', gameId:'slots-1' }, ['#detailFavorite']),
    r('REQ-CASINO-046', '详情页分享（Game Detail Share）', '游戏详情', '分享按钮', '打开当前游戏的分享操作弹层。', { view:'gameDetail', gameId:'slots-1' }, ['#detailShare']),
    r('REQ-CASINO-047', '游戏封面（Game Cover）', '游戏详情', '详情页封面', '详情页、列表和推荐区内的同一游戏使用固定一致的封面映射。', { view:'gameDetail', gameId:'slots-1' }, ['.detail-cover'], { acceptanceCriteria:['封面保持比例展示，刷新后不随机更换素材。'] }),
    r('REQ-CASINO-048', 'RTP 与波动率（RTP and Volatility）', '游戏详情', '游戏统计信息', '展示当前游戏配置的 RTP 与波动率。', { view:'gameDetail', gameId:'slots-1' }, ['.detail-stats']),
    r('REQ-CASINO-049', '展示币种（Display Currency）', '游戏详情', '币种选择', '支持用户选择详情页中的展示币种。', { view:'gameDetail', gameId:'slots-1' }, ['#detailCurrency']),
    r('REQ-CASINO-050', '试玩（Demo Play）', '游戏详情', 'Fun Play 按钮', '对当前可用游戏进入试玩游戏画面。', { view:'gameDetail', gameId:'slots-1' }, ['#detailFunPlay'], { interactionRules:['进入游戏前检查当前地区是否可用。'] }),
    r('REQ-CASINO-051', '真钱游戏（Real Money Play）', '游戏详情', 'Play Now 按钮', '对当前可用游戏进入真钱游戏画面。', { view:'gameDetail', gameId:'slots-1' }, ['#detailPlayNow'], { interactionRules:['进入游戏前检查当前地区是否可用。'] }),
    r('REQ-CASINO-052', '全屏（Fullscreen）', '游戏详情', '全屏开关', '控制启动游戏时是否采用全屏展示。', { view:'gameDetail', gameId:'slots-1' }, ['#detailFullscreen']),
    r('REQ-CASINO-053', '悬浮操作按钮（Floating Action Button）', '游戏画面', '游戏操作按钮', '用于展开或收起游戏画面内的 Close 与 Home 操作。', { view:'gamePlay', gameId:'slots-1' }, ['#gamePlayControl'], { interactionRules:['展开后，主按钮图标由 Home 样式切换为关闭样式。', '用户可拖动悬浮按钮调整位置。'] }),
    r('REQ-CASINO-054', '厂商链接（Provider Link）', '游戏详情', '厂商品牌信息', '在详情页中相邻展示厂商 Logo 与可点击的厂商名称。', { view:'gameDetail', gameId:'slots-1' }, ['.detail-provider-link'], { interactionRules:['点击厂商信息后进入对应厂商游戏页。'] }),
    r('REQ-CASINO-055', '游戏标签（Game Tags）', '游戏详情', '详情页标签', '以与游戏列表一致的样式展示已配置标签。', { view:'gameDetail', gameId:'slots-1' }, ['.detail-tags'], { uiNotes:['Hot 与 New 标签保留首次进入视口时的一次钻石闪光效果。'] }),
    r('REQ-CASINO-056', '游戏说明（Game Description）', '游戏详情', '游戏说明', '展示游戏说明内容；长文案支持展开和收起。', { view:'gameDetail', gameId:'slots-1' }, ['.detail-description']),
    r('REQ-CASINO-057', '推荐游戏（Recommended Games）', '游戏详情', '推荐游戏横滑区', '展示与当前游戏厂商相关的推荐游戏。', { view:'gameDetail', gameId:'slots-1' }, ['.detail-recommendations'], { interactionRules:['点击推荐游戏后沿用正常游戏详情跳转。'] })
  ];
})();
