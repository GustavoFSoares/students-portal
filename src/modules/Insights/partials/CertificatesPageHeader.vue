<template>
  <div class="certificates-page-header">
    <QTabs
      class="certificates-page-header__tabs"
      dense
      active-color="primary"
      :model-value="currentTab"
      @update:modelValue="handleChangeTabs"
    >
      <QTab
        class="certificates-page-header__tab"
        name="inProgress"
        :label="$t(`${I18N_PATH}.tabs.inProgress`)"
      />

      <QTab
        class="certificates-page-header__tab"
        name="completed"
        :label="$t(`${I18N_PATH}.tabs.completed`)"
      />
    </QTabs>

    <QBtnDropdown
      class="certificates-page-header__dropdown"
      flat
      :label="$t(`${I18N_PATH}.orderOptions.${orderSelected}`)"
      dropdown-icon="expand_more"
    >
      <QList>
        <QItem
          class="certificates-page-header__order-item"
          v-for="orderItem in orderOptions"
          :key="`order-item-${orderItem}`"
          clickable
          v-close-popup
          @click="handleChangeOrder(orderItem)"
        >
          <QItemSection>
            <QItemLabel class="certificates-page-header__order-item-label">
              {{ $t(`${I18N_PATH}.orderOptions.${orderItem}`) }}
            </QItemLabel>
          </QItemSection>
        </QItem>
      </QList>
    </QBtnDropdown>
  </div>
</template>

<script>
import { onBeforeMount, ref } from "vue";

const I18N_PATH = "modules.home.insightsPage.pages.certificatesPage.header";
const ORDER_OPTIONS = ["relevance", "dateGrowing", "dateDescending", "default"];

export default {
  name: "CertificatesPageHeader",
  emits: ["update:orderSelected", "update:currentTab"],
  props: {
    currentTab: {
      type: String,
      default: "inProgress",
    },
    orderSelected: {
      type: String,
      default: ORDER_OPTIONS[0],
    },
  },
  setup(props, ctx) {
    const orderOptions = ref(ORDER_OPTIONS);

    const handleChangeOrder = (orderSelected) => {
      ctx.emit("update:orderSelected", orderSelected);
    };

    const handleChangeTabs = (currentTab) => {
      ctx.emit("update:currentTab", currentTab);
    };

    onBeforeMount(() => {
      handleChangeOrder(props.orderSelected);
      handleChangeTabs(props.currentTab);
    });

    return {
      I18N_PATH,
      orderOptions,
      handleChangeTabs,
      handleChangeOrder,
    };
  },
};
</script>

<style lang="scss" scoped>
.certificates-page-header {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  margin-bottom: 30px;

  @media (min-width: $breakpoint-tablet) {
    flex-direction: row;
  }
  .q-tabs {
    :deep(.q-tabs__content) {
      display: flex;
      gap: 20px;
    }
  }

  .q-tab {
    padding: 0 5px;

    :deep(.q-tab__indicator) {
      display: none !important;
    }

    :deep(.q-tab__label) {
      font-weight: $font-weight-bold;
      font-size: 12px;
      text-transform: initial;
    }
  }

  &__dropdown {
    text-transform: initial;
  }
}
</style>
