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
      residentOrders: source.residentOrders && typeof source.residentOrders === 'object' ? source.residentOrders : {},
      brands: source.brands && typeof source.brands === 'object' ? source.brands : {},
      dayChoice: source.dayChoice && typeof source.dayChoice === 'object' ? source.dayChoice : null,
      neighborhoodBuildings: source.neighborhoodBuildings && typeof source.neighborhoodBuildings === 'object' ? source.neighborhoodBuildings : []
    };

    if (source.veresiye && typeof source.veresiye === 'object') state.veresiye = source.veresiye;
    if (source.hygiene && typeof source.hygiene === 'object') state.hygiene = source.hygiene;
    if (source.securityDog && typeof source.securityDog === 'object') state.securityDog = source.securityDog;
    if (source.wholesale && typeof source.wholesale === 'object') state.wholesale = source.wholesale;
    if (source.staffFatigue && typeof source.staffFatigue === 'object') state.staffFatigue = source.staffFatigue;
    if (source.decoration && typeof source.decoration === 'object') state.decoration = source.decoration;
    if (source.customLayout && typeof source.customLayout === 'object') state.customLayout = source.customLayout;

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

  function summarizeDayWithPrestige(dayState, context = {}) {
    const baseSummary = summarizeDay(dayState);
    const decState = context.decorationState || {};
    const hygiene = typeof context.hygieneScore === 'number' ? context.hygieneScore : 100;
    const brandState = context.brandState || null;
    const neighborhoodState = context.neighborhoodState || null;
    const previousPrestigeScore = typeof context.previousPrestigeScore === 'number' ? context.previousPrestigeScore : 0;

    const currentPrestige = calculateStorePrestige(decState, hygiene, brandState, neighborhoodState);
    const deltaInfo = calculatePrestigeDelta(previousPrestigeScore, currentPrestige.score);

    const drivers = [];
    if (hygiene >= 85) drivers.push(`[+] Yüksek Hijyen (%${Math.round(hygiene)})`);
    else if (hygiene <= 50) drivers.push(`[-] Düşük Hijyen (%${Math.round(hygiene)}) - Temizlik Gerekli!`);

    if (currentPrestige.breakdown.brand >= 8) {
      drivers.push(`[+] Özel Marka İtibarı (+${currentPrestige.breakdown.brand} Puan)`);
    }
    if (currentPrestige.breakdown.affinity >= 10) {
      drivers.push(`[+] Komşu Sadakati (+${currentPrestige.breakdown.affinity} Puan)`);
    }
    if (currentPrestige.breakdown.decoration >= 18) {
      drivers.push(`[+] ${currentPrestige.floorName} Kaplaması (+${currentPrestige.breakdown.decoration} Puan)`);
    }

    if (drivers.length === 0) {
      drivers.push(`[+] Standart İşletme Durumu (+${currentPrestige.score} Puan)`);
    }

    let advice = 'Zemin kaplamasını yenileyerek ve komşularla bağı güçlendirerek prestiji artırabilirsiniz.';
    if (currentPrestige.stars < 3) {
      advice = 'Prestij 3 Yıldıza ulaştığında VIP Gurme müşteriler gelmeye ve 2. Şube (Çarşı) açılmaya başlar!';
    } else if (currentPrestige.stars < 4) {
      advice = 'Dükkan hijyenini %90 üstünde tutarak ve özel markalar çıkararak 4 Yıldız prestije ulaşın.';
    } else if (currentPrestige.stars < 5) {
      advice = 'Mermer zemin döşeyerek ve tüm komşu sadakatlerini maks seviyeye çıkararak 5 Yıldızlı Lüks Market olun!';
    } else {
      advice = 'Maksimum prestij! VIP gurmeler en yüksek bahşişlerle marketinize akın ediyor.';
    }

    return {
      ...baseSummary,
      prestigeReport: {
        score: currentPrestige.score,
        stars: currentPrestige.stars,
        delta: deltaInfo.delta,
        improved: deltaInfo.improved,
        declined: deltaInfo.declined,
        breakdown: currentPrestige.breakdown,
        floorName: currentPrestige.floorName,
        drivers,
        advice,
        isVIPEligible: currentPrestige.isVIPEligible
      }
    };
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

  function getProductPricingMultiplier(state, itemType) {
    const mode = getProductPricingMode(state, itemType);
    return PRICING_MULTIPLIERS[mode] || 1;
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

  function getNextAffinityVisitTarget(visits) {
    if (visits < 3) return 3;
    if (visits < 8) return 8;
    if (visits < 15) return 15;
    if (visits < 25) return 25;
    if (visits < 40) return 40;
    return null;
  }

  const RESIDENT_SPECIAL_ORDER_PRICE = {
    TOMATO: 5,
    BREAD: 30,
    CHEESE: 54,
    CORN: 10,
    POPCORN: 45,
    APPLE_JUICE: 38,
    APPLE_PIE: 75,
    STRAWBERRY: 24,
    STRAWBERRY_JAM: 60,
    CARROT: 18,
    ICE_CREAM: 95,
    SALAD_BOWL: 70,
    PIZZA: 120,
    TOAST: 35
  };

  function createResidentSpecialOrder(resident, affinity, availableItems = []) {
    if (!resident || affinity < 2) return null;
    const available = Array.isArray(availableItems) && availableItems.length > 0 ? availableItems : resident.preferredItems;
    const itemType = resident.preferredItems.find(item => available.includes(item));
    if (!itemType) return null;
    const targetQty = Math.min(6, 2 + affinity);
    const basePrice = RESIDENT_SPECIAL_ORDER_PRICE[itemType] || DEMAND_BASE_PRICE[itemType] || 25;
    const rewardMoney = Math.round(basePrice * targetQty * (1 + affinity * 0.05));
    return {
      residentId: resident.id,
      itemType,
      targetQty,
      rewardMoney,
      label: `${resident.name} özel siparişi: ${targetQty}x ${itemType}`
    };
  }

  function recordResidentSpecialOrderSale(order, event = {}) {
    if (!order) return null;
    const amount = event.itemType === order.itemType ? Math.max(1, event.amount || 1) : 0;
    const progress = Math.min(order.targetQty, Math.max(0, order.progress || 0) + amount);
    const claimed = progress >= order.targetQty;
    return {
      ...order,
      progress,
      claimed,
      rewardReady: claimed && !order.claimed ? order.rewardMoney : 0
    };
  }

  function createResidentOrderState(seed = {}) {
    const orders = {};
    const sourceOrders = seed && seed.orders && typeof seed.orders === 'object' ? seed.orders : {};
    Object.keys(sourceOrders).forEach(key => {
      const src = sourceOrders[key] || {};
      orders[key] = {
        residentId: src.residentId,
        itemType: src.itemType,
        targetQty: Math.max(1, src.targetQty || 1),
        rewardMoney: Math.max(0, src.rewardMoney || 0),
        label: src.label || '',
        progress: Math.max(0, src.progress || 0),
        claimed: !!src.claimed
      };
    });
    return {
      orders,
      rewards: Array.isArray(seed && seed.rewards) ? seed.rewards.slice() : []
    };
  }

  function updateResidentOrderState(state, order, event = {}) {
    const next = createResidentOrderState(state);
    if (!order || !order.residentId || !order.itemType) return next;
    const key = `${order.residentId}_${order.itemType}`;
    const current = next.orders[key] || { ...order, progress: 0, claimed: false };
    const updated = recordResidentSpecialOrderSale(current, event);
    next.orders[key] = updated;
    if (updated && updated.rewardReady > 0) {
      next.rewards.push({
        residentId: updated.residentId,
        itemType: updated.itemType,
        amount: updated.rewardReady
      });
      next.orders[key].claimed = true;
      next.orders[key].rewardReady = 0;
    }
    return next;
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

  function getResidentProfile(state, residentId, options = {}) {
    const resident = NEIGHBORHOOD_RESIDENTS.find(r => r.id === residentId);
    if (!resident) return null;
    const nState = createNeighborhoodState(state);
    const residentState = nState.residents[residentId] || { visits: 0, affinity: 0, lastVisitDay: 0 };
    const debtEntry = options.veresiyeState && options.veresiyeState.ledger
      ? options.veresiyeState.ledger[residentId]
      : null;
    const debt = typeof debtEntry === 'number' ? debtEntry : (debtEntry && debtEntry.amount ? debtEntry.amount : 0);
    const affinity = residentState.affinity;
    const nextVisitTarget = getNextAffinityVisitTarget(residentState.visits);
    const specialOrder = createResidentSpecialOrder(resident, affinity, options.availableItems);
    return {
      ...resident,
      visits: residentState.visits,
      affinity,
      lastVisitDay: residentState.lastVisitDay,
      debt,
      hasDebt: debt > 0,
      isRoutineNow: options.dayTime ? resident.routine === options.dayTime : false,
      nextAffinityVisitTarget: nextVisitTarget,
      visitsUntilNextAffinity: nextVisitTarget === null ? 0 : Math.max(0, nextVisitTarget - residentState.visits),
      basketMultiplier: affinity >= 4 ? 2 : 1,
      tipMultiplier: affinity >= 5 ? 1.25 : (affinity >= 3 ? 1.15 : 1),
      loyaltyLabel: affinity >= 5 ? 'SADIK DOST' : (affinity >= 3 ? 'MAHALLE MÜDAVİMİ' : (affinity >= 1 ? 'TANIŞ ESNAF' : 'YENİ KOMŞU')),
      preferenceSummary: resident.preferredItems.join(', '),
      specialOrder
    };
  }

  function getResidentProfiles(state, options = {}) {
    return NEIGHBORHOOD_RESIDENTS.map(r => getResidentProfile(state, r.id, options));
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

  function createFreshItem(itemType, nowSeconds = 0) {
    return {
      type: itemType || 'TOMATO',
      createdAt: Math.max(0, Math.floor(nowSeconds || 0))
    };
  }

  function getItemType(item) {
    if (typeof item === 'string') return item;
    return item && item.type ? item.type : 'TOMATO';
  }

  function getItemCreatedAt(item) {
    return item && typeof item === 'object' && typeof item.createdAt === 'number' ? item.createdAt : 0;
  }

  function getItemAgeSeconds(item, nowSeconds = 0) {
    return Math.max(0, Math.floor(nowSeconds || 0) - getItemCreatedAt(item));
  }

  function getItemFreshnessState(item, nowSeconds = 0) {
    return getItemFreshness(getItemType(item), getItemAgeSeconds(item, nowSeconds));
  }

  function getFreshItemPricedAmount(basePrice, item, nowSeconds = 0) {
    const freshness = getItemFreshnessState(item, nowSeconds);
    return Math.round(Math.max(0, basePrice || 0) * getFreshnessPriceMultiplier(freshness.state));
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

  function getBrandPrestigeSummary(state) {
    const next = createBrandState(state);
    const entries = Object.values(next.brands);
    if (entries.length === 0) {
      return {
        activeBrands: 0,
        averageReputation: 1,
        premiumBrands: 0,
        prestigeBonus: 2
      };
    }
    const totalRep = entries.reduce((sum, b) => sum + (b.reputation || 1), 0);
    const averageReputation = Math.round((totalRep / entries.length) * 10) / 10;
    const premiumBrands = entries.filter(b => b.quality === 'premium').length;
    return {
      activeBrands: entries.length,
      averageReputation,
      premiumBrands,
      prestigeBonus: Math.min(10, Math.round(averageReputation * 2))
    };
  }

  function getBrandLevelUpInfo(previousState, nextState, category) {
    const prev = createBrandState(previousState).brands[category];
    const next = createBrandState(nextState).brands[category];
    const previousReputation = prev ? prev.reputation || 1 : 0;
    const nextReputation = next ? next.reputation || 1 : previousReputation;
    return {
      didLevelUp: nextReputation > previousReputation,
      previousReputation,
      nextReputation,
      brandName: next ? next.name : category
    };
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
    const count = typeof availableItems === 'number' ? Math.max(1, Math.floor(availableItems)) : 3;
    const pool = DAY_EVENT_POOL.slice();
    const index = (Math.max(1, day) - 1) % pool.length;
    const choices = [];
    for (let i = 0; i < count; i++) {
      choices.push(pool[(index + i) % pool.length]);
    }
    return choices.map(normalizeDayChoiceForUI);
  }

  function applyDayChoice(choiceOrId) {
    const id = typeof choiceOrId === 'object' && choiceOrId !== null ? choiceOrId.id : choiceOrId;
    const event = DAY_EVENT_POOL.find(e => e.id === id) || DAY_EVENT_POOL[0];
    return {
      eventId: event.id,
      label: event.label,
      name: event.label,
      theme: event.icon || event.label,
      icon: event.icon,
      boosted: event.boosted.slice(),
      priceMultipliers: event.boosted.reduce((acc, itemType) => {
        acc[itemType] = event.multiplier;
        return acc;
      }, {}),
      residentAffinityBonus: !!event.specialCustomer,
      multiplier: event.multiplier,
      specialCustomer: event.specialCustomer,
      description: event.description,
      appliedAt: Date.now()
    };
  }

  function normalizeDayChoiceForUI(event) {
    return {
      ...event,
      name: event.name || event.label,
      theme: event.theme || event.icon || event.label,
      priceMultipliers: event.priceMultipliers || event.boosted.reduce((acc, itemType) => {
        acc[itemType] = event.multiplier;
        return acc;
      }, {}),
      residentAffinityBonus: event.residentAffinityBonus || !!event.specialCustomer
    };
  }

  function applyDayChoiceToShoppingPool(pool, dayChoice) {
    const available = Array.isArray(pool) && pool.length > 0 ? pool.slice() : ['TOMATO'];
    if (!dayChoice || !Array.isArray(dayChoice.boosted)) return available;
    const boosted = dayChoice.boosted.filter(item => available.includes(item));
    if (boosted.length === 0) return available;
    const rest = available.filter(item => !boosted.includes(item));
    return [boosted[0], boosted[0], ...boosted.slice(1), ...rest];
  }

  function getDayChoiceEffects(dayChoice) {
    if (!dayChoice) {
      return {
        customerSpawnRateBoost: 0,
        residentAffinityBonus: false,
        specialCustomer: null,
        boostedItems: []
      };
    }
    return {
      customerSpawnRateBoost: 0.15,
      residentAffinityBonus: !!dayChoice.residentAffinityBonus,
      specialCustomer: dayChoice.specialCustomer || null,
      boostedItems: Array.isArray(dayChoice.boosted) ? dayChoice.boosted.slice() : []
    };
  }

  // --- FAZ 5: GÖRÜNÜR MAHALLE GELİŞİMİ (NEIGHBORHOOD BUILDINGS) ---
  const NEIGHBORHOOD_BUILDINGS = [
    {
      id: 'bus_stop',
      name: 'Otobüs Durağı',
      cost: 500,
      unlockLevel: 2,
      requiredLevel: 2,
      effect: { morningRush: true, extraCustomers: 2, customerSpawnRateBoost: 0.10 },
      effectDesc: 'Sabah akını ve +2 müşteri kapasitesi',
      description: 'Sabah saatlerinde durak kalabalığı marketten geçer.'
    },
    {
      id: 'park',
      name: 'Mahalle Parkı',
      cost: 800,
      unlockLevel: 2,
      requiredLevel: 2,
      effect: { weekendBoost: 'ICE_CREAM', extraCustomers: 1, boosted: ['ICE_CREAM', 'APPLE_JUICE'] },
      effectDesc: '+1 müşteri kapasitesi, serin ürün talebi',
      description: 'Parkta yürüyüş yapanlar dondurma ve serinletici içecek arar.'
    },
    {
      id: 'cafe',
      name: 'Sokak Kafesi',
      cost: 1200,
      unlockLevel: 3,
      requiredLevel: 3,
      effect: { afternoonRush: true, boosted: ['BREAD', 'CHEESE', 'TOAST'], extraCustomers: 1, residentAffinityGainBoost: 1 },
      effectDesc: 'Öğleden sonra akını, fırın ürünleri talebi',
      description: 'Öğleden sonra kafe müdavimleri fırın ve kahvaltılık alışverişine gelir.'
    },
    {
      id: 'school',
      name: 'Mahalle Okulu',
      cost: 1500,
      unlockLevel: 3,
      requiredLevel: 3,
      effect: { morningRush: true, afternoonRush: true, boosted: ['APPLE_JUICE', 'BREAD'], extraCustomers: 2, customerSpawnRateBoost: 0.15 },
      effectDesc: 'Sabah/öğlen akını ve +2 müşteri kapasitesi',
      description: 'Okul giriş ve çıkış saatlerinde veli ve öğrenci bereketi yaşanır.'
    },
    {
      id: 'gym',
      name: 'Fitness Salonu',
      cost: 2000,
      unlockLevel: 4,
      requiredLevel: 4,
      effect: { boosted: ['SALAD_BOWL', 'CARROT', 'APPLE_JUICE'], extraCustomers: 2 },
      effectDesc: '+2 müşteri kapasitesi, sağlıklı ürün talebi',
      description: 'Sporcular taze salata ve organik ürünleri tüketir.'
    }
  ];

  function createNeighborhoodBuildingState(seed = {}) {
    const built = Array.isArray(seed && seed.built)
      ? seed.built.slice()
      : (Array.isArray(seed) ? seed.slice() : []);
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
      extraCustomerCapacity: 0,
      customerSpawnRateBoost: 0,
      morningRush: false,
      morningRushHour: false,
      afternoonRush: false,
      afternoonRushHour: false,
      residentAffinityGainBoost: 0,
      boostedItems: []
    };
    current.built.forEach(id => {
      const b = NEIGHBORHOOD_BUILDINGS.find(x => x.id === id);
      if (!b || !b.effect) return;
      if (b.effect.extraCustomers) effects.extraCustomers += b.effect.extraCustomers;
      if (b.effect.extraCustomers) effects.extraCustomerCapacity += b.effect.extraCustomers;
      if (b.effect.customerSpawnRateBoost) effects.customerSpawnRateBoost += b.effect.customerSpawnRateBoost;
      if (b.effect.residentAffinityGainBoost) effects.residentAffinityGainBoost += b.effect.residentAffinityGainBoost;
      if (b.effect.morningRush) {
        effects.morningRush = true;
        effects.morningRushHour = true;
      }
      if (b.effect.afternoonRush) {
        effects.afternoonRush = true;
        effects.afternoonRushHour = true;
      }
      if (Array.isArray(b.effect.boosted)) {
        b.effect.boosted.forEach(item => {
          if (!effects.boostedItems.includes(item)) effects.boostedItems.push(item);
        });
      }
    });
    return effects;
  }

  function getNeighborhoodBuildingProgress(state, money = 0, marketLevel = 1) {
    const current = createNeighborhoodBuildingState(state);
    const totalCount = NEIGHBORHOOD_BUILDINGS.length;
    const builtCount = current.built.filter(id => NEIGHBORHOOD_BUILDINGS.some(b => b.id === id)).length;
    const effects = getActiveNeighborhoodEffects(current);
    const activeEffectLabels = [];
    if (effects.extraCustomerCapacity > 0) activeEffectLabels.push(`+${effects.extraCustomerCapacity} müşteri kapasitesi`);
    if (effects.customerSpawnRateBoost > 0) activeEffectLabels.push(`+%${Math.round(effects.customerSpawnRateBoost * 100)} müşteri akışı`);
    if (effects.morningRushHour) activeEffectLabels.push('sabah akını');
    if (effects.afternoonRushHour) activeEffectLabels.push('öğleden sonra akını');
    if (effects.residentAffinityGainBoost > 0) activeEffectLabels.push('komşu yakınlık bonusu');
    if (effects.boostedItems.length > 0) activeEffectLabels.push(`${effects.boostedItems.length} ürün talebi`);

    const available = NEIGHBORHOOD_BUILDINGS
      .filter(b => !current.built.includes(b.id))
      .map(b => ({
        ...b,
        canBuild: canBuildNeighborhood(current, b.id, money, marketLevel),
        levelMet: marketLevel >= b.unlockLevel,
        moneyMet: money >= b.cost
      }));
    const nextAvailable = available.find(b => b.canBuild) || available.find(b => b.levelMet) || available[0] || null;
    const lockedCount = available.filter(b => !b.levelMet).length;

    return {
      builtCount,
      totalCount,
      completionPercent: totalCount > 0 ? Math.round((builtCount / totalCount) * 100) : 100,
      nextAvailable,
      lockedCount,
      activeEffectLabels
    };
  }

  // --- FAZ 6: VERESİYE DEFTERİ & ESNAF İTİMATİ ---
  function createVeresiyeState(source = {}) {
    const srcDebts = (source && source.debts && typeof source.debts === 'object') ? source.debts : ((source && source.ledger && typeof source.ledger === 'object') ? source.ledger : {});
    const debts = {};
    Object.keys(srcDebts).forEach(id => {
      const val = srcDebts[id];
      const amount = typeof val === 'number' ? val : (val && val.amount ? val.amount : 0);
      debts[id] = {
        amount: Math.max(0, amount),
        dayIssued: (val && val.dayIssued) || 1,
        claimed: !!(val && val.claimed)
      };
    });
    const totalCollected = (source && typeof source.totalCollected === 'number') ? source.totalCollected : 0;
    return { debts, ledger: debts, totalCollected };
  }

  function issueVeresiye(state, residentId, amount, currentDay = 1) {
    const next = createVeresiyeState(state);
    const cur = next.debts[residentId] || { amount: 0, dayIssued: currentDay, claimed: false };
    next.debts[residentId] = {
      amount: cur.amount + Math.max(1, Math.round(amount)),
      dayIssued: currentDay,
      claimed: false
    };
    next.ledger = next.debts;
    return next;
  }

  function collectVeresiye(state, residentId, currentDay = 2) {
    const next = createVeresiyeState(state);
    if (!next.debts[residentId] || next.debts[residentId].amount <= 0) {
      return { state: next, collectedAmount: 0, paid: 0, reward: null, giftName: '' };
    }
    const debt = next.debts[residentId];
    const collectedAmount = debt.amount;
    debt.amount = 0;
    debt.claimed = true;
    next.totalCollected = (next.totalCollected || 0) + collectedAmount;
    const reward = {
      type: 'HOME_TREAT',
      label: 'Ev Yapımı İkram (+%15 Satış Primi)',
      salesMultiplier: 1.15
    };
    return { state: next, collectedAmount, paid: collectedAmount, reward, giftName: reward.label };
  }

  function getVeresiyeTotal(state) {
    const s = createVeresiyeState(state);
    return Object.values(s.debts).reduce((acc, d) => acc + (d.amount || 0), 0);
  }

  // --- FAZ 6: DÜKKAN HİJYENİ & PASPAS SİSTEMİ ---
  function calculateHygieneScore(activeTrashCount, maxTrash = 6) {
    const count = Math.max(0, Math.min(maxTrash, activeTrashCount));
    return Math.max(0, Math.round(100 - count * 10));
  }

  function getHygieneEffects(hygieneScore) {
    if (hygieneScore >= 80) {
      return { tipBonus: 0.15, patienceMultiplier: 1.25, label: 'Kusursuz Temizlik' };
    }
    if (hygieneScore <= 40) {
      return { tipBonus: 0, patienceMultiplier: 0.50, label: 'Kirli Mağaza' };
    }
    return { tipBonus: 0, patienceMultiplier: 1.0, label: 'Standart Hijyen' };
  }

  // --- FAZ 6: GÜVENLİK KAPISI & KARABAŞ KÖPEK ---
  function createSecurityDogState(seed = {}) {
    return {
      level: seed.level || 1,
      hasKennel: seed.hasKennel !== undefined ? !!seed.hasKennel : true,
      state: seed.state || 'GUARDING',
      alarmTriggered: !!seed.alarmTriggered,
      interceptCount: seed.interceptCount || 0
    };
  }

  function triggerSecurityAlarm(dogState) {
    const next = createSecurityDogState(dogState);
    if (next.hasKennel) {
      next.state = 'CHASING';
      next.alarmTriggered = true;
    }
    return next;
  }

  // --- FAZ 7: TOPTANCI KAMYONU & KOLİLEME ---
  const WHOLESALE_CATALOG = {
    // İçecek Kategorisi (BEVERAGES)
    WATER_PACK: { id: 'WATER_PACK', itemType: 'WATER_PACK', name: "Kaynak Suyu (6'lı)", category: 'BEVERAGES', count: 6, cost: 4, retailRef: 1.50, brand: 'Öz Pınar', icon: 'WATER_PACK' },
    PREMIUM_WATER: { id: 'PREMIUM_WATER', itemType: 'PREMIUM_WATER', name: "Premium Cam Su (6'lı)", category: 'BEVERAGES', count: 6, cost: 12, retailRef: 4.00, brand: 'Alp Kristal', icon: 'PREMIUM_WATER' },
    SODA_CAN: { id: 'SODA_CAN', itemType: 'SODA_CAN', name: "Kutu Meşrubat / Kola (24'lü)", category: 'BEVERAGES', count: 24, cost: 18, retailRef: 1.75, brand: 'KolaTurka', icon: 'SODA_CAN' },
    MINERAL_WATER: { id: 'MINERAL_WATER', itemType: 'MINERAL_WATER', name: "Maden Suyu (12'li)", category: 'BEVERAGES', count: 12, cost: 8, retailRef: 1.50, brand: 'Kızılay', icon: 'MINERAL_WATER' },
    // Temizlik & Ev Bakımı (CLEANING)
    LIQUID_DETERGENT: { id: 'LIQUID_DETERGENT', itemType: 'LIQUID_DETERGENT', name: "Sıvı Çamaşır Deterjanı (4'lü 5L)", category: 'CLEANING', count: 4, cost: 24, retailRef: 11.00, brand: 'Akgül Hijyen', icon: 'LIQUID_DETERGENT' },
    SURFACE_CLEANER: { id: 'SURFACE_CLEANER', itemType: 'SURFACE_CLEANER', name: "Yüzey Temizleyici & Çamaşır Suyu (8'li)", category: 'CLEANING', count: 8, cost: 16, retailRef: 4.50, brand: 'Domestik', icon: 'SURFACE_CLEANER' },
    DISH_SOAP: { id: 'DISH_SOAP', itemType: 'DISH_SOAP', name: "Bulaşık Tableti & Sıvısı (6'lı)", category: 'CLEANING', count: 6, cost: 20, retailRef: 6.50, brand: 'Parlak Tablet', icon: 'DISH_SOAP' },
    // Kişisel Bakım (PERSONAL_CARE)
    SHAMPOO: { id: 'SHAMPOO', itemType: 'SHAMPOO', name: "Şampuan & Saç Kremi (12'li)", category: 'PERSONAL_CARE', count: 12, cost: 30, retailRef: 5.50, brand: 'İpek Özü', icon: 'SHAMPOO' },
    BAR_SOAP: { id: 'BAR_SOAP', itemType: 'BAR_SOAP', name: "Banyo Sabunu (24'lü)", category: 'PERSONAL_CARE', count: 24, cost: 12, retailRef: 1.25, brand: 'Zeytin Dalı', icon: 'BAR_SOAP' },
    // Temel Gıda & Fırın (FOOD_STAPLES)
    FLOUR: { id: 'FLOUR', itemType: 'FLOUR', name: 'Un Çuvalı', category: 'FOOD_STAPLES', count: 6, cost: 72, retailRef: 18, brand: 'Altın Değirmen', icon: 'FLOUR' },
    MILK: { id: 'MILK', itemType: 'MILK', name: 'Süt Kolisi', category: 'FOOD_STAPLES', count: 6, cost: 48, retailRef: 12, brand: 'Çiftlik Süt', icon: 'MILK' },
    CHEESE: { id: 'CHEESE', itemType: 'CHEESE', name: 'Peynir Sandığı', category: 'FOOD_STAPLES', count: 6, cost: 96, retailRef: 24, brand: 'Köy Mandıra', icon: 'CHEESE' },
    BREAD: { id: 'BREAD', itemType: 'BREAD', name: 'Toptan Ekmek Kasası', category: 'FOOD_STAPLES', count: 6, cost: 35, retailRef: 10, brand: 'Halk Ekmek', icon: 'BREAD' },
    APPLE_JUICE: { id: 'APPLE_JUICE', itemType: 'APPLE_JUICE', name: 'Meyve Suyu Kolisi', category: 'BEVERAGES', count: 6, cost: 70, retailRef: 18, brand: 'Doğa Bahçe', icon: 'APPLE_JUICE' },
    APPLE_PIE: { id: 'APPLE_PIE', itemType: 'APPLE_PIE', name: 'Turta Sandığı', category: 'FOOD_STAPLES', count: 6, cost: 85, retailRef: 22, brand: 'Usta Fırın', icon: 'APPLE_PIE' },
    TOAST: { id: 'TOAST', itemType: 'TOAST', name: 'Çıtır Tost Paketi', category: 'FOOD_STAPLES', count: 6, cost: 95, retailRef: 25, brand: 'Büfe Tost', icon: 'TOAST' }
  };

  // Hacim / Koli iskontosu: 5+ koli %10, 10+ koli %20
  function calculateBulkDiscount(quantity) {
    const qty = Number(quantity) || 0;
    if (qty >= 10) return 0.20;
    if (qty >= 5) return 0.10;
    return 0.0;
  }

  // Kâr marjı hesabı: ((Satış - Alış) / Satış) * 100
  function calculateMargin(wholesaleUnitCost, retailPrice) {
    const cost = Number(wholesaleUnitCost) || 0;
    const retail = Number(retailPrice) || 0;
    if (retail <= 0) return 0;
    return Math.max(-100, Math.min(100, ((retail - cost) / retail) * 100));
  }

  // Fiyat esnekliği algoritması: MSRP'ye göre müşteri tepkisi
  function applyPriceElasticity(itemKey, retailPrice, baseMsrp) {
    const price = Number(retailPrice) || 0;
    const catItem = WHOLESALE_CATALOG[itemKey] || Object.values(WHOLESALE_CATALOG).find(c => c.itemType === itemKey);
    const msrp = Number(baseMsrp) || (catItem && catItem.retailRef) || price || 1;
    const ratio = msrp > 0 ? (price / msrp) : 1.0;

    if (ratio <= 0.90) {
      return {
        appeal: 'BARGAIN',
        ratio,
        discountMultiplier: 1.35,
        dropoutChance: 0.0,
        prestigeBonus: true,
        theftRiskIncrease: 0.0,
        bubbleTag: '[FIRSAT ÜRÜNÜ]'
      };
    } else if (ratio <= 1.15) {
      return {
        appeal: 'FAIR',
        ratio,
        discountMultiplier: 1.0,
        dropoutChance: 0.0,
        prestigeBonus: false,
        theftRiskIncrease: 0.0,
        bubbleTag: ''
      };
    } else if (ratio <= 1.30) {
      return {
        appeal: 'EXPENSIVE',
        ratio,
        discountMultiplier: 0.75,
        dropoutChance: 0.35,
        prestigeBonus: false,
        theftRiskIncrease: 0.10,
        bubbleTag: '[PAHALI!]'
      };
    } else {
      return {
        appeal: 'GOUGE',
        ratio,
        discountMultiplier: 0.40,
        dropoutChance: 0.70,
        prestigeBonus: false,
        theftRiskIncrease: 0.50,
        hygienePenalty: 10,
        bubbleTag: '[FAHİŞ!]'
      };
    }
  }

  // Dönemsel piyasa bülteni & şoklar
  const DAILY_MARKET_TRENDS = [
    {
      id: 'FACTORY_STRIKE',
      title: 'Kimya Fabrikası Grevi',
      description: 'Deterjan ve temizlik kimyasalları toptan alış fiyatı %30 arttı!',
      categoryModifiers: { CLEANING: { costMult: 1.30, demandMult: 1.10 } }
    },
    {
      id: 'HEAT_WAVE',
      title: 'Sıcak Hava Dalgası',
      description: 'Termometreler 38 dereceyi vurdu, soğuk içecek talebi 2 katına çıktı!',
      categoryModifiers: { BEVERAGES: { costMult: 1.0, demandMult: 2.0 } }
    },
    {
      id: 'WEEKSTART_PROMO',
      title: 'Hafta Başı Toptan Kampanyası',
      description: 'Tüm kişisel bakım ve gıda ürünlerinde ekstra %15 hacim primi.',
      categoryModifiers: { PERSONAL_CARE: { costMult: 0.85, demandMult: 1.25 } }
    },
    {
      id: 'STABLE_MARKET',
      title: 'Durgun & İstikrarlı Piyasa',
      description: 'Toptancı piyasasında fiyatlar ve sevkiyatlar olağan dengesinde seyrediyor.',
      categoryModifiers: {}
    }
  ];

  function getDailyMarketTrend(dayIndex = 1) {
    const idx = Math.abs(Math.floor(Number(dayIndex) || 0)) % DAILY_MARKET_TRENDS.length;
    return DAILY_MARKET_TRENDS[idx];
  }

  function createWholesaleState(seed = {}) {
    return {
      totalCratesOrdered: seed.totalCratesOrdered || (Array.isArray(seed.orders) ? seed.orders.length : 0),
      pendingDeliveries: Array.isArray(seed.pendingDeliveries) ? seed.pendingDeliveries : [],
      activeCrates: Array.isArray(seed.activeCrates) ? seed.activeCrates : [],
      orders: Array.isArray(seed.orders) ? seed.orders : [],
      deliveryCooldown: seed.deliveryCooldown || 0
    };
  }

  function orderWholesaleCrate(state, wholesaleKeyOrId, cost) {
    const next = createWholesaleState(state);
    const item = WHOLESALE_CATALOG[wholesaleKeyOrId] || Object.values(WHOLESALE_CATALOG).find(w => w.id === wholesaleKeyOrId || w.itemType === wholesaleKeyOrId) || { itemType: wholesaleKeyOrId, count: 6, cost: cost || 50, name: wholesaleKeyOrId };
    const actualCost = typeof cost === 'number' ? cost : item.cost;
    const delivery = {
      id: `${item.itemType || wholesaleKeyOrId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      wholesaleId: wholesaleKeyOrId,
      itemType: item.itemType || wholesaleKeyOrId,
      count: item.count || 6,
      cost: actualCost,
      orderedAt: Date.now()
    };
    next.totalCratesOrdered = (next.totalCratesOrdered || 0) + 1;
    next.pendingDeliveries.push(delivery);
    next.orders.push(delivery);
    return next;
  }

  // --- FAZ 7: PERSONEL DİNLENME & ÇAY OCAĞI ---
  const STAFF_FATIGUE_CONFIG = {
    maxStamina: 100,
    drainRate: 0.8,
    teaRefillRate: 15.0
  };

  function createStaffFatigueState(seed = {}) {
    const state = { helpers: {} };
    const defaultIds = ['1', '2', '3'];
    const keys = new Set([...defaultIds, ...Object.keys(seed || {}), ...Object.keys(seed?.helpers || {})]);

    keys.forEach(k => {
      if (k === 'helpers') return;
      const src = (seed && seed[k]) || (seed && seed.helpers && seed.helpers[k]) || {};
      const stamina = typeof src.stamina === 'number' ? Math.max(0, Math.min(100, src.stamina)) : 100;
      const helperObj = {
        id: k,
        stamina: stamina,
        isTired: stamina < 60,
        isExhausted: stamina < 20,
        isResting: !!src.isResting,
        specialty: src.specialty || 'GENERAL'
      };
      state[k] = helperObj;
      state.helpers[k] = helperObj;
    });

    return state;
  }

  function drainStaffStamina(state, helperId, amount = 5) {
    const next = createStaffFatigueState(state);
    const key = String(helperId);
    const h = next[key] || { id: key, stamina: 100, isTired: false, isExhausted: false, isResting: false, specialty: 'GENERAL' };
    const drain = typeof amount === 'number' ? amount : 5;
    h.stamina = Math.max(0, h.stamina - drain);
    h.isTired = h.stamina < 60;
    h.isExhausted = h.stamina < 20;
    if (h.stamina <= 0) {
      h.isResting = true;
    }
    next[key] = h;
    next.helpers[key] = h;
    return next;
  }

  function refillStaffStamina(state, helperId, amount = 15) {
    const next = createStaffFatigueState(state);
    const key = String(helperId);
    const h = next[key] || { id: key, stamina: 0, isTired: true, isExhausted: true, isResting: true, specialty: 'GENERAL' };
    const refill = typeof amount === 'number' ? amount * 1.5 : 15;
    h.stamina = Math.min(100, h.stamina + refill);
    h.isTired = h.stamina < 60;
    h.isExhausted = h.stamina < 20;
    if (h.stamina >= 100) {
      h.isResting = false;
    }
    next[key] = h;
    next.helpers[key] = h;
    return next;
  }

  // --- FAZ 8: DEKORASYON & PRESTİJ ---
  const DECORATION_TIERS = {
    classic: { id: 'classic', name: 'Klasik Karo', cost: 0, prestige: 1, floorColor: 0xe0e0e0, colorHex: '#E0E0E0' },
    wood: { id: 'wood', name: 'Doğal Ahşap Parke', cost: 350, prestige: 3, floorColor: 0x8b5a2b, colorHex: '#8B5A2B' },
    mosaic: { id: 'mosaic', name: 'Retro Çini Deseni', cost: 650, prestige: 4, floorColor: 0x00d2d3, colorHex: '#00D2D3' },
    granite: { id: 'granite', name: 'Cilalı Granit', cost: 1200, prestige: 5, floorColor: 0x2c3e50, colorHex: '#2C3E50' },
    marble: { id: 'marble', name: 'Beyaz Mermer', cost: 1400, prestige: 5, floorColor: 0xf4f1e8, colorHex: '#F4F1E8' }
  };

  const DECORATION_CATALOG = Object.freeze([
    Object.freeze({
      id: 'decor_plant_potted',
      name: 'Dekoratif Saksı Bitkisi',
      category: 'PLANTS',
      price: 80,
      prestigeBonus: 2,
      size: { w: 0.8, d: 0.8, h: 1.4 },
      meshType: 'PLANT',
      description: 'Markete organik ferahlık katar (+2 Prestij).'
    }),
    Object.freeze({
      id: 'decor_bench_wood',
      name: 'Ahşap Dinlenme Bankı',
      category: 'FURNITURE',
      price: 150,
      prestigeBonus: 3,
      size: { w: 1.8, d: 0.8, h: 0.9 },
      meshType: 'BENCH',
      description: 'Müşterilerin dinlenmesini sağlar (+3 Prestij).'
    }),
    Object.freeze({
      id: 'decor_trolleys_bay',
      name: 'Paslanmaz Market Arabaları',
      category: 'ACCESSORIES',
      price: 220,
      prestigeBonus: 4,
      size: { w: 1.4, d: 2.4, h: 1.2 },
      meshType: 'TROLLEYS',
      description: 'Düzenli alışveriş arabası parkı (+4 Prestij).'
    }),
    Object.freeze({
      id: 'decor_baskets_stack',
      name: 'El Sepeti Standı',
      category: 'ACCESSORIES',
      price: 110,
      prestigeBonus: 2,
      size: { w: 0.8, d: 0.8, h: 1.4 },
      meshType: 'BASKETS',
      description: 'Hızlı sepet alma istasyonu (+2 Prestij).'
    }),
    Object.freeze({
      id: 'decor_freezer_island',
      name: 'Ada Tipi Camlı Dondurucu',
      category: 'COOLING',
      price: 450,
      prestigeBonus: 5,
      size: { w: 1.8, d: 2.8, h: 0.95 },
      meshType: 'FREEZER',
      description: 'Geniş hacimli şık dondurucu (+5 Prestij).'
    }),
    Object.freeze({
      id: 'decor_impulse_stand',
      name: 'Kasa Yanı İkramlık Standı',
      category: 'ACCESSORIES',
      price: 180,
      prestigeBonus: 3,
      size: { w: 0.5, d: 1.4, h: 1.1 },
      meshType: 'IMPULSE',
      description: 'Kasa önü atıştırmalık sergisi (+3 Prestij).'
    }),
    Object.freeze({
      id: 'decor_neon_bizim',
      name: 'Voxel Neon Tabela',
      category: 'LIGHTING',
      price: 320,
      prestigeBonus: 4,
      size: { w: 2.2, d: 0.4, h: 1.2 },
      meshType: 'NEON',
      description: 'Işıltılı retro mağaza tabelası (+4 Prestij).'
    }),
    Object.freeze({
      id: 'decor_trash_recycle',
      name: 'Geri Dönüşüm İstasyonu',
      category: 'FURNITURE',
      price: 90,
      prestigeBonus: 2,
      size: { w: 0.8, d: 0.8, h: 1.0 },
      meshType: 'TRASH',
      description: 'Çevre dostu ayrıştırma kutusu (+2 Prestij).'
    })
  ]);

  function createDecorationState(seed = {}) {
    return {
      activeFloor: seed.activeFloor || seed.floor || 'classic',
      floor: seed.activeFloor || seed.floor || 'classic',
      neonColor: seed.neonColor || '#FF0055',
      radioChannel: seed.radioChannel !== undefined ? seed.radioChannel : 1,
      unlockedFloors: Array.isArray(seed.unlockedFloors) ? seed.unlockedFloors : ['classic'],
      purchasedItems: Array.isArray(seed.purchasedItems) ? seed.purchasedItems : []
    };
  }

  function buyDecoration(state, decorId) {
    if (!state || typeof state !== 'object') {
      return { success: false, reason: 'Geçersiz oyun durumu' };
    }
    const item = DECORATION_CATALOG.find(d => d.id === decorId);
    if (!item) {
      return { success: false, reason: 'Ürün katalogda bulunamadı' };
    }
    if (typeof state.money !== 'number' || state.money < item.price) {
      return { success: false, reason: 'Yetersiz bakiye' };
    }

    state.money -= item.price;
    if (!state.decorationState) {
      state.decorationState = createDecorationState();
    }
    if (!Array.isArray(state.decorationState.purchasedItems)) {
      state.decorationState.purchasedItems = [];
    }

    const instanceId = `${decorId}_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    const record = {
      instanceId,
      catalogId: decorId,
      name: item.name,
      category: item.category,
      price: item.price,
      prestigeBonus: item.prestigeBonus,
      size: item.size,
      meshType: item.meshType,
      purchasedAt: Date.now()
    };

    state.decorationState.purchasedItems.push(record);

    return {
      success: true,
      item: record,
      remainingMoney: state.money
    };
  }

  function calculateStorePrestige(arg1, arg2, arg3, arg4) {
    let hygieneScore = 100;
    let floorTier = 'classic';
    let brandReputationAverage = 1;
    let brandSummary = null;
    let neighborhoodState = null;
    let itemBonus = 0;

    if (typeof arg1 === 'object' && arg1 !== null) {
      const decState = arg1;
      floorTier = decState.activeFloor || decState.floor || 'classic';
      hygieneScore = typeof arg2 === 'number' ? arg2 : 100;
      if (Array.isArray(decState.purchasedItems)) {
        itemBonus = decState.purchasedItems.reduce((acc, it) => acc + (typeof it.prestigeBonus === 'number' ? it.prestigeBonus : 1), 0);
      }
      if (arg3 && typeof arg3 === 'object') {
        brandSummary = getBrandPrestigeSummary(arg3);
        brandReputationAverage = brandSummary.averageReputation;
      } else if (typeof arg3 === 'number') {
        brandReputationAverage = arg3;
      }
      if (arg4 && typeof arg4 === 'object') {
        neighborhoodState = arg4;
      }
    } else if (typeof arg1 === 'number') {
      hygieneScore = arg1;
      floorTier = typeof arg2 === 'string' ? arg2 : ((arg2 && (arg2.activeFloor || arg2.floor)) || 'classic');
      if (typeof arg2 === 'object' && arg2 !== null && Array.isArray(arg2.purchasedItems)) {
        itemBonus = arg2.purchasedItems.reduce((acc, it) => acc + (typeof it.prestigeBonus === 'number' ? it.prestigeBonus : 1), 0);
      }
      if (arg3 && typeof arg3 === 'object') {
        brandSummary = getBrandPrestigeSummary(arg3);
        brandReputationAverage = brandSummary.averageReputation;
      } else {
        brandReputationAverage = typeof arg3 === 'number' ? arg3 : 1;
      }
      if (arg4 && typeof arg4 === 'object') {
        neighborhoodState = arg4;
      }
    }

    const floorTierObj = DECORATION_TIERS[floorTier] || DECORATION_TIERS.classic;
    // 1. Dekorasyon puanı: 6 ila 30 puan (zemin + satın alınan mobilya/dekorasyonlar)
    const decPts = Math.min(30, (floorTierObj.prestige || 1) * 6 + itemBonus);

    // 2. Hijyen puanı: 0 ila 30 puan
    const clampedHygiene = Math.max(0, Math.min(100, typeof hygieneScore === 'number' ? hygieneScore : 100));
    const hygPts = Math.round((clampedHygiene / 100) * 30);

    // 3. Marka itibarı puanı: 0 ila 20 puan
    let brandPts = 0;
    if (brandSummary) {
      brandPts = Math.min(20, Math.round(brandSummary.prestigeBonus * 1.5 + (brandReputationAverage - 1) * 2));
    } else {
      brandPts = Math.min(20, Math.round(Math.min(5, brandReputationAverage) * 3));
    }

    // 4. Komşu sadakati puanı: 0 ila 20 puan
    let affPts = 4;
    if (neighborhoodState && neighborhoodState.residents && typeof neighborhoodState.residents === 'object') {
      const affinities = Object.values(neighborhoodState.residents).map(r => (r && typeof r.affinity === 'number') ? r.affinity : 1);
      const totalAffinitySum = affinities.reduce((a, b) => a + b, 0);
      affPts = Math.min(20, Math.max(2, Math.round((totalAffinitySum / 25) * 20)));
    }

    const total = Math.min(100, Math.max(10, Math.round(decPts + hygPts + brandPts + affPts)));

    let stars = 1;
    if (total >= 85 || (floorTierObj.prestige >= 5 && clampedHygiene >= 85)) {
      stars = 5;
    } else if (total >= 65 || (floorTierObj.prestige >= 4 && clampedHygiene >= 75)) {
      stars = 4;
    } else if (total >= 45 || (floorTierObj.prestige >= 3 && clampedHygiene >= 60)) {
      stars = 3;
    } else if (total >= 25) {
      stars = 2;
    }

    const perks = getPrestigePerks(stars);

    return {
      score: total,
      stars,
      floorName: floorTierObj.name,
      floorTier,
      hygieneScore: Math.round(clampedHygiene),
      brandReputationAverage,
      brandPrestigeBonus: brandSummary ? brandSummary.prestigeBonus : brandPts,
      activeBrands: brandSummary ? brandSummary.activeBrands : 0,
      affinityPoints: affPts,
      breakdown: {
        decoration: decPts,
        hygiene: hygPts,
        brand: brandPts,
        affinity: affPts,
        maxPoints: 100
      },
      perks,
      isVIPEligible: stars >= 3,
      basketMultiplier: perks.basketMultiplier
    };
  }

  function getPrestigePerks(stars) {
    const s = Math.max(1, Math.min(5, Number(stars) || 1));
    const TITLES = {
      1: 'Mahalle Bakkalı',
      2: 'Gelişen Bakkal',
      3: 'Sevilen Esnaf Marketi',
      4: 'Prestijli Süpermarket',
      5: 'Lüks Gurme Hipermarket'
    };
    return {
      stars: s,
      title: TITLES[s] || 'Mahalle Marketi',
      basketMultiplier: s === 5 ? 1.40 : (s === 4 ? 1.25 : (s === 3 ? 1.15 : (s === 2 ? 1.05 : 1.00))),
      isVIPEligible: s >= 3,
      vipSpawnRateMultiplier: s === 5 ? 1.6 : (s === 4 ? 1.3 : (s === 3 ? 1.0 : 0.0)),
      branchUnlockEligible: s >= 3,
      unlockedFloors: Object.keys(DECORATION_TIERS).filter(k => (DECORATION_TIERS[k].prestige || 1) <= s)
    };
  }

  function getVipBasketConfig(stars) {
    const s = Math.max(3, Math.min(5, Number(stars) || 3));
    return {
      maxItems: Math.min(5, Math.max(2, s)),
      tipBonusMultiplier: 1.20 + (s - 3) * 0.15,
      highValueWeight: s >= 4 ? 2.5 : 1.5
    };
  }

  function calculatePrestigeDelta(prevScore, currentScore) {
    const prev = Number(prevScore) || 0;
    const curr = Number(currentScore) || 0;
    const delta = curr - prev;
    return {
      previousScore: prev,
      currentScore: curr,
      delta,
      improved: delta > 0,
      declined: delta < 0
    };
  }

  // --- FAZ 9: UYDU ŞUBELER & ÇARŞI GENİŞLEMESİ (BRANCHES) ---
  const BRANCH_CONFIGS = {
    branch_1: {
      id: 'branch_1',
      name: 'Merkez Şube',
      district: 'Ana Mahalle',
      isSatellite: false,
      unlockCost: 0,
      unlockPrestige: 1,
      unlockLevel: 1,
      baseCapacity: 100,
      baseDailyCustomers: 30,
      description: 'Ana cadde üzerinde yer alan 3D etkileşimli ana süpermarket.'
    },
    branch_2: {
      id: 'branch_2',
      name: 'Çarşı Şubesi',
      district: 'Çarşı Meydanı',
      isSatellite: true,
      unlockCost: 3500,
      unlockPrestige: 3,
      unlockLevel: 4,
      baseCapacity: 60,
      baseDailyCustomers: 18,
      description: 'Çarşı esnafı ve yayaların yoğun olduğu uydu şube. Otomatik ciro sağlar.'
    },
    branch_3: {
      id: 'branch_3',
      name: 'İstasyon Şubesi',
      district: 'Tren Garı & Sanayi',
      isSatellite: true,
      unlockCost: 7500,
      unlockPrestige: 4,
      unlockLevel: 6,
      baseCapacity: 120,
      baseDailyCustomers: 32,
      description: 'Gar yolcuları ve işçiler için unlu mamul ve paketli ürün odaklı büyük şube.'
    }
  };

  function createBranchState(seed = {}) {
    const rawBranches = (seed && typeof seed === 'object' && seed.branches && typeof seed.branches === 'object')
      ? seed.branches
      : ((seed && typeof seed === 'object') ? seed : {});

    const defaultBranches = {
      branch_1: {
        id: 'branch_1',
        name: 'Merkez Şube',
        unlocked: true,
        level: 1,
        capacity: 100,
        stock: {},
        staff: { manager: true, cashier: 1, restocker: 1 },
        dailyRevenue: 0,
        uncollectedRevenue: 0,
        totalRevenue: 0,
        lastDaySales: 0
      },
      branch_2: {
        id: 'branch_2',
        name: 'Çarşı Şubesi',
        unlocked: false,
        level: 1,
        capacity: 60,
        stock: {},
        staff: { manager: false, cashier: 1, restocker: 1 },
        dailyRevenue: 0,
        uncollectedRevenue: 0,
        totalRevenue: 0,
        lastDaySales: 0
      },
      branch_3: {
        id: 'branch_3',
        name: 'İstasyon Şubesi',
        unlocked: false,
        level: 1,
        capacity: 120,
        stock: {},
        staff: { manager: false, cashier: 1, restocker: 1 },
        dailyRevenue: 0,
        uncollectedRevenue: 0,
        totalRevenue: 0,
        lastDaySales: 0
      }
    };

    const merged = {};
    for (const [id, def] of Object.entries(defaultBranches)) {
      const src = rawBranches[id] || {};
      merged[id] = {
        ...def,
        ...src,
        id,
        unlocked: src.unlocked !== undefined ? Boolean(src.unlocked) : def.unlocked,
        level: typeof src.level === 'number' ? src.level : def.level,
        capacity: typeof src.capacity === 'number' ? src.capacity : def.capacity,
        stock: src.stock && typeof src.stock === 'object' ? { ...src.stock } : {},
        staff: src.staff && typeof src.staff === 'object' ? { ...def.staff, ...src.staff } : { ...def.staff },
        dailyRevenue: typeof src.dailyRevenue === 'number' ? src.dailyRevenue : 0,
        uncollectedRevenue: typeof src.uncollectedRevenue === 'number' ? src.uncollectedRevenue : 0,
        totalRevenue: typeof src.totalRevenue === 'number' ? src.totalRevenue : 0,
        lastDaySales: typeof src.lastDaySales === 'number' ? src.lastDaySales : 0
      };
    }

    return { branches: merged };
  }

  function canUnlockBranch(branchState, branchId, money = 0, prestigeStars = 1, marketLevel = 1) {
    const config = BRANCH_CONFIGS[branchId];
    if (!config) return { allowed: false, reason: 'Bilinmeyen şube!' };
    const state = createBranchState(branchState);
    const branch = state.branches[branchId];
    if (!branch) return { allowed: false, reason: 'Şube bulunamadı!' };
    if (branch.unlocked) return { allowed: false, reason: 'Şube zaten açık.' };

    if (prestigeStars < config.unlockPrestige) {
      return { allowed: false, reason: `En az [P${config.unlockPrestige}] (${config.unlockPrestige} Yıldız) prestij gerekli!`, cost: config.unlockCost };
    }
    if (marketLevel < config.unlockLevel) {
      return { allowed: false, reason: `Market Seviyesi ${config.unlockLevel} gerekli!`, cost: config.unlockCost };
    }
    if (money < config.unlockCost) {
      return { allowed: false, reason: `Yetersiz bütçe! $${config.unlockCost} gerekli.`, cost: config.unlockCost };
    }

    return { allowed: true, cost: config.unlockCost, config };
  }

  function unlockBranch(branchState, branchId, money = 0) {
    const state = createBranchState(branchState);
    const branch = state.branches[branchId];
    if (branch) {
      branch.unlocked = true;
    }
    return state;
  }

  function transferStockToBranch(branchState, branchId, itemType, quantity) {
    const state = createBranchState(branchState);
    const branch = state.branches[branchId];
    if (!branch || !branch.unlocked) return state;

    const currentTotalStock = Object.values(branch.stock).reduce((a, b) => a + (Number(b) || 0), 0);
    const availableCapacity = Math.max(0, branch.capacity - currentTotalStock);
    const actualTransfer = Math.min(Math.max(0, quantity || 0), availableCapacity);

    if (actualTransfer > 0) {
      branch.stock[itemType] = (branch.stock[itemType] || 0) + actualTransfer;
    }
    return state;
  }

  function assignBranchStaff(branchState, branchId, role, value) {
    const state = createBranchState(branchState);
    const branch = state.branches[branchId];
    if (!branch || !branch.unlocked) return state;

    if (role === 'manager') {
      branch.staff.manager = Boolean(value);
    } else if (role === 'cashier' || role === 'restocker') {
      branch.staff[role] = Math.max(0, Math.min(5, Number(value) || 0));
    }
    return state;
  }

  function upgradeBranchCapacity(branchState, branchId, money = 0) {
    const state = createBranchState(branchState);
    const branch = state.branches[branchId];
    if (!branch || !branch.unlocked) return { state, upgraded: false, cost: 0 };

    const cost = branch.level * 1500;
    if (money < cost) {
      return { state, upgraded: false, cost, reason: 'Yetersiz bakiye!' };
    }

    branch.level += 1;
    branch.capacity += 30;
    return { state, upgraded: true, cost, newLevel: branch.level, newCapacity: branch.capacity };
  }

  const ITEM_BASE_PRICES = {
    TOMATO: 10,
    BREAD: 25,
    CHEESE: 45,
    CORN: 15,
    POPCORN: 35,
    APPLE_JUICE: 40,
    APPLE_PIE: 65,
    STRAWBERRY: 25,
    CARROT: 20,
    ICE_CREAM: 80,
    SALAD_BOWL: 60,
    PIZZA: 110,
    MILK: 30,
    WHEAT: 12
  };

  function simulateBranchDailyOperations(branchState, neighborhoodEffects = {}, activeDemand = null) {
    const state = createBranchState(branchState);
    const boosted = Array.isArray(neighborhoodEffects.boostedItems) ? neighborhoodEffects.boostedItems : [];
    const capacityBoost = Number(neighborhoodEffects.extraCustomerCapacity) || 0;
    const spawnRateBoost = Number(neighborhoodEffects.customerSpawnRateBoost) || 0;

    let totalSimulatedRevenue = 0;
    const branchSummaries = {};

    for (const [id, branch] of Object.entries(state.branches)) {
      if (!branch.unlocked || id === 'branch_1') continue;

      const cfg = BRANCH_CONFIGS[id] || {};
      const baseCustomers = cfg.baseDailyCustomers || 15;
      const managerBonus = branch.staff.manager ? 1.3 : 1.0;
      const cashierEfficiency = Math.min(2.0, 0.7 + (branch.staff.cashier || 1) * 0.3);
      const levelMult = 1 + (branch.level - 1) * 0.2;

      const totalCustomers = Math.round((baseCustomers + capacityBoost * 2) * (1 + spawnRateBoost) * managerBonus * levelMult);

      let branchDailyRev = 0;
      let branchDailyItems = 0;

      const stockTypes = Object.keys(branch.stock).filter(t => (branch.stock[t] || 0) > 0);
      if (stockTypes.length > 0) {
        for (let c = 0; c < totalCustomers; c++) {
          const availableTypes = Object.keys(branch.stock).filter(t => (branch.stock[t] || 0) > 0);
          if (availableTypes.length === 0) break;

          let chosenType = availableTypes[Math.floor(Math.random() * availableTypes.length)];
          const preferred = availableTypes.filter(t => boosted.includes(t) || (activeDemand && activeDemand.itemType === t));
          if (preferred.length > 0 && Math.random() < 0.6) {
            chosenType = preferred[Math.floor(Math.random() * preferred.length)];
          }

          const basePrice = ITEM_BASE_PRICES[chosenType] || 20;
          const boostPriceMult = (boosted.includes(chosenType) ? 1.25 : 1.0) * (activeDemand && activeDemand.itemType === chosenType ? 1.5 : 1.0);
          const finalPrice = Math.round(basePrice * boostPriceMult * cashierEfficiency);

          branch.stock[chosenType] = Math.max(0, branch.stock[chosenType] - 1);
          branchDailyRev += finalPrice;
          branchDailyItems += 1;
        }
      }

      branch.dailyRevenue = branchDailyRev;
      branch.uncollectedRevenue = (branch.uncollectedRevenue || 0) + branchDailyRev;
      branch.totalRevenue = (branch.totalRevenue || 0) + branchDailyRev;
      branch.lastDaySales = branchDailyItems;

      totalSimulatedRevenue += branchDailyRev;
      branchSummaries[id] = {
        name: branch.name,
        revenue: branchDailyRev,
        itemsSold: branchDailyItems,
        uncollectedRevenue: branch.uncollectedRevenue,
        remainingStock: Object.values(branch.stock).reduce((a, b) => a + (Number(b) || 0), 0)
      };
    }

    return {
      state,
      totalSimulatedRevenue,
      branchSummaries
    };
  }

  function collectBranchRevenue(branchState, branchId) {
    const state = createBranchState(branchState);
    const branch = state.branches[branchId];
    if (!branch || !branch.unlocked) {
      return { state, collectedAmount: 0 };
    }

    const amount = branch.uncollectedRevenue || 0;
    branch.uncollectedRevenue = 0;
    return {
      state,
      collectedAmount: amount
    };
  }

  // --- Faz 10: Profesyonel Mağaza Planogramı ve Merkezi Yerleşim Sistemi (STORE_PLANOGRAM) ---
  const STORE_PLANOGRAM = Object.freeze({
    ZONES: Object.freeze({
      DECOMPRESSION: Object.freeze({ id: 'ZONE_DECOMPRESSION', minX: -8.0, maxX: 3.0, minZ: -24.5, maxZ: -22.0 }),
      CHECKOUT_CONCOURSE: Object.freeze({ id: 'ZONE_CHECKOUT_CONCOURSE', minX: 1.5, maxX: 14.5, minZ: -21.8, maxZ: -16.2 }),
      FRESH_PRODUCE: Object.freeze({ id: 'ZONE_FRESH_PRODUCE', minX: -16.0, maxX: -4.0, minZ: -21.5, maxZ: -8.0 }),
      GROCERY_GRID: Object.freeze({ id: 'ZONE_GROCERY_GRID', minX: 2.0, maxX: 17.0, minZ: -16.0, maxZ: -8.0 }),
      EAST_PROMENADE: Object.freeze({ id: 'ZONE_EAST_PROMENADE', minX: 15.0, maxX: 23.5, minZ: -22.0, maxZ: -8.0 }),
      PRODUCTION_HALL: Object.freeze({ id: 'ZONE_PRODUCTION_HALL', minX: -20.0, maxX: 20.0, minZ: 4.0, maxZ: 21.5 })
    }),
    FIXTURES: Object.freeze([
      // Priority 1: Core Checkout & Cashier Infrastructure
      Object.freeze({ id: 'checkout_1', category: 'CHECKOUT', priority: 1, zone: 'CHECKOUT_CONCOURSE', target: { x: 3.5, z: -19.5 }, size: { w: 2.6, d: 0.88, h: 0.94 } }),
      Object.freeze({ id: 'checkout_2', category: 'CHECKOUT', priority: 1, zone: 'CHECKOUT_CONCOURSE', target: { x: 7.5, z: -19.5 }, size: { w: 2.6, d: 0.88, h: 0.94 } }),
      Object.freeze({ id: 'checkout_3', category: 'CHECKOUT', priority: 1, zone: 'CHECKOUT_CONCOURSE', target: { x: 11.5, z: -19.5 }, size: { w: 2.6, d: 0.88, h: 0.94 } }),
      Object.freeze({ id: 'cashier_1', category: 'CASHIER', priority: 1, zone: 'CHECKOUT_CONCOURSE', target: { x: 3.5, z: -20.15 }, size: { w: 0.6, d: 0.6, h: 1.7 } }),
      Object.freeze({ id: 'cashier_2', category: 'CASHIER', priority: 1, zone: 'CHECKOUT_CONCOURSE', target: { x: 7.5, z: -20.15 }, size: { w: 0.6, d: 0.6, h: 1.7 } }),
      Object.freeze({ id: 'cashier_3', category: 'CASHIER', priority: 1, zone: 'CHECKOUT_CONCOURSE', target: { x: 11.5, z: -20.15 }, size: { w: 0.6, d: 0.6, h: 1.7 } }),

      // Priority 2: Department Floor Zones & Primary Shelves
      Object.freeze({ id: 'dept_manav', category: 'DEPT_ZONE', priority: 2, zone: 'FRESH_PRODUCE', target: { x: -8.5, z: -9.5 }, size: { w: 10.4, d: 2.7, h: 0.8 }, label: 'MANAV', color: 0x10ac84 }),
      Object.freeze({ id: 'dept_sarkuteri', category: 'DEPT_ZONE', priority: 2, zone: 'GROCERY_GRID', target: { x: 7.0, z: -9.5 }, size: { w: 8.8, d: 2.7, h: 0.8 }, label: 'ŞARKÜTERİ', color: 0x0984e3 }),
      Object.freeze({ id: 'dept_firin', category: 'DEPT_ZONE', priority: 2, zone: 'FRESH_PRODUCE', target: { x: -8.5, z: -15.0 }, size: { w: 10.4, d: 2.7, h: 0.8 }, label: 'FIRIN', color: 0xd35400 }),
      Object.freeze({ id: 'dept_pizza', category: 'DEPT_ZONE', priority: 2, zone: 'GROCERY_GRID', target: { x: 9.75, z: -15.0 }, size: { w: 14.5, d: 2.7, h: 0.8 }, label: 'BÜFE & PİZZA', color: 0xf39c12 }),
      Object.freeze({ id: 'dept_organik', category: 'DEPT_ZONE', priority: 2, zone: 'FRESH_PRODUCE', target: { x: -8.5, z: -20.5 }, size: { w: 10.4, d: 2.7, h: 0.8 }, label: 'ORGANİK', color: 0x27ae60 }),
      Object.freeze({ id: 'dept_gurme', category: 'DEPT_ZONE', priority: 2, zone: 'EAST_PROMENADE', target: { x: 18.75, z: -20.5 }, size: { w: 8.0, d: 2.7, h: 0.8 }, label: 'GURME & DELİ', color: 0x8e44ad }),

      Object.freeze({ id: 'shelf_tomato', category: 'SHELF', priority: 2, zone: 'FRESH_PRODUCE', target: { x: -5.5, z: -9.5 }, size: { w: 2.6, d: 1.6, h: 1.8 } }),
      Object.freeze({ id: 'shelf_egg', category: 'SHELF', priority: 2, zone: 'GROCERY_GRID', target: { x: 4.0, z: -9.5 }, size: { w: 2.6, d: 1.6, h: 1.8 } }),
      Object.freeze({ id: 'shelf_beverage_chiller', category: 'SHELF', priority: 2, zone: 'EAST_PROMENADE', target: { x: 22.2, z: -16.0 }, size: { w: 1.6, d: 2.6, h: 2.2 } }),
      Object.freeze({ id: 'shelf_cleaning', category: 'SHELF', priority: 2, zone: 'EAST_PROMENADE', target: { x: 15.5, z: -9.5 }, size: { w: 2.6, d: 1.6, h: 1.8 } }),

      // Priority 3: Progression Unlock Pads
      Object.freeze({ id: 'pad_1_tomato2', category: 'UNLOCK_PAD', priority: 3, zone: 'FRESH_PRODUCE', target: { x: -11.5, z: -7.0 }, size: { w: 2.6, d: 2.6, h: 0.04 } }),
      Object.freeze({ id: 'pad_2_cashier_speed', category: 'UNLOCK_PAD', priority: 3, zone: 'GROCERY_GRID', target: { x: 7.5, z: -14.5 }, size: { w: 2.6, d: 2.6, h: 0.04 } }),
      Object.freeze({ id: 'pad_12_pie', category: 'UNLOCK_PAD', priority: 3, zone: 'EAST_PROMENADE', target: { x: 17.0, z: -18.0 }, size: { w: 2.6, d: 2.6, h: 0.04 } }),
      Object.freeze({ id: 'pad_16_icecream', category: 'UNLOCK_PAD', priority: 3, zone: 'EAST_PROMENADE', target: { x: 19.5, z: -18.0 }, size: { w: 2.6, d: 2.6, h: 0.04 } }),

      // Priority 4: Accessories & Architectural Decors
      Object.freeze({ id: 'decor_trolleys', category: 'DECOMPRESSION_ITEM', priority: 4, zone: 'DECOMPRESSION', target: { x: -2.4, z: -22.5 }, size: { w: 1.4, d: 2.6, h: 1.2 } }),
      Object.freeze({ id: 'decor_baskets', category: 'DECOMPRESSION_ITEM', priority: 4, zone: 'DECOMPRESSION', target: { x: 2.6, z: -22.5 }, size: { w: 0.8, d: 0.8, h: 1.4 } }),
      Object.freeze({ id: 'decor_lockers', category: 'DECOMPRESSION_ITEM', priority: 4, zone: 'DECOMPRESSION', target: { x: -6.5, z: -23.2 }, size: { w: 1.8, d: 0.55, h: 1.9 } }),
      Object.freeze({ id: 'decor_freezer', category: 'PERIMETER_COOLING', priority: 4, zone: 'EAST_PROMENADE', target: { x: 15.5, z: -17.7 }, size: { w: 1.8, d: 2.8, h: 0.95 } }),
      Object.freeze({ id: 'decor_impulse_rack', category: 'CHECKOUT_ACCESSORY', priority: 4, zone: 'CHECKOUT_CONCOURSE', target: { x: 13.8, z: -19.5 }, size: { w: 0.35, d: 1.4, h: 0.95 } }),
      Object.freeze({ id: 'decor_news_stand', category: 'CHECKOUT_ACCESSORY', priority: 4, zone: 'CHECKOUT_CONCOURSE', target: { x: 14.8, z: -19.5 }, size: { w: 0.45, d: 0.9, h: 1.2 } })
    ])
  });

  const DEFAULT_CHECKOUT_CONCOURSE = STORE_PLANOGRAM.ZONES.CHECKOUT_CONCOURSE;

  class SpatialOccupancyManager {
    constructor(layout = {}) {
      this.planogram = STORE_PLANOGRAM;
      this.layout = {
        minX: layout.minX ?? -24,
        maxX: layout.maxX ?? 24,
        minZ: layout.minZ ?? -24.5,
        maxZ: layout.maxZ ?? 24.5,
        checkoutConcourse: layout.checkoutConcourse || DEFAULT_CHECKOUT_CONCOURSE
      };
      this.reservations = [];
      this.protectedZones = [
        {
          id: 'ZONE_CHECKOUT_CONCOURSE',
          category: 'PROTECTED_ZONE',
          minX: this.layout.checkoutConcourse.minX,
          maxX: this.layout.checkoutConcourse.maxX,
          minZ: this.layout.checkoutConcourse.minZ,
          maxZ: this.layout.checkoutConcourse.maxZ,
          allowedCategories: ['CHECKOUT', 'CASHIER', 'CHECKOUT_ACCESSORY']
        },
        {
          id: 'ZONE_STORE_ENTRANCE_PORTAL',
          category: 'PROTECTED_ZONE',
          minX: -2.0,
          maxX: 2.0,
          minZ: -26.0,
          maxZ: -22.0,
          allowedCategories: ['DOORWAY', 'SECURITY_GATE']
        }
      ];
    }

    getPlanogramFixture(id) {
      return STORE_PLANOGRAM.FIXTURES.find(f => f.id === id) || null;
    }

    placePlanogramFixture(id, preferredDirs = ['EAST', 'WEST', 'SOUTH', 'NORTH']) {
      const fixture = this.getPlanogramFixture(id);
      if (!fixture) return null;
      const resolved = this.findClearPlacement(
        fixture.size.w,
        fixture.size.d,
        fixture.target.x,
        fixture.target.z,
        fixture.category,
        preferredDirs
      );
      this.reserve(
        fixture.id,
        fixture.category,
        resolved.x - fixture.size.w / 2,
        resolved.x + fixture.size.w / 2,
        resolved.z - fixture.size.d / 2,
        resolved.z + fixture.size.d / 2,
        { zone: fixture.zone, priority: fixture.priority }
      );
      return {
        id: fixture.id,
        x: resolved.x,
        z: resolved.z,
        size: fixture.size,
        adjusted: resolved.adjusted,
        zone: fixture.zone
      };
    }

    testAABB(minX, maxX, minZ, maxZ, category = 'DECOR', excludeId = '') {
      for (let i = 0; i < this.protectedZones.length; i++) {
        const pz = this.protectedZones[i];
        const xOverlap = Math.max(0, Math.min(maxX, pz.maxX) - Math.max(minX, pz.minX));
        const zOverlap = Math.max(0, Math.min(maxZ, pz.maxZ) - Math.max(minZ, pz.minZ));
        if (xOverlap > 0.05 && zOverlap > 0.05) {
          if (!pz.allowedCategories.includes(category)) {
            return { allowed: false, reason: `Zone conflict: ${pz.id}`, conflictWith: pz.id };
          }
        }
      }

      for (let i = 0; i < this.reservations.length; i++) {
        const r = this.reservations[i];
        if (r.id === excludeId) continue;
        if ((category === 'CASHIER' && r.category === 'CHECKOUT') ||
            (category === 'CHECKOUT' && r.category === 'CASHIER')) {
          continue;
        }
        const xOverlap = Math.max(0, Math.min(maxX, r.maxX) - Math.max(minX, r.minX));
        const zOverlap = Math.max(0, Math.min(maxZ, r.maxZ) - Math.max(minZ, r.minZ));
        if (xOverlap > 0.05 && zOverlap > 0.05) {
          return { allowed: false, reason: `Allocation conflict: ${r.id}`, conflictWith: r.id };
        }
      }

      return { allowed: true };
    }

    reserve(id, category, minX, maxX, minZ, maxZ, meta = {}) {
      const test = this.testAABB(minX, maxX, minZ, maxZ, category, id);
      const entry = { id, category, minX, maxX, minZ, maxZ, meta, valid: test.allowed };
      this.reservations.push(entry);
      return entry;
    }

    removeReservation(id) {
      this.reservations = this.reservations.filter(r => r.id !== id);
    }

    updateReservation(id, category, minX, maxX, minZ, maxZ, meta = {}) {
      this.removeReservation(id);
      return this.reserve(id, category, minX, maxX, minZ, maxZ, meta);
    }

    findClearPlacement(w, d, targetX, targetZ, category = 'DECOR', searchDirections = ['EAST', 'WEST', 'NORTH', 'SOUTH']) {
      const halfW = w / 2;
      const halfD = d / 2;

      if (this.testAABB(targetX - halfW, targetX + halfW, targetZ - halfD, targetZ + halfD, category).allowed) {
        return { x: targetX, z: targetZ, adjusted: false };
      }

      const step = 0.5;
      const maxRadius = 16.0;

      for (let r = step; r <= maxRadius; r += step) {
        for (let i = 0; i < searchDirections.length; i++) {
          const dir = searchDirections[i];
          let testX = targetX;
          let testZ = targetZ;
          if (dir === 'EAST') testX += r;
          else if (dir === 'WEST') testX -= r;
          else if (dir === 'NORTH') testZ -= r;
          else if (dir === 'SOUTH') testZ += r;

          if (testX - halfW < this.layout.minX + 1.0 || testX + halfW > this.layout.maxX - 1.0) continue;
          if (testZ - halfD < this.layout.minZ + 1.0 || testZ + halfD > this.layout.maxZ - 1.0) continue;

          if (this.testAABB(testX - halfW, testX + halfW, testZ - halfD, testZ + halfD, category).allowed) {
            return { x: testX, z: testZ, adjusted: true };
          }
        }
      }

      return { x: targetX, z: targetZ, adjusted: false };
    }
  }

  let _sharedSpatialRegistry = null;
  function getSharedSpatialRegistry(layout) {
    if (!_sharedSpatialRegistry) {
      _sharedSpatialRegistry = new SpatialOccupancyManager(layout);
    }
    return _sharedSpatialRegistry;
  }

  const api = {
    STORE_PLANOGRAM,
    DEFAULT_CHECKOUT_CONCOURSE,
    SpatialOccupancyManager,
    getSharedSpatialRegistry,
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
    getProductPricingMultiplier,
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
    getResidentProfile,
    getResidentProfiles,
    recordResidentSpecialOrderSale,
    createResidentOrderState,
    updateResidentOrderState,
    getResidentDayTime,
    getResidentSpawnCandidate,
    getUnlockedStories,
    // Faz 2
    FRESHNESS_CONFIG,
    getItemFreshness,
    getFreshnessPriceMultiplier,
    createFreshItem,
    getItemType,
    getItemAgeSeconds,
    getItemFreshnessState,
    getFreshItemPricedAmount,
    // Faz 3
    BRAND_CATEGORIES,
    BRAND_TIER_CONFIG,
    canUpgradeBrandTier,
    createBrandState,
    createOrUpdateBrand,
    recordBrandSale,
    getBrandPriceBonus,
    getBrandPrestigeSummary,
    getBrandLevelUpInfo,
    // Faz 4
    DAY_EVENT_POOL,
    generateDayChoices,
    applyDayChoice,
    applyDayChoiceToShoppingPool,
    getDayChoiceEffects,
    // Faz 5
    NEIGHBORHOOD_BUILDINGS,
    createNeighborhoodBuildingState,
    canBuildNeighborhood,
    purchaseNeighborhoodBuilding,
    getActiveNeighborhoodEffects,
    getNeighborhoodBuildingProgress,
    // Faz 6 (Veresiye, Hijyen, Karabaş)
    createVeresiyeState,
    issueVeresiye,
    collectVeresiye,
    getVeresiyeTotal,
    calculateHygieneScore,
    getHygieneEffects,
    createSecurityDogState,
    triggerSecurityAlarm,
    // Faz 7 (Toptancı, Personel Çay Ocağı & Dinamik Fiyatlama)
    WHOLESALE_CATALOG,
    createWholesaleState,
    orderWholesaleCrate,
    calculateBulkDiscount,
    calculateMargin,
    applyPriceElasticity,
    getDailyMarketTrend,
    STAFF_FATIGUE_CONFIG,
    createStaffFatigueState,
    drainStaffStamina,
    refillStaffStamina,
    // Faz 8 (Dekorasyon, Prestij)
    DECORATION_TIERS,
    DECORATION_CATALOG,
    createDecorationState,
    buyDecoration,
    calculateStorePrestige,
    getPrestigePerks,
    getVipBasketConfig,
    calculatePrestigeDelta,
    summarizeDayWithPrestige,
    // Faz 9 (Uydu Şubeler - Branches)
    BRANCH_CONFIGS,
    createBranchState,
    canUnlockBranch,
    unlockBranch,
    transferStockToBranch,
    assignBranchStaff,
    upgradeBranchCapacity,
    simulateBranchDailyOperations,
    collectBranchRevenue
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.GameMechanics = api;
})(typeof window !== 'undefined' ? window : globalThis);
