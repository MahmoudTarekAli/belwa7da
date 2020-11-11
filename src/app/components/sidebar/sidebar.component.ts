import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: '' },
    { path: '/icons', title: 'Icons', icon: 'education_atom', class: '' },
    { path: '/maps', title: 'Maps', icon: 'location_map-big', class: '' },
    { path: '/notifications', title: 'Notifications', icon: 'ui-1_bell-53', class: '' },
    { path: '/user-profile', title: 'User Profile', icon: 'users_single-02', class: '' },
    { path: '/table-list', title: 'Table List', icon: 'design_bullet-list-67', class: '' },
    { path: '/typography', title: 'Typography', icon: 'text_caps-small', class: '' },
    { path: '/areas', title: 'Areas', icon: 'text_caps-small', class: '' },
    { path: '/upgrade', title: 'Upgrade to PRO', icon: 'objects_spaceship', class: 'active active-pro' }
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
    menuItems: any[];
    employee = 'employee';
    admin = "admin";
    userStateLocalStorage: boolean;
    constructor(
        private cdRef: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        // this.checkIsOperation();
        // if (!this.cdRef['destroyed']) {
        //     this.cdRef.detectChanges();
        // }
    }

    // checkIsOperation() {
    //     const userData = JSON.parse(localStorage.getItem('userData'));
    //     if (userData.roles[0] === 'admin') {
    //         return this.userStateLocalStorage = true;
    //     }
    //     this.userStateLocalStorage = false;
    // }

    ngOnDestroy() {
        this.cdRef.detach();
    }
    isMobileMenu() {
        if (window.innerWidth > 991) {
            return false;
        }
        return true;
    };
}
