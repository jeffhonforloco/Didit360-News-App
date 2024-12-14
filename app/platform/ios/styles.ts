import { Theme } from '../../services/theme.service';

export const IOSStyles = {
    navigationBar: {
        backgroundColor: Theme.colors.primary,
        textColor: Theme.colors.white,
        translucent: true
    },
    statusBar: {
        style: 'light',
        backgroundColor: Theme.colors.primary
    },
    tabBar: {
        backgroundColor: Theme.colors.white,
        selectedTextColor: Theme.colors.primary,
        unselectedTextColor: Theme.colors.gray
    }
};