import customFreight, {
  AreaPlan,
  ChangeDeliveryLocationGroup,
  DeliveryPlan,
} from "@/store/settings/ShippingAndDistribution/customFreight";

interface AreaPlansSetDetail {
  createdAreaPlans: AreaPlan[];
  updatedAreaPlans: AreaPlan[];
  deletedAreaPlans: string[];
}

// ---------------- 工具函数 ----------------

function replaceBySeq(list: AreaPlan[], next: AreaPlan): AreaPlan[] {
  const exists = list.some(
    (p) => p.shippingRegionSeq === next.shippingRegionSeq
  );
  return exists
    ? list.map((p) =>
        p.shippingRegionSeq === next.shippingRegionSeq ? next : p
      )
    : [...list, next];
}

function createEmptyAreaPlansSetDetail(): AreaPlansSetDetail {
  return {
    createdAreaPlans: [],
    updatedAreaPlans: [],
    deletedAreaPlans: [],
  };
}

// ---------------- 分组归属判断 ----------------

/** 分组是否本次新建。只看分组自身，不看内部区域计划。 */
function isNewGroup(groupSeq: string): boolean {
  return customFreight.productGroupList.some(
    (g) => g.deliveryLocationGroupSeq === groupSeq && g.isNew === true
  );
}

/** 根据分组是否新建，返回该去哪个变更列表。 */
function getGroupChangeTarget(groupSeq: string) {
  const isNew = isNewGroup(groupSeq);
  return {
    isNew,
    list: isNew ? customFreight.createDeliveryLocationGroup: customFreight.updateDeliveryLocationGroup,
  };
}

/**
 * 写回变更列表。
 */
function writeGroupChangeList(
  groupSeq: string,
  nextList: ChangeDeliveryLocationGroup[]
) {
  if (isNewGroup(groupSeq)) {
    customFreight.createDeliveryLocationGroup = nextList;
  } else {
    customFreight.updateDeliveryLocationGroup = nextList;
  }
}

// ---------------- 确保变更记录存在 ----------------

/**
 * 找到分组的变更记录；没有就基于渲染数据创建一条。
 * - 新建分组进 createDeliveryLocationGroup
 * - 已有分组进 updateDeliveryLocationGroup
 * - 第一次编辑时列表为空，这里补一条；后续编辑复用已有的
 */
function ensureGroupChange(
  groupSeq: string
): ChangeDeliveryLocationGroup | null {

  const { list } = getGroupChangeTarget(groupSeq);

  const existing = list.find(
    (g) => g.deliveryLocationGroupSeq === groupSeq
  );
  if (existing) return existing;

  const source = customFreight.productGroupList.find(
    (g) => g.deliveryLocationGroupSeq === groupSeq
  );
  if (!source) return null;

  const change: ChangeDeliveryLocationGroup = {
    groupName: source.groupName,
    deliveryLocationGroupSeq: source.deliveryLocationGroupSeq,
    deliveryLocationSeqs: source.deliveryLocationSeqs ?? [],
    defaultTag: source.defaultTag,
    isNew: source.isNew,
    areaPlansSetDetail: createEmptyAreaPlansSetDetail(),
  };

  writeGroupChangeList(groupSeq, [...list, change]);
  return change;
}

// ---------------- 统一底座 ----------------

/** 所有区域计划变更的统一入口：不可变更新 areaPlansSetDetail 并写回。 */
function patchAreaPlans(
  groupSeq: string,
  updater: (prev: AreaPlansSetDetail) => AreaPlansSetDetail
) {
  const change = ensureGroupChange(groupSeq);
  if (!change) return;

  const { list } = getGroupChangeTarget(groupSeq);
  const nextDetail = updater(change.areaPlansSetDetail);

  const nextList = list.map((g) =>
    g.deliveryLocationGroupSeq === groupSeq ? { ...g, areaPlansSetDetail: nextDetail } : g
  );

  writeGroupChangeList(groupSeq, nextList);
}

// ---------------- 区域计划增删改 ----------------

/** 新增区域计划：进 createdAreaPlans。 */
export const addAreaPlan = (groupSeq: string, areaPlan: AreaPlan) => {
  patchAreaPlans(groupSeq, (prev) => ({
    ...prev,
    createdAreaPlans: [...prev.createdAreaPlans, areaPlan],
  }));
};


export const addDeliveryPlans = (groupSeq: string,shippingRegionSeq:string,deliveryPlan: DeliveryPlan) => {
  
};

/**
 * 修改区域计划：
 * - 如果它本身是本次新建的，继续改 createdAreaPlans
 * - 否则进 updatedAreaPlans（已存在则替换）
 */
export const updateAreaPlan = (groupSeq: string, areaPlan: AreaPlan) => {
  patchAreaPlans(groupSeq, (prev) => {
    const isNewPlan = prev.createdAreaPlans.some(
      (p) => p.shippingRegionSeq === areaPlan.shippingRegionSeq
    );
    if (isNewPlan) {
      return {
        ...prev,
        createdAreaPlans: replaceBySeq(prev.createdAreaPlans, areaPlan),
      };
    }
    return {
      ...prev,
      updatedAreaPlans: replaceBySeq(prev.updatedAreaPlans, areaPlan),
    };
  });
};

/**
 * 删除区域计划：
 * - 本次新建的直接从 createdAreaPlans 移除，不进 deleted（后端不需要“先建再删”）
 * - 后端已有的进 deletedAreaPlans，并从 updatedAreaPlans 移除
 */
export const removeAreaPlan = (groupSeq: string, areaPlan: AreaPlan) => {
  patchAreaPlans(groupSeq, (prev) => {
    const isNewPlan = prev.createdAreaPlans.some(
      (p) => p.shippingRegionSeq === areaPlan.shippingRegionSeq
    );
    if (isNewPlan) {
      return {
        ...prev,
        createdAreaPlans: prev.createdAreaPlans.filter(
          (p) => p.shippingRegionSeq !== areaPlan.shippingRegionSeq
        ),
      };
    }
    return {
      ...prev,
      updatedAreaPlans: prev.updatedAreaPlans.filter(
        (p) => p.shippingRegionSeq !== areaPlan.shippingRegionSeq
      ),
      deletedAreaPlans: [
        ...prev.deletedAreaPlans,
        areaPlan.shippingRegionSeq
      ],
    };
  });
};