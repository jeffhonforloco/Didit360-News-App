import { Theme } from '../../services/theme.service';

export const AndroidStyles = {
    actionBar: {
        backgroundColor: Theme.colors.primary,
        textColor: Theme.colors.white,
        elevation: 4
    },
    statusBar: {
        backgroundColor: Theme.colors.primaryDark
    },
    bottomNavigation: {
        backgroundColor: Theme.colors.white,
        selectedTextColor: Theme.colors.primary,
        unselectedTextColor: Theme.colors.gray,
        elevation: 8
    }
};