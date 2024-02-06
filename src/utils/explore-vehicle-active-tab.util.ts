function getPreviousActiveTab() {
    let activeTab = 0;

    function setter(tab: number) {
        activeTab = tab;
    }
    function getter() {
        return activeTab
    }

    return {
        tabSetter: (tab: number) => setter(tab),
        tabGetter: () => getter()
    };
}
export default getPreviousActiveTab;