(function (root) {
  function removeItemByType(stack, type) {
    const index = stack.findIndex(item => item && item.type === type);
    return index === -1 ? null : stack.splice(index, 1)[0];
  }

  function getAvailableItemPool(unlockedFeatures) {
    const featureToItem = [
      ['tomato', 'TOMATO'], ['bakery', 'BREAD'], ['cheese', 'CHEESE'],
      ['corn', 'CORN'], ['popcorn', 'POPCORN'], ['apple', 'APPLE_JUICE'],
      ['pie', 'APPLE_PIE'], ['strawberry', 'STRAWBERRY'], ['carrot', 'CARROT'],
      ['icecream', 'ICE_CREAM'], ['salad', 'SALAD_BOWL'], ['pizza', 'PIZZA']
    ];
    const pool = featureToItem
      .filter(([feature]) => feature === 'tomato' ? unlockedFeatures[feature] !== false : unlockedFeatures[feature])
      .map(([, item]) => item);
    return pool.length > 0 ? pool : ['TOMATO'];
  }

  function applyRushHourBonus(amount, isRushHour) {
    return isRushHour ? Math.floor(amount * 1.5) : amount;
  }

  function calculateCheckoutTotal({ baseTotal, vipMultiplier = 1, vipTip = 0, comboMultiplier = 1, isRushHour = false }) {
    const afterVip = Math.round(baseTotal * vipMultiplier) + vipTip;
    const afterCombo = Math.round(afterVip * comboMultiplier);
    return applyRushHourBonus(afterCombo, isRushHour);
  }

  function applyUnlockPayment({ money, remainingCost, maxChunk = 20 }) {
    const safeMoney = Math.max(0, Math.floor(money || 0));
    const safeRemaining = Math.max(0, Math.floor(remainingCost || 0));
    const chunk = Math.min(maxChunk, safeRemaining);
    const paid = Math.min(chunk, safeMoney);
    const nextRemaining = Math.max(0, safeRemaining - paid);

    return {
      paid,
      money: safeMoney - paid,
      remainingCost: nextRemaining,
      didUnlock: safeRemaining > 0 && nextRemaining === 0
    };
  }

  function normalizeSaveData(rawData) {
    const source = rawData && rawData.version >= 2 && rawData.state ? rawData.state : (rawData || {});
    const state = {
      money: typeof source.money === 'number' ? source.money : 0,
      unlockedFeatures: source.unlockedFeatures && typeof source.unlockedFeatures === 'object' ? source.unlockedFeatures : {},
      upgrades: source.upgrades && typeof source.upgrades === 'object' ? source.upgrades : {},
      unlockPadCosts: Array.isArray(source.unlockPadCosts) ? source.unlockPadCosts : [],
      meta: source.meta && typeof source.meta === 'object' ? source.meta : {},
      stats: source.stats && typeof source.stats === 'object' ? source.stats : {},
      quests: source.quests && typeof source.quests === 'object' ? source.quests : {},
      dayState: source.dayState && typeof source.dayState === 'object' ? source.dayState : {},
      dailyDemand: source.dailyDemand && typeof source.dailyDemand === 'object' ? source.dailyDemand : null,
      specialization: source.specialization && typeof source.specialization === 'object' ? source.specialization : {},
      pricing: source.pricing && typeof source.pricing === 'object' ? source.pricing : {},
      retention: source.retention && typeof source.retention === 'object' ? source.retention : {},
      cosmetics: source.cosmetics && typeof source.cosmetics === 'object' ? source.cosmetics : {},
      branches: source.branches && typeof source.branches === 'object' ? source.branches : {},
      storage: source.storage && typeof source.storage === 'object' ? source.storage : {},
      staffSettings: source.staffSettings && typeof source.staffSettings === 'object' ? source.staffSettings : {},
      lastSavedAt: typeof source.lastSavedAt === 'number' ? source.lastSavedAt : null,
      neighborhood: source.neighborhood && typeof source.neighborhood === 'object' ? source.neighborhood : {},
      brands: source.brands && typeof source.brands === 'object' ? source.brands : {},
      dayChoice: source.dayChoice && typeof source.dayChoice === 'object' ? source.dayChoice : null,
      neighborhoodBuildings: Array.isArray(source.neighborhoodBuildings) ? source.neighborhoodBuildings : []
    };

    return { version: 2, state };
  }

  const TUTORIAL_STEPS = [
    { key: 'harvest_tomato', title: 'Domates Topla', description: 'Bahçeden 1 domates topla.', eventType: 'harvest', itemType: 'TOMATO', target: 1 },
    { key: 'stock_tomato', title: 'Rafı Doldur', description: 'Domatesi rafa yerleştir.', eventType: 'stock', itemType: 'TOMATO', target: 1 },
    { key: 'first_sale', title: 'İlk Satışı Yap', description: 'Bir müşterinin domates almasını sağla.', eventType: 'sale', itemType: 'TOMATO', target: 1 },
    { key: 'collect_cash', title: 'Kasayı Topla', description: 'Kasadaki parayı al.', eventType: 'collectCash', target: 1 },
    { key: 'first_upgrade', title: 'İlk Yükseltme', description: 'Bir yükseltme satın al.', eventType: 'upgrade', target: 1 },
    { key: 'hire_staff', title: 'İlk Personel', description: 'İlk personeli işe al.', eventType: 'hireStaff', target: 1 }
  ];

  const MAIN_QUESTS = {
    sell_tomatoes: {
      key: 'sell_tomatoes',
      title: '10 Domates Sat',
      description: 'Domates rafını dolu tut ve 10 domates sat.',
      eventType: 'sale',
      itemType: 'TOMATO',
      target: 10,
      rewardMoney: 75,
      rewardXp: 40
    },
    hire_first_staff: {
      key: 'hire_first_staff',
      title: 'İlk Personeli İşe Al',
      description: 'Market akışını otomatikleştirmek için ilk personeli aç.',
      eventType: 'hireStaff',
      target: 1,
      rewardMoney: 120,
      rewardXp: 60
    }
  };

  const SIDE_QUESTS = {
    harvest_20: { title: 'Hasat Ustası', eventType: 'harvest', target: 20, rewardMoney: 90, rewardXp: 50, cosmetic: 'coral' },
    stock_25: { title: 'Raf Düzeni', eventType: 'stock', target: 25, rewardMoney: 130, rewardXp: 65, cosmetic: 'violet' },
    sell_30: { title: 'Satış Ustası', eventType: 'sale', target: 30, rewardMoney: 200, rewardXp: 110, cosmetic: 'sparkleSign' }
  };

  function createProgressionState(seed = {}) {
    const tutorialSteps = {};
    TUTORIAL_STEPS.forEach((step, index) => {
      const previous = seed.tutorial && seed.tutorial.steps && seed.tutorial.steps[step.key];
      tutorialSteps[step.key] = {
        completed: !!(previous && previous.completed),
        progress: Math.min(step.target, Math.max(0, (previous && previous.progress) || 0)),
        order: index
      };
    });

    const questState = {};
    Object.keys(MAIN_QUESTS).forEach(key => {
      const quest = MAIN_QUESTS[key];
      const previous = seed.quests && seed.quests.main && seed.quests.main[key];
      questState[key] = {
        progress: Math.min(quest.target, Math.max(0, (previous && previous.progress) || 0)),
        claimed: !!(previous && previous.claimed)
      };
    });

    const sideQuestState = {};
    Object.keys(SIDE_QUESTS).forEach(key => {
      const quest = SIDE_QUESTS[key];
      const previous = seed.quests && seed.quests.side && seed.quests.side[key];
      sideQuestState[key] = {
        progress: Math.min(quest.target, Math.max(0, (previous && previous.progress) || 0)),
        claimed: !!(previous && previous.claimed)
      };
    });

    const tutorialComplete = TUTORIAL_STEPS.every(step => tutorialSteps[step.key].completed);
    const currentStep = tutorialComplete ? null : TUTORIAL_STEPS.find(step => !tutorialSteps[step.key].completed).key;

    return {
      tutorial: {
        skipped: !!(seed.tutorial && seed.tutorial.skipped),
        currentStep,
        steps: tutorialSteps
      },
      quests: { main: questState, side: sideQuestState },
      xp: Math.max(0, seed.xp || 0),
      marketLevel: Math.max(1, seed.marketLevel || 1),
      rewards: Array.isArray(seed.rewards) ? seed.rewards.slice() : []
    };
  }

  function matchesProgressRule(rule, event) {
    if (!rule || !event || rule.eventType !== event.type) return false;
    return !rule.itemType || rule.itemType === event.itemType;
  }

  function levelForXp(xp) {
    if (xp >= 220) return 4;
    if (xp >= 100) return 3;
    if (xp >= 40) return 2;
    return 1;
  }

  function grantProgressionXp(currentState, amount) {
    const state = createProgressionState(currentState);
    state.xp += Math.max(0, Math.floor(amount || 0));
    state.marketLevel = levelForXp(state.xp);
    return state;
  }

  function recordProgressEvent(currentState, event) {
    const state = createProgressionState(currentState);
    const amount = Math.max(1, event && event.amount ? event.amount : 1);

    if (!state.tutorial.skipped && state.tutorial.currentStep) {
      const stepDef = TUTORIAL_STEPS.find(step => step.key === state.tutorial.currentStep);
      const stepState = state.tutorial.steps[state.tutorial.currentStep];
      if (matchesProgressRule(stepDef, event)) {
        stepState.progress = Math.min(stepDef.target, stepState.progress + amount);
        if (stepState.progress >= stepDef.target) {
          stepState.completed = true;
          const nextStep = TUTORIAL_STEPS.find(step => !state.tutorial.steps[step.key].completed);
          state.tutorial.currentStep = nextStep ? nextStep.key : null;
        }
      }
    }

    Object.keys(MAIN_QUESTS).forEach(key => {
      const questDef = MAIN_QUESTS[key];
      const questState = state.quests.main[key];
      if (!questState.claimed && matchesProgressRule(questDef, event)) {
        questState.progress = Math.min(questDef.target, questState.progress + amount);
        if (questState.progress >= questDef.target) {
          questState.claimed = true;
          state.xp += questDef.rewardXp;
          state.rewards.push({
            type: 'quest',
            key,
            money: questDef.rewardMoney,
            xp: questDef.rewardXp
          });
        }
      }
    });

    Object.keys(SIDE_QUESTS).forEach(key => {
      const questDef = SIDE_QUESTS[key];
      const questState = state.quests.side[key];
      if (!questState.claimed && matchesProgressRule(questDef, event)) {
        questState.progress = Math.min(questDef.target, questState.progress + amount);
        if (questState.progress >= questDef.target) {
          questState.claimed = true;
          state.xp += questDef.rewardXp;
          state.rewards.push({
            type: 'sideQuest', key,
            money: questDef.rewardMoney,
            xp: questDef.rewardXp,
            cosmetic: questDef.cosmetic
          });
        }
      }
    });

    state.marketLevel = levelForXp(state.xp);
    return state;
  }

  function getActiveProgressionCard(state) {
    const normalized = createProgressionState(state);
    if (!normalized.tutorial.skipped && normalized.tutorial.currentStep) {
      const step = TUTORIAL_STEPS.find(s => s.key === normalized.tutorial.currentStep);
      const stepState = normalized.tutorial.steps[step.key];
      return {
        kind: 'tutorial',
        title: step.title,
        description: step.description,
        progress: stepState.progress,
        target: step.target,
        rewardText: 'Öğretici',
        iconKey: step.itemType || 'STAR'
      };
    }

    const activeQuest = Object.keys(MAIN_QUESTS)
      .map(key => ({ def: MAIN_QUESTS[key], state: normalized.quests.main[key] }))
      .find(entry => !entry.state.claimed);

    if (!activeQuest) {
      return {
        kind: 'quest',
        title: 'Market Büyüyor',
        description: 'Yeni rafları açıp satış zincirini genişlet.',
        progress: normalized.xp,
        target: normalized.marketLevel * 100,
        rewardText: `Seviye ${normalized.marketLevel}`,
        iconKey: 'CASH'
      };
    }

    return {
      kind: 'quest',
      title: activeQuest.def.title,
      description: activeQuest.def.description,
      progress: activeQuest.state.progress,
      target: activeQuest.def.target,
      rewardText: `+$${activeQuest.def.rewardMoney} / +${activeQuest.def.rewardXp} XP`,
      iconKey: activeQuest.def.itemType || 'STAR'
    };
  }

  function getSideQuestCards(state) {
    const normalized = createProgressionState(state);
    return Object.keys(SIDE_QUESTS).map(key => {
      const quest = SIDE_QUESTS[key];
      const progress = normalized.quests.side[key];
      return {
        key,
        title: quest.title,
        progress: progress.progress,
        target: quest.target,
        claimed: progress.claimed,
        cosmetic: quest.cosmetic,
        rewardText: `+$${quest.rewardMoney} · +${quest.rewardXp} XP`
      };
    });
  }

  function getRequiredMarketLevel(padIndex) {
    if (padIndex >= 18) return 4;
    if (padIndex >= 14) return 3;
    if (padIndex >= 7) return 2;
    return 1;
  }

  function canPayUnlockPad(padIndex, marketLevel) {
    return marketLevel >= getRequiredMarketLevel(padIndex);
  }

  function createDayState(seed = {}) {
    return {
      day: Math.max(1, seed.day || 1),
      dayLengthSeconds: Math.max(60, seed.dayLengthSeconds || 300),
      elapsedSeconds: Math.max(0, seed.elapsedSeconds || 0),
      stats: {
        salesRevenue: Math.max(0, (seed.stats && seed.stats.salesRevenue) || 0),
        customersServed: Math.max(0, (seed.stats && seed.stats.customersServed) || 0),
        completedQuests: Math.max(0, (seed.stats && seed.stats.completedQuests) || 0),
        itemSales: Object.assign({}, (seed.stats && seed.stats.itemSales) || {})
      },
      lastSummary: seed.lastSummary || null
    };
  }

  function summarizeDay(dayState) {
    const itemSales = dayState.stats.itemSales || {};
    const topItem = Object.keys(itemSales).sort((a, b) => itemSales[b] - itemSales[a])[0] || 'Yok';
    return {
      day: dayState.day,
      salesRevenue: dayState.stats.salesRevenue,
      customersServed: dayState.stats.customersServed,
      topItem,
      completedQuests: dayState.stats.completedQuests
    };
  }

  function advanceDayClock(currentState, deltaSeconds) {
    const state = createDayState(currentState);
    state.elapsedSeconds += Math.max(0, deltaSeconds || 0);

    while (state.elapsedSeconds >= state.dayLengthSeconds) {
      state.elapsedSeconds -= state.dayLengthSeconds;
      state.lastSummary = summarizeDay(state);
      state.day += 1;
      state.stats = {
        salesRevenue: 0,
        customersServed: 0,
        completedQuests: 0,
        itemSales: {}
      };
    }

    return state;
  }

  function recordDayEvent(currentState, event) {
    const state = createDayState(currentState);
    if (!event) return state;

    if (event.type === 'sale') {
      const amount = Math.max(1, event.amount || 1);
      const itemType = event.itemType || 'UNKNOWN';
      state.stats.salesRevenue += Math.max(0, event.revenue || 0);
      state.stats.customersServed += amount;
      state.stats.itemSales[itemType] = (state.stats.itemSales[itemType] || 0) + amount;
    } else if (event.type === 'questCompleted') {
      state.stats.completedQuests += 1;
    }

    return state;
  }

  const DEMAND_LABELS = {
    TOMATO: 'Domates Günü',
    BREAD: 'Fırın Günü',
    CHEESE: 'Peynir Günü',
    CORN: 'Mısır Günü',
    POPCORN: 'Atıştırmalık Günü',
    APPLE_JUICE: 'Meyve Suyu Günü',
    APPLE_PIE: 'Turta Günü',
    STRAWBERRY: 'Çilek Günü',
    CARROT: 'Havuç Günü',
    ICE_CREAM: 'Dondurma Günü',
    SALAD_BOWL: 'Fit Salata Günü',
    PIZZA: 'Pizza Günü'
  };

  const DEMAND_BASE_PRICE = {
    TOMATO: 5,
    BREAD: 28,
    CHEESE: 54,
    CORN: 10,
    POPCORN: 45,
    APPLE_JUICE: 38,
    APPLE_PIE: 75,
    STRAWBERRY: 24,
    CARROT: 18,
    ICE_CREAM: 95,
    SALAD_BOWL: 70,
    PIZZA: 120
  };

  function createDailyDemandEvent(day, availableItems) {
    const pool = Array.isArray(availableItems) && availableItems.length > 0 ? availableItems : ['TOMATO'];
    const itemType = pool[(Math.max(1, day || 1) - 1) % pool.length];
    const target = Math.min(12, 3 + Math.max(1, day || 1));
    const price = DEMAND_BASE_PRICE[itemType] || 25;

    return {
      day: Math.max(1, day || 1),
      itemType,
      label: DEMAND_LABELS[itemType] || `${itemType} Günü`,
      demandMultiplier: 2,
      bulkOrder: {
        itemType,
        target,
        reward: Math.round(price * target * 0.5),
        progress: 0,
        claimed: false
      }
    };
  }

  function applyDemandToShoppingPool(pool, demandEvent) {
    const available = Array.isArray(pool) && pool.length > 0 ? pool.slice() : ['TOMATO'];
    if (!demandEvent || !available.includes(demandEvent.itemType)) return available;
    const filtered = available.filter(item => item !== demandEvent.itemType);
    return [demandEvent.itemType, demandEvent.itemType, ...filtered];
  }

  function recordDemandSale(currentDemand, event) {
    if (!currentDemand || !currentDemand.bulkOrder || !event || event.type && event.type !== 'sale') return currentDemand;
    const next = {
      ...currentDemand,
      bulkOrder: { ...currentDemand.bulkOrder },
      rewardReady: 0
    };

    if (event.itemType !== next.bulkOrder.itemType || next.bulkOrder.claimed) return next;
    next.bulkOrder.progress = Math.min(next.bulkOrder.target, next.bulkOrder.progress + Math.max(1, event.amount || 1));
    if (next.bulkOrder.progress >= next.bulkOrder.target) {
      next.bulkOrder.claimed = true;
      next.rewardReady = next.bulkOrder.reward;
    }
    return next;
  }

  const SPECIALIZATION_CONFIG = {
    general: {
      label: 'Genel Market',
      boostedItems: [],
      multiplier: 1
    },
    greengrocer: {
      label: 'Manav',
      boostedItems: ['TOMATO', 'CORN', 'CARROT', 'STRAWBERRY', 'APPLE_JUICE'],
      multiplier: 1.15
    },
    bakery: {
      label: 'Fırın',
      boostedItems: ['BREAD', 'APPLE_PIE', 'PIZZA'],
      multiplier: 1.15
    },
    gourmet: {
      label: 'Gurme',
      boostedItems: ['CHEESE', 'ICE_CREAM', 'SALAD_BOWL', 'PIZZA'],
      multiplier: 1.15
    }
  };

  function createSpecializationState(seed = {}) {
    const active = SPECIALIZATION_CONFIG[seed.active] ? seed.active : 'general';
    return { active };
  }

  function setSpecialization(currentState, nextKey) {
    if (!SPECIALIZATION_CONFIG[nextKey]) return createSpecializationState(currentState);
    return { active: nextKey };
  }

  function getSpecializationInfo(state) {
    const normalized = createSpecializationState(state);
    return SPECIALIZATION_CONFIG[normalized.active];
  }

  function getSpecializedPrice(basePrice, itemType, specializationState) {
    const info = getSpecializationInfo(specializationState);
    const multiplier = info.boostedItems.includes(itemType) ? info.multiplier : 1;
    return Math.round(Math.max(0, basePrice || 0) * multiplier);
  }

  const PRICING_MULTIPLIERS = { economy: 0.9, standard: 1, premium: 1.25 };

  function createPricingState(seed = {}) {
    const source = seed && typeof seed === 'object' ? seed : {};
    const modes = source.modes && typeof source.modes === 'object' ? source.modes : {};
    const validModes = {};
    Object.keys(modes).forEach(itemType => {
      if (Object.prototype.hasOwnProperty.call(PRICING_MULTIPLIERS, modes[itemType])) {
        validModes[itemType] = modes[itemType];
      }
    });
    return { modes: validModes };
  }

  function getProductPricingMode(state, itemType) {
    return createPricingState(state).modes[itemType] || 'standard';
  }

  function setProductPricingMode(state, itemType, mode) {
    const next = createPricingState(state);
    if (!itemType || !Object.prototype.hasOwnProperty.call(PRICING_MULTIPLIERS, mode)) return next;
    if (mode === 'standard') delete next.modes[itemType];
    else next.modes[itemType] = mode;
    return next;
  }

  function getPricedAmount(basePrice, itemType, pricingState) {
    const mode = getProductPricingMode(pricingState, itemType);
    return Math.round(Math.max(0, basePrice || 0) * PRICING_MULTIPLIERS[mode]);
  }

  function pickShoppingItems(pool, pricingState, count, random = Math.random) {
    const demandWeights = { economy: 3, standard: 2, premium: 1 };
    const weights = new Map();
    (Array.isArray(pool) ? pool : []).forEach(itemType => {
      const mode = getProductPricingMode(pricingState, itemType);
      weights.set(itemType, (weights.get(itemType) || 0) + demandWeights[mode]);
    });
    const selected = [];
    while (weights.size > 0 && selected.length < count) {
      const totalWeight = [...weights.values()].reduce((sum, weight) => sum + weight, 0);
      let threshold = Math.min(0.999999, Math.max(0, random())) * totalWeight;
      for (const [itemType, weight] of weights) {
        threshold -= weight;
        if (threshold < 0) {
          selected.push(itemType);
          weights.delete(itemType);
          break;
        }
      }
    }
    return selected;
  }

  const STAFF_JOB_TYPES = {
    stocking: ['COLLECT_FACTORY'],
    production: ['HARVEST', 'SUPPLY_INPUT'],
    service: ['CASHIER', 'CLEAN_SPILL'],
    security: ['TACKLE_THIEF']
  };

  function createStaffSettings(seed = {}) {
    const priorities = seed && seed.priorities && typeof seed.priorities === 'object' ? seed.priorities : {};
    const normalized = {};
    Object.keys(priorities).forEach(id => {
      if (STAFF_JOB_TYPES[priorities[id]]) normalized[id] = priorities[id];
    });
    return { priorities: normalized };
  }

  function getStaffPriority(state, helperId) {
    return createStaffSettings(state).priorities[helperId] || 'balanced';
  }

  function setStaffPriority(state, helperId, priority) {
    const next = createStaffSettings(state);
    if (!Number.isInteger(Number(helperId)) || Number(helperId) < 1) return next;
    if (priority === 'balanced') delete next.priorities[helperId];
    else if (STAFF_JOB_TYPES[priority]) next.priorities[helperId] = priority;
    return next;
  }

  function getStaffJobBonus(state, helperId, jobType) {
    const priority = getStaffPriority(state, helperId);
    return STAFF_JOB_TYPES[priority] && STAFF_JOB_TYPES[priority].includes(jobType) ? 35 : 0;
  }

  function createStockTargets(seed = {}) {
    const source = seed && seed.targets && typeof seed.targets === 'object' ? seed.targets : {};
    const targets = {};
    Object.keys(source).forEach(itemType => {
      if ([4, 8, 16].includes(source[itemType])) targets[itemType] = source[itemType];
    });
    return { targets };
  }

  function getStockTarget(state, itemType, capacity = 16) {
    const requested = createStockTargets(state).targets[itemType] || capacity;
    return Math.min(capacity, requested);
  }

  function setStockTarget(state, itemType, target) {
    const next = createStockTargets(state);
    if (!itemType || ![4, 8, 16].includes(target)) return next;
    if (target === 16) delete next.targets[itemType];
    else next.targets[itemType] = target;
    return next;
  }

  function getCalendarKeys(date = new Date()) {
    const localDate = new Date(date);
    const format = value => `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, '0')}-${String(value.getDate()).padStart(2, '0')}`;
    const weekStart = new Date(localDate);
    weekStart.setDate(localDate.getDate() - ((localDate.getDay() + 6) % 7));
    return { day: format(localDate), week: format(weekStart) };
  }

  const DAILY_QUESTS = [
    { eventType: 'sale', title: '8 Ürün Sat', target: 8 },
    { eventType: 'harvest', title: '6 Ürün Hasat Et', target: 6 },
    { eventType: 'stock', title: '6 Ürün Rafa Koy', target: 6 }
  ];

  function getDailyQuestIndex(dayKey) {
    return Number(dayKey.replaceAll('-', '')) % DAILY_QUESTS.length;
  }

  function createRetentionState(seed = {}, date = new Date()) {
    const keys = getCalendarKeys(date);
    const questIndex = getDailyQuestIndex(keys.day);
    const daily = seed.daily && seed.daily.key === keys.day && seed.daily.questIndex === questIndex ? seed.daily : {};
    const weekly = seed.weekly && seed.weekly.key === keys.week ? seed.weekly : {};
    return {
      daily: {
        key: keys.day,
        questIndex,
        progress: Math.min(DAILY_QUESTS[questIndex].target, Math.max(0, daily.progress || 0)),
        claimed: !!daily.claimed
      },
      weekly: {
        key: keys.week,
        progress: Math.min(40, Math.max(0, weekly.progress || 0)),
        claimed: !!weekly.claimed
      }
    };
  }

  function getDailyQuestInfo(state) {
    const daily = state && state.daily ? state.daily : {};
    return DAILY_QUESTS[daily.questIndex] || DAILY_QUESTS[0];
  }

  function recordRetentionEvent(currentState, event, date = new Date()) {
    const state = createRetentionState(currentState, date);
    const rewards = [];
    if (!event) return { state, rewards };
    const amount = Math.max(1, Math.floor(event.amount || 1));
    const dailyQuest = getDailyQuestInfo(state);
    if (!state.daily.claimed && event.type === dailyQuest.eventType) {
      state.daily.progress = Math.min(dailyQuest.target, state.daily.progress + amount);
      if (state.daily.progress >= dailyQuest.target) {
        state.daily.claimed = true;
        rewards.push({ type: 'daily', money: 100, xp: 20 });
      }
    }
    if (!state.weekly.claimed && event.type === 'sale') {
      state.weekly.progress = Math.min(40, state.weekly.progress + amount);
      if (state.weekly.progress >= 40) {
        state.weekly.claimed = true;
        rewards.push({ type: 'weeklyCosmetic', money: 250, xp: 50, cosmetic: 'goldBadge' });
      }
    }
    return { state, rewards };
  }

  function calculateOfflineIncome(lastSavedAt, now, staffCount = 0) {
    if (!Number.isFinite(lastSavedAt) || !Number.isFinite(now) || lastSavedAt <= 0 || now <= lastSavedAt) {
      return { minutes: 0, amount: 0 };
    }
    const minutes = Math.min(120, Math.floor((now - lastSavedAt) / 60000));
    if (minutes < 5) return { minutes: 0, amount: 0 };
    return { minutes, amount: minutes * (2 + Math.max(0, Math.floor(staffCount))) };
  }

  // --- FAZ 1: MAHALLE SAKİNLERİ (NEIGHBORHOOD RESIDENTS) ---
  const NEIGHBORHOOD_RESIDENTS = [
    {
      id: 'ayse',
      name: 'Ayşe Teyze',
      routine: 'morning',
      archetype: 'REGULAR',
      preferredItems: ['BREAD', 'CHEESE'],
      greeting: 'Günaydın canım!',
      checkoutPhrase: 'Taze ekmek gibisi yok, ellerine sağlık!',
      backstory: 'Her sabah taze ekmek alır, torununun peynirli tostunu hazırlar.',
      charColor: 0xff7675
    },
    {
      id: 'kemal',
      name: 'Kemal Amca',
      routine: 'evening',
      archetype: 'REGULAR',
      preferredItems: ['SALAD_BOWL', 'TOMATO', 'CARROT'],
      greeting: 'Selam delikanlı!',
      checkoutPhrase: 'Akşam yürüyüşü sonrası bu salata çok iyi geliyor.',
      backstory: 'Emekli doktor, akşam yürüyüşü sonrası taze hafif sebzeler alır.',
      charColor: 0x0984e3
    },
    {
      id: 'zeynep',
      name: 'Zeynep',
      routine: 'afternoon',
      archetype: 'KID_FAMILY',
      preferredItems: ['ICE_CREAM', 'POPCORN', 'STRAWBERRY_JAM'],
      greeting: 'Yeni tatlar var mı?',
      checkoutPhrase: 'Ders arası tam ihtiyacım olan tatlı buydu!',
      backstory: 'Üniversiteli, ders aralarında atıştırmalık ve tatlı arar.',
      charColor: 0xa29bfe
    },
    {
      id: 'mehmet',
      name: 'Mehmet Usta',
      routine: 'morning',
      archetype: 'CHEF_GOURMET',
      preferredItems: ['TOMATO', 'CORN', 'BREAD'],
      greeting: 'Hayırlı işler usta!',
      checkoutPhrase: 'Lokantanın bugünkü menüsüne çok yakışacak.',
      backstory: 'Mahalle lokantacısı, sabahları toptan kaliteli ürün alır.',
      charColor: 0xd35400
    },
    {
      id: 'elif',
      name: 'Elif Hanım',
      routine: 'evening',
      archetype: 'CHEF_GOURMET',
      preferredItems: ['PIZZA', 'CHEESE', 'APPLE_PIE'],
      greeting: 'Gurme lezzetler gelmiş mi?',
      checkoutPhrase: 'Blogumda marketinden övgüyle bahsedeceğim!',
      backstory: 'Yemek blogu yazarı, en özel lezzetleri tadıp puanlar.',
      charColor: 0x6c5ce7
    },
    {
      id: 'ali',
      name: 'Küçük Ali',
      routine: 'afternoon',
      archetype: 'KID_FAMILY',
      preferredItems: ['ICE_CREAM', 'APPLE_JUICE'],
      greeting: 'Abi bir dondurma lütfen!',
      checkoutPhrase: 'En sevdiğim dondurma bu, teşekkürler abi!',
      backstory: 'Mahalle çocuğu, okul çıkışı cep harçlığıyla dondurmaya koşar.',
      charColor: 0xff4757
    }
  ];

  function createNeighborhoodState(seed = {}) {
    const residents = {};
    const src = seed && seed.residents && typeof seed.residents === 'object' ? seed.residents : {};
    NEIGHBORHOOD_RESIDENTS.forEach(r => {
      const s = src[r.id] || {};
      residents[r.id] = {
        visits: Math.max(0, s.visits || 0),
        affinity: Math.max(0, Math.min(5, s.affinity || 0)),
        lastVisitDay: s.lastVisitDay || 0
      };
    });
    return { residents };
  }

  function calculateAffinityLevel(visits) {
    if (visits >= 40) return 5;
    if (visits >= 25) return 4;
    if (visits >= 15) return 3;
    if (visits >= 8) return 2;
    if (visits >= 3) return 1;
    return 0;
  }

  function recordResidentVisit(state, residentId, day = 1) {
    const next = createNeighborhoodState(state);
    if (!next.residents[residentId]) return next;
    const r = next.residents[residentId];
    r.visits += 1;
    r.affinity = calculateAffinityLevel(r.visits);
    r.lastVisitDay = Math.max(r.lastVisitDay || 0, day);
    return next;
  }

  function getResidentAffinity(state, residentId) {
    const s = createNeighborhoodState(state);
    return s.residents[residentId] ? s.residents[residentId].affinity : 0;
  }

  function getResidentDayTime(elapsedSeconds, dayLengthSeconds = 300) {
    const ratio = (Math.max(0, elapsedSeconds) % Math.max(1, dayLengthSeconds)) / Math.max(1, dayLengthSeconds);
    if (ratio < 0.35) return 'morning';
    if (ratio < 0.70) return 'afternoon';
    return 'evening';
  }

  function getResidentSpawnCandidate(state, dayTime = 'morning', unlockedPool = ['TOMATO']) {
    const nState = createNeighborhoodState(state);
    const pool = Array.isArray(unlockedPool) ? unlockedPool : ['TOMATO'];
    const candidates = NEIGHBORHOOD_RESIDENTS.filter(r => {
      if (r.routine !== dayTime) return false;
      return r.preferredItems.some(item => pool.includes(item));
    });
    if (candidates.length === 0) return null;
    let totalWeight = 0;
    const weighted = candidates.map(r => {
      const aff = nState.residents[r.id]?.affinity || 0;
      const weight = 1 + aff * 0.5;
      totalWeight += weight;
      return { resident: r, weight };
    });
    let rand = Math.random() * totalWeight;
    for (const entry of weighted) {
      if (rand <= entry.weight) return entry.resident;
      rand -= entry.weight;
    }
    return weighted[0].resident;
  }

  function getUnlockedStories(stateOrId, affinityOrId) {
    let residentId = stateOrId;
    let affinity = typeof affinityOrId === 'number' ? affinityOrId : 0;
    if (typeof stateOrId === 'object' && stateOrId !== null) {
      residentId = affinityOrId;
      affinity = getResidentAffinity(stateOrId, residentId);
    }
    const resident = NEIGHBORHOOD_RESIDENTS.find(r => r.id === residentId);
    if (!resident) return [];
    const stories = [];
    if (affinity >= 1) {
      stories.push({ level: 1, title: 'Favori Tercihler', desc: `Öncelikli tercihleri: ${resident.preferredItems.join(', ')}`, text: `Öncelikli tercihleri: ${resident.preferredItems.join(', ')}` });
    }
    if (affinity >= 2) {
      stories.push({ level: 2, title: 'Mahalle Hikâyesi', desc: resident.backstory, text: resident.backstory });
    }
    if (affinity >= 3) {
      stories.push({ level: 3, title: 'Özel Sipariş & Bahşiş', desc: 'Siparişi eksiksiz karşılandığında +%15 ekstra cömert bahşiş bırakır.', text: 'Siparişi eksiksiz karşılandığında +%15 ekstra cömert bahşiş bırakır.' });
    }
    if (affinity >= 4) {
      stories.push({ level: 4, title: 'Mahalleli Dostu', desc: 'Markete özel kıyafetiyle gelir ve iki kat ürün alışverişi yapar.', text: 'Markete özel kıyafetiyle gelir ve iki kat ürün alışverişi yapar.' });
    }
    if (affinity >= 5) {
      stories.push({ level: 5, title: 'Sadık Dost Rozeti', desc: 'Marketi düzenli ziyaret eder ve komşularına tavsiye eder (+%25 harcama).', text: 'Marketi düzenli ziyaret eder ve komşularına tavsiye eder (+%25 harcama).' });
    }
    return stories;
  }

  // --- FAZ 2: TAZELİK VE DEĞERLENDİRME ZİNCİRİ (FRESHNESS) ---
  // ponytail: Spoilage never destroys food - it enables discounted sales or high-value transformation!
  const FRESHNESS_CONFIG = {
    TOMATO: { freshDuration: 600, staleDuration: 900, transformsInto: 'SALAD_BOWL' },
    BREAD: { freshDuration: 450, staleDuration: 600, transformsInto: 'TOAST' },
    STRAWBERRY: { freshDuration: 400, staleDuration: 700, transformsInto: 'STRAWBERRY_JAM' },
    APPLE_JUICE: { freshDuration: 900, staleDuration: 1200, transformsInto: null },
    CHEESE: { freshDuration: 900, staleDuration: 1200, transformsInto: null },
    CORN: { freshDuration: 600, staleDuration: 900, transformsInto: 'POPCORN' },
    CARROT: { freshDuration: 600, staleDuration: 900, transformsInto: 'SALAD_BOWL' },
    ICE_CREAM: { freshDuration: 350, staleDuration: 550, transformsInto: null },
    POPCORN: { freshDuration: 1800, staleDuration: 2400, transformsInto: null },
    APPLE_PIE: { freshDuration: 1200, staleDuration: 1800, transformsInto: null },
    PIZZA: { freshDuration: 600, staleDuration: 900, transformsInto: null },
    SALAD_BOWL: { freshDuration: 400, staleDuration: 700, transformsInto: null },
    STRAWBERRY_JAM: { freshDuration: 3600, staleDuration: 999999, transformsInto: null },
    TOAST: { freshDuration: 600, staleDuration: 900, transformsInto: null }
  };

  function getItemFreshness(itemType, ageSeconds = 0) {
    const cfg = FRESHNESS_CONFIG[itemType] || { freshDuration: 600, staleDuration: 900, transformsInto: null };
    const age = Math.max(0, ageSeconds || 0);
    if (age <= cfg.freshDuration) {
      const pct = Math.max(0, Math.min(1, 1 - (age / cfg.freshDuration)));
      return { state: 'FRESH', pctRemaining: pct, canTransform: false, transformsInto: cfg.transformsInto };
    } else if (age <= cfg.staleDuration) {
      const denom = Math.max(1, cfg.staleDuration - cfg.freshDuration);
      const pct = Math.max(0, Math.min(1, 1 - ((age - cfg.freshDuration) / denom)));
      return { state: 'NORMAL', pctRemaining: pct, canTransform: false, transformsInto: cfg.transformsInto };
    } else {
      return { state: 'STALE', pctRemaining: 0, canTransform: !!cfg.transformsInto, transformsInto: cfg.transformsInto };
    }
  }

  function getFreshnessPriceMultiplier(freshnessState) {
    if (freshnessState === 'FRESH') return 1.20;
    if (freshnessState === 'STALE') return 0.60;
    return 1.0;
  }

  // --- FAZ 3: KENDİ MARKANI YARATMA (BRANDS) ---
  const BRAND_CATEGORIES = ['JUICE', 'JAM', 'BREAD', 'ICE_CREAM', 'PIZZA', 'TOAST'];

  function createBrandState(seed = {}) {
    const brands = {};
    const src = seed && seed.brands && typeof seed.brands === 'object' ? seed.brands : {};
    BRAND_CATEGORIES.forEach(cat => {
      if (src[cat]) {
        brands[cat] = {
          name: String(src[cat].name || '').slice(0, 14),
          colorHex: src[cat].colorHex || '#FFE600',
          quality: ['economy', 'artisan', 'premium'].includes(src[cat].quality) ? src[cat].quality : 'artisan',
          salesCount: Math.max(0, src[cat].salesCount || 0),
          reputation: Math.max(1, Math.min(5, src[cat].reputation || 1))
        };
      }
    });
    return { brands };
  }

  const BRAND_TIER_CONFIG = {
    economy: { cost: 0, minSales: 0, minReputation: 1, label: 'Ekonomi', bonus: 0.90 },
    artisan: { cost: 150, minSales: 5, minReputation: 1, label: 'Zanaat', bonus: 1.15 },
    premium: { cost: 500, minSales: 15, minReputation: 3, label: 'Premium', bonus: 1.35 }
  };

  function canUpgradeBrandTier(currentTier, targetTier, salesCount = 0, currentCoins = Infinity) {
    if (!BRAND_TIER_CONFIG[targetTier]) return { canUpgrade: false, reason: 'Geçersiz kalite' };
    if (targetTier === currentTier) return { canUpgrade: true, cost: 0 };
    const cfg = BRAND_TIER_CONFIG[targetTier];
    if (salesCount < cfg.minSales) {
      return { canUpgrade: false, reason: `En az ${cfg.minSales} satış gerekir!`, cost: cfg.cost };
    }
    if (currentCoins < cfg.cost) {
      return { canUpgrade: false, reason: `${cfg.cost} Coin gerekir!`, cost: cfg.cost };
    }
    return { canUpgrade: true, cost: cfg.cost };
  }

  function createOrUpdateBrand(state, category, brandConfig = {}) {
    const next = createBrandState(state);
    if (!BRAND_CATEGORIES.includes(category)) return next;
    const current = next.brands[category] || { salesCount: 0, reputation: 1, quality: 'economy' };
    const name = String(brandConfig.name || category).slice(0, 14).trim();
    const colorHex = brandConfig.colorHex || brandConfig.color || '#FFE600';
    const quality = ['economy', 'artisan', 'premium'].includes(brandConfig.quality) ? brandConfig.quality : (current.quality || 'artisan');
    next.brands[category] = {
      name: name || `${category} Markası`,
      colorHex,
      quality,
      salesCount: current.salesCount,
      reputation: current.reputation
    };
    return next;
  }

  function recordBrandSale(state, category, amount = 1) {
    const next = createBrandState(state);
    if (!next.brands[category]) return next;
    const b = next.brands[category];
    b.salesCount += Math.max(1, amount);
    if (b.salesCount >= 50) b.reputation = 5;
    else if (b.salesCount >= 30) b.reputation = 4;
    else if (b.salesCount >= 15) b.reputation = 3;
    else if (b.salesCount >= 5) b.reputation = 2;
    else b.reputation = 1;
    return next;
  }

  function getBrandPriceBonus(state, category) {
    const next = createBrandState(state);
    const b = next.brands[category];
    if (!b) return 1.0;
    let baseBonus = 1.0;
    if (b.quality === 'economy') baseBonus = 0.90;
    else if (b.quality === 'artisan') baseBonus = 1.15;
    else if (b.quality === 'premium') baseBonus = 1.35;
    const repBonus = (b.reputation - 1) * 0.05;
    return Math.round((baseBonus + repBonus) * 100) / 100;
  }

  // --- FAZ 4: GÜN BAŞINDA TİCARİ SEÇİM (DAY CHOICE EVENTS) ---
  const DAY_EVENT_POOL = [
    {
      id: 'bakery_fest',
      label: 'Fırın Festivali',
      icon: 'BREAD',
      boosted: ['BREAD', 'APPLE_PIE', 'PIZZA', 'TOAST'],
      multiplier: 1.8,
      specialCustomer: 'mehmet',
      description: 'Taze ekmek, pizza ve hamur işi talebi tavan yapıyor!'
    },
    {
      id: 'farmer_market',
      label: 'Çiftçi Pazarı',
      icon: 'TOMATO',
      boosted: ['TOMATO', 'CORN', 'CARROT', 'STRAWBERRY'],
      multiplier: 1.6,
      specialCustomer: 'ayse',
      description: 'Mahalleli taze dalından meyve ve sebzelere hücum ediyor.'
    },
    {
      id: 'snack_rush',
      label: 'Atıştırmalık Çılgınlığı',
      icon: 'POPCORN',
      boosted: ['POPCORN', 'ICE_CREAM', 'APPLE_JUICE'],
      multiplier: 1.7,
      specialCustomer: 'zeynep',
      description: 'Gençler dondurma, patlamış mısır ve meyve suyu kuyruğunda!'
    },
    {
      id: 'gourmet_night',
      label: 'Gurme Akşamı',
      icon: 'CHEESE',
      boosted: ['CHEESE', 'PIZZA', 'SALAD_BOWL'],
      multiplier: 1.75,
      specialCustomer: 'elif',
      description: 'Gurme peynir ve Akdeniz lezzetleri yoğun ilgi görüyor.'
    },
    {
      id: 'kids_day',
      label: 'Çocuk Şenliği',
      icon: 'ICE_CREAM',
      boosted: ['ICE_CREAM', 'APPLE_JUICE', 'STRAWBERRY_JAM'],
      multiplier: 1.5,
      specialCustomer: 'ali',
      description: 'Çocuklar dondurma ve reçel reyonunu neşeyle dolduruyor.'
    }
  ];

  function generateDayChoices(day = 1, availableItems = ['TOMATO']) {
    const pool = DAY_EVENT_POOL.slice();
    const index = (Math.max(1, day) - 1) % pool.length;
    const choice1 = pool[index];
    const choice2 = pool[(index + 1) % pool.length];
    const choice3 = pool[(index + 2) % pool.length];
    return [choice1, choice2, choice3];
  }

  function applyDayChoice(choiceOrId) {
    const id = typeof choiceOrId === 'object' && choiceOrId !== null ? choiceOrId.id : choiceOrId;
    const event = DAY_EVENT_POOL.find(e => e.id === id) || DAY_EVENT_POOL[0];
    return {
      eventId: event.id,
      label: event.label,
      icon: event.icon,
      boosted: event.boosted.slice(),
      multiplier: event.multiplier,
      specialCustomer: event.specialCustomer,
      description: event.description,
      appliedAt: Date.now()
    };
  }

  // --- FAZ 5: GÖRÜNÜR MAHALLE GELİŞİMİ (NEIGHBORHOOD BUILDINGS) ---
  const NEIGHBORHOOD_BUILDINGS = [
    {
      id: 'bus_stop',
      name: 'Otobüs Durağı',
      cost: 500,
      unlockLevel: 2,
      effect: { morningRush: true, extraCustomers: 2 },
      description: 'Sabah saatlerinde durak kalabalığı marketten geçer.'
    },
    {
      id: 'park',
      name: 'Mahalle Parkı',
      cost: 800,
      unlockLevel: 2,
      effect: { weekendBoost: 'ICE_CREAM', extraCustomers: 1 },
      description: 'Parkta yürüyüş yapanlar dondurma ve serinletici içecek arar.'
    },
    {
      id: 'cafe',
      name: 'Sokak Kafesi',
      cost: 1200,
      unlockLevel: 3,
      effect: { afternoonRush: true, boosted: ['BREAD', 'CHEESE', 'TOAST'], extraCustomers: 1 },
      description: 'Öğleden sonra kafe müdavimleri fırın ve kahvaltılık alışverişine gelir.'
    },
    {
      id: 'school',
      name: 'Mahalle Okulu',
      cost: 1500,
      unlockLevel: 3,
      effect: { morningRush: true, afternoonRush: true, boosted: ['APPLE_JUICE', 'BREAD'], extraCustomers: 2 },
      description: 'Okul giriş ve çıkış saatlerinde veli ve öğrenci bereketi yaşanır.'
    },
    {
      id: 'gym',
      name: 'Fitness Salonu',
      cost: 2000,
      unlockLevel: 4,
      effect: { boosted: ['SALAD_BOWL', 'CARROT', 'APPLE_JUICE'], extraCustomers: 2 },
      description: 'Sporcular taze salata ve organik ürünleri tüketir.'
    }
  ];

  function createNeighborhoodBuildingState(seed = {}) {
    const built = Array.isArray(seed && seed.built) ? seed.built.slice() : [];
    return { built };
  }

  function canBuildNeighborhood(state, buildingId, money = 0, marketLevel = 1) {
    const b = NEIGHBORHOOD_BUILDINGS.find(x => x.id === buildingId);
    if (!b) return false;
    const current = createNeighborhoodBuildingState(state);
    if (current.built.includes(buildingId)) return false;
    return money >= b.cost && marketLevel >= b.unlockLevel;
  }

  function purchaseNeighborhoodBuilding(state, buildingId) {
    const current = createNeighborhoodBuildingState(state);
    if (!current.built.includes(buildingId)) {
      current.built.push(buildingId);
    }
    return current;
  }

  function getActiveNeighborhoodEffects(state) {
    const current = createNeighborhoodBuildingState(state);
    const effects = {
      extraCustomers: 0,
      morningRush: false,
      afternoonRush: false,
      boostedItems: []
    };
    current.built.forEach(id => {
      const b = NEIGHBORHOOD_BUILDINGS.find(x => x.id === id);
      if (!b || !b.effect) return;
      if (b.effect.extraCustomers) effects.extraCustomers += b.effect.extraCustomers;
      if (b.effect.morningRush) effects.morningRush = true;
      if (b.effect.afternoonRush) effects.afternoonRush = true;
      if (Array.isArray(b.effect.boosted)) {
        b.effect.boosted.forEach(item => {
          if (!effects.boostedItems.includes(item)) effects.boostedItems.push(item);
        });
      }
    });
    return effects;
  }

  const api = {
    removeItemByType,
    getAvailableItemPool,
    applyRushHourBonus,
    calculateCheckoutTotal,
    applyUnlockPayment,
    normalizeSaveData,
    createProgressionState,
    recordProgressEvent,
    grantProgressionXp,
    getActiveProgressionCard,
    getSideQuestCards,
    getRequiredMarketLevel,
    canPayUnlockPad,
    createDayState,
    advanceDayClock,
    recordDayEvent,
    createDailyDemandEvent,
    applyDemandToShoppingPool,
    recordDemandSale,
    createSpecializationState,
    setSpecialization,
    getSpecializationInfo,
    getSpecializedPrice,
    createPricingState,
    getProductPricingMode,
    setProductPricingMode,
    getPricedAmount,
    pickShoppingItems,
    createStaffSettings,
    getStaffPriority,
    setStaffPriority,
    getStaffJobBonus,
    createStockTargets,
    getStockTarget,
    setStockTarget,
    getCalendarKeys,
    createRetentionState,
    getDailyQuestInfo,
    recordRetentionEvent,
    calculateOfflineIncome,
    // Faz 1
    NEIGHBORHOOD_RESIDENTS,
    createNeighborhoodState,
    recordResidentVisit,
    getResidentAffinity,
    getResidentDayTime,
    getResidentSpawnCandidate,
    getUnlockedStories,
    // Faz 2
    FRESHNESS_CONFIG,
    getItemFreshness,
    getFreshnessPriceMultiplier,
    // Faz 3
    BRAND_CATEGORIES,
    BRAND_TIER_CONFIG,
    canUpgradeBrandTier,
    createBrandState,
    createOrUpdateBrand,
    recordBrandSale,
    getBrandPriceBonus,
    // Faz 4
    DAY_EVENT_POOL,
    generateDayChoices,
    applyDayChoice,
    // Faz 5
    NEIGHBORHOOD_BUILDINGS,
    createNeighborhoodBuildingState,
    canBuildNeighborhood,
    purchaseNeighborhoodBuilding,
    getActiveNeighborhoodEffects
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.GameMechanics = api;
})(typeof window !== 'undefined' ? window : globalThis);
