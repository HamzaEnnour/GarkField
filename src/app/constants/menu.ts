import { environment } from 'src/environments/environment';
const adminRoot = environment.adminRoot;
export interface IMenuItem {
  id?: string;
  icon?: string;
  label: string;
  to: string;
  newWindow?: boolean;
  subs?: IMenuItem[];
  onlyDesktop?: boolean;
}

const data: IMenuItem[] = [
  {
    icon: 'flaticon-speedometer',
    label: 'Tableau de bord',
    to: `${adminRoot}/dashboards/analytics`,
    onlyDesktop: false
  },
  {
    icon: 'flaticon-calendar',
    label: 'Réservations',
    to: `${adminRoot}/mes-terrains`,
    onlyDesktop: false
  }, 
  {
    icon: 'flaticon-soccer-field',
    label: 'Mes Terrains',
    to: `${adminRoot}/terrains`,
    subs: [],
    onlyDesktop: false
  },
  {
    icon: 'flaticon-accounting',
    label: 'Comptabilité',
    to: `${adminRoot}/dashboards/financial`,
    subs: [],
    onlyDesktop: false
  },
  {
    icon: 'simple-icon-settings',
    label: 'Compte',
    to: `${adminRoot}/compte`,
    onlyDesktop: true
  },
];
export default data;
