import preset from "tailwindcss-primeui/src/utils/preset";
import { computed, reactive, readonly } from "vue";

const layoutConfig = reactive({
    preset:'Aura',
    primary:'emerald',
    menuMode:'static',
})

const layoutState =reactive({
    staticMenuDesktopInactive:false,
    overlayMenuActive:false,
    profileSidebarVisible:false,
    staticMobileActive:false,
    menuHoverActive:false,
    activeMenuItem:null
})


export function useLayout () {
    const onMenuToggle=()=> {
        if(layoutConfig.menuMode==='overlay') {
            layoutState.overlayMenuActive= !layoutState.overlayMenuActive;
        }
        if(window.innerWidth> 991) {
            layoutState.staticMenuDesktopInactive= !layoutState.staticMenuDesktopInactive;
        } else {
            layoutState.staticMobileActive= !layoutState.staticMobileActive;
        }
    }

    return {layoutConfig: readonly(layoutConfig), layoutState: readonly(layoutState), onMenuToggle}
}